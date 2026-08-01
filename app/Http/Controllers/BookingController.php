<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_motor;
use App\Models\tb_customer;
use App\Models\tb_transaksi;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

// 1. TAMBAHKAN DUA BARIS INI UNTUK MEMANGGIL MIDTRANS
use Midtrans\Config;
use Midtrans\Snap;

class BookingController extends Controller
{
    /**
     * Fase 2: Gatekeeper & Fase 3: Halaman Checkout
     */
    public function create($id_motor)
    {
        $user = Auth::user();
        
        // Cek data customer
        $customer = tb_customer::where('user_id', $user->id)->first();
        
        // Kondisi Gagal: Jika data belum ada, atau ada kolom penting yang kosong
        if (!$customer || empty($customer->no_telp) || empty($customer->alamat) || empty($customer->foto_ktp)) {
            session()->flash('error', 'Silakan lengkapi identitas Anda terlebih dahulu sebelum menyewa motor.');
            return redirect()->route('identitas.create');
        }

        // Ambil data motor
        $motor = tb_motor::findOrFail($id_motor);

        // Pastikan motor masih tersedia
        if ($motor->status !== 'tersedia') {
            session()->flash('error', 'Mohon maaf, motor ini tidak tersedia untuk disewa saat ini.');
            return redirect()->route('dashboard'); 
        }

        return Inertia::render('Booking/Create', [
            'motor' => $motor
        ]);
    }

    /**
     * Fase 4: Pemrosesan Data & Generate Tagihan Midtrans
     */
    public function store(Request $request, $id_motor)
    {
        $request->validate([
            'tanggal_sewa' => 'required|date|after_or_equal:today',
            'durasi_bulan' => 'nullable|integer|min:0',
            'durasi_hari'  => 'nullable|integer|min:0',
        ]);

        $user = Auth::user();
        $customer = tb_customer::where('user_id', $user->id)->firstOrFail();
        $motor = tb_motor::findOrFail($id_motor);

        if ($motor->status !== 'tersedia') {
            return back()->withErrors(['message' => 'Motor sudah tidak tersedia.']);
        }

        // Tentukan durasi berdasarkan kombinasi bulan dan hari
        $bulan = (int) $request->durasi_bulan;
        $hari  = (int) $request->durasi_hari;
        $durasi = ($bulan * 30) + $hari;

        if ($durasi < 1) {
            return back()->withErrors(['durasi_hari' => 'Total durasi sewa harus minimal 1 hari.']);
        }

        // Tentukan persentase diskon
        $diskonPersen = 0;
        if ($durasi >= 180) {
            $diskonPersen = 20; 
        } elseif ($durasi >= 90) {
            $diskonPersen = 15; 
        } elseif ($durasi >= 30) {
            $diskonPersen = 10; 
        }

        $hargaKotor = $durasi * $motor->harga;
        $potongan = $hargaKotor * ($diskonPersen / 100);
        $totalBayar = $hargaKotor - $potongan;

        $tglSewa = Carbon::parse($request->tanggal_sewa);
        $tglKembali = $tglSewa->copy()->addDays($durasi - 1); 

        // 1. Simpan Transaksi Pertama Kali (Untuk mendapatkan ID Transaksi)
        $transaksi = new tb_transaksi();
        $transaksi->customer_id = $customer->id_customer;
        $transaksi->motor_id = $motor->id_motor;
        $transaksi->harga_sewa = $motor->harga;
        $transaksi->durasi = $durasi;
        $transaksi->tgl_mulai = $tglSewa->format('Y-m-d');
        $transaksi->tgl_selesai = $tglKembali->format('Y-m-d');
        $transaksi->total_bayar = $totalBayar;
        $transaksi->status_transaksi = 'menunggu_pembayaran';
        $transaksi->save();

        // 2. SETTING KONFIGURASI MIDTRANS
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // 3. SIAPKAN DATA TAGIHAN YANG AKAN DIKIRIM KE MIDTRANS
        $params = [
            'transaction_details' => [
                'order_id' => 'TRX-' . $transaksi->id_transaksi, // Format tagihan, misal: TRX-5
                'gross_amount' => (int) $totalBayar, // Nominal harus angka bulat
            ],
            'customer_details' => [
                'first_name' => $customer->nama, // Asumsi ada kolom 'nama' di tb_customer
                'email' => $user->email,
                'phone' => $customer->no_telp,
            ],
            'item_details' => [
                [
                    'id' => $motor->id_motor,
                    'price' => (int) $totalBayar,
                    'quantity' => 1,
                    'name' => 'Sewa ' . $motor->nama_motor
                ]
            ]
        ];

        // 4. MINTA SNAP TOKEN KE SERVER MIDTRANS
        try {
            $snapToken = Snap::getSnapToken($params);
            
            // Simpan token ke database
            $transaksi->snap_token = $snapToken;
            $transaksi->save();

        } catch (\Exception $e) {
            // Jika Midtrans error, kembalikan status motor dan batalkan
            $transaksi->delete(); 
            return back()->withErrors(['message' => 'Gagal menghubungi server pembayaran: ' . $e->getMessage()]);
        }

        // Kunci inventaris
        $motor->status = 'disewa';
        $motor->save();

        session()->flash('success', 'Pemesanan berhasil dibuat! Menunggu pembayaran.');
        return redirect()->route('dashboard');
    }
}