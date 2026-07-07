import React from 'react';
import { Head, Link } from '@inertiajs/react';
import TopNavApplicantLayout from '@/Layouts/TopNavApplicantLayout';

export default function DashboardApplicant({ hasApplied }) {
    return (
        <TopNavApplicantLayout>
            <Head title="Dashboard Pelamar" />
            
            <div className="max-w-5xl mx-auto space-y-8 pb-5">
                
                {/* HERO BANNER SECTION (Tetap sama, tidak terpengaruh dark mode) */}
                <div className="bg-gradient-to-br from-[#0093DD] to-[#046A9E] rounded-3xl p-8 md:py-12 md:px-10 text-white relative overflow-hidden shadow-lg">
                    
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#00A95C] rounded-full opacity-40 blur-[80px] mix-blend-screen pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#F97316] rounded-full opacity-30 blur-[80px] mix-blend-screen pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-3xl">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm inline-flex items-center gap-1.5 ${hasApplied ? 'bg-[#00A95C] border-white/30' : 'bg-[#F97316] border-white/30'}`}>
                            {hasApplied && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
                            {hasApplied ? 'Status: Menunggu Proses Seleksi' : 'Status: Belum Melamar'}
                        </span>
                        
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-6 leading-tight">
                            Otomatisasi Penilaian <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-white">Kandidat Magang Terbaik</span>
                        </h1>
                        
                        <p className="text-sm md:text-base text-blue-50 mt-4 leading-relaxed font-medium max-w-2xl">
                            InternAI menggunakan teknologi <span className="font-bold text-white">Natural Language Processing (NLP)</span> dan <span className="font-bold text-white">Large Language Model (LLM)</span> untuk menganalisis CV serta Proposal Anda secara cerdas, objektif, dan instan.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            {!hasApplied ? (
                                <Link 
                                    href={route('applicant.profile')}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F97316] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md hover:bg-[#EA580C] hover:-translate-y-0.5 transition-all"
                                >
                                    Lengkapi Profil & Daftar
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Link>
                            ) : (
                                <Link 
                                    href={route('applicant.status')}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00A95C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md hover:bg-[#008F4E] hover:-translate-y-0.5 transition-all"
                                >
                                    Cek Status Seleksi
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* ALUR PROSES SELEKSI SECTION */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-200">
                    <div className="text-center mb-10">
                        {/* Diperbaiki: dark:text-white dan dark:text-gray-400 */}
                        <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Alur Proses Seleksi</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Proses pendaftaran hingga pengumuman hasil seleksi.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Diperbaiki: dark:bg-gray-700 */}
                        <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gray-100 dark:bg-gray-700 -z-10 -translate-y-8"></div>

                        {/* Diperbaiki: dark:bg-gray-700/50, dark:border-gray-600, dark:text-white, dark:text-gray-400 */}
                        <div className="bg-white dark:bg-gray-700/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-600 shadow-sm text-center relative hover:-translate-y-2 transition-transform">
                            {/* Diperbaiki: dark:bg-blue-900/30, dark:border-blue-800 */}
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-[#0093DD] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100 dark:border-blue-800 shadow-inner">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-base font-black text-gray-800 dark:text-white">1. Pendaftaran</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">Melengkapi form profil pendaftaran dan mengunggah dokumen magang yang dibutuhkan.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-700/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-600 shadow-sm text-center relative hover:-translate-y-2 transition-transform">
                            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/30 text-[#F97316] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-orange-100 dark:border-orange-800 shadow-inner">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-base font-black text-gray-800 dark:text-white">2. Analisis Dokumen</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">Sistem akan menganalisis dokumen yang telah diunggah serta mengevaluasi kelayakan pelamar.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-700/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-600 shadow-sm text-center relative hover:-translate-y-2 transition-transform">
                            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-[#00A95C] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 dark:border-emerald-800 shadow-inner">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-base font-black text-gray-800 dark:text-white">3. Hasil Akhir</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">Pelamar akan menerima notifikasi mengenai hasil akhir berdasarkan analisis dokumen dan penilaian kriteria.</p>
                        </div>
                    </div>
                </div>

                {/* SEKSI BARU: KRITERIA PENILAIAN */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-200">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            {/* Diperbaiki: dark:text-white dan dark:text-gray-400 */}
                            <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Kriteria Penilaian Sistem</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Sistem SPK akan mengevaluasi profil Anda berdasarkan 5 metrik utama berikut:</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Diperbaiki: dark:bg-gray-700/30, dark:border-gray-600, dark:hover:border-blue-500 */}
                        <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500 transition-colors">
                            {/* Diperbaiki: dark:bg-gray-700, dark:border-gray-500, dark:text-white */}
                            <div className="w-10 h-10 bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white rounded-xl flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-500">
                                <span className="font-black text-base">C1</span>
                            </div>
                            {/* Diperbaiki: dark:text-white, dark:text-gray-400 */}
                            <h4 className="text-sm font-bold text-gray-800 dark:text-white">Indeks Prestasi (IPK)</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">Nilai IPK terakhir Anda yang tertera dan diekstrak secara otomatis dari dokumen CV.</p>
                        </div>
                        
                        <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500 transition-colors">
                            <div className="w-10 h-10 bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white rounded-xl flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-500">
                                <span className="font-black text-base">C2</span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-800 dark:text-white">Semester Tempuh</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">Prioritas diberikan kepada mahasiswa yang berada pada semester ideal untuk magang.</p>
                        </div>

                        <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500 transition-colors">
                            <div className="w-10 h-10 bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white rounded-xl flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-500">
                                <span className="font-black text-base">C3</span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-800 dark:text-white">Relevansi Jurusan</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">Kecocokan program studi asal dengan bidang penempatan magang yang dituju.</p>
                        </div>

                        <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500 transition-colors">
                            <div className="w-10 h-10 bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white rounded-xl flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-500">
                                <span className="font-black text-base">C4</span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-800 dark:text-white">Hard dan Soft Skill</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">Penilaian terhadap kemampuan teknis (hard skills) dan keterampilan interpersonal (soft skills) yang terdapat dalam CV.</p>
                        </div>

                        <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500 transition-colors lg:col-span-2">
                            <div className="w-10 h-10 bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white rounded-xl flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-500">
                                <span className="font-black text-base">C5</span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-800 dark:text-white">Kualitas Proposal</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-2xl">Penilaian komprehensif terhadap dokumen proposal penelitian yang diunggah. Berintegrasi Model AI yang akan membaca dan mengevaluasi kedalaman materi, metodologi, dan urgensi topik yang diajukan.</p>
                        </div>
                    </div>
                </div>

            </div>
        </TopNavApplicantLayout>
    );
}