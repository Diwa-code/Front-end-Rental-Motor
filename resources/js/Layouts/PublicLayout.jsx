import React from 'react';
import { Link } from '@inertiajs/react';

export default function PublicLayout({ auth, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">

            {/* =======================================
                1. NAVBAR GLOBAL (Mengikuti Scroll)
            ======================================= */}
            {/* PERUBAHAN: Kata 'absolute' diganti menjadi 'fixed' */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between px-10 h-[65px] w-[92%] max-w-[1200px] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/20">
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

            {/* =======================================
                2. KONTEN DINAMIS
            ======================================= */}
            {/* PERUBAHAN: Menambahkan pt-[110px] untuk memberi jarak aman dari Navbar */}
            <main className="flex-grow pt-[110px]">
                {children}
            </main>

            {/* =======================================
                3. FOOTER GLOBAL
            ======================================= */}
            <footer className="bg-[#eaeeee] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <h3 className="text-[#138282] font-extrabold text-xl mb-4 tracking-widest uppercase">
                            Bali Ride
                        </h3>
                        <p className="text-gray-600 leading-relaxed max-w-sm text-sm">
                            The island's most reliable premium motorcycle rental platform. Delivering freedom to your doorstep since 2020.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-5 text-sm">Locations</h4>
                        <ul className="space-y-3 text-sm font-medium text-gray-600">
                            <li><a href="#" className="hover:text-[#138282] transition-colors">Uluwatu</a></li>
                            <li><a href="#" className="hover:text-[#138282] transition-colors">Canggu</a></li>
                            <li><a href="#" className="hover:text-[#138282] transition-colors">Ubud</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col h-full">
                        <div className="mb-10">
                            <h4 className="font-bold text-gray-900 mb-5 text-sm">Support</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-600">
                                <li><a href="#" className="hover:text-[#138282] transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-[#138282] transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
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