<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_customer;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    // 1. Menampilkan Halaman Form
    public function create(): Response
    {
        return Inertia::render('Identitas/Create');
    }

    // 2. Memproses Data yang Dikirim
    public function store(Request $request)
    {
        // Validasi inputan
        $request->validate([
            'nama'     => 'required|string|max:255',
            'no_telp'  => 'required|string|max:15',
            'alamat'   => 'required|string',
            'foto_ktp' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Maksimal 2MB
        ]);

        $namaFile = null;

        // Proses unggah foto KTP
        if ($request->hasFile('foto_ktp')) {
            $file = $request->file('foto_ktp');
            $namaFile = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/ktp', $namaFile);
        }

        // PERUBAHAN DI SINI: Gunakan updateOrCreate
        tb_customer::updateOrCreate(
            // Parameter 1: Cari data berdasarkan user_id ini
            ['user_id' => Auth::id()], 
            
            // Parameter 2: Data yang mau diisi atau diupdate
            [
                'nama'     => $request->nama,
                'no_telp'  => $request->no_telp,
                'alamat'   => $request->alamat,
                // Jika tidak ada file baru yang diupload, biarkan foto_ktp yang lama (opsional)
                'foto_ktp' => $namaFile ?? \DB::raw('foto_ktp'), 
            ]
        );

        // Kembalikan user ke dashboard
        return redirect()->route('dashboard');
    }
}