import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function DataPelamar({ datapelamar }) {

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
                                    <th className="px-6 py-4">Pelamar & Instansi</th>
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
                                                    
                                                    {/* Tombol Edit (Akan mengarahkan ke halaman Form Edit) */}
                                                    <Link 
                                                        href={route('admin.data-pelamar.edit', item.id)} 
                                                        className="p-2 bg-white text-blue-600 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm" 
                                                        title="Edit Data"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>

                                                    {/* Tombol Hapus (Akan memicu fungsi handleDelete di atas) */}
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
        </DashboardAdminLayout>
    );
}