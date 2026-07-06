import React from 'react';
import { Head, Link } from '@inertiajs/react';
import TopNavApplicantLayout from '@/Layouts/TopNavApplicantLayout';

export default function Status({ pelamar, flash }) {
    return (
        <TopNavApplicantLayout>
            <Head title="Status Seleksi" />
            
            <div className="flex flex-col items-center justify-center min-h-[75vh]">
                <div className="max-w-3xl w-full mx-auto space-y-4">
                    
                    {flash?.success && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <p className="text-xs font-bold text-emerald-800">{flash.success}</p>
                        </div>
                    )}

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                        {!pelamar ? (
                            <div className="py-8">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h2 className="text-xl font-black text-gray-800">Anda Belum Mendaftar</h2>
                                <p className="text-sm text-gray-500 mt-2">Selesaikan pendaftaran pada halaman Profil untuk melihat status.</p>
                                <Link href={route('applicant.profile')} className="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">Isi Formulir</Link>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-black text-gray-800">Dokumen Berhasil Diterima</h2>
                                <p className="text-sm text-gray-500 mt-2">Nama Pelamar: <span className="font-bold text-gray-800">{pelamar?.nama_lengkap}</span></p>
                                
                                <div className="mt-4 max-w-sm mx-auto">
                                    <div className={`p-6 rounded-2xl border ${
                                        !pelamar?.status_akhir ? 'bg-orange-50 border-orange-200' :
                                        pelamar?.status_akhir === 'Lulus' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
                                    }`}>
                                        <p className="text-[10px] font-black uppercase text-gray-500 mb-1 tracking-widest">
                                            Status Seleksi Saat Ini
                                        </p>
                                        
                                        <p className={`text-xl font-black ${
                                            !pelamar?.status_akhir ? 'text-orange-600' :
                                            pelamar?.status_akhir === 'Lulus' ? 'text-emerald-600' : 'text-red-600'
                                        }`}>
                                            {!pelamar?.status_akhir ? 'Sedang Diproses' : pelamar.status_akhir}
                                        </p>

                                        {/* Pesan Tambahan Dinamis */}
                                        {!pelamar?.status_akhir && (
                                            <p className="text-xs text-orange-600/80 mt-3 font-medium leading-relaxed">
                                                Berkas Anda sedang dalam antrean evaluasi panitia. Silakan periksa halaman ini secara berkala.
                                            </p>
                                        )}
                                        {pelamar?.status_akhir === 'Lulus' && (
                                            <p className="text-xs text-emerald-700 mt-3 font-medium leading-relaxed">
                                                Selamat! Anda dinyatakan lolos seleksi program magang. Informasi tahap selanjutnya akan dikirimkan via email.
                                            </p>
                                        )}
                                        {pelamar?.status_akhir === 'Tidak Lulus' && (
                                            <p className="text-xs text-red-700 mt-3 font-medium leading-relaxed">
                                                Mohon maaf, Anda belum lolos seleksi pada periode ini. Jangan menyerah dan terus tingkatkan kompetensi Anda!
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TopNavApplicantLayout>
    );
}