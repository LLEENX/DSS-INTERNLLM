import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';

export default function SidebarLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const routeHome = user.role === 'admin' ? route('admin.dashboard') : route('applicant.dashboard');
    const isHomeActive = route().current('admin.dashboard') || route().current('applicant.dashboard');
    const isDataPelamarActive = route().current('admin.data-pelamar');
    const isHasilSeleksiActive = route().current('admin.hasil-seleksi');

    return (
        <aside className="w-60 bg-white border-r dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col justify-between z-20 hidden md:flex transition-colors duration-200">
            <div>
                {/* Brand Logo */}
                <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        <h1 className="text-lg font-bold text-gray-800 dark:text-white tracking-wide uppercase">
                            SPK SAW
                        </h1>
                    </div>
                </div>

                <main>
                    {children}
                </main>
            </div>
        </aside>
    );
}