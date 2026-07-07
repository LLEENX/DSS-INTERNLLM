import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function HasilSeleksi({ hasilSeleksi }) {
    console.log("Data hasilSeleksi:", hasilSeleksi);

    const [isProcessing, setIsProcessing] = useState(false);
    
    // Logika Pengurutan: Mengurutkan berdasarkan Nilai Akhir terbesar ke terkecil (Descending)
    const sortedData = [...hasilSeleksi].sort((a, b) => {
        const scoreA = parseFloat(a.nilai_preferensi_v || 0);
        const scoreB = parseFloat(b.nilai_preferensi_v || 0);
        return scoreB - scoreA;
    });
    
    const prosesSeleksi = () => {
        setIsProcessing(true); 
        router.post(route('admin.proses-seleksi-eksekusi'), {}, {
            preserveScroll: true,
            onFinish: () => setIsProcessing(false),
        });
    };

    return (
        <DashboardAdminLayout>
            <Head title="Proses & Hasil Seleksi" />
            
            <div className="max-w-7xl mx-auto h-full flex flex-col space-y-3 relative">
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
                        disabled={isProcessing}
                        className={`px-6 py-2 text-white text-xs font-bold rounded-lg transition-all shadow-md flex items-center gap-2 ${
                            isProcessing 
                            ? 'bg-gray-400 shadow-gray-200 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                        }`}
                    >
                        {isProcessing ? (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                        {isProcessing ? 'Memproses...' : 'Jalankan Seleksi'}
                    </button>
                </div>

                {/* TABEL HASIL */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-0 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
                        <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Tabel Hasil Proses Seleksi</h4>
                        <a 
                            href={route('admin.export-pdf')} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0093DD] hover:bg-[#046A9E] text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-sm transition-all"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Export PDF
                        </a>
                        {/* <button className="text-[9px] font-bold text-indigo-600 hover:text-indigo-800 uppercase underline">Export Tabel</button> */}
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
                                {sortedData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50/50">
                                    <td className="px-4 py-2.5 text-center font-black text-gray-500 text-xs">
                                        {item.nilai_preferensi_v ? `#${index + 1}` : '-'}
                                    </td>
                                    <td className="px-4 py-2.5 text-xs font-bold text-gray-800">
                                        {item.nama_lengkap}
                                    </td>
                                    <td className="px-4 py-2.5 text-xs text-gray-600">
                                        {item.asal_universitas}
                                    </td>
                                    
                                    <td className="px-4 py-2.5 text-center">
                                        {item.nilai_preferensi_v ? (
                                            <span className="font-black text-indigo-600 text-xs">
                                                {Math.round(parseFloat(item.nilai_preferensi_v) * 100)}
                                            </span>
                                        ) : (
                                            <span className="bg-orange-50 text-orange-500 border border-orange-100 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">
                                                Belum Diseleksi
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-2.5 text-center">
                                        {item.status ? (
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${item.status === 'Selesai' || item.status === 'Lulus' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
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

            {/* OVERLAY LOADING */}
            {isProcessing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 transform animate-pulse-slow">
                        <svg className="animate-spin h-14 w-14 mb-4 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        
                        <h3 className="text-lg font-extrabold text-gray-800 text-center tracking-tight">
                            Menghitung Skor Akhir...
                        </h3>
                        
                        <p className="text-xs text-gray-500 text-center mt-2 leading-relaxed">
                            Sistem SPK sedang melakukan normalisasi matriks dan mengurutkan peringkat pelamar berdasarkan bobot (SAW).
                        </p>
                    </div>
                </div>
            )}
        </DashboardAdminLayout>
    );
}