import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8fcfc]">
            
            {/* BAGIAN LOGO YANG SUDAH DIUBAH */}
            <div>
                <Link href="/" className="text-[2rem] font-black tracking-[0.04em] text-[#0d7a7a] uppercase hover:text-[#0a6363] transition-colors">
                    Bali Ride
                </Link>
            </div>

            {/* KOTAK PUTIH TEMPAT FORM BERADA */}
            <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden sm:rounded-2xl border border-gray-100">
                {children}
            </div>

        </div>
    );
}