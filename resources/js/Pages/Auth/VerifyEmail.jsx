import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-6 text-sm text-gray-600 leading-relaxed">
                Thanks for signing up for Bali Ride! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-[#0d7a7a]">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-6 flex items-center justify-between">
                    {/* Tombol Resend warna Bali Ride */}
                    <button 
                        className={`inline-flex items-center px-4 py-2 bg-[#0d7a7a] border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#0a6363] active:bg-[#095252] focus:outline-none focus:ring-2 focus:ring-[#0d7a7a] focus:ring-offset-2 transition ease-in-out duration-150 ${processing && 'opacity-25'}`} 
                        disabled={processing}
                    >
                        Resend Verification Email
                    </button>

                    {/* Tombol Log Out bawaan */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d7a7a]"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}