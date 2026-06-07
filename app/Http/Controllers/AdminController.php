<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Support\Facades\Storage;

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

        // QUERY GRAFIK: Ambil data riwayat jumlah pendaftar per bulan
        $riwayatPendaftar = DB::table('pelamar')
            ->select(
                DB::raw("DATE_FORMAT(created_at, '%b') as bulan"), 
                DB::raw('COUNT(*) as jumlah')
            )
            ->groupBy(DB::raw("DATE_FORMAT(created_at, '%m')"), DB::raw("DATE_FORMAT(created_at, '%b')"))
            ->orderBy(DB::raw("DATE_FORMAT(created_at, '%m')"), 'asc')
            ->get();

        // Kirim data ke komponen React
        return Inertia::render('Admin/DashboardAdmin', [
            'statistik' => [
                'totalMasuk' => $totalMasuk,
                'sudahDinilai' => $sudahDinilai,
                'kuotaLulus' => $kuotaLulus,
            ],
            'topRankings' => $topRankings,
            'riwayatPendaftar' => $riwayatPendaftar,
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
                'pelamar.nim',
                'pelamar.prodi',
                'pelamar.jenjang',
                'pelamar.ipk',
                'pelamar.semester',
                'pelamar.path_cv',
                'pelamar.path_proposal',
            )
            ->orderBy('pelamar.id', 'asc')
            ->get();

        return Inertia::render('Admin/DataPelamarAdmin', [
            'datapelamar' => $dataPelamar
        ]);
    }


    // Fungsi untuk memproses penghapusan
    public function destroyPelamar($id)
    {
        // Cari data pelamar berdasarkan ID lalu hapus
        DB::table('pelamar')->where('id', $id)->delete();
        
        // menghapus data user
        $pelamar = DB::table('pelamar')->where('id', $id)->first();
        DB::table('users')->where('id', $pelamar->user_id)->delete();

        return redirect()->back();
    }

    public function editPelamar(Request $request, $id)
    {
        $updateData = [
            'nama_lengkap' => $request->nama_lengkap,
            'asal_universitas' => $request->asal_universitas,
            'nim' => $request->nim,
            'ipk' => $request->ipk,
            'jenjang' => $request->jenjang,
            'prodi' => $request->prodi,
            'semester' => $request->semester,
        ];

        // Cek mengunggah file CV baru
        if ($request->hasFile('path_cv')) {
            $pathCV = $request->file('path_cv')->store('berkas_cv', 'public');
            
            $updateData['path_cv'] = $pathCV;
        }

        // Cek mengunggah file Proposal baru
        if ($request->hasFile('path_proposal')) {
            $pathProposal = $request->file('path_proposal')->store('berkas_proposal', 'public');
            $updateData['path_proposal'] = $pathProposal;
        }

        DB::table('pelamar')->where('id', $id)->update($updateData);

        return redirect()->back();
    }

}
