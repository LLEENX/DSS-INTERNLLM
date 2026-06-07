import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Head } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/SidebarLayout';

export default function DashboardAdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (routeName) => route().current(routeName);

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
            href: '#',
            active: isActive('admin.manajemen-kriteria'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            )
        },
        {
            title: 'Proses dan Hasil Seleksi',
            href: '#',
            active: isActive('admin.hasil-seleksi'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        }
    ];

    return (
        <div className="flex h-screen bg-[#f8f9fa] font-sans overflow-hidden">
            
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
                                : 'text-gray-700 hover:bg-gray-50 font-medium'
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

                    <div className="hidden md:block"></div>

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

                <main className="flex-1 overflow-y-auto bg-[#f8f9fa] p-6 md:py-6">
                    {children}
                </main>
            </div>
        </div>
    );
}