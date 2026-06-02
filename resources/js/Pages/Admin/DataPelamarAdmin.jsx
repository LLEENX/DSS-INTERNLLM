import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head } from '@inertiajs/react';

export default function DashboardAdmin({ statistik, topRankings }) {
    const namaBulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date());
    const tahun = new Date().getFullYear();

    return (
        <DashboardAdminLayout>
            <Head title="Dashboard Admin" />
            <div className="max-w-7xl mx-auto mt-2 mb-6 space-y-6">

    );