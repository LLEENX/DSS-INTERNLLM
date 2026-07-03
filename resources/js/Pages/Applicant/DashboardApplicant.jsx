import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardApplicantLayout from '@/Layouts/DashboardApplicantLayout';

export default function DashboardApplicant({ hasApplied }) {
    return (
        <DashboardApplicantLayout>
            <Head title="Dashboard Pelamar" />
            
            <div className="max-w-4xl mx-auto mt-4">
                <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full opacity-50 blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
                            {hasApplied ? 'Status: Proses Seleksi' : 'Status: Belum Melamar'}
                        </span>
                        
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-6 leading-tight">
                            Selamat Datang di Portal <br /> Seleksi Magang SPK SAW
                        </h1>
                        
                        <p className="text-sm text-indigo-100 mt-4 leading-relaxed font-medium max-w-xl">
                            Sistem ini menggunakan kecerdasan buatan (AI) untuk menganalisis dokumen CV dan Proposal Anda secara objektif berdasarkan algoritma SAW.
                        </p>

                        <div className="mt-8">
                            {!hasApplied ? (
                                <Link 
                                    href={route('applicant.profile')}
                                    className="inline-block px-8 py-3 bg-white text-indigo-600 text-xs font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-gray-50 transition-all"
                                >
                                    Lengkapi Profil & Daftar
                                </Link>
                            ) : (
                                <Link 
                                    href={route('applicant.status')}
                                    className="inline-block px-8 py-3 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-emerald-600 transition-all"
                                >
                                    Cek Status Seleksi
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardApplicantLayout>
    );
}