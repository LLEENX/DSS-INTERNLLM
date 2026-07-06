import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head } from '@inertiajs/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function DashboardAdmin({ statistik, topRankings, riwayatPendaftar }) {
    const namaBulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date());
    const tahun = new Date().getFullYear();

    const dataChart = riwayatPendaftar && riwayatPendaftar.length > 0 ? riwayatPendaftar : [
        { bulan: 'Jan', jumlah: 0 },
        { bulan: 'Feb', jumlah: 0 },
        { bulan: 'Mar', jumlah: 0 },
        { bulan: 'Apr', jumlah: 2 },
        { bulan: 'Mei', jumlah: statistik.totalMasuk },
        { bulan: 'Jun', jumlah: statistik.totalMasuk }, 
    ];

    return (
        <DashboardAdminLayout>
            <Head title="Dashboard Admin" />
            
            <div className="max-w-7xl mx-auto space-y-6 h-full flex flex-col">
                
                {/* HEADER TITLE */}
                <div className="shrink-0">
                    <h3 className="text-xl font-extrabold text-gray-800 tracking-tight leading-tight">Dashboard Admin</h3>
                    <p className="text-[14px] font-medium text-gray-500">
                        Overview Seleksi Pelamar — <span className="text-indigo-600">{namaBulan} {tahun}</span>
                    </p>
                </div>
                
                {/* Card Statistik */}
                <div className="shrink-0 flex flex-col md:flex-row justify-between gap-4">
                    <div className="w-full bg-[#0093DD]/10 rounded-xl p-3 border border-[#0093DD]/20 flex flex-col justify-between h-20">
                        <div className="flex items-center gap-1.5 text-[#0093DD]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <span className="text-[14px] font-extrabold uppercase tracking-wider">Total Masuk</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-xl font-black text-[#0093DD] leading-none">{statistik.totalMasuk}</h3>
                            <p className="text-[#0093DD]/70 text-[12px] font-bold leading-none">Dokumen</p>
                        </div>
                    </div>

                    <div className="w-full bg-[#00A95C]/10 rounded-xl p-3 border border-[#00A95C]/20 flex flex-col justify-between h-20">
                        <div className="flex items-center gap-1.5 text-[#00A95C]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-[14px] font-extrabold uppercase tracking-wider">Sudah Dinilai</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-xl font-black text-[#00A95C] leading-none">{statistik.sudahDinilai}</h3>
                            <p className="text-[#00A95C]/70 text-[12px] font-bold leading-none">Terkumpul</p>
                        </div>
                    </div>

                    <div className="w-full bg-[#F15A2C]/10 rounded-xl p-3 border border-[#F15A2C]/20 flex flex-col justify-between h-20">
                        <div className="flex items-center gap-1.5 text-[#F15A2C]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="text-[14px] font-extrabold uppercase tracking-wider">Kuota Lulus</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-xl font-black text-[#F15A2C] leading-none">{statistik.kuotaLulus}</h3>
                            <p className="text-[#F15A2C]/70 text-[12px] font-bold leading-none">Sisa Kuota</p>
                        </div>
                    </div>
                </div>

                {/* LAYOUT GRAFIK & TABEL */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2 min-h-0">
                    
                    {/* GRAFIK */}
                    <div className="lg:col-span-6 bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex flex-col h-full">
                        <div className="mb-2 shrink-0 pb-2">
                            <h4 className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Riwayat Pendaftar</h4>
                        </div>
                        
                        <div className="flex-1 min-h-0 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dataChart} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorJumlah" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0093DD" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#0093DD" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip contentStyle={{ fontSize: '12px', padding: '4px 8px' }} />
                                    <Area type="monotone" dataKey="jumlah" stroke="#0093DD" strokeWidth={2} fillOpacity={1} fill="url(#colorJumlah)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* KANAN: TABEL PERINGKAT */}
                    <div className="lg:col-span-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
                        <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0 pb-2">
                            <h4 className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Top Peringkat Sementara</h4>
                            <span className="bg-blue-50 text-blue-600 text-[9px] px-2 py-0.5 rounded font-bold border border-blue-100">SAW METHOD</span>
                        </div>
                        
                        <div className="overflow-y-auto flex-1 p-0 m-1">
                            <table className="w-full text-left my-1">
                                <thead className="bg-white text-gray-400 text-[12px] font-black uppercase tracking-widest sticky top-0 z-10 shadow-sm">
                                    <tr>
                                        <th className="px-3 py-2 w-10 text-center">No</th>
                                        <th className="px-3 py-2">Nama Lengkap</th>
                                        <th className="px-3 py-2 text-center">Nilai Akhir</th>
                                        <th className="px-3 py-2 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {topRankings.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-3 py-8 text-center text-gray-400 font-medium italic text-[12px]">
                                                Belum ada pelamar yang terdaftar.
                                            </td>
                                        </tr>
                                    ) : (
                                        topRankings.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50/50">
                                                <td className="px-3 py-1.5 text-center font-bold text-gray-400 text-[12px]">{index + 1}</td>
                                                <td className="px-3 py-1.5">
                                                    <div className="font-bold text-gray-800 line-clamp-1 text-[12px]">{item.nama}</div>
                                                    <div className="text-gray-500 text-[10px] font-medium line-clamp-1">{item.instansi}</div>
                                                </td>
                                                
                                                {item.nilai_preferensi_v === null || item.nilai_preferensi_v === undefined ? (
                                                    <td colSpan="2" className="px-3 py-1.5">
                                                        <div className="bg-gray-50 text-gray-400 text-[10px] font-bold px-2 py-1 rounded border border-dashed border-gray-200 text-center uppercase tracking-tighter">
                                                            Belum diranking
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <>
                                                        <td className="px-3 py-1.5 text-center font-black text-indigo-600 text-[12px]">
                                                            {Math.round(parseFloat(item.nilai_preferensi_v) * 100)}
                                                        </td>
                                                        <td className="px-3 py-1.5 text-center">
                                                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[12px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
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
            </div>
        </DashboardAdminLayout>
    );
}