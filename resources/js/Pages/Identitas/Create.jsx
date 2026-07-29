import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    // Fitur bawaan Inertia untuk menangani form
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        no_telp: '',
        alamat: '',
        foto_ktp: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // Mengirim data form ke route POST /identitas
        post('/identitas');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lengkapi Identitas</h2>}
        >
            <Head title="Lengkapi Identitas" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-8">
                        
                        <div className="mb-8 border-b pb-4">
                            <h3 className="text-2xl font-bold text-gray-900">Data Diri & KTP</h3>
                            <p className="text-sm text-gray-500 mt-1">Silakan isi data diri sesuai dengan kartu identitas (KTP) yang berlaku.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                            
                            {/* Input Nama */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap Sesuai KTP</label>
                                <input
                                    type="text"
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                />
                                {errors.nama && <div className="text-red-500 text-xs mt-1 font-semibold">{errors.nama}</div>}
                            </div>

                            {/* Input No Telp */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Telepon / WhatsApp</label>
                                <input
                                    type="text"
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                                    value={data.no_telp}
                                    onChange={(e) => setData('no_telp', e.target.value)}
                                    placeholder="Contoh: 081234567890"
                                />
                                {errors.no_telp && <div className="text-red-500 text-xs mt-1 font-semibold">{errors.no_telp}</div>}
                            </div>

                            {/* Input Alamat */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Lengkap</label>
                                <textarea
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                                    rows="4"
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    placeholder="Masukkan alamat lengkap (Jalan, RT/RW, Desa/Kelurahan)"
                                ></textarea>
                                {errors.alamat && <div className="text-red-500 text-xs mt-1 font-semibold">{errors.alamat}</div>}
                            </div>

                            {/* Input File KTP */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Foto KTP</label>
                                <input
                                    type="file"
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                                    accept="image/*"
                                    onChange={(e) => setData('foto_ktp', e.target.files[0])}
                                />
                                <p className="text-xs text-gray-500 mt-2">Format: JPG, JPEG, PNG. Maksimal ukuran 2MB.</p>
                                {errors.foto_ktp && <div className="text-red-500 text-xs mt-1 font-semibold">{errors.foto_ktp}</div>}
                            </div>

                            {/* Tombol Aksi */}
                            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                <Link 
                                    href="/dashboard"
                                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-sm ${processing && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    {processing ? 'Menyimpan Data...' : 'Simpan Identitas'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}