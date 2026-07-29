import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Create({ auth, motor }) {
    const { data, setData, post, processing, errors } = useForm({
        tanggal_sewa: '',
        durasi_bulan: 0,
        durasi_hari: 1,
    });

    const [durasi, setDurasi] = useState(1);
    const [hargaKotor, setHargaKotor] = useState(0);
    const [totalHarga, setTotalHarga] = useState(0);
    const [diskonPersen, setDiskonPersen] = useState(0);

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    };

    // Efek untuk menghitung durasi dan diskon
    useEffect(() => {
        const bulan = parseInt(data.durasi_bulan) || 0;
        const hari = parseInt(data.durasi_hari) || 0;
        const d = (bulan * 30) + hari;
        
        setDurasi(d);

        let d_persen = 0;
        if (d >= 180) {
            d_persen = 20;
        } else if (d >= 90) {
            d_persen = 15;
        } else if (d >= 30) {
            d_persen = 10;
        }

        setDiskonPersen(d_persen);
        
        const kotor = d * motor.harga;
        setHargaKotor(kotor);
        setTotalHarga(kotor - (kotor * (d_persen / 100)));

    }, [data.durasi_bulan, data.durasi_hari, motor.harga]);

    const submit = (e) => {
        e.preventDefault();
        post(route('booking.store', motor.id_motor));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Checkout Sewa Motor</h2>}
        >
            <Head title="Checkout Pesanan" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* Kiri: Form Input Jadwal */}
                        <div className="flex-1 bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100 h-fit">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Tentukan Jadwal Sewa</h3>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="tanggal_sewa" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Mulai Sewa
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal_sewa"
                                        min={today}
                                        value={data.tanggal_sewa}
                                        onChange={(e) => setData('tanggal_sewa', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.tanggal_sewa && <p className="mt-2 text-sm text-red-600">{errors.tanggal_sewa}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="durasi_bulan" className="block text-sm font-medium text-gray-700 mb-1">
                                            Jumlah Bulan (1 bln = 30 hr)
                                        </label>
                                        <input
                                            type="number"
                                            id="durasi_bulan"
                                            min="0"
                                            value={data.durasi_bulan}
                                            onChange={(e) => setData('durasi_bulan', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.durasi_bulan && <p className="mt-2 text-sm text-red-600">{errors.durasi_bulan}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="durasi_hari" className="block text-sm font-medium text-gray-700 mb-1">
                                            Jumlah Hari (Ekstra)
                                        </label>
                                        <input
                                            type="number"
                                            id="durasi_hari"
                                            min="0"
                                            value={data.durasi_hari}
                                            onChange={(e) => setData('durasi_hari', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.durasi_hari && <p className="mt-2 text-sm text-red-600">{errors.durasi_hari}</p>}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Total Durasi: <span className="font-bold text-gray-800">{durasi} Hari</span>
                                </p>
                                
                                {errors.message && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-200">
                                        {errors.message}
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Kanan: Ringkasan Pesanan */}
                        <div className="w-full lg:w-96 bg-white p-6 shadow-sm sm:rounded-2xl border border-gray-100 h-fit">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Ringkasan Pesanan</h3>
                            
                            {/* Info Motor */}
                            <div className="flex gap-4 mb-6">
                                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    {motor.gambar_motor ? (
                                        <img src={`/storage/${motor.gambar_motor}`} alt={motor.nama_motor} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{motor.nama_motor}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{formatRupiah(motor.harga)} / hari</p>
                                </div>
                            </div>

                            {/* Rincian Harga */}
                            <div className="bg-gray-50 p-4 rounded-xl space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Durasi Sewa</span>
                                    <span className="font-semibold text-gray-900">{durasi} Hari</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold text-gray-900">{formatRupiah(hargaKotor)}</span>
                                </div>
                                
                                {diskonPersen > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 font-medium bg-green-50 p-2 rounded-lg border border-green-100">
                                        <span>Diskon {diskonPersen}%</span>
                                        <span>- {formatRupiah(hargaKotor - totalHarga)}</span>
                                    </div>
                                )}
                                
                                <div className="border-t pt-3 mt-3 flex justify-between items-end">
                                    <span className="font-bold text-gray-900">Total Harga</span>
                                    <div className="text-right">
                                        {diskonPersen > 0 && (
                                            <p className="text-xs text-gray-400 line-through mb-1">{formatRupiah(hargaKotor)}</p>
                                        )}
                                        <p className="text-xl font-black text-indigo-700">{formatRupiah(totalHarga)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Konfirmasi */}
                            <button
                                type="button"
                                onClick={submit}
                                disabled={processing || durasi <= 0 || !data.tanggal_sewa}
                                className={`w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-colors ${
                                    processing || durasi <= 0 || !data.tanggal_sewa
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                }`}
                            >
                                {processing ? 'Memproses...' : 'Konfirmasi Pesanan'}
                            </button>
                            
                            <Link 
                                href="/"
                                className="block w-full text-center mt-3 text-sm font-medium text-gray-500 hover:text-gray-800"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
