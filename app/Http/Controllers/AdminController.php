<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalMasuk = DB::table('users')->where('role', 'pelamar')->count();

        // Hitung jumlah pelamar yang sudah diproses AI/SPK 
        $sudahDinilai = DB::table('hasil_seleksi')->count();

        // Kuota Lulus
        $kuotaLulus = 20;

        // Menggabungkan (join) tabel hasil_seleksi, hasil_ekstraksi, pelamar dan users
        $topRankings = DB::table('pelamar')
            ->leftjoin('users', 'pelamar.user_id', '=', 'users.id')
            ->leftjoin('hasil_seleksi', 'pelamar.id', '=', 'hasil_seleksi.pelamar_id')
            ->leftjoin('hasil_ekstraksi', 'pelamar.id', '=', 'hasil_ekstraksi.pelamar_id')
            ->select(
                'pelamar.nama_lengkap as nama',
                'pelamar.asal_universitas as instansi',
                'hasil_seleksi.nilai_preferensi_v',
                'hasil_seleksi.status'
            )
            ->orderBy('hasil_seleksi.nilai_preferensi_v', 'desc')
            // Ambil 5 data ranking teratas dari database
            ->limit(5)
            ->get();

        // 5. Kirim data ke komponen React
        return Inertia::render('Admin/DashboardAdmin', [
            'statistik' => [
                'totalMasuk' => $totalMasuk,
                'sudahDinilai' => $sudahDinilai,
                'kuotaLulus' => $kuotaLulus,
            ],
            'topRankings' => $topRankings
        ]);
    }

    public function dataPelamar()
    {
        $dataPelamar = DB::table('pelamar')
            ->leftjoin('users', 'pelamar.user_id', '=', 'users.id')
            ->select(
                'pelamar.id',
                'pelamar.nama_lengkap',
                'pelamar.asal_universitas',
                'pelamar.jurusan',
                'pelamar.ipk',
                'pelamar.semester',
                'pelamar.path_cv',
                'pelamar.path_proposal',
            )
            ->orderBy('pelamar.id', 'asc')
            ->get();

        return Inertia::render('Admin/DataPelamar', [
            'datapelamar' => $dataPelamar
        ]);
    }


}
