import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardApplicantLayout from '@/Layouts/DashboardApplicantLayout';

export default function Status({ pelamar, flash }) {
    return (
        <DashboardApplicantLayout>
            <Head title="Status Seleksi" />
            
            <div className="max-w-3xl mx-auto space-y-4">
                
                {flash?.success && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                        <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-xs font-bold text-emerald-800">{flash.success}</p>
                    </div>
                )}

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                    {!pelamar ? (
                        <>
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <h2 className="text-xl font-black text-gray-800">Anda Belum Mendaftar</h2>
                            <p className="text-sm text-gray-500 mt-2">Selesaikan pendaftaran pada halaman Profil untuk melihat status.</p>
                            <Link href={route('applicant.profil')} className="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">Isi Formulir</Link>
                        </>
                    ) : (
                        <>
                            <svg className="w-16 h-16 text-indigo-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <h2 className="text-xl font-black text-gray-800">Dokumen Berhasil Diterima</h2>
                            <p className="text-sm text-gray-500 mt-2">Nama Pelamar: <span className="font-bold text-gray-800">{pelamar.nama_lengkap}</span></p>
                            
                            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg mx-auto">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-[10px] font-black uppercase text-gray-400">Proses AI (NLP & Gemini)</p>
                                    <p className={`mt-1 text-sm font-bold ${pelamar.status_proses === 'menunggu' ? 'text-orange-500' : 'text-emerald-500'}`}>
                                        {pelamar.status_proses === 'menunggu' ? 'Sedang Diproses' : 'Selesai Diekstrak'}
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-[10px] font-black uppercase text-gray-400">Hasil Akhir (SAW)</p>
                                    <p className={`mt-1 text-sm font-bold ${pelamar.status_akhir ? (pelamar.status_akhir === 'Lulus' ? 'text-emerald-500' : 'text-red-500') : 'text-gray-500'}`}>
                                        {pelamar.status_akhir ? pelamar.status_akhir : 'Menunggu Pengumuman'}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DashboardApplicantLayout>
    );
}