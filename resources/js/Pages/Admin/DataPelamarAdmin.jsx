import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function DataPelamar({ datapelamar }) {
    // ====== STATE UNTUK FITUR SEARCH & PER-COLUMN FILTER ======
    const [searchTerm, setSearchTerm] = useState('');
    const [filterProdi, setFilterProdi] = useState('');
    const [filterSemester, setFilterSemester] = useState('');
    const [filterIpk, setFilterIpk] = useState('');

    // Mengambil daftar unik untuk opsi Dropdown
    const uniqueProdi = [...new Set(datapelamar.map(item => item.prodi).filter(Boolean))].sort();
    const uniqueSemester = [...new Set(datapelamar.map(item => item.semester).filter(Boolean))].sort((a, b) => a - b);

    // Logika menyaring data
    const filteredData = datapelamar.filter((item) => {
        // Pencarian global untuk nama dan instansi
        const matchesSearch = 
            (item.nama_lengkap?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (item.asal_universitas?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        
        // Filter spesifik per kolom
        const matchesProdi = filterProdi === '' || item.prodi === filterProdi;
        const matchesSemester = filterSemester === '' || item.semester?.toString() === filterSemester;
        
        // Untuk IPK, kita buat logika "Lebih besar atau sama dengan (>=)" agar admin bisa memfilter batas minimal IPK
        const matchesIpk = filterIpk === '' || parseFloat(item.ipk) >= parseFloat(filterIpk);

        return matchesSearch && matchesProdi && matchesSemester && matchesIpk;
    });


    // ====== FUNGSI UNTUK MENGEDIT DATA ======
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        nama_lengkap: '',
        asal_universitas: '',
        nim: '',
        ipk: '',
        semester: '',
        jenjang: '',
        prodi: '',
        file_cv: null,
        file_proposal: null,
        _method: 'PUT', 
    });

    const openEditModal = (pelamar) => {
        setEditId(pelamar.id);
        setData({
            nama_lengkap: pelamar.nama_lengkap || '',
            asal_universitas: pelamar.asal_universitas || '',
            nim: pelamar.nim || '',
            ipk: pelamar.ipk || '',
            jenjang: pelamar.jenjang || '',
            prodi: pelamar.prodi || '',
            semester: pelamar.semester || '',
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        reset(); 
    };

    const submitEdit = (e) => {
        e.preventDefault();
        post(route('admin.data-pelamar.update', editId), {
            onSuccess: () => closeEditModal(), 
        });
    };

    // ====== FUNGSI HAPUS DATA ======
    const handleDelete = (id, nama) => {
        if (confirm(`Apakah Anda yakin ingin menghapus pelamar "${nama}"?`)) {
            router.delete(route('admin.data-pelamar.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <DashboardAdminLayout>
            <Head title="Data Pelamar" />
            
            <div className="max-w-7xl mx-auto mt-2 mb-6 space-y-6">
                
                {/* HEADER TITLE */}
                <div className="mb-5 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Manajemen Data Pelamar</h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                            Verifikasi berkas dan validitas administratif kandidat.
                        </p>
                    </div>
                </div>

                {/* TABEL DATA MENTAH */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* BAGIAN ATAS TABEL: HANYA INFO JUMLAH & SEARCH BAR */}
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-tight">Daftar Pendaftar Masuk</h4>
                            <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-bold border border-blue-100">
                                Total: {filteredData.length} Data
                            </span>
                        </div>
                        
                        {/* Input Search Global (Nama/Instansi) */}
                        <div className="relative w-full md:w-64">
                            <input 
                                type="text" 
                                placeholder="Cari nama atau instansi..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white text-xs text-gray-700 border border-gray-200 rounded-md pl-8 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-gray-500 text-[11px] font-black uppercase tracking-widest border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-4 w-12 text-center align-top">No</th>
                                    
                                    {/* Kolom Tanpa Filter */}
                                    <th className="px-4 py-4 align-top">
                                        <div className="flex flex-col gap-2">
                                            <span>Pelamar & Instansi</span>
                                        </div>
                                    </th>
                                    
                                    {/* Kolom Filter: Program Studi */}
                                    <th className="px-4 py-4 align-top text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span>Program Studi</span>
                                            <select 
                                                value={filterProdi}
                                                onChange={(e) => setFilterProdi(e.target.value)}
                                                className="w-full max-w-[130px] text-[10px] py-1 px-2 border-gray-200 rounded text-gray-600 font-medium focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                            >
                                                <option value="">Semua Prodi</option>
                                                {uniqueProdi.map((prodi, idx) => (
                                                    <option key={idx} value={prodi}>{prodi}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </th>
                                    
                                    {/* Kolom Filter: IPK */}
                                    <th className="px-4 py-4 align-top text-center w-24">
                                        <div className="flex flex-col items-center gap-2">
                                            <span>Min IPK</span>
                                            <input 
                                                type="number" 
                                                step="0.1" 
                                                min="0"
                                                max="4.0"
                                                placeholder="Semua"
                                                value={filterIpk}
                                                onChange={(e) => setFilterIpk(e.target.value)}
                                                className="w-full text-[10px] py-1 px-2 border-gray-200 rounded text-center text-gray-600 font-medium focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </th>
                                    
                                    {/* Kolom Filter: Semester */}
                                    <th className="px-4 py-4 align-top text-center w-28">
                                        <div className="flex flex-col items-center gap-2">
                                            <span>Semester</span>
                                            <select 
                                                value={filterSemester}
                                                onChange={(e) => setFilterSemester(e.target.value)}
                                                className="w-full text-[10px] py-1 px-2 border-gray-200 rounded text-center text-gray-600 font-medium focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                            >
                                                <option value="">Semua Smt</option>
                                                {uniqueSemester.map((smt, idx) => (
                                                    <option key={idx} value={smt}>Semester {smt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </th>
                                    
                                    {/* Kolom Tanpa Filter */}
                                    <th className="px-4 py-4 align-top text-center">
                                        <div className="flex flex-col gap-2">
                                            <span>Dokumen</span>
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 align-top text-center w-24">
                                        <div className="flex flex-col gap-2">
                                            <span>Aksi</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 bg-white">
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                                            {datapelamar.length === 0 
                                                ? "Belum ada data pelamar yang masuk ke sistem." 
                                                : "Data tidak ditemukan berdasarkan pencarian/filter."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-4 py-4 text-center font-bold text-gray-400 group-hover:text-gray-600">{index + 1}</td>
                                            
                                            <td className="px-4 py-4">
                                                <div className="font-bold text-gray-800">{item.nama_lengkap}</div>
                                                <div className="text-gray-500 text-xs font-medium">{item.asal_universitas}</div>
                                            </td>

                                            <td className="px-4 py-4 text-center font-bold text-gray-700">