import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    // State untuk mengontrol munculnya notifikasi sukses
    const [showToast, setShowToast] = useState(false);
    
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(
                (t) => (
                    <div className="flex items-center justify-between gap-4 w-full">
                        <span>{flash.success}</span>
                        <button 
                            onClick={() => toast.dismiss(t.id)} 
                            className="p-1 text-white hover:text-gray-200 transition-colors focus:outline-none"
                            title="Tutup Notifikasi"
                        >
                            {/* Icon Silang (X) menggunakan SVG Tailwind */}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ),
                {
                    duration: 4000,
                    position: 'top-right',
                    style: { background: '#10B981', color: '#fff' },
                }
            );
        }

        if (flash?.error) {
            toast.error(
                (t) => (
                    <div className="flex items-center justify-between gap-4 w-full">
                        <span>{flash.error}</span>
                        <button 
                            onClick={() => toast.dismiss(t.id)} 
                            className="p-1 text-white hover:text-gray-200 transition-colors focus:outline-none"
                            title="Tutup Notifikasi"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ),
                {
                    duration: 4000,
                    position: 'top-right',
                    style: { background: '#EF4444', color: '#fff' }, 
                }
            );
        }
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();

        setShowToast(true);

        setTimeout(() => {
            post(route('register'), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        }, 2000); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0F172A] p-4 font-sans transition-colors duration-200">
            <Head title="Registrasi - SmartIntern" />

            {/* KOMPONEN TOAST NOTIFICATION (Kanan Atas) */}
            {showToast && (
                <div className="fixed top-5 right-5 z-50 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-[#1E293B] dark:text-green-400 dark:border-green-800 shadow-xl animate-fade-in-down">
                    <svg className="flex-shrink-0 inline w-5 h-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <div>
                        <span className="font-bold">Berhasil!</span> Akun pelamar berhasil dibuat.
                    </div>
                    <button onClick={() => setShowToast(false)} className="ml-4 text-green-800 dark:text-green-400 hover:text-green-900 focus:outline-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
            )}

            <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 relative">
                <div className="p-6">
                    <div className="text-center mb-5">
                        <h2 className="text-xl font-black text-gray-800 dark:text-white tracking-tight">Buat Akun</h2>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 uppercase tracking-widest">Portal Pelamar Magang</p>
                    </div>

                    {/* Jika ada error umum (seperti server mati), tampilkan di sini */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
                            Mohon periksa kembali isian form Anda.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-3">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)} /* <-- DIPERBAIKI */
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0093DD] focus:border-transparent outline-none transition-all dark:text-white"
                                placeholder="Contoh: Budi Santoso"
                                required
                            />
                            {/* Menampilkan pesan error khusus dari backend untuk kolom username */}
                            {errors.username && <span className="text-[10px] text-red-500 mt-1 block">{errors.username}</span>}
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0093DD] focus:border-transparent outline-none transition-all dark:text-white"
                                placeholder="email@universitas.ac.id"
                                required
                            />
                            {/* Menampilkan pesan error khusus dari backend untuk kolom email */}
                            {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-3 pr-10 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0093DD] focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder="Minimal 8 karakter"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                            {/* Menampilkan pesan error khusus dari backend untuk kolom password */}
                            {errors.password && <span className="text-[10px] text-red-500 mt-1 block">{errors.password}</span>}
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full pl-3 pr-10 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0093DD] focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder="Ulangi password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showConfirm ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2.5 px-4 bg-[#0093DD] hover:bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-lg transition-all shadow-sm disabled:opacity-50 mt-4"
                        >
                            {processing ? 'Memproses...' : 'Daftar Akun'}
                        </button>
                    </form>

                    <div className="mt-5 text-center text-[11px] text-gray-500 dark:text-gray-400">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="text-[#0093DD] font-bold hover:underline">
                            Masuk di sini
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}