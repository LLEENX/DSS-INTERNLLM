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


    // Fungsi untuk menampilkan halaman Manajemen Kriteria
    public function manajemenKriteria()
    {
        // Ambil data kriteria dari database
        $kriteria = DB::table('kriteria')->orderBy('id', 'asc')->get();

        return Inertia::render('Admin/ManajemenKriteria', [
            'kriteriaData' => $kriteria
        ]);
    }

    // Fungsi untuk menyimpan perubahan masal (Array) dari Modal
    public function updateKriteria(Request $request)
    {
        foreach ($request->items as $item) {
            DB::table('kriteria')->where('id', $item['id'])->update([
                'nama_kriteria' => $item['nama_kriteria'],
                'bobot_ahp' => $item['bobot_ahp'],
                'tipe' => $item['tipe'],
            ]);
        }

        return redirect()->back();
    }

    public function penilaian()
    {
        // Join pelamar dengan hasil_ekstraksi
        $datapelamar = DB::table('pelamar')
            ->leftJoin('hasil_ekstraksi', 'pelamar.id', '=', 'hasil_ekstraksi.pelamar_id')
            ->select(
                'pelamar.id',
                'pelamar.nama_lengkap',
                'pelamar.ipk',
                'pelamar.semester',
                'pelamar.file_cv',
                'pelamar.file_proposal',
                'hasil_ekstraksi.skor_jurusan_final as c3',
                'hasil_ekstraksi.jumlah_skill_init as c4',
                'hasil_ekstraksi.skor_proposal_final as c5',
                'hasil_ekstraksi.status_proses'
            )
            ->get();

        return Inertia::render('Admin/Penilaian', [
            'datapelamar' => $datapelamar
        ]);
    }

// Fungsi Pemicu NLP
    public function prosesNLP(Request $request)
    {
        $pelamarId = $request->id;
        $type = $request->type; // 'cv' atau 'proposal'
        
        // Ambil data pelamar
        $pelamar = DB::table('pelamar')->where('id', $pelamarId)->first();
        $filePath = public_path('storage/' . ($type == 'cv' ? $pelamar->file_cv : $pelamar->file_proposal));

        try {
            // Kirim File ke FastAPI
            // Contoh: http://127.0.0.1:8001/predict
            $response = Http::attach(
                'file', file_get_contents($filePath), basename($filePath)
            )->post('http://127.0.0.1:8001/predict-' . $type, [
                'pelamar_id' => $pelamarId
            ]);

            if ($response->successful()) {
                $result = $response->json();
                
                // 3. Simpan/Update ke tabel hasil_ekstraksi sesuai ERD
                DB::table('hasil_ekstraksi')->updateOrInsert(
                    ['pelamar_id' => $pelamarId],
                    [
                        'skor_jurusan_final' => $result['skor_jurusan'] ?? DB::raw('skor_jurusan_final'),
                        'jumlah_skill_init'  => $result['jumlah_skill'] ?? DB::raw('jumlah_skill_init'),
                        'skor_proposal_final' => $result['skor_proposal'] ?? DB::raw('skor_proposal_final'),
                        'status_proses'      => 'berhasil',
                        'updated_at'         => now()
                    ]
                );
                return redirect()->back()->with('success', 'Analisis AI Berhasil');
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal terhubung ke server AI');
        }
    }

}
