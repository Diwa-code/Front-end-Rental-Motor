import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, customer, pesananAktif = [], riwayatPesanan = [] }) {
    
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    };

    const getStatusBadge = (status) => {
        // ... (biarkan fungsi ini sama seperti yang kamu miliki)
        switch (status) {
            case 'berjalan': return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Berjalan</span>;
            case 'menunggu_pembayaran': return <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">Menunggu Pembayaran</span>;
            case 'selesai': return <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Selesai</span>;
            case 'dibatalkan': return <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Dibatalkan</span>;
            default: return <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{status}</span>;
        }
    };

    // TAMBAHKAN LOGIKA INI: Cek apakah data benar-benar lengkap
    // Menganggap lengkap jika customer ada, DAN no_telp ada, DAN alamat ada
    const isIdentitasLengkap = customer && customer.no_telp && customer.alamat;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Pelanggan</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Kartu Sambutan Utama */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                        <div className="p-8 text-gray-900 flex flex-col md:flex-row md:items-center justify-between">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-2xl font-bold mb-1">Halo, {auth.user.name}! 👋</h3>
                                <p className="text-gray-500">Kelola penyewaan motormu dan cek status perjalananmu di sini.</p>
                            </div>
                            <Link 
                                href="/" 
                                className="inline-flex justify-center bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm"
                            >
                                + Sewa Motor Baru
                            </Link>
                        </div>
                    </div>

                    {/* VALIDASI KTP CUSTOMER YANG SUDAH DIPERBAIKI */}
                    {!isIdentitasLengkap ? (
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl flex flex-col sm:flex-row items-center justify-between shadow-sm">
                            <div className="mb-4 sm:mb-0">
                                <h4 className="text-lg font-bold text-red-900 mb-1">Perhatian: Identitas Belum Lengkap!</h4>
                                <p className="text-sm text-red-700">Kamu belum bisa menyewa motor. Wajib melengkapi Data Diri & Foto KTP.</p>
                            </div>
                            <Link 
                                href="/identitas/create" 
                                className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors whitespace-nowrap shadow-sm"
                            >
                                Lengkapi Sekarang
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-md font-bold text-gray-800">Informasi Identitas (Verified)</h4>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-bold flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    Terverifikasi
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Nama Sesuai KTP</p>
                                    <p className="font-medium text-gray-900 mt-1">{customer.nama}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Nomor Telepon</p>
                                    <p className="font-medium text-gray-900 mt-1">{customer.no_telp}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Alamat Lengkap</p>
                                    <p className="font-medium text-gray-900 mt-1">{customer.alamat}</p>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Grid Layout Transaksi */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Kolom Kiri: Penyewaan Aktif */}
                        <div className="bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Penyewaan Aktif</h4>
                            
                            {pesananAktif.length > 0 ? (
                                <div className="space-y-4">
                                    {pesananAktif.map((trx) => (
                                        <div key={trx.id_transaksi} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h5 className="font-bold text-gray-900 text-lg">{trx.motor?.nama_motor || 'Motor Tidak Diketahui'}</h5>
                                                    <p className="text-xs text-gray-500">Order ID: #{trx.id_transaksi}</p>
                                                </div>
                                                {getStatusBadge(trx.status_transaksi)}
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4 my-4 bg-gray-50 p-3 rounded-lg">
                                                <div>
                                                    <p className="text-xs text-gray-500">Tanggal Sewa</p>
                                                    <p className="text-sm font-semibold text-gray-800">{trx.tgl_mulai}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Tanggal Kembali</p>
                                                    <p className="text-sm font-semibold text-gray-800">{trx.tgl_selesai}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                                <div>
                                                    <p className="text-xs text-gray-500">Total Biaya</p>
                                                    <p className="font-bold text-gray-900">{formatRupiah(trx.total_bayar)}</p>
                                                </div>
                                                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200">
                                                    Lihat Detail
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                    <div className="text-5xl mb-4">🛵</div>
                                    <h5 className="text-lg font-bold text-gray-900 mb-2">Belum Ada Penyewaan</h5>
                                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                                        Saat ini tidak ada motor yang sedang kamu sewa.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Kolom Kanan: Riwayat Selesai */}
                        <div className="bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Riwayat Transaksi</h4>
                            
                            {riwayatPesanan.length > 0 ? (
                                <div className="space-y-3">
                                    {riwayatPesanan.map((riwayat) => (
                                        <div key={riwayat.id_transaksi} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{riwayat.motor?.nama_motor || 'Motor Tidak Diketahui'}</p>
                                                <p className="text-xs text-gray-500">{riwayat.tgl_mulai} s/d {riwayat.tgl_selesai}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900 text-sm">{formatRupiah(riwayat.total_bayar)}</p>
                                                {getStatusBadge(riwayat.status_transaksi)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <p className="mt-4 text-sm text-gray-500 italic">Riwayat transaksimu masih kosong.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}