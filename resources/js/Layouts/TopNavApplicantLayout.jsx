import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';

export default function TopNavApplicantLayout({ children }) {
    const user = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State untuk Mode Gelap
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

    const isActive = (routeName) => route().current(routeName);

    const applicantMenus = [
        {
            title: 'Beranda',
            href: route('applicant.dashboard'),
            active: isActive('applicant.dashboard'),
            icon: (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            )
        },
        {
            title: 'Profil Pendaftaran', 
            href: route('applicant.profile'),
            active: isActive('applicant.profile'),
            icon: (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            )
        },
        {
            title: 'Status Seleksi',
            href: route('applicant.status'),
            active: isActive('applicant.status'),
            icon: (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 font-sans flex flex-col transition-colors duration-200">
            
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        
                        <div className="flex">
                            <div className="shrink-0 flex items-center gap-2 mr-10">
                                {/* LOGO BARU */}
                                <svg className="w-10 h-10 text-[#0093DD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight uppercase">Magang<span className="text-[#0093DD]">BPS</span></h1>
                            </div>

                            <nav className="hidden sm:flex sm:space-x-8">
                                {applicantMenus.map((menu, index) => (
                                    <Link
                                        key={index}
                                        href={menu.href}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-base font-bold transition-colors ${
                                            menu.active
                                                ? 'border-[#0093DD] text-[#0093DD]'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                    >
                                        {menu.icon}
                                        {menu.title}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="flex items-center gap-3 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:outline-none transition ease-in-out duration-150">
                                            <div className="flex flex-col text-right">
                                                <span className="font-bold text-gray-800 dark:text-white text-base">{user.name}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pelamar</span>
                                            </div>
                                            {/* Foto Profil / Inisial */}
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0093DD] shadow-sm">
                                                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=0093DD&color=fff`} alt={user.name} className="w-full h-full object-cover" />
                                            </div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-white dark:bg-gray-700 w-56">
                                        {/* 1. Profil (Mengarah ke pengaturan akun bawaan Laravel Breeze) */}
                                        {/* <Dropdown.Link href={route('applicant.edit')} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2.5">
                                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            Profil
                                        </Dropdown.Link> */}
                                        
                                        {/* Logout */}
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2.5">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                            Logout
                                        </Dropdown.Link>

                                        <div className="border-t border-gray-100 dark:border-gray-600 my-1"></div>
                                        
                                        {/* Mode Gelap Toggle */}
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

                        {/* Mobile Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!isMobileMenuOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={isMobileMenuOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white border-t border-gray-200`}>
                    <div className="pt-2 pb-3 space-y-1">
                        {applicantMenus.map((menu, index) => (
                            <Link key={index} href={menu.href} className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium ${menu.active ? 'border-[#0093DD] text-[#0093DD] bg-blue-50' : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'}`}>
                                {menu.icon}
                                {menu.title}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4 gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0093DD]">
                                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=0093DD&color=fff`} alt={user.name} />
                            </div>
                            <div>
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            {/* <Link href={route('applicant.edit')} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Profil</Link> */}
                            <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Logout</Link>
                            <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                                <span className="text-base font-medium text-gray-500">Mode Gelap</span>
                                <button type="button" className={`${darkMode ? 'bg-[#0093DD]' : 'bg-gray-200'} relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}>
                                    <span className={`${darkMode ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {children}
            </main>

            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-200">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-wide">
                        &copy; {new Date().getFullYear()} Rifal Ariya Yusuftrian SPK. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}