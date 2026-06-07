import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function DataPelamar({ datapelamar }) {


    // ====== FUNGSI UNTUK MENGEDIT DATA PELAMAR ======
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    // Form dari Inertia
    const { data, setData, put, processing, reset } = useForm({
        nama_lengkap: '',
        asal_universitas: '',
        nim: '',
        ipk: '',
        semester: '',
        jenjang: '',
        prodi: '',
        path_cv: null,
        path_proposal: null,
        _method: 'PUT', // Untuk mengirim data sebagai PUT
    });

    // FUNGSI MEMBUKA MODAL EDIT
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

    // FUNGSI MENUTUP MODAL EDIT
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        reset(); // Kosongkan form kembali
    };

    // FUNGSI MENYIMPAN HASIL EDIT
    const submitEdit = (e) => {
        e.preventDefault();
        // Memakai post() dipadukan dengan _method: 'put' di dalam data
        post(route('admin.data-pelamar.update', editId), {
            onSuccess: () => closeEditModal(), // Tutup modal jika berhasil
        });
    };

    // ====== FUNGSI HAPUS DATA PELAMAR ======

    const handleDelete = (id, nama) => {
        if (confirm(`Apakah Anda yakin ingin menghapus pelamar "${nama}"? Data yang dihapus tidak dapat dikembalikan.`)) {
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
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-tight">Daftar Pendaftar Masuk</h4>
                        <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-bold border border-blue-100">
                            Total: {datapelamar.length} Data
                        </span>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 w-12 text-center">No</th>
                                    <th className="px-6 py-4 text-center">Pelamar & Instansi</th>
                                    <th className="px-6 py-4 text-center">Program Studi</th>
                                    <th className="px-6 py-4 text-center">IPK</th>
                                    <th className="px-6 py-4 text-center">Smt</th>
                                    <th className="px-6 py-4 text-center">Dokumen Validasi</th>
                                    <th className="px-6 py-4 text-center w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 bg-white">
                                {datapelamar.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                                            Belum ada data pelamar yang masuk ke sistem.
                                        </td>
                                    </tr>
                                ) : (
                                    datapelamar.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-center font-bold text-gray-400 group-hover:text-gray-600">{index + 1}</td>
                                            
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800">{item.nama_lengkap}</div>
                                                <div className="text-gray-500 text-xs font-medium">{item.asal_universitas}</div>
                                            </td>

                                            <td className="px-6 py-4 text-center font-bold text-gray-700">
                                                <div className="font-bold text-gray-800">{item.jenjang} {item.prodi}</div>
                                            </td>
                                            
                                            <td className="px-6 py-4 text-center font-bold text-gray-700">
                                                {item.ipk || '-'}
                                            </td>
                                            
                                            <td className="px-6 py-4 text-center font-bold text-gray-700">
                                                {item.semester || '-'}
                                            </td>
                                            
                                            {/* KOLOM DOKUMEN (CV & PROPOSAL) */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    {/* Tombol Cek CV */}
                                                    <a href={item.file_cv ? `/storage/${item.file_cv}` : '#'} 
                                                       target={item.file_cv ? "_blank" : "_self"}
                                                       className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide border transition-colors ${
                                                           item.file_cv 
                                                           ? 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100' 
                                                           : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                                       }`}>
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                        </svg>
                                                        CV
                                                    </a>
                                                    
                                                    {/* Tombol Cek Proposal */}
                                                    <a href={item.file_proposal ? `/storage/${item.file_proposal}` : '#'} 
                                                       target={item.file_proposal ? "_blank" : "_self"}
                                                       className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide border transition-colors ${
                                                           item.file_proposal 
                                                           ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' 
                                                           : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                                       }`}>
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        Proposal
                                                    </a>
                                                </div>
                                            </td>
                                            
                                            {/* KOLOM AKSI (EDIT & HAPUS) */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    
                                                    {/* Tombol Edit */}
                                                    <button onClick={() => openEditModal(item)} type="button" className="p-2 bg-white text-blue-600 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm" title="Edit Data">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>

                                                    {/* Tombol Hapus */}
                                                    <button 
                                                        onClick={() => handleDelete(item.id, item.nama_lengkap)}
                                                        type="button" 
                                                        className="p-2 bg-white text-red-500 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm" 
                                                        title="Hapus Pelamar"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {/* MODAL FORM EDIT */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        
                        {/* Header Modal */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Edit Data Pelamar</h3>
                            <button onClick={closeEditModal} className="text-gray-400 hover:text-red-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body Modal (Form) */}
                        <form onSubmit={submitEdit}>
                            <div className="px-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                                        <input 
                                            type="text" 
                                            value={data.nama_lengkap} 
                                            onChange={e => setData('nama_lengkap', e.target.value)} 
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">NIM</label>
                                        <input 
                                            type="text" 
                                            value={data.nim} 
                                            onChange={e => setData('nim', e.target.value)} 
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Asal Universitas</label>
                                    <input 
                                        type="text" 
                                        value={data.asal_universitas} 
                                        onChange={e => setData('asal_universitas', e.target.value)} 
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Kolom Nama Lengkap dan Jenjang */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Jenjang</label>
                                        <input 
                                            type="text"
                                            value={data.jenjang} 
                                            onChange={e => setData('jenjang', e.target.value)} 
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    {/* Kolom Asal Universitas dan Prodi */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Prodi</label>
                                        <input 
                                            type="text"
                                            value={data.prodi} 
                                            onChange={e => setData('prodi', e.target.value)} 
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    {/* Kolom IPK dan Semester */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">IPK</label>
                                        <input 
                                            type="number" step="0.01" max="4.00" 
                                            value={data.ipk} 
                                            onChange={e => setData('ipk', e.target.value)} 
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Semester</label>
                                        <input 
                                            type="number" max="8" 
                                            value={data.semester} 
                                            onChange={e => setData('semester', e.target.value)} 
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Update CV (PDF)</label>
                                            <input 
                                                type="file" 
                                                accept=".pdf" // Hanya menerima file PDF
                                                onChange={e => setData('file_cv', e.target.files[0])} // Menangkap file, bukan text
                                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                            />
                                            <p className="text-[10px] text-gray-400 mt-1">*Kosongkan jika tidak ingin mengubah CV.</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Update Proposal (PDF)</label>
                                            <input 
                                                type="file" 
                                                accept=".pdf" 
                                                onChange={e => setData('file_proposal', e.target.files[0])} 
                                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                            />
                                            <p className="text-[10px] text-gray-400 mt-1">*Kosongkan jika tidak ingin mengubah Proposal.</p>
                                        </div>
                                </div>
                            </div>

                            {/* Footer Modal (Tombol Submit) */}
                            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-2 border-t border-gray-100">
                                <button type="button" onClick={closeEditModal} className="px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    Batal
                                </button>
                                <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </DashboardAdminLayout>
    );
}