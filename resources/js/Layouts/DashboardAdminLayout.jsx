import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Head } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardAdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const isActive = (routeName) => route().current(routeName);

    const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') === 'dark';
    }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // DAFTAR MENU ADMIN
    const adminMenus = [
        {
            title: 'Dashboard',
            href: route('admin.dashboard'), 
            active: isActive('admin.dashboard'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            title: 'Data Pelamar',
            href: route('admin.data-pelamar'),
            active: isActive('admin.data-pelamar'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            title: 'Manajemen Kriteria',
            href: route('admin.manajemen-kriteria'),
            active: isActive('admin.manajemen-kriteria'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            )
        },
        {
            title: 'Penilaian',
            href: route('admin.penilaian'),
            active: isActive('admin.penilaian'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        },
        {
            title: 'Proses dan Hasil Seleksi',
            href: route('admin.hasil-seleksi'),
            active: isActive('admin.hasil-seleksi'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        }
    ];

    return (
        <div className="flex h-screen dark:bg-gray-900 bg-[#f8f9fa] font-sans overflow-hidden transition-colors duration-200">
            <Toaster />
            
            {/* KOMPONEN SIDEBAR */}
            <SidebarLayout>
                <nav className="p-4 space-y-1">
                    {/* LOOPING MENU */}
                    {adminMenus.map((menu, index) => (
                        <Link 
                            key={index} 
                            href={menu.href}
                            className={`flex items-center px-4 py-3 rounded-r-full transition-colors ${
                                menu.active
                                ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500 font-bold' 
                                : 'text-gray-700 dark:text-white hover:bg-gray-50 font-medium'
                            }`}
                        >
                            {menu.icon}
                            {menu.title}
                        </Link>
                    ))}
                </nav>
            </SidebarLayout>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                
                {/* TOP NAVIGATION BAR */}
                <header className="bg-white border-b border-gray-200 dark:bg-gray-800 h-16 flex items-center justify-between px-6 z-10 shrink-0 transition-colors duration-200">
                    
                    {/* Hamburger Mobile */}
                    <div className="md:hidden">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:block">
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">Portal Admin</span>
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="flex items-center gap-3 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:outline-none transition ease-in-out duration-150">
                                        <div className="flex flex-col text-right hidden sm:flex">
                                            <span className="font-bold text-gray-800 dark:text-white text-base">{user.name}</span>
                                            <span className="text-xs text-[#0093DD] dark:text-blue-400 uppercase tracking-wider">Administrator</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0093DD] shadow-sm">
                                            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=0093DD&color=fff`} alt={user.name} className="w-full h-full object-cover" />
                                        </div>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content contentClasses="py-1 bg-white dark:bg-gray-700 w-56">
                                    <Dropdown.Link href={route('admin.dashboard')} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2.5">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        Profil Admin
                                    </Dropdown.Link>
                                    
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2.5">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        Logout
                                    </Dropdown.Link>

                                    <div className="border-t border-gray-100 dark:border-gray-600 my-1"></div>
                                    
                                    {/* Toggle Mode Gelap */}
                                    <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Mode Gelap</span>
                                        <button
                                            type="button"
                                            className={`${
                                                darkMode ? 'bg-[#0093DD]' : 'bg-gray-200 dark:bg-gray-500'
                                            } relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                                        >
                                            <span className={`${
                                                darkMode ? 'translate-x-5' : 'translate-x-0'
                                                } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                            />
                                        </button>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-[#f8f9fa] dark:bg-gray-900 px-4 py-2 md:px-6 md:py-3 transition-colors duration-200">
                    {children}
                </main>
            </div>
        </div>
    );
}