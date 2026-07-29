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
}