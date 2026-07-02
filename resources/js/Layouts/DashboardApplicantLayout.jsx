import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import SidebarLayout from '@/Layouts/SidebarLayout';

export default function DashboardApplicantLayout({ children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (routeName) => route().current(routeName);

    // DAFTAR MENU PELAMAR
    const applicantMenus = [
        {
            title: 'Dashboard',
            href: route('applicant.dashboard'),
            active: isActive('applicant.dashboard'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: 'Formulir Pendaftaran',
            href: route('applicant.dashboard'),
            active: isActive('applicant.dashboard'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: 'Status Seleksi',
            href: '#', // Nanti bisa diganti route('applicant.status') jika sudah dibuat
            active: false,
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        }
    ];

    return (
        <div className="flex h-screen bg-[#f8f9fa] font-sans overflow-hidden">
            
            {/* KOMPONEN SIDEBAR */}
            <SidebarLayout>
                <nav className="p-4 space-y-1">
                    {applicantMenus.map((menu, index) => (
                        <Link 
                            key={index} 
                            href={menu.href}
                            className={`flex items-center px-4 py-3 rounded-r-full transition-colors ${
                                menu.active
                                ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500 font-bold' 
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
                
                {/* TOP NAVIGATION BAR */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-10 shrink-0">
                    <div className="md:hidden">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:block">
                        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Portal Pelamar</span>
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <span className="font-medium text-sm hidden sm:block">{user.name}</span>
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

                <main className="flex-1 overflow-y-auto bg-[#f8f9fa] px-4 py-4 md:px-6 md:py-6">
                    {children}
                </main>
            </div>
        </div>
    );
}