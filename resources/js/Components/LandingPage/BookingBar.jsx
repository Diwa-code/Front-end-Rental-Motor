// File: resources/js/Components/LandingPage/BookingBar.jsx

import React from 'react';

export function BookingBar() {
    return (
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
    );
}