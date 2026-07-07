import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import TopNavApplicantLayout from '@/Layouts/TopNavApplicantLayout';

export default function Profil({ hasApplied }) {
    const user = usePage().props.auth.user;
    
    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: user.name || '',
        nim: '',
        asal_universitas: '',
        prodi: '',
        jenjang: 'S1',
        semester: '',
        file_cv: null,
        file_proposal: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('applicant.submit'), {
            forceFormData: true,
            onError: (errors) => {
                console.log("Validation Errors dari Laravel:", errors);
                alert("Gagal! Cek pesan merah di atas form atau buka Inspect Element.");
            }
        });
    };

    if (hasApplied) {
        return (
            <TopNavApplicantLayout>
                <Head title="Profil & Pendaftaran" />
                <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-[#1E293B] p-10 rounded-3xl shadow-sm text-center border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                    <svg className="w-16 h-16 text-emerald-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h2 className="text-xl font-black text-gray-800 dark:text-white">Anda Sudah Terdaftar</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Data profil dan dokumen Anda sudah terekam di sistem. Silakan pantau halaman Status Seleksi secara berkala.</p>
                </div>
            </TopNavApplicantLayout>
        );
    }

    return (
        <TopNavApplicantLayout>
            <Head title="Profil & Pendaftaran" />
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-end bg-white dark:bg-[#1E293B] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                    <div>
                        <h2 className="text-xl font-black text-gray-800 dark:text-white tracking-tight">Profil Pendaftaran</h2>
                        <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest">Lengkapi Data A dan B untuk Melamar</p>
                    </div>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800">
                        <p className="text-xs font-bold text-red-800 dark:text-red-400">Gagal mengirim formulir. Periksa kembali isian Anda:</p>
                        <ul className="list-disc list-inside text-[10px] text-red-600 dark:text-red-400 mt-1">
                            {Object.values(errors).map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {/* BAGIAN A: DATA AKADEMIK */}
                    <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
                        <div className="bg-gray-50/50 dark:bg-[#0F172A] px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase">A. Data Akademik</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase">Nama Lengkap</label>
                                <input type="text" value={data.nama_lengkap} onChange={e => setData('nama_lengkap', e.target.value)} className="w-full text-xs bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-600 dark:text-white rounded-lg focus:border-[#0093DD] dark:focus:border-[#0093DD] dark:focus:ring-[#0093DD]" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase">NIM</label>
                                <input type="text" value={data.nim} onChange={e => setData('nim', e.target.value)} className="w-full text-xs bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-600 dark:text-white rounded-lg focus:border-[#0093DD] dark:focus:border-[#0093DD] dark:focus:ring-[#0093DD]" required />
                                {errors.nim && <p className="text-[10px] text-red-500 dark:text-red-400">{errors.nim}</p>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase">Universitas</label>
                                <input type="text" value={data.asal_universitas} onChange={e => setData('asal_universitas', e.target.value)} className="w-full text-xs bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-600 dark:text-white rounded-lg focus:border-[#0093DD] dark:focus:border-[#0093DD] dark:focus:ring-[#0093DD]" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase">Program Studi</label>
                                <input type="text" value={data.prodi} onChange={e => setData('prodi', e.target.value)} className="w-full text-xs bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-600 dark:text-white rounded-lg focus:border-[#0093DD] dark:focus:border-[#0093DD] dark:focus:ring-[#0093DD]" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase">Jenjang</label>
                                <select value={data.jenjang} onChange={e => setData('jenjang', e.target.value)} className="w-full text-xs bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-600 dark:text-white rounded-lg focus:border-[#0093DD] dark:focus:border-[#0093DD] dark:focus:ring-[#0093DD]" required>
                                    <option value="D3">D3</option>
                                    <option value="D4">D4</option>
                                    <option value="S1">S1</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase">Semester</label>
                                <input type="number" value={data.semester} onChange={e => setData('semester', e.target.value)} className="w-full text-xs bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-600 dark:text-white rounded-lg focus:border-[#0093DD] dark:focus:border-[#0093DD] dark:focus:ring-[#0093DD]" required />
                            </div>
                        </div>
                    </div>

                    {/* BAGIAN B: UNGGAH BERKAS */}
                    <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
                        <div className="bg-gray-50/50 dark:bg-[#0F172A] px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase">B. Unggah Berkas</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase">CV</label>
                                <input type="file" accept=".pdf" onChange={e => setData('file_cv', e.target.files[0])} className="w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 dark:file:bg-[#0093DD]/20 file:text-[#0093DD] hover:file:bg-blue-100 dark:hover:file:bg-[#0093DD]/30 cursor-pointer" required />
                                {errors.file_cv && <p className="text-[10px] text-red-500 dark:text-red-400">{errors.file_cv}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase">Proposal</label>
                                <input type="file" accept=".pdf" onChange={e => setData('file_proposal', e.target.files[0])} className="w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 dark:file:bg-[#0093DD]/20 file:text-[#0093DD] hover:file:bg-blue-100 dark:hover:file:bg-[#0093DD]/30 cursor-pointer" required />
                                {errors.file_proposal && <p className="text-[10px] text-red-500 dark:text-red-400">{errors.file_proposal}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 pb-10">
                        <button type="submit" disabled={processing} className="px-8 py-3 bg-[#0093DD] hover:bg-[#046A9E] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </TopNavApplicantLayout>
    );
}