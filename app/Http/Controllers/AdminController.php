<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

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
            ->leftJoin('hasil_ekstraksi', 'pelamar.id', '=', 'hasil_ekstraksi.pelamar_id')
            ->select(
                'pelamar.id',
                'pelamar.nama_lengkap',
                'pelamar.asal_universitas',
                'pelamar.nim',
                'pelamar.prodi',
                'pelamar.jenjang',
                'pelamar.semester',
                'pelamar.path_cv',
                'pelamar.path_proposal',
                'hasil_ekstraksi.ipk_ekstraksi'
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
        $pelamar = DB::table('pelamar')->where('id', $id)->first();
        
        // menghapus data user
        if ($pelamar) {
            DB::table('pelamar')->where('id', $id)->delete();
            DB::table('users')->where('id', $pelamar->user_id)->delete();
        }

        return redirect()->back();
    }

    public function editPelamar(Request $request, $id)
    {
        // Kumpulkan data untuk di-update ke tabel PELAMAR
        $updatePelamar = [
            'nama_lengkap' => $request->nama_lengkap,
            'asal_universitas' => $request->asal_universitas,
            'nim' => $request->nim,
            'jenjang' => $request->jenjang,
            'prodi' => $request->prodi,
            'semester' => $request->semester,
        ];

        if ($request->hasFile('path_cv')) {
            $updatePelamar['path_cv'] = $request->file('path_cv')->store('berkas_cv', 'public');
        }

        if ($request->hasFile('path_proposal')) {
            $updatePelamar['path_proposal'] = $request->file('path_proposal')->store('berkas_proposal', 'public');
        }

        // Eksekusi update ke tabel pelamar
        DB::table('pelamar')->where('id', $id)->update($updatePelamar);

        // Mengubah IPK, simpan ke tabel HASIL_EKSTRAKSI
        if ($request->has('ipk')) {
            // Ubah koma jadi titik
            $ipkBersih = str_replace(',', '.', $request->ipk);
            
            DB::table('hasil_ekstraksi')->updateOrInsert(
                ['pelamar_id' => $id],
                [
                    'ipk_ekstraksi' => (float) $ipkBersih,
                    'updated_at' => now()
                ]
            );
        }

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
                'pelamar.semester',
                'pelamar.path_cv',
                'pelamar.path_proposal',
                'hasil_ekstraksi.ipk_ekstraksi as c1',
                'hasil_ekstraksi.skor_jurusan as c3',
                'hasil_ekstraksi.jumlah_skill as c4',
                'hasil_ekstraksi.skor_proposal as c5',
                'hasil_ekstraksi.teks_mentah',
                'hasil_ekstraksi.status_proses'
            )
            ->get();

        return Inertia::render('Admin/Penilaian', [
            'datapelamar' => $datapelamar
        ]);
    }

    // Fungsi NLP
    public function prosesNLP(Request $request)
    {
        $pelamarId = $request->id;
        $type = $request->type; 
        
        $pelamar = DB::table('pelamar')->where('id', $pelamarId)->first();
        $filePath = public_path('storage/' . ($type == 'cv' ? $pelamar->path_cv : $pelamar->path_proposal));

        try {
            $response = Http::attach(
                'file', file_get_contents($filePath), basename($filePath)
            )->post('http://127.0.0.1:8001/predict-' . $type, [
                'pelamar_id' => $pelamarId
            ]);

            if ($response->successful()) {
                $result = $response->json();
                
                $updateData = [
                    'status_proses' => 'berhasil',
                    'updated_at' => now()
                ];

                if ($type == 'cv') {
                    if (isset($result['ipk'])) $updateData['ipk_ekstraksi'] = (float) str_replace(',', '.', $result['ipk']);
                    if (isset($result['skor_jurusan'])) $updateData['skor_jurusan'] = $result['skor_jurusan'];
                    if (isset($result['jumlah_skill'])) $updateData['jumlah_skill'] = $result['jumlah_skill'];
                }

                if ($type == 'proposal') {
                    if (isset($result['skor_proposal'])) $updateData['skor_proposal'] = $result['skor_proposal'];
                    
                    if (isset($result['teks_mentah'])) {
                        $updateData['teks_mentah'] = $result['teks_mentah'];
                    }
                }
                
                DB::table('hasil_ekstraksi')->updateOrInsert(
                    ['pelamar_id' => $pelamarId],
                    $updateData
                );

                return redirect()->back()->with('success', 'Analisis AI Berhasil');
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal terhubung ke server AI');
        }
    }

}
