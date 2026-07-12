import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import toast, { Toaster } from 'react-hot-toast';

export default function AuthenticatedLayout({ header, children }) {

    const { flash = {} } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(
                (t) => (
                    <div className="flex items-center justify-between gap-4 w-full">
                        <span>{flash.success}</span>
                        <button 
                            onClick={() => toast.dismiss(t.id)} 
                            className="p-1 text-white hover:text-gray-200 transition-colors focus:outline-none"
                            title="Tutup Notifikasi"
                        >
                            {/* Icon Silang (X) menggunakan SVG Tailwind */}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ),
                {
                    duration: 4000,
                    position: 'top-right',
                    style: { background: '#10B981', color: '#fff' },
                }
            );
        }

        if (flash?.error) {
            toast.error(
                (t) => (
                    <div className="flex items-center justify-between gap-4 w-full">
                        <span>{flash.error}</span>
                        <button 
                            onClick={() => toast.dismiss(t.id)} 
                            className="p-1 text-white hover:text-gray-200 transition-colors focus:outline-none"
                            title="Tutup Notifikasi"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ),
                {
                    duration: 4000,
                    position: 'top-right',
                    style: { background: '#EF4444', color: '#fff' }, 
                }
            );
        }
    }, [flash]);
    

    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const routeHome = user.role === 'admin' ? route('admin.dashboard') : route('pelamar.dashboard');
    const isHomeActive = route().current('admin.dashboard') || route().current('pelamar.dashboard');
    const isDataPelamarActive = route().current('admin.data-pelamar');
    const isHasilSeleksiActive = route().current('admin.hasil-seleksi');

    return (
        <div className="flex h-screen bg-[#f8f9fa] font-sans overflow-hidden">
            <Toaster />
            
            {/* SIDEBAR (Light Corporate Theme) */}
            <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between z-20 hidden md:flex">
                <div>
                    {/* Brand Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase">
                                SPK SAW
                            </h1>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-4 space-y-1">
                        <Link href={routeHome}
                            className={`flex items-center px-4 py-3 rounded-r-full transition-colors ${
                                isHomeActive 
                                ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500 font-bold' 
                                : 'text-gray-700 hover:bg-gray-50 font-medium'
                            }`}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Dashboard
                        </Link>

                        <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium rounded-r-full transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Data Pelamar
                        </Link>

                        <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium rounded-r-full transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Hasil Seleksi
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                
                {/* TOP NAVIGATION BAR (For User Profile) */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-10">
                    
                    {/* Hamburger Mobile */}
                    <div className="md:hidden">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:block">
                        {/* Placeholder for left side of topbar if needed */}
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold border border-gray-300">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-sm hidden sm:block">{user.username}</span>
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-[#f8f9fa] p-6 md:p-top-4 md:p-bottom-4">
                    {children}
                </main>
            </div>
        </div>
    );
}