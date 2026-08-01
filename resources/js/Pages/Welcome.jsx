import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, motors }) {
    const [selectedMotor, setSelectedMotor] = useState(null);

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    };

    // Mengambil URL Admin dari file .env
    const adminUrl = import.meta.env.VITE_ADMIN_SYSTEM_URL || '';

    const waNumber = "6281234567890";
    const waMessage = encodeURIComponent("Halo Bali Ride, saya ingin menyewa motor untuk liburan di Bali!");
    const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Head title="BALI RIDE – Explore Bali on Two Wheels" />

            {/* Import Font & Keyframes (Karena keyframes butuh config tailwind jika ingin dipindah) */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                * { font-family: 'Inter', sans-serif; }
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between px-10 h-[65px] w-[92%] max-w-[1200px] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/20">
                <div className="text-[1.05rem] font-black tracking-[0.04em] text-[#0d7a7a] uppercase">
                    Bali Ride
                </div>
                <div className="flex gap-8 items-center">
                    <a href="#about" className="text-[0.9rem] font-medium text-[#444] hover:text-[#0d7a7a] pb-[2px] border-b-2 border-transparent hover:border-[#0d7a7a] transition-colors duration-200">
                        About Us
                    </a>
                    <a href="#bikes" className="text-[0.9rem] font-medium text-[#444] hover:text-[#0d7a7a] pb-[2px] border-b-2 border-transparent hover:border-[#0d7a7a] transition-colors duration-200">
                        Bikes
                    </a>
                    <a href="#how" className="text-[0.9rem] font-medium text-[#0d7a7a] pb-[2px] border-b-2 border-[#0d7a7a] transition-colors duration-200">
                        How it Works
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
                        className="inline-flex items-center gap-2 bg-[#0d7a7a] hover:bg-[#0a6363] hover:-translate-y-[2px] text-white font-bold text-[0.95rem] py-[0.75rem] px-[1.6rem] rounded-full w-fit transition-all duration-150 shadow-[0_4px_18px_rgba(13,122,122,0.35)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                            <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
                            <path d="M15 6a1 1 0 0 0-1-1h-2L9 17" />
                            <path d="M15 6l3 7.5" />
                            <path d="M5.5 14l1.5-4h6" />
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
                        <div className="flex items-center border-[1.5px] border-[#ddd] focus-within:border-[#0d7a7a] rounded-lg px-3 h-[44px] bg-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#aaa] shrink-0 mr-2 w-4 h-4">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <input id="pickup_date" type="date" className="border-none outline-none focus:ring-0 flex-1 text-[0.9rem] text-[#555] bg-transparent cursor-pointer p-0" />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-[0.35rem]">
                        <label htmlFor="return_date" className="text-[0.78rem] font-semibold text-[#888] tracking-[0.01em]">Return Date</label>
                        <div className="flex items-center border-[1.5px] border-[#ddd] focus-within:border-[#0d7a7a] rounded-lg px-3 h-[44px] bg-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#aaa] shrink-0 mr-2 w-4 h-4">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <input id="return_date" type="date" className="border-none outline-none focus:ring-0 flex-1 text-[0.9rem] text-[#555] bg-transparent cursor-pointer p-0" />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => document.getElementById('bikes').scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 bg-[#0d7a7a] hover:bg-[#0a6363] hover:-translate-y-[1px] text-white font-bold text-[0.95rem] px-[1.6rem] h-[44px] rounded-lg cursor-pointer transition-all duration-150 whitespace-nowrap shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        Search
                    </button>
                </div>
            </div>


            {/* ── OUR STORY SECTION ── */}
            <section id="about" className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-[1.8rem] font-extrabold text-[#111] mb-[0.4rem]">About Us</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Kiri: Grid Gambar Ala Masonry */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 items-start">
                            <div className="flex flex-col gap-4 sm:gap-6">
                                <div className="bg-white rounded-3xl shadow-sm overflow-hidden aspect-[3/4] relative border border-white/50">
                                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop" alt="Bali Scenery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="bg-white rounded-3xl shadow-sm overflow-hidden aspect-square relative border border-white/50">
                                    <img src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=600&auto=format&fit=crop" alt="Tropical Road" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 sm:gap-6 mt-12 sm:mt-16">
                                <div className="bg-white rounded-3xl shadow-sm overflow-hidden aspect-square relative border border-white/50">
                                    <img src="https://images.unsplash.com/photo-1571869422204-762299849ce3?q=80&w=600&auto=format&fit=crop" alt="Riding in Bali" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="bg-white rounded-3xl shadow-sm overflow-hidden aspect-[3/4] relative border border-white/50">
                                    <img src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=600&auto=format&fit=crop" alt="Coastline View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Teks Konten */}
                        <div className="space-y-6 lg:pl-8">
                            <h4 className="text-[#138282] font-bold tracking-[0.2em] text-xs uppercase">Our Story</h4>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Born from a Passion for Discovery</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                                <p>Bali Ride began in 2020 with a simple observation: the best way to see Bali is with the wind in your face and the freedom to turn down any hidden path.</p>
                                <p>We started with just five scooters and a commitment to providing the kind of service we'd want for our own families. Today, we've grown into the island's most trusted premium rental platform, but our core philosophy remains the same: your journey is our priority.</p>
                            </div>
                            <div className="flex gap-12 pt-6">
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-black text-[#138282]">4+</h3>
                                    <p className="text-xs md:text-sm font-bold text-gray-700 mt-2">Years of Service</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-black text-[#138282]">10k+</h3>
                                    <p className="text-xs md:text-sm font-bold text-gray-700 mt-2">Happy Riders</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── MISSION SECTION ── */}
            <section className="relative bg-gradient-to-br from-[#f8fcfc] via-[#f0fafa] to-[#e2f2f2] py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Kiri: Teks Konten */}
                        <div className="space-y-8 order-2 lg:order-1 lg:pr-8">
                            <div className="space-y-3">
                                <h4 className="text-[#138282] font-bold tracking-[0.2em] text-xs uppercase">Our Mission</h4>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Redefining Island Mobility</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                Our mission is to eliminate the stress of local transportation. We believe that every traveler deserves a reliable, safe, and professional experience when navigating Bali's unique landscapes.
                            </p>
                            <div className="space-y-8 pt-4">
                                <div className="flex gap-5">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#eaf5f5] rounded-xl flex items-center justify-center text-[#138282]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Unmatched Reliability</h4>
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">Every bike in our fleet undergoes a rigorous 50-point inspection before every rental.</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#eaf5f5] rounded-xl flex items-center justify-center text-[#138282]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Safety First</h4>
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">We provide premium helmets and 24/7 roadside assistance for peace of mind.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Gambar Nmax */}
                        <div className="relative order-1 lg:order-2">
                            <img src="https://images.unsplash.com/photo-1599818815197-f584f74d0e65?q=80&w=800&auto=format&fit=crop" alt="Scooter at Bali Temple" className="w-full rounded-[2.5rem] shadow-2xl object-cover aspect-[4/5]" />
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-sm bg-white/90 backdrop-blur-md rounded-2xl py-4 px-6 shadow-xl flex items-center justify-center gap-3">
                                <div className="flex text-[#138282] text-lg">★★★★★</div>
                                <span className="text-sm font-bold text-gray-800">5.0 Customer Rating</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ── BIKES SECTION ── */}
            <section id="bikes" className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
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
                </div>
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

            {/* CTA SECTION (Dark Gradient Box) */}
            <section id="how" className="bg-[#f8fcfc] py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Box Gelap dengan Gradient */}
                    <div className="bg-gradient-to-br from-[#2a3035] via-[#262c30] to-[#1d2326] rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">

                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10">
                            Ready for your Bali escape?
                        </h2>

                        <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-base md:text-lg relative z-10">
                            Book your motorcycle today and experience the island on your own terms. <br className="hidden md:block" />
                            Free delivery to Your Place.
                        </p>

                        {/* Tombol WhatsApp */}
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-[#138282] text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-[#0f6b6b] transition-colors shadow-lg hover:shadow-xl relative z-10"
                        >
                            {/* Ikon WhatsApp SVG */}
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            Call Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#eaeeee] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Kolom 1: Brand & Deskripsi (Lebih lebar) */}
                    <div className="md:col-span-2">
                        <h3 className="text-[#138282] font-extrabold text-xl mb-4 tracking-widest uppercase">
                            Bali Ride
                        </h3>
                        <p className="text-gray-600 leading-relaxed max-w-sm text-sm">
                            The island's most reliable premium motorcycle rental platform. Delivering freedom to your doorstep since 2020.
                        </p>
                    </div>

                    {/* Kolom 2: Locations */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-5 text-sm">Locations</h4>
                        <ul className="space-y-3 text-sm font-medium text-gray-600">
                            <li><a href="#" className="hover:text-[#138282] transition-colors">Uluwatu</a></li>
                            <li><a href="#" className="hover:text-[#138282] transition-colors">Canggu</a></li>
                            <li><a href="#" className="hover:text-[#138282] transition-colors">Ubud</a></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Support & Copyright */}
                    <div className="flex flex-col h-full">
                        {/* Support Links */}
                        <div className="mb-10">
                            <h4 className="font-bold text-gray-900 mb-5 text-sm">Support</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-600">
                                <li><a href="#" className="hover:text-[#138282] transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-[#138282] transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>

                        {/* Copyright (Diposisikan di bawah Support dengan garis tipis) */}
                        <div className="pt-5 border-t border-gray-300 mt-auto">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                © 2024 Bali Ride Rentals.<br />All rights reserved.
                            </p>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}