// File: resources/js/Components/LandingPage/BikesSection.jsx

import React, { useState } from 'react'; 
// TAMBAHKAN IMPORT INI AGAR TOMBOL LINK BERFUNGSI
import { Link } from '@inertiajs/react'; 

export function OurFleet({ motors }) {
    const [selectedMotor, setSelectedMotor] = useState(null);
    const adminUrl = import.meta.env.VITE_ADMIN_SYSTEM_URL || '';

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    };

    return (
        /* TAMBAHKAN TAG PEMBUKA FRAGMENT DI SINI */
        <> 
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
        </> 
        /* TAMBAHKAN TAG PENUTUP FRAGMENT DI SINI */
    );
}