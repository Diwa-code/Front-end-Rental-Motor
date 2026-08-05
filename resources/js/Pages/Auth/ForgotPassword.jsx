import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-6 text-sm text-gray-600 leading-relaxed">
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one for your next ride.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-[#0d7a7a]">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full border-gray-300 focus:border-[#0d7a7a] focus:ring-[#0d7a7a] rounded-md shadow-sm"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-6">
                    {/* Mengubah PrimaryButton bawaan menjadi tombol kustom ala Bali Ride */}
                    <button 
                        className={`inline-flex items-center px-4 py-2 bg-[#0d7a7a] border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#0a6363] active:bg-[#095252] focus:outline-none focus:ring-2 focus:ring-[#0d7a7a] focus:ring-offset-2 transition ease-in-out duration-150 ${processing && 'opacity-25'}`} 
                        disabled={processing}
                    >
                        Email Password Reset Link
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}