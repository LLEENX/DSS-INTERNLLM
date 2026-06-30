import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Penilaian({ datapelamar }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [processingId, setProcessingId] = useState({ id: null, type: null });
    
    // State untuk Modal Teks Mentah
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [selectedNama, setSelectedNama] = useState('');

    const filteredData = datapelamar.filter(item =>
        item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNLP = (id, type) => {
        setProcessingId({ id, type });
        router.post(route('admin.proses-nlp'), { id, type }, {
            preserveScroll: true,
            onFinish: () => setProcessingId({ id: null, type: null }),
        });
    };

    // Fungsi membuka modal teks
    const openTextModal = (nama, teks) => {
        setSelectedNama(nama);
        setSelectedText(teks);
        setIsTextModalOpen(true);
    };

    return (
        <DashboardAdminLayout>
            <Head title="Penilaian AI" />
            <div className="max-w-7xl mx-auto h-full flex flex-col space-y-3">
                
                {/* HEADER */}
                <div className="shrink-0 flex justify-between items-end mt-1">
                    <div>
                        <h2 className="text-xl font-extrabold text-gray-800 tracking-tight leading-none">Penilaian AI (NLP)</h2>
                        <p className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-widest">
                            Automated Scoring using Entity Extraction & Sentiment Analysis
                        </p>
                    </div>
                    <div className="relative w-56">
                        <input 
                            type="text" placeholder="Cari pelamar..." 
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white text-xs text-gray-700 border border-gray-200 rounded pl-7 py-1.5 focus:border-blue-500 focus:ring-0 shadow-sm"
                        />
                        <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                {/* TABLE CONTAINER */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-0 overflow-hidden">
                    <div className="overflow-y-auto flex-1 p-0 m-0">
                        <table className="w-full text-left m-0 border-collapse">
                            <thead className="bg-gray-50/80 text-gray-400 text-[9px] font-black uppercase tracking-widest sticky top-0 z-10 border-b border-gray-100 backdrop-blur-md">
                                <tr>
                                    <th className="px-4 py-3 w-10 text-center">No</th>
                                    <th className="px-4 py-3">Nama Pelamar</th>
                                    <th className="px-2 py-3 text-center w-16">C1 (IPK)</th>
                                    <th className="px-2 py-3 text-center w-16">C2 (Smt)</th>
                                    <th className="px-2 py-3 text-center w-20 bg-blue-50/30 text-blue-600">C3 (Prodi)</th>
                                    <th className="px-2 py-3 text-center w-20 bg-blue-50/30 text-blue-600">C4 (Skill)</th>
                                    <th className="px-2 py-3 text-center w-28 bg-emerald-50/30 text-emerald-600">C5 (Proposal)</th>
                                    <th className="px-4 py-3 text-center w-36">Aksi NLP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredData.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-2 text-center text-[10px] font-bold text-gray-400">{index + 1}</td>
                                        <td className="px-4 py-2 text-xs font-bold text-gray-700">{item.nama_lengkap}</td>
                                        
                                        <td className="px-2 py-2 text-center text-xs font-black text-gray-500">
                                            {item.c1 ? <span className="text-indigo-600">{item.c1}</span> : '-'}
                                        </td>
                                        <td className="px-2 py-2 text-center text-xs font-black text-gray-500">{item.semester || '-'}</td>
                                        
                                        {/* Kolom C3 & C4 (Dari CV) */}
                                        <td className="px-2 py-2 text-center font-black text-xs text-blue-600">{item.c3 ?? '-'}</td>
                                        <td className="px-2 py-2 text-center font-black text-xs text-blue-600">{item.c4 ?? '-'}</td>

                                        {/* Kolom C5 (Dari Proposal) + Tombol Lihat Teks Mentah */}
                                        <td className="px-2 py-2 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="font-black text-xs text-emerald-600">{item.c5 ?? '-'}</span>
                                                {item.teks_mentah && (
                                                    <button 
                                                        onClick={() => openTextModal(item.nama_lengkap, item.teks_mentah)}
                                                        className="text-gray-400 hover:text-emerald-500 transition-colors"
                                                        title="Lihat Teks Ringkasan"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        {/* Aksi Trigger NLP */}
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex gap-1.5 justify-center">
                                                {/* NLP untuk CV */}
                                                <button 
                                                    disabled={processingId.id === item.id}
                                                    onClick={() => handleNLP(item.id, 'cv')}
                                                    className={`px-2 py-1 rounded text-[9px] font-black uppercase border transition-all flex items-center gap-1 ${
                                                        processingId.id === item.id && processingId.type === 'cv'
                                                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-wait'
                                                        : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white'
                                                    }`}
                                                >
                                                    {processingId.id === item.id && processingId.type === 'cv' ? '...' : 'CV'}
                                                </button>
                                                {/* NLP untuk Proposal */}
                                                <button 
                                                    disabled={true}
                                                    title="Tahap Pengembangan (Integrasi Gemini)"
                                                    className="px-2 py-1 rounded text-[9px] font-black uppercase border bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed flex items-center gap-1"
                                                >
                                                    Prop
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL TEKS MENTAH */}
            {isTextModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-sm font-extrabold text-gray-800 tracking-tight">Ringkasan Proposal</h3>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{selectedNama}</p>
                            </div>
                            <button onClick={() => setIsTextModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        
                        <div className="p-5 overflow-y-auto bg-gray-50/30">
                            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
                                {selectedText || "Tidak ada teks ringkasan yang diekstrak."}
                            </p>
                        </div>

                        <div className="px-5 py-3 border-t border-gray-100 flex justify-end bg-white">
                            <button 
                                onClick={() => setIsTextModalOpen(false)} 
                                className="px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded hover:bg-gray-200 transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardAdminLayout>
    );
}