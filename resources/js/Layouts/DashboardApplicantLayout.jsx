// resources/js/Layouts/DashboardApplicantLayout.jsx
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import SidebarLayout from '@/Layouts/SidebarLayout';

export default function DashboardApplicantLayout({ children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (routeName) => route().current(routeName);

    const applicantMenus = [
        {
            title: 'Dashboard',
            href: route('applicant.dashboard'),
            active: isActive('applicant.dashboard'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            )
        },
        {
            title: 'Profil & Pendaftaran',
            href: route('applicant.profile'),
            active: isActive('applicant.profile'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            )
        },
        {
            title: 'Status Seleksi',
            href: route('applicant.status'),
            active: isActive('applicant.status'),
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )
        }
    ];

    return (
        <div className="flex h-screen bg-[#f8f9fa] font-sans overflow-hidden">
            <SidebarLayout>
                <nav className="p-4 space-y-1">
                    {applicantMenus.map((menu, index) => (
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

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-10 shrink-0">
                    <div className="md:hidden">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                    <div className="hidden md:block"><span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Portal Pelamar</span></div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <span className="font-medium text-sm hidden sm:block">{user.name}</span>
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
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