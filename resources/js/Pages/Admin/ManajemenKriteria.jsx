import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ManajemenKriteria() {
    // Data Dummy Sementara (Nanti bisa diganti dengan data dari props database)
    const [kriteria, setKriteria] = useState([
        { id: 'c1', nama: 'IPK (C1)', bobot: 0.15 },
        { id: 'c2', nama: 'Semester (C2)', bobot: 0.10 },
        { id: 'c3', nama: 'Program Studi (C3)', bobot: 0.20 },
        { id: 'c4', nama: 'Skill (C4)', bobot: 0.25 },
        { id: 'c5', nama: 'Proposal (C5)', bobot: 0.30 },
    ]);

    // State untuk Modal Edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form Inertia untuk menyimpan data
    const { data, setData, put, processing } = useForm({
        c1: kriteria[0].bobot,
        c2: kriteria[1].bobot,
        c3: kriteria[2].bobot,
        c4: kriteria[3].bobot,
        c5: kriteria[4].bobot,
    });

    // Menghitung total bobot secara real-time
    const totalBobot = (parseFloat(data.c1) + parseFloat(data.c2) + parseFloat(data.c3) + parseFloat(data.c4) + parseFloat(data.c5)).toFixed(2);
    const isTotalValid = totalBobot === "1.00";

    const openModal = () => setIsEditModalOpen(true);
    const closeModal = () => setIsEditModalOpen(false);

    const submitConfig = (e) => {
        e.preventDefault();
        if (!isTotalValid) {
            alert('Total bobot harus tepat 1.00!');
            return;
        }
        
        // Simulasi update state lokal (Nanti ini diganti dengan pemanggilan API ke backend)
        setKriteria([
            { ...kriteria[0], bobot: parseFloat(data.c1) },
            { ...kriteria[1], bobot: parseFloat(data.c2) },
            { ...kriteria[2], bobot: parseFloat(data.c3) },
            { ...kriteria[3], bobot: parseFloat(data.c4) },
            { ...kriteria[4], bobot: parseFloat(data.c5) },
        ]);
        closeModal();
    };

    return (
        <DashboardAdminLayout>
            <Head title="Manajemen Kriteria" />
            
            <div className="max-w-7xl mx-auto mt-2 mb-6 space-y-6">
                
                {/* HEADER TITLE */}
                <div className="mb-5 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Manajemen Kriteria dan Bobot</h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                            Mengonfigurasi banyaknya kriteria dan juga nilai bobot prioritas.
                        </p>
                    </div>
                </div>

                {/* KONTEN UTAMA: TABEL KRITERIA */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-tight">Daftar Kriteria Penilaian</h4>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 text-[11px] font-black uppercase tracking-widest border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 w-16 text-center border-r border-gray-200">No</th>
                                    <th className="px-6 py-4 border-r border-gray-200">Kriteria</th>
                                    <th className="px-6 py-4 text-center">Bobot AHP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {kriteria.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-center font-bold text-gray-500 border-r border-gray-100">{index + 1}</td>
                                        <td className="px-6 py-4 font-bold text-gray-800 border-r border-gray-100">{item.nama}</td>
                                        <td className="px-6 py-4 text-center font-black text-indigo-600">{item.bobot.toFixed(3)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* BAGIAN BAWAH: KETERANGAN & TOMBOL KONFIGURASI */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mt-4">
                    {/* Kotak Keterangan */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 w-full md:w-1/2">
                        <h5 className="text-xs font-bold text-gray-700 mb-2">Keterangan:</h5>
                        <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-1 ml-2 font-medium">
                            <li>Total nilai keseluruhan bobot harus berjumlah <strong>1.00</strong>.</li>
                            <li>Semakin besar nilai bobot, semakin besar pengaruh kriteria tersebut terhadap hasil akhir seleksi.</li>
                            <li>Perubahan bobot akan langsung mempengaruhi perhitungan algoritma SAW secara *real-time*.</li>
                        </ul>
                    </div>

                    {/* Tombol Konfigurasi */}
                    <button 
                        onClick={openModal}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Konfigurasi Bobot
                    </button>
                </div>
            </div>

            {/* MODAL KONFIGURASI BOBOT */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Sesuaikan Bobot Prioritas</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={submitConfig}>
                            <div className="p-6 space-y-4">
                                {kriteria.map((item, index) => {
                                    const fieldName = `c${index + 1}`;
                                    return (
                                        <div key={item.id} className="flex items-center justify-between gap-4">
                                            <label className="text-sm font-bold text-gray-700">{item.nama}</label>
                                            <input 
                                                type="number" 
                                                step="0.01" 
                                                min="0"
                                                max="1"
                                                value={data[fieldName]} 
                                                onChange={e => setData(fieldName, e.target.value)} 
                                                className="w-24 text-center rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-bold text-indigo-600"
                                                required 
                                            />
                                        </div>
                                    );
                                })}

                                {/* Indikator Total Bobot */}
                                <div className={`mt-4 p-3 rounded-lg border ${isTotalValid ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'} flex justify-between items-center`}>
                                    <span className={`text-xs font-bold uppercase ${isTotalValid ? 'text-emerald-700' : 'text-red-600'}`}>Total Bobot</span>
                                    <span className={`text-lg font-black ${isTotalValid ? 'text-emerald-600' : 'text-red-600'}`}>{totalBobot}</span>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-2 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    Batal
                                </button>
                                <button type="submit" disabled={!isTotalValid || processing} className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    Simpan Konfigurasi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardAdminLayout>
    );
}