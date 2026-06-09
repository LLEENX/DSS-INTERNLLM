import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, router } from '@inertiajs/react';

export default function HasilSeleksi({ hasilSeleksi }) {

    console.log("Data hasilSeleksi:", hasilSeleksi);
    
    const prosesSeleksi = () => {
        if (confirm("Jalankan proses seleksi sekarang? Sistem akan menghitung ulang peringkat berdasarkan bobot kriteria terbaru.")) {
            router.post(route('admin.proses-seleksi-eksekusi'));
        }
    };

    return (
        <DashboardAdminLayout>
            <Head title="Proses & Hasil Seleksi" />
            
            <div className="max-w-7xl mx-auto h-full flex flex-col space-y-3">
                {/* HEADER */}
                <div className="shrink-0 mt-1">
                    <h2 className="text-xl font-extrabold text-gray-800 tracking-tight leading-none">Proses Seleksi & Hasil</h2>
                    <p className="text-[10px] font-medium text-gray-500 mt-0.5 uppercase tracking-widest">
                        Melaksanakan kalkulasi SAW untuk penentuan peringkat pelamar
                    </p>
                </div>

                {/* AREA TOMBOL SELEKSI */}
                <div className="shrink-0 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h4 className="text-xs font-bold text-gray-700">Eksekusi Algoritma</h4>
                        <p className="text-[10px] text-gray-500">Klik tombol di samping untuk memulai perhitungan SAW.</p>
                    </div>
                    <button 
                        onClick={prosesSeleksi}
                        className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Jalankan Seleksi
                    </button>
                </div>

                {/* TABEL HASIL */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-0 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
                        <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Tabel Hasil Proses Seleksi</h4>
                        <button className="text-[9px] font-bold text-indigo-600 hover:text-indigo-800 uppercase underline">Export Tabel</button>
                    </div>
                    
                    <div className="overflow-y-auto flex-1 p-0 m-0">
                        <table className="w-full text-left m-0 border-collapse">
                            <thead className="bg-white text-gray-400 text-[9px] font-black uppercase tracking-widest sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-4 py-3 text-center w-16">Rank</th>
                                    <th className="px-4 py-3">Nama Lengkap</th>
                                    <th className="px-4 py-3">Instansi</th>
                                    <th className="px-4 py-3 text-center">Nilai Akhir</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {hasilSeleksi.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50/50">
                                    <td className="px-4 py-2.5 text-center font-black text-gray-500 text-xs">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-2.5 text-xs font-bold text-gray-800">
                                        {item.nama_lengkap}
                                    </td>
                                    <td className="px-4 py-2.5 text-xs text-gray-600">
                                        {item.asal_universitas}
                                    </td>
                                    
                                    {/* LOGIKA PENAMPILAN NILAI */}
                                    <td className="px-4 py-2.5 text-center">
                                        {item.nilai_preferensi_v ? (
                                            <span className="font-black text-indigo-600 text-xs">
                                                {parseFloat(item.nilai_preferensi_v).toFixed(4)}
                                            </span>
                                        ) : (
                                            <span className="bg-orange-50 text-orange-500 border border-orange-100 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">
                                                Belum Diseleksi
                                            </span>
                                        )}
                                    </td>

                                    {/* LOGIKA PENAMPILAN STATUS */}
                                    <td className="px-4 py-2.5 text-center">
                                        {item.status ? (
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${item.status === 'Lulus' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                {item.status}
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 text-[10px] font-bold italic">N/A</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}