import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, motors }) {
    const [selectedMotor, setSelectedMotor] = useState(null);

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    };

    // Mengambil URL Admin dari file .env
    const adminUrl = import.meta.env.VITE_ADMIN_SYSTEM_URL || '';

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
            <Head title="BALI RIDE – Explore Bali on Two Wheels" />

            {/* Import Font & Keyframes (Karena keyframes butuh config tailwind jika ingin dipindah) */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                * { font-family: 'Inter', sans-serif; }
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav className="absolute top-0 inset-x-0 z-50 bg-white/95 flex items-center justify-between px-10 h-[60px] shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                <div className="text-[1.05rem] font-black tracking-[0.04em] text-[#0d7a7a] uppercase">
                    Bali Ride
                </div>
                <div className="flex gap-8 items-center">
                    <a href="#how" className="text-[0.9rem] font-medium text-[#0d7a7a] pb-[2px] border-b-2 border-[#0d7a7a] transition-colors duration-200">
                        How it Works
                    </a>
                    <a href="#bikes" className="text-[0.9rem] font-medium text-[#444] hover:text-[#0d7a7a] pb-[2px] border-b-2 border-transparent hover:border-[#0d7a7a] transition-colors duration-200">
                        Bikes
                    </a>
                    <a href="#about" className="text-[0.9rem] font-medium text-[#444] hover:text-[#0d7a7a] pb-[2px] border-b-2 border-transparent hover:border-[#0d7a7a] transition-colors duration-200">
                        About
                    </a>
                </div>
                <div className="flex items-center">
                    {auth.user ? (
                        <Link 
                            href={route('dashboard')} 
                            className="bg-[#0d7a7a] hover:bg-[#0a6363] text-white rounded-lg px-[1.3rem] py-[0.45rem] text-[0.9rem] font-semibold transition-colors duration-200"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="bg-transparent text-[#444] border-[1.5px] border-[#ddd] hover:bg-gray-50 rounded-lg px-[1.3rem] py-[0.45rem] text-[0.9rem] font-semibold transition-colors duration-200 mr-2"
                            >
                                Log in
                            </Link>
                            <Link 
                                href={route('register')} 
                                className="bg-[#0d7a7a] hover:bg-[#0a6363] text-white rounded-lg px-[1.3rem] py-[0.45rem] text-[0.9rem] font-semibold transition-colors duration-200"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="relative w-full h-[82vh] min-h-[520px] overflow-hidden">
                <img
                    src="/images/welcomePage.png"
                    alt="Explore Bali on Two Wheels"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_55%,rgba(0,0,0,0.0)_100%)]" />
                <div className="relative z-10 pt-[7rem] px-[3rem] pb-[3rem] max-w-[500px] h-full flex flex-col justify-center">
                    <h1 className="text-[2.8rem] font-black text-white leading-[1.15] mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
                        Explore Bali on Two Wheels
                    </h1>
                    <p className="text-[0.95rem] text-white/90 leading-[1.6] mb-[1.8rem] max-w-[380px]">
                        Premium motorcycle rentals for your island adventure.
                        Reliable service, modern fleet, and ultimate freedom.
                    </p>
                    <a 
                        href="#bikes" 
                        className="inline-flex items-center gap-2 bg-[#00bcd4] hover:bg-[#00a5bc] hover:-translate-y-[2px] text-white font-bold text-[0.95rem] py-[0.75rem] px-[1.6rem] rounded-full w-fit transition-all duration-150 shadow-[0_4px_18px_rgba(0,188,212,0.35)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                            <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/>
                            <path d="M15 6a1 1 0 0 0-1-1h-2L9 17"/>
                            <path d="M15 6l3 7.5"/>
                            <path d="M5.5 14l1.5-4h6"/>
                        </svg>
                        View Collection
                    </a>
                </div>
            </section>

            {/* ── BOOKING BAR ── */}
            <div className="flex justify-center px-6 -mt-[48px] relative z-20">
                <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.13)] py-[1.4rem] px-[2rem] flex gap-5 items-end w-full max-w-[860px]">
                    
                    <div className="flex-1 flex flex-col gap-[0.35rem]">
                        <label htmlFor="pickup_date" className="text-[0.78rem] font-semibold text-[#888] tracking-[0.01em]">Pick-up Date</label>
                        <div className="flex items-center border-[1.5px] border-[#ddd] focus-within:border-[#00bcd4] rounded-lg px-3 h-[44px] bg-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#aaa] shrink-0 mr-2 w-4 h-4">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <input id="pickup_date" type="date" className="border-none outline-none focus:ring-0 flex-1 text-[0.9rem] text-[#555] bg-transparent cursor-pointer p-0" />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-[0.35rem]">
                        <label htmlFor="return_date" className="text-[0.78rem] font-semibold text-[#888] tracking-[0.01em]">Return Date</label>
                        <div className="flex items-center border-[1.5px] border-[#ddd] focus-within:border-[#00bcd4] rounded-lg px-3 h-[44px] bg-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#aaa] shrink-0 mr-2 w-4 h-4">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <input id="return_date" type="date" className="border-none outline-none focus:ring-0 flex-1 text-[0.9rem] text-[#555] bg-transparent cursor-pointer p-0" />
                        </div>
                    </div>

                    <button 
                        type="button" 
                        onClick={() => document.getElementById('bikes').scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 bg-[#00bcd4] hover:bg-[#00a5bc] hover:-translate-y-[1px] text-white font-bold text-[0.95rem] px-[1.6rem] h-[44px] rounded-lg cursor-pointer transition-all duration-150 whitespace-nowrap shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        Search
                    </button>
                </div>
            </div>

            {/* ── BIKES SECTION ── */}
            <section id="bikes" className="max-w-[1100px] mx-auto mt-[4rem] mb-[3rem] px-6">
                <h2 className="text-[1.8rem] font-extrabold text-[#111] mb-[0.4rem]">Our Fleet</h2>
                <p className="text-[#888] mb-[2.5rem] text-[0.95rem]">Choose the ride that matches your adventure.</p>

                {motors && motors.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-6">
                        {motors.map((motor) => (
                            <div key={motor.id_motor} className="group bg-white rounded-[14px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:-translate-y-[4px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-200">
                                <div className="h-[200px] bg-[#f0f0f0] overflow-hidden flex items-center justify-center">
                                    {motor.gambar_motor ? (
                                        <img 
                                            // Memanggil URL Admin dari .env
                                            src={`${adminUrl}/gambar_motor/${motor.gambar_motor}`} 
                                            alt={motor.nama_motor} 
                                            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                                        />
                                    ) : (
                                        <span className="text-[#bbb] text-[0.85rem]">No Image</span>
                                    )}
                                </div>
                                <div className="pt-[1.1rem] px-[1.25rem] pb-[1.25rem]">
                                    <div className="flex justify-between items-start mb-[0.6rem]">
                                        <div>
                                            <h3 className="text-[1rem] font-bold text-[#111] m-0">{motor.nama_motor}</h3>
                                            <p className="text-[0.78rem] text-[#aaa] mt-[1px]">Year: {motor.tahun || '-'}</p>
                                        </div>
                                        <span className="bg-[#dcfce7] text-[#16a34a] text-[0.7rem] font-bold px-[0.55rem] py-[0.2rem] rounded-full uppercase tracking-[0.04em]">
                                            {motor.status}
                                        </span>
                                    </div>
                                    <p className="text-[1.2rem] font-extrabold text-[#111] mt-[0.5rem] mb-[0.9rem]">
                                        {formatRupiah(motor.harga)}
                                        <span className="text-[0.78rem] font-normal text-[#999]"> / day</span>
                                    </p>
                                    <button 
                                        className="block w-full bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#111] border-none rounded-lg p-[0.7rem] font-semibold text-[0.88rem] transition-colors duration-200 text-center"
                                        onClick={() => setSelectedMotor(motor)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-[#aaa]">
                        No motorcycles available at the moment.
                    </div>
                )}
            </section>

            {/* ── MODAL ── */}
            {selectedMotor && (
                <div 
                    className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease]" 
                    onClick={() => setSelectedMotor(null)}
                >
                    <div 
                        className="bg-white rounded-[18px] w-full max-w-[480px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-[slideUp_0.25s_ease]" 
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="h-[220px] bg-[#eee] overflow-hidden">
                            {selectedMotor.gambar_motor ? (
                                <img 
                                    // Memanggil URL Admin dari .env
                                    src={`${adminUrl}/gambar_motor/${selectedMotor.gambar_motor}`} 
                                    alt={selectedMotor.nama_motor} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-[#bbb]">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="pt-[1.5rem] px-[1.5rem] pb-[1.75rem]">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-[1.4rem] font-extrabold text-[#111] m-0">{selectedMotor.nama_motor}</h2>
                                <span className="bg-[#dcfce7] text-[#16a34a] text-[0.7rem] font-bold px-[0.55rem] py-[0.2rem] rounded-full uppercase tracking-[0.04em]">
                                    {selectedMotor.status}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div>
                                    <p className="text-[0.72rem] text-[#999] font-semibold uppercase mb-[2px]">Year</p>
                                    <p className="text-[0.92rem] text-[#111] font-medium m-0">{selectedMotor.tahun || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-[0.72rem] text-[#999] font-semibold uppercase mb-[2px]">Category</p>
                                    <p className="text-[0.92rem] text-[#111] font-medium m-0">
                                        {selectedMotor.kategori ? selectedMotor.kategori.nama_kategori : '-'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="text-[0.72rem] text-[#999] font-semibold uppercase">Description</label>
                                <div className="mt-[4px] bg-[#f8f8f8] border border-[#eee] rounded-lg py-[0.7rem] px-[0.9rem] text-[0.85rem] text-[#555] leading-[1.6] h-[80px] overflow-y-auto">
                                    {selectedMotor.deskripsi || 'No description available.'}
                                </div>
                            </div>

                            <div className="bg-[#f8f8f8] border border-[#eee] rounded-[10px] py-[0.9rem] px-[1rem] my-4 flex justify-between items-center">
                                <span className="text-[0.78rem] text-[#999] font-semibold uppercase">Rental Price</span>
                                <span className="text-[1.4rem] font-black text-[#111]">
                                    {formatRupiah(selectedMotor.harga)} <small className="text-[0.78rem] font-normal text-[#999]">/ day</small>
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <Link
                                    href={route('booking.create', selectedMotor.id_motor)}
                                    className="flex-1 bg-[#0d7a7a] hover:bg-[#0a6363] text-white rounded-[10px] p-[0.75rem] font-bold text-[0.92rem] text-center transition-colors duration-200 flex items-center justify-center"
                                >
                                    Rent This Bike
                                </Link>
                                <button 
                                    className="flex-1 bg-white hover:bg-[#f5f5f5] text-[#555] border-2 border-[#ddd] rounded-[10px] p-[0.75rem] font-bold text-[0.92rem] transition-colors duration-200"
                                    onClick={() => setSelectedMotor(null)}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}