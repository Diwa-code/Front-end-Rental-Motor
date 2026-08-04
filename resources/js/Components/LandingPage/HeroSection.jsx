// File: resources/js/Components/LandingPage/HeroSection.jsx

import React from 'react';

export function HeroSection() {
    return (
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
    );
}