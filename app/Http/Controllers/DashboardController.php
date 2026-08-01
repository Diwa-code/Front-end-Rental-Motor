<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_customer;
use App\Models\tb_transaksi;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $userId = Auth::id();
        
        $customer = tb_customer::where('user_id', $userId)->first();
        $customerId = $customer ? $customer->id_customer : null;
        
        // 2. Transaksi Aktif (Gunakan status_transaksi)
        $pesananAktif = tb_transaksi::with('motor')->where('customer_id', $customerId)
                            ->whereIn('status_transaksi', ['menunggu_pembayaran', 'berjalan'])
                            ->orderBy('created_at', 'desc')
                            ->get();

        // 3. Riwayat Transaksi (Gunakan status_transaksi)
        $riwayatPesanan = tb_transaksi::with('motor')->where('customer_id', $customerId)
                            ->whereIn('status_transaksi', ['selesai', 'dibatalkan'])
                            ->orderBy('created_at', 'desc')
                            ->get();

        return Inertia::render('Dashboard', [
            'customer' => $customer,
            'pesananAktif' => $pesananAktif,
            'riwayatPesanan' => $riwayatPesanan
        ]);
    }

    public function showTransaksi($id_transaksi)
    {
        $userId = Auth::id();
        $customer = tb_customer::where('user_id', $userId)->first();
        
        if (!$customer) {
            return response()->json(['error' => 'Customer tidak ditemukan'], 404);
        }
        
        $transaksi = tb_transaksi::with('motor')
            ->where('id_transaksi', $id_transaksi)
            ->where('customer_id', $customer->id_customer)
            ->first();
            
        if (!$transaksi) {
            return response()->json(['error' => 'Transaksi tidak ditemukan atau Anda tidak memiliki akses'], 404);
        }
        
        return response()->json([
            'id_transaksi' => $transaksi->id_transaksi,
            'nama_motor' => $transaksi->motor ? $transaksi->motor->nama_motor : 'Motor Tidak Diketahui',
            'tgl_mulai' => $transaksi->tgl_mulai,
            'tgl_selesai' => $transaksi->tgl_selesai,
            'status_transaksi' => $transaksi->status_transaksi,
            'total_bayar' => $transaksi->total_bayar,
        ]);
    }
}