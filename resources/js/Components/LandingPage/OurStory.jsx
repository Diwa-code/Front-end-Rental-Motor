import React from 'react';

export function OurStory() {
    return (
        <section id="about" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-[1.8rem] font-extrabold text-[#111] mb-[0.4rem]">About Us</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Kiri: Grid Gambar Ala Masonry */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 items-start">
                        <div className="flex flex-col gap-4 sm:gap-6">
                            <div className="bg-white rounded-3xl shadow-sm overflow-hidden aspect-[3/4] relative border border-white/50">
                                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crophttps://lh3.googleusercontent.com/aida-public/AB6AXuDc9_pMnJVb5pok4P0rlcRRDMPof1jmhL-QkUJRn6bcuUc9sj6RIJ_GiDCEhx802rNEozKNf1K1Njl8ZDaDmtLz30G25IywgZ9nEc1OI5I1aJRAa9rtFTn_myVmDMDmWF_p9BMyE7cj3qJgzSQLp9EB3DLxGaHTj_oj4uqbOp9VO6PwCpLUkFZagERpxoj6-CUarBksiWVHNBaUWxc966YUPz_b0U1i4IXgbYmOoaxza-GSFoucB9GcLw" alt="Bali Scenery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="bg-white rounded-3xl shadow-sm overflow-hidden aspect-square relative border border-white/50">
                                <img src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=600&auto=format&fit=crop" alt="Tropical Road" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 sm:gap-6 mt-12 sm:mt-16">
                            <div className="bg-white rounded-3xl shadow-sm overflow-hidden aspect-square relative border border-white/50">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc9_pMnJVb5pok4P0rlcRRDMPof1jmhL-QkUJRn6bcuUc9sj6RIJ_GiDCEhx802rNEozKNf1K1Njl8ZDaDmtLz30G25IywgZ9nEc1OI5I1aJRAa9rtFTn_myVmDMDmWF_p9BMyE7cj3qJgzSQLp9EB3DLxGaHTj_oj4uqbOp9VO6PwCpLUkFZagERpxoj6-CUarBksiWVHNBaUWxc966YUPz_b0U1i4IXgbYmOoaxza-GSFoucB9GcLw" alt="Riding in Bali" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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
    );
}