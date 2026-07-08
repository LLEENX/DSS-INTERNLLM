import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ManajemenKriteria({ kriteriaData }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data, setData, put, processing } = useForm({
        items: kriteriaData,
    });

    // Kalkulasi total bobot
    const totalBobot = data.items.reduce((sum, item) => sum + parseFloat(item.bobot_ahp || 0), 0).toFixed(2);
    const isTotalValid = totalBobot === "1.00";

    const openModal = () => {
        setData('items', kriteriaData);
        setIsEditModalOpen(true);
    };

    // State untuk modal AHP
    const [isAhpModalOpen, setIsAhpModalOpen] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showAhpHelp, setShowAhpHelp] = useState(false);

    // State untuk menyimpan 10 nilai perbandingan AHP
    const [ahpForm, setAhpForm] = useState({
        c1_c2: { winner: 'c1', scale: 1 },
        c1_c3: { winner: 'c1', scale: 1 },
        c1_c4: { winner: 'c1', scale: 1 },
        c1_c5: { winner: 'c1', scale: 1 },
        c2_c3: { winner: 'c2', scale: 1 },
        c2_c4: { winner: 'c2', scale: 1 },
        c2_c5: { winner: 'c2', scale: 1 },
        c3_c4: { winner: 'c3', scale: 1 },
        c3_c5: { winner: 'c3', scale: 1 },
        c4_c5: { winner: 'c4', scale: 1 },
    });

    const scaleOptions = [
        { label: '9', winnerSide: 'A', scale: 9 },
        { label: '7', winnerSide: 'A', scale: 7 },
        { label: '5', winnerSide: 'A', scale: 5 },
        { label: '3', winnerSide: 'A', scale: 3 },
        { label: '1', winnerSide: 'A', scale: 1 },
        { label: '3', winnerSide: 'B', scale: 3 },
        { label: '5', winnerSide: 'B', scale: 5 },
        { label: '7', winnerSide: 'B', scale: 7 },
        { label: '9', winnerSide: 'B', scale: 9 },
    ];

    // Fungsi untuk menangani klik radio button
    const handleAhpRadioChange = (pairId, winnerVal, scaleVal) => {
        setAhpForm({
            ...ahpForm,
            [pairId]: { winner: winnerVal, scale: scaleVal }
        });
    };
    
    const closeModal = () => setIsEditModalOpen(false);

    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        setData('items', newItems);
    };

    const hitungAHP = () => {
        setIsCalculating(true);
        
        // Menggunakan post dari useForm Inertia atau router.post
        router.post(route('admin.manajemen-kriteria.kalkulasi-ahp'), ahpForm, {
            onSuccess: () => {
                setIsCalculating(false);
                setIsAhpModalOpen(false);
            },
            onError: (errors) => {
                setIsCalculating(false);
                if(errors.ahp_error) {
                    alert(errors.ahp_error); // Akan memunculkan alert jika CR > 0.1
                }
            }
        });
    };

    const submitConfig = (e) => {
        e.preventDefault();
        if (!isTotalValid) {
            alert('Total bobot harus tepat 1.00!');
            return;
        }
        
        // Kirim request PUT ke Backend
        put(route('admin.manajemen-kriteria.update'), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <DashboardAdminLayout>
            <Head title="Manajemen Kriteria" />
            <div className="max-w-7xl mx-auto mt-1 space-y-3">
                
                {/* HEADER TITLE */}
                <div>
                    <h2 className="text-xl font-extrabold text-gray-800 tracking-tight leading-tight">Manajemen Kriteria & Bobot</h2>
                    <p className="text-[11px] font-medium text-gray-500">
                        Mengonfigurasi kriteria, atribut Cost/Benefit, dan nilai bobot AHP.
                    </p>
                </div>

                {/* AREA TOMBOL KALKULATOR AHP */}
                <div className="shrink-0 bg-white dark:bg-[#1E293B] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between mb-6 transition-colors duration-200">
                    <div>
                        <h4 className="text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">
                            Kalkulator Matriks AHP
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                            Gunakan kalkulator sistem untuk menghitung bobot prioritas (W) dan uji konsistensi (CR) secara otomatis.
                        </p>
                    </div>
                    
                    <div className="flex gap-2">
                        {/* Tombol Hitung AHP */}
                        <button 
                            onClick={() => setIsAhpModalOpen(true)}
                            className="px-5 py-2 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md flex items-center gap-2 bg-[#00A95C] hover:bg-[#2eb77a] shadow-green-200 dark:shadow-none"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Hitung via AHP
                        </button>
                    </div>
                </div>

                {/* KONTEN UTAMA: TABEL KRITERIA */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                        <h4 className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">Daftar Kriteria Sistem</h4>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-2 w-12 text-center border-r border-gray-200">No</th>
                                    <th className="px-4 py-2 w-20 text-center border-r border-gray-200">Kode</th>
                                    <th className="px-4 py-2 border-r border-gray-200">Nama Kriteria</th>
                                    <th className="px-4 py-2 text-center border-r border-gray-200">Tipe Atribut</th>
                                    <th className="px-4 py-2 text-center">Bobot AHP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 bg-white">
                                {kriteriaData.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-1.5 text-center font-bold text-gray-400 border-r border-gray-100 text-xs">{index + 1}</td>
                                        <td className="px-4 py-1.5 text-center font-bold text-gray-600 border-r border-gray-100 text-xs uppercase">{item.kode_kriteria}</td>
                                        <td className="px-4 py-1.5 font-bold text-gray-800 border-r border-gray-100 text-xs">{item.nama_kriteria}</td>
                                        <td className="px-4 py-1.5 text-center border-r border-gray-100">
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${item.tipe === 'Benefit' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                                {item.tipe}
                                            </span>
                                        </td>
                                        <td className="px-4 py-1.5 text-center font-black text-indigo-600 text-xs">{parseFloat(item.bobot_ahp).toFixed(3)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* BAGIAN BAWAH: KETERANGAN & TOMBOL */}
                <div className="flex items-center justify-between gap-4">
                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2.5 w-full max-w-2xl flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[10px] text-blue-800/90 leading-tight font-medium">
                            <strong className="text-blue-900">Catatan:</strong> Total akumulasi bobot AHP wajib berjumlah <strong className="text-blue-900">1.00</strong>. Kriteria ber-tipe <span className="text-emerald-600 font-bold">Benefit</span> berarti semakin besar nilainya semakin baik, sedangkan tipe <span className="text-orange-600 font-bold">Cost</span> sebaliknya. Perubahan akan instan mempengaruhi kalkulasi.
                        </p>
                    </div>

                    <button 
                        onClick={openModal}
                        className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-indigo-100 text-indigo-700 font-extrabold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm text-[11px] uppercase tracking-wide"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Konfigurasi
                    </button>
                </div>
            </div>

            {/* MODAL KONFIGURASI BOBOT */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-tight">Sesuaikan Kriteria</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        
                        <form onSubmit={submitConfig}>
                            <div className="p-4 space-y-2.5">
                                <div className="flex gap-2 px-1">
                                    <span className="w-12 text-[9px] font-bold text-gray-400 uppercase">Kode</span>
                                    <span className="flex-1 text-[9px] font-bold text-gray-400 uppercase">Nama Kriteria</span>
                                    <span className="w-24 text-[9px] font-bold text-gray-400 uppercase text-center">Tipe</span>
                                    <span className="w-20 text-[9px] font-bold text-gray-400 uppercase text-center">Bobot</span>
                                </div>

                                {data.items.map((item, index) => (
                                    <div key={item.id} className="flex items-center gap-2">
                                        <input type="text" value={item.kode_kriteria} disabled className="w-12 text-center rounded border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-500 py-1.5" />
                                        
                                        <input 
                                            type="text" 
                                            value={item.nama_kriteria} 
                                            onChange={e => handleItemChange(index, 'nama_kriteria', e.target.value)} 
                                            className="flex-1 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-[11px] font-bold text-gray-700 py-1.5"
                                            required 
                                        />
                                        
                                        <select
                                            value={item.tipe}
                                            onChange={e => handleItemChange(index, 'tipe', e.target.value)}
                                            className="w-24 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-[10px] font-bold py-1.5 cursor-pointer"
                                        >
                                            <option value="Benefit">Benefit</option>
                                            <option value="Cost">Cost</option>
                                        </select>

                                        <input 
                                            type="number" step="0.01" min="0" max="1"
                                            value={item.bobot_ahp} 
                                            onChange={e => handleItemChange(index, 'bobot_ahp', e.target.value)} 
                                            className="w-20 text-center rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-[11px] font-black text-indigo-600 py-1.5"
                                            required 
                                        />
                                    </div>
                                ))}

                                <div className={`mt-3 p-2 rounded-lg border ${isTotalValid ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'} flex justify-between items-center`}>
                                    <span className={`text-[10px] font-extrabold uppercase ${isTotalValid ? 'text-emerald-700' : 'text-red-600'}`}>Total Bobot</span>
                                    <span className={`text-sm font-black ${isTotalValid ? 'text-emerald-600' : 'text-red-600'}`}>{totalBobot}</span>
                                </div>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-4 py-1.5 text-[11px] font-bold text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">Batal</button>
                                <button type="submit" disabled={!isTotalValid || processing} className="px-4 py-1.5 text-[11px] font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL KALKULATOR AHP */}
            {isAhpModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col transition-colors duration-200">
                        
                        {/* HEADER MODAL */}
                        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-[16px] font-black text-gray dark:text-white uppercase tracking-wider">Kalkulator AHP</h3>
                                <p className="text-[12px] text-gray-500 font-black dark:text-gray-400 mt-0.5">Tentukan tingkat kepentingan antar pasangan kriteria.</p>
                            </div>
                            <button onClick={() => setIsAhpModalOpen(false)} className="text-gray-400 hover:text-red-500 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-200 dark:border-gray-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* BODY MODAL */}
                        <div className="px-4 w-full">
                            <div className="mb-4 p-3 bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl text-xs text-black-800 dark:text-white-300 leading-relaxed flex gap-3 items-start">
                                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <strong className="font-black">Panduan Pengisian:</strong><br />
                                    Klik kotak angka di sebelah <strong>Kiri</strong> jika <em>Kriteria A</em> lebih penting. Klik kotak di sebelah <strong>Kanan</strong> jika <em>Kriteria B</em> lebih penting. Pilih angka <strong>1 (Tengah)</strong> jika kedua kriteria dirasa sama pentingnya.
                                </div>
                            </div>

                            {/* Tabel Matriks */}
                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                                <table className="w-full text-center border-collapse bg-white dark:bg-[#1E293B]">
                                    <thead>
                                        <tr className="bg-[#0093DD] text-white text-[10px] uppercase tracking-wider">
                                            <th className="py-2.5 px-3 font-bold border-r border-blue-500/30 w-1/4">Kriteria A</th>
                                            <th className="py-2.5 px-0 font-medium w-[6%]">9</th>
                                            <th className="py-2.5 px-0 font-medium w-[6%]">7</th>
                                            <th className="py-2.5 px-0 font-medium w-[6%]">5</th>
                                            <th className="py-2.5 px-0 font-medium w-[6%]">3</th>
                                            <th className="py-2.5 px-0 font-bold bg-blue-600/50 w-[6%]">1</th>
                                            <th className="py-2.5 px-0 font-medium w-[6%]">3</th>
                                            <th className="py-2.5 px-0 font-medium w-[6%]">5</th>
                                            <th className="py-2.5 px-0 font-medium w-[6%]">7</th>
                                            <th className="py-2.5 px-0 font-medium border-r border-blue-500/30 w-[6%]">9</th>
                                            <th className="py-2.5 px-3 font-bold w-1/4">Kriteria B</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { id: 'c1_c2', labelA: 'IPK', valA: 'c1', labelB: 'Semester', valB: 'c2' },
                                            { id: 'c1_c3', labelA: 'IPK', valA: 'c1', labelB: 'Jurusan', valB: 'c3' },
                                            { id: 'c1_c4', labelA: 'IPK', valA: 'c1', labelB: 'Skill', valB: 'c4' },
                                            { id: 'c1_c5', labelA: 'IPK', valA: 'c1', labelB: 'Proposal', valB: 'c5' },
                                            { id: 'c2_c3', labelA: 'Semester', valA: 'c2', labelB: 'Jurusan', valB: 'c3' },
                                            { id: 'c2_c4', labelA: 'Semester', valA: 'c2', labelB: 'Skill', valB: 'c4' },
                                            { id: 'c2_c5', labelA: 'Semester', valA: 'c2', labelB: 'Proposal', valB: 'c5' },
                                            { id: 'c3_c4', labelA: 'Jurusan', valA: 'c3', labelB: 'Skill', valB: 'c4' },
                                            { id: 'c3_c5', labelA: 'Jurusan', valA: 'c3', labelB: 'Proposal', valB: 'c5' },
                                            { id: 'c4_c5', labelA: 'Skill', valA: 'c4', labelB: 'Proposal', valB: 'c5' },
                                        ].map((pair, idx) => (
                                            <tr key={pair.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50/40 dark:hover:bg-[#0F172A] transition-colors">
                                                
                                                <td className="py-1.5 px-3 text-[11px] font-bold text-gray-700 dark:text-gray-300 text-left border-r border-gray-100 dark:border-gray-700">
                                                    {pair.labelA}
                                                </td>

                                                {/* Looping 9 Radio Button dengan Seluruh Area Kotak yang Bisa Diklik */}
                                                {scaleOptions.map((opt, i) => {
                                                    const isChecked = ahpForm[pair.id].scale === opt.scale && 
                                                                    (opt.scale === 1 ? true : ahpForm[pair.id].winner === (opt.winnerSide === 'A' ? pair.valA : pair.valB));
                                                    
                                                    return (
                                                        <td key={i} className={`p-0 align-middle ${opt.scale === 1 ? 'bg-gray-50 dark:bg-gray-800/40' : ''}`}>
                                                            <label className="flex items-center justify-center w-full h-full py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                                                <input
                                                                    type="radio"
                                                                    name={`radio_${pair.id}`}
                                                                    checked={isChecked}
                                                                    onChange={() => handleAhpRadioChange(pair.id, opt.winnerSide === 'A' ? pair.valA : pair.valB, opt.scale)}
                                                                    className="w-3.5 h-3.5 text-[#0093DD] bg-white dark:bg-[#1E293B] border-gray-300 dark:border-gray-600 focus:ring-[#0093DD] cursor-pointer m-0 block"
                                                                />
                                                            </label>
                                                        </td>
                                                    );
                                                })}

                                                <td className="py-1.5 px-3 text-[11px] font-bold text-gray-700 dark:text-gray-300 text-right border-l border-gray-100 dark:border-gray-700">
                                                    {pair.labelB}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* FOOTER MODAL */}
                        <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end gap-3 shrink-0">
                            <button 
                                onClick={() => setIsAhpModalOpen(false)}
                                className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors uppercase tracking-widest"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={() => hitungAHP()} 
                                disabled={isCalculating}
                                className="px-5 py-2 bg-[#00A95C] hover:bg-[#008c4c] text-white text-[11px] font-black uppercase tracking-widest rounded-lg transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {isCalculating ? 'Menghitung...' : 'Kalkulasi Matriks & Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DashboardAdminLayout>
    );
}