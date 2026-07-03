import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import DashboardApplicantLayout from '@/Layouts/DashboardApplicantLayout';

export default function Profil({ hasApplied, pelamarData }) {
    const user = usePage().props.auth.user;
    
    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: user.name || '',
        asal_universitas: '',
        ipk: '',
        semester: '',
        esai_motivasi: '',
        file_cv: null,
        file_proposal: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.submit'), { forceFormData: true });
    };

    if (hasApplied) {
        return (
            <DashboardApplicantLayout>
                <Head title="Profil & Pendaftaran" />
                <div className="max-w-3xl mx-auto mt-10 bg-white p-10 rounded-3xl shadow-sm text-center border border-gray-100">
                    <svg className="w-16 h-16 text-emerald-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h2 className="text-xl font-black text-gray-800">Anda Sudah Terdaftar</h2>
                    <p className="text-sm text-gray-500 mt-2">Data profil dan dokumen Anda sudah terekam di sistem. Silakan pantau halaman Status Seleksi secara berkala.</p>
                </div>
            </DashboardApplicantLayout>
        );
    }

    return (
        <DashboardApplicantLayout>
            <Head title="Profil & Pendaftaran" />
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-end bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h2 className="text-xl font-black text-gray-800 tracking-tight">Profil Pendaftaran</h2>
                        <p className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-widest">Lengkapi Data A, B, dan C untuk Melamar</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* BAGIAN A */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100"><h3 className="text-xs font-black text-gray-700 uppercase">A. Data Akademik</h3></div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1"><label className="text-[11px] font-bold text-gray-600 uppercase">Nama Lengkap</label><input type="text" value={data.nama_lengkap} onChange={e => setData('nama_lengkap', e.target.value)} className="w-full text-xs border-gray-200 rounded-lg focus:border-indigo-500" required /></div>
                            <div className="space-y-1"><label className="text-[11px] font-bold text-gray-600 uppercase">Universitas</label><input type="text" value={data.asal_universitas} onChange={e => setData('asal_universitas', e.target.value)} className="w-full text-xs border-gray-200 rounded-lg focus:border-indigo-500" required /></div>
                            <div className="space-y-1"><label className="text-[11px] font-bold text-gray-600 uppercase">IPK Terakhir</label><input type="number" step="0.01" value={data.ipk} onChange={e => setData('ipk', e.target.value)} className="w-full text-xs border-gray-200 rounded-lg focus:border-indigo-500" required /></div>
                            <div className="space-y-1"><label className="text-[11px] font-bold text-gray-600 uppercase">Semester</label><input type="number" value={data.semester} onChange={e => setData('semester', e.target.value)} className="w-full text-xs border-gray-200 rounded-lg focus:border-indigo-500" required /></div>
                        </div>
                    </div>

                    {/* BAGIAN B */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100"><h3 className="text-xs font-black text-gray-700 uppercase">B. Esai Motivasi</h3></div>
                        <div className="p-6">
                            <textarea rows="5" value={data.esai_motivasi} onChange={e => setData('esai_motivasi', e.target.value)} className="w-full text-xs border-gray-200 rounded-lg focus:border-indigo-500" required></textarea>
                        </div>
                    </div>

                    {/* BAGIAN C */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100"><h3 className="text-xs font-black text-gray-700 uppercase">C. Unggah Berkas</h3></div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2"><label className="text-[11px] font-bold text-gray-600 uppercase">CV (PDF Max 2MB)</label><input type="file" accept=".pdf" onChange={e => setData('file_cv', e.target.files[0])} className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-indigo-50 file:text-indigo-700" required /></div>
                            <div className="space-y-2"><label className="text-[11px] font-bold text-gray-600 uppercase">Proposal (PDF Max 5MB)</label><input type="file" accept=".pdf" onChange={e => setData('file_proposal', e.target.files[0])} className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-indigo-50 file:text-indigo-700" required /></div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 pb-10">
                        <button type="submit" disabled={processing} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Kirim Pendaftaran (Submit)'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardApplicantLayout>
    );
}