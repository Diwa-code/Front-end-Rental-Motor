import React, { useState } from 'react'; 

import { Link } from '@inertiajs/react'; 

export function OurMission() {
    return (
        /* ── MISSION SECTION ── */
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
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5NBYTxtzg0MgWU6IOa2b5jJwZo7pKKw1Mtq6UGBpmDI4PcIp7cG-QGEBpW8qi1U2l7Yn-e1V-IJ3CkiMRDg1seZCZhGgOYO3TnfGHkk1m3UMQv321ky6fwvsFH-3sgHM17Dw7Quq90e8-iYXImJGcT-gyMWJdeVIBvx4xK2fxI8J-yRsWhxkaeGtG1kk_EULdTzrLS_-RX8y223hCjkadMki9d-qH-Na-FE1zXzL0igiiUxitWo1lpQ?q=80&w=800&auto=format&fit=crop" alt="Scooter at Bali Temple" className="w-full rounded-[2.5rem] shadow-2xl object-cover aspect-[4/5]" />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-sm bg-white/90 backdrop-blur-md rounded-2xl py-4 px-6 shadow-xl flex items-center justify-center gap-3">
                            <div className="flex text-[#138282] text-lg">★★★★★</div>
                            <span className="text-sm font-bold text-gray-800">5.0 Customer Rating</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}