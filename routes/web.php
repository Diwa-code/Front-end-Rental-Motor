<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// 1. Rute Publik (Halaman Depan)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        // Kirim data user yang sedang login (jika ada) ke halaman Welcome
        'auth' => [
            'user' => Auth::user(),
        ],
        // Ambil data motor yang berstatus 'tersedia' beserta kategorinya
        'motors' => \App\Models\tb_motor::with('kategori')->where('status', 'tersedia')->get(),
    ]);
});

// 2. Rute yang Membutuhkan Login (Middleware Auth)
Route::middleware(['auth'])->group(function () {
    
    // Rute Profile (Bawaan Laravel Breeze)
    // Sengaja diletakkan di luar 'verified' agar user tetap bisa edit/hapus akun meski belum verifikasi email
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // --- SUB-GROUP: Wajib Login & Wajib Verifikasi Email ---
    Route::middleware(['verified'])->group(function () {
        
        // Rute Pemesanan/Sewa
        Route::get('/sewa/{motor}', [\App\Http\Controllers\BookingController::class, 'create'])->name('booking.create');
        Route::post('/sewa/{motor}', [\App\Http\Controllers\BookingController::class, 'store'])->name('booking.store');
        
        // Rute Dashboard Utama
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/api/transaksi/{id_transaksi}', [DashboardController::class, 'showTransaksi'])->name('transaksi.show');
        
        // Rute untuk Form Identitas
        Route::get('/identitas/create', [CustomerController::class, 'create'])->name('identitas.create');
        Route::post('/identitas', [CustomerController::class, 'store'])->name('identitas.store');
        
    });
});

// 3. Rute Autentikasi (Bawaan Breeze)
require __DIR__.'/auth.php';