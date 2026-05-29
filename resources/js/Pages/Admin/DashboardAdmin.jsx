import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// 1. Tambahkan parameter untuk menerima data dari Controller
export default function DashboardAdmin({ statistik, topRankings }) {
    
    // (HAPUS variabel const topRankings = [...] berisi data dummy di sini)

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Admin" />
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* ... (Header Judul biarkan sama) ... */}
                
                {/* 3 KARTU STATISTIK */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Kartu 1: Biru Solid */}
                    <div className="bg-[#0093DD] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-36">
                        {/* ... */}
                        <div>
                            {/* 2. Gunakan data statistik dari database */}
                            <h3 className="text-4xl font-bold text-white">{statistik.totalMasuk}</h3>
                            <p className="text-blue-100 text-xs mt-1">Dokumen Terintegrasi</p>
                        </div>
                    </div>

                    {/* Kartu 2: Biru Muda */}
                    <div className="bg-[#00A95C]/70 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-36">
                        {/* ... */}
                        <div>
                            <h3 className="text-4xl font-bold text-white">{statistik.sudahDinilai}</h3>
                            <p className="text-white text-xs mt-1">Data Terkumpul</p>
                        </div>
                    </div>

                    {/* Kartu 3: Kuning Pastel */}
                    <div className="bg-[#F15A2C]/70 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-36">
                        {/* ... */}
                        <div>
                            <h3 className="text-4xl font-bold text-white">{statistik.kuotaLulus}</h3>
                            <p className="text-white text-xs mt-1">Sisa Kuota</p>
                        </div>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
                    <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                        <h4 className="text-base font-bold text-gray-800">Top Peringkat Sementara</h4>
                        <span className="bg-[#0d6efd] text-white text-xs px-3 py-1 rounded-full font-medium">SAW</span>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-gray-900 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 w-16 text-center">No</th>
                                    <th className="px-6 py-4">Nama Lengkap</th>
                                    <th className="px-6 py-4">Instansi</th>
                                    <th className="px-6 py-4 text-center">Nilai Akhir</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {topRankings.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400 font-medium">
                                            Belum ada pelamar yang mendaftar.
                                        </td>
                                    </tr>
                                ) : (
                                    topRankings.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-center font-bold text-gray-700">{index + 1}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-800">{item.nama}</td>
                                            <td className="px-6 py-4 text-gray-500 text-xs">{item.instansi}</td>
                                            
                                            {/* Logika Jika Belum Diseleksi (nilai_preferensi_v kosong) */}
                                            {item.nilai_preferensi_v === null || item.nilai_preferensi_v === undefined ? (
                                                <td colSpan="2" className="px-6 py-4">
                                                    <div className="bg-gray-100 text-gray-500 text-xs font-semibold px-4 py-2.5 rounded-md border border-dashed border-gray-300 w-full text-center">
                                                        Belum melakukan perangkingan
                                                    </div>
                                                </td>
                                            ) : (
                                                /* Logika Jika Sudah Diseleksi */
                                                <>
                                                    <td className="px-6 py-4 text-center font-bold text-gray-900">
                                                        {item.nilai_preferensi_v}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1 rounded-full">
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
                {/* ... */}
            </div>
        </AuthenticatedLayout>
    );
}