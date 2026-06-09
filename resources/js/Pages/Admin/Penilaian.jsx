import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Penilaian({ datapelamar }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [processingId, setProcessingId] = useState({ id: null, type: null });

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
                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-left m-0 border-collapse">
                            <thead className="bg-gray-50/80 text-gray-400 text-[9px] font-black uppercase tracking-widest sticky top-0 z-10 border-b border-gray-100 backdrop-blur-md">
                                <tr>
                                    <th className="px-4 py-3 w-10 text-center">No</th>
                                    <th className="px-4 py-3">Nama Pelamar</th>
                                    <th className="px-2 py-3 text-center w-16">C1 (IPK)</th>
                                    <th className="px-2 py-3 text-center w-16">C2 (Smt)</th>
                                    <th className="px-2 py-3 text-center w-24 bg-blue-50/30 text-blue-600">C3 (Prodi)</th>
                                    <th className="px-2 py-3 text-center w-24 bg-blue-50/30 text-blue-600">C4 (Skill)</th>
                                    <th className="px-2 py-3 text-center w-24 bg-blue-50/30 text-blue-600">C5 (Prop)</th>
                                    <th className="px-4 py-3 text-center w-40">Aksi NLP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredData.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-2 text-center text-[10px] font-bold text-gray-400">{index + 1}</td>
                                        <td className="px-4 py-2 text-xs font-bold text-gray-700">{item.nama_lengkap}</td>
                                        <td className="px-2 py-2 text-center text-xs text-gray-500">{item.ipk}</td>
                                        <td className="px-2 py-2 text-center text-xs text-gray-500">{item.semester}</td>
                                        
                                        {/* Kolom Skor dari Hasil Ekstraksi */}
                                        {[item.c3, item.c4, item.c5].map((val, i) => (
                                            <td key={i} className={`px-2 py-2 text-center font-black text-xs ${val ? 'text-blue-600' : 'text-gray-300'}`}>
                                                {val ?? '-'}
                                            </td>
                                        ))}

                                        {/* Aksi Trigger NLP */}
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex gap-1.5 justify-center">
                                                <button 
                                                    disabled={processingId.id === item.id}
                                                    onClick={() => handleNLP(item.id, 'cv')}
                                                    className={`px-2.5 py-1 rounded text-[9px] font-black uppercase border transition-all flex items-center gap-1 ${
                                                        processingId.id === item.id && processingId.type === 'cv'
                                                        ? 'bg-gray-100 text-gray-400 border-gray-200'
                                                        : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white'
                                                    }`}
                                                >
                                                    {processingId.id === item.id && processingId.type === 'cv' ? '...' : 'CV'}
                                                </button>
                                                <button 
                                                    disabled={processingId.id === item.id}
                                                    onClick={() => handleNLP(item.id, 'proposal')}
                                                    className={`px-2.5 py-1 rounded text-[9px] font-black uppercase border transition-all flex items-center gap-1 ${
                                                        processingId.id === item.id && processingId.type === 'proposal'
                                                        ? 'bg-gray-100 text-gray-400 border-gray-200'
                                                        : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white'
                                                    }`}
                                                >
                                                    {processingId.id === item.id && processingId.type === 'proposal' ? '...' : 'Prop'}
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
        </DashboardAdminLayout>
    );
}