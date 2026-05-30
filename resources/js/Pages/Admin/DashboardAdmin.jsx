import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head } from '@inertiajs/react';

export default function DashboardAdmin({ statistik, topRankings }) {
    const namaBulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date());
    const tahun = new Date().getFullYear();

    return (
        <DashboardAdminLayout>
            <Head title="Dashboard Admin" />
            <div className="max-w-7xl mx-auto mt-2 mb-6 space-y-6">
                
                {/* HEADER TITLE */}
                <div className="mb-5">
                    <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Dashboard Admin</h2>
                    <p className="text-sm font-medium text-gray-500">
                        Overview Seleksi Pelamar — <span className="text-indigo-600">{namaBulan} {tahun}</span>
                    </p>
                </div>
                
                {/* Card Statistik  */}
                <div className="flex flex-col md:flex-row justify-evenly gap-6">
            
                    <div className="w-full md:w-[270px] bg-[#0093DD]/55 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-blue-500/10 flex flex-col justify-between h-24 border border-white/20">
                        <div className="flex items-center gap-2 text-white/80">
                            <svg className="w-5 h-5" fill="none" stroke="#1f2a59" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm text-[#1f2a59]/90 font-extrabold uppercase tracking-wider">Total Masuk</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-[#1f2a59]/90 leading-none">{statistik.totalMasuk}</h3>
                            <p className="text-[#1f2a59]/80 text-xs font-bold leading-none">Dokumen Terintegrasi</p>
                        </div>
                    </div>

                    <div className="w-full md:w-[270px] bg-[#00A95C]/55 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-green-500/10 flex flex-col justify-between h-24 border border-white/20">
                        <div className="flex items-center gap-2 text-white/80">
                            <svg className="w-5 h-5" fill="none" stroke="#1f2a59" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-[#1f2a59]/90 font-extrabold uppercase tracking-wider">Sudah Dinilai</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-[#1f2a59]/90 leading-none">{statistik.sudahDinilai}</h3>
                            <p className="text-[#1f2a59]/80 text-xs font-bold leading-none">Data Terkumpul</p>
                        </div>
                    </div>

                    <div className="w-full md:w-[270px] bg-[#F15A2C]/55 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-orange-500/10 flex flex-col justify-between h-24 border border-white/20">
                        <div className="flex items-center gap-2 text-white/80">
                            <svg className="w-5 h-5" fill="none" stroke="#1f2a59" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-sm text-[#1f2a59]/90 font-extrabold uppercase tracking-wider">Kuota Lulus</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-[#1f2a59]/90 leading-none">{statistik.kuotaLulus}</h3>
                            <p className="text-[#1f2a59]/80 text-xs font-bold leading-none">Sisa Kuota</p>
                        </div>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-tight">Top Peringkat Sementara</h4>
                        <div className="flex items-center gap-2">
                             <span className="bg-blue-50 text-blue-600 text-[10px] px-3 py-1 rounded-full font-bold border border-blue-100">SAW METHOD</span>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 w-16 text-center">No</th>
                                    <th className="px-6 py-4">Nama Lengkap</th>
                                    <th className="px-6 py-4">Instansi</th>
                                    <th className="px-6 py-4 text-center">Nilai Akhir</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 bg-white">
                                {topRankings.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                                            Belum ada pelamar yang terdaftar di sistem.
                                        </td>
                                    </tr>
                                ) : (
                                    topRankings.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-center font-bold text-gray-400 group-hover:text-gray-600 transition-colors">{index + 1}</td>
                                            <td className="px-6 py-4 font-bold text-gray-800">{item.nama}</td>
                                            <td className="px-6 py-4 text-gray-500 text-xs font-medium">{item.instansi}</td>
                                            
                                            {item.nilai_preferensi_v === null || item.nilai_preferensi_v === undefined ? (
                                                <td colSpan="2" className="px-6 py-4">
                                                    <div className="bg-gray-50 text-gray-400 text-[10px] font-bold px-4 py-2 rounded-lg border border-dashed border-gray-200 w-full text-center uppercase tracking-tighter">
                                                        Belum melakukan perangkingan
                                                    </div>
                                                </td>
                                            ) : (
                                                <>
                                                    <td className="px-6 py-4 text-center font-black text-indigo-600">
                                                        {item.nilai_preferensi_v}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-tighter">
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}