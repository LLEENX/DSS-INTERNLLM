<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use App\Services\SPKService;
use Illuminate\Http\File;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Promptable;
use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Files\Document;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Barryvdh\DomPDF\Facade\Pdf;

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

        // ========================================================
        // LOGIKA 1: JIKA TIPE = CV (Arahkan ke FastAPI Python)
        // ========================================================
        if ($type == 'cv') {
            try {
                $response = Http::attach(
                    'file', file_get_contents($filePath), basename($filePath)
                )->post('http://127.0.0.1:8001/predict-cv', [
                    'pelamar_id' => $pelamarId
                ]);

                if ($response->successful()) {
                    $result = $response->json();
                    
                    DB::table('hasil_ekstraksi')->updateOrInsert(
                        ['pelamar_id' => $pelamarId],
                        [
                            'ipk_ekstraksi' => isset($result['ipk']) ? (float) str_replace(',', '.', $result['ipk']) : null,
                            'skor_jurusan' => $result['skor_jurusan'] ?? 1,
                            'jumlah_skill' => $result['jumlah_skill'] ?? 1,
                            'status_proses' => 'berhasil',
                            'updated_at' => now()
                        ]
                    );

                    return redirect()->back()->with('success', 'CV Berhasil Dianalisis');
                }
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Gagal terhubung ke server FastAPI');
            }
        }

        // ========================================================
        // LOGIKA 2: JIKA TIPE = PROPOSAL (Arahkan ke GEMINI SDK)
        // ========================================================
        if ($type == 'proposal') {
            try {
                $agent = new class implements Agent, HasStructuredOutput {
                    use Promptable;

                    public function instructions(): string
                    {
                        return 'Berperanlah sebagai Seorang penilai peserta magang pada Badan Pusat Statistik yang sangat profesional. Baca dokumen proposal penelitian ini. 
                        Berikan penilaian skala 1, 3, dan 5 berdasarkan orisinalitas dan kelayakan. Kategori yang digunakan untuk penilaian adalah kejelasan dan ketepatan rencana kegiatan yang dilakukan selama magang di tempat magang. Beri penilaian seketat mungkin dan dengan kategori penilaian yang sesuai.
                        Dimana dengan penilaian tempat magang, pekerjaan atau project yang akan dilakukan peserta magang harus jelas dan sesuai dengan tujuan magang dan tentunya sesuai dengan di BPS.
                        Seperti:
                        1. Ahli dalam bidang Teknologi dan Teknologi Informasi
                        2. Dapat menganalisis pada bidang Statistik dan Analisis Data
                        3. Dapat membantu mendesain konten dan juga editing publikasi. 
                        Berikan penilaian yang objektif dan profesional.
                        Deskripsikan secara singkat alasan penilaian yang diberikan. Lalu buatkan ringkasan singkat dalam maksimal 500 kalimat.';
                    }

                    // Definisi struktur JSON yang HARUS dikembalikan oleh Gemini
                    public function schema(JsonSchema $schema): array
                    {
                        return [
                            'skor_proposal' => $schema->integer()->min(1)->max(5)->required(),
                            'teks_mentah' => $schema->string()->required(),
                        ];
                    }
                };

                // Prompting Agen & Melampirkan File PDF
                $response = $agent->prompt(
                    'Tolong analisis dan nilai dokumen proposal yang saya lampirkan ini sesuai instruksimu.',
                    provider: Lab::Gemini,
                    model: 'gemini-3.5-flash',
                    attachments: [
                        Document::fromPath($filePath)
                    ]
                );

                // Simpan ke database (Laravel AI otomatis mengubah response menjadi Array)
                DB::table('hasil_ekstraksi')->updateOrInsert(
                    ['pelamar_id' => $pelamarId],
                    [
                        // Langsung akses array berkat HasStructuredOutput
                        'skor_proposal' => $response['skor_proposal'] ?? 1,
                        'teks_mentah' => $response['teks_mentah'] ?? 'Berhasil dinilai, namun tidak ada ringkasan.',
                        'status_proses' => 'berhasil',
                        'updated_at' => now()
                    ]
                );

                return redirect()->back()->with('success', 'Proposal Berhasil Dinilai oleh Gemini');

            } catch (\Exception $e) {
                dd([
                    'pesan_error' => 'Gagal terhubung ke Gemini',
                    'detail_asli' => $e->getMessage(),
                    'baris_error' => $e->getLine(),
                    'file_error'  => $e->getFile()
                ]);
                
                // return redirect()->back()->with('error', 'Gagal... ');
            }
        }
    }

    public function hasilSeleksi()
    {
        // Ambil data hasil seleksi dari database
        $hasilSeleksi = DB::table('pelamar')
        ->leftjoin('hasil_seleksi', 'pelamar.id', '=', 'hasil_seleksi.pelamar_id')
        ->select(
            'pelamar.id',
            'pelamar.nama_lengkap',
            'pelamar.asal_universitas',
            'hasil_seleksi.nilai_preferensi_v',
            'hasil_seleksi.status'
        )
        // ->orderBy('hasil_seleksi.ranking', 'asc')
        ->orderBy('pelamar.id', 'asc')
        ->get();

    return Inertia::render('Admin/HasilSeleksi', [
        'hasilSeleksi' => $hasilSeleksi
    ]);
    }

    public function prosesSeleksi(SPKService $spkService)
    {
        // ==========================================
        // 1. AMBIL BOBOT & TIPE KRITERIA DARI DATABASE
        // ==========================================
        // Asumsi tabelmu bernama 'kriteria' dan berurutan dari C1 sampai C5
        $kriteria = DB::table('kriteria')->orderBy('kode_kriteria', 'asc')->get();
        
        if ($kriteria->count() !== 5) {
            return redirect()->back()->with('error', 'Sistem membutuhkan tepat 5 kriteria untuk diproses.');
        }

        $weights = [];
        $criteriaTypes = [];

        foreach ($kriteria as $k) {
            // Asumsi nama kolom di tabelmu: 'bobot_ahp' dan 'tipe'
            $weights[] = (float) $k->bobot_ahp; 
            $criteriaTypes[] = $k->tipe; // 'Benefit' atau 'Cost'
        }

        // ==========================================
        // AMBIL DATA PELAMAR
        // ==========================================
        $pelamarData = DB::table('pelamar')
            ->leftJoin('hasil_ekstraksi', 'pelamar.id', '=', 'hasil_ekstraksi.pelamar_id')
            ->select(
                'pelamar.id',
                'pelamar.nama_lengkap',
                'hasil_ekstraksi.ipk_ekstraksi as c1',
                'pelamar.semester as c2', 
                'hasil_ekstraksi.skor_jurusan as c3',
                'hasil_ekstraksi.jumlah_skill as c4',
                'hasil_ekstraksi.skor_proposal as c5'
            )
            ->whereNotNull('hasil_ekstraksi.ipk_ekstraksi')
            ->whereNotNull('hasil_ekstraksi.skor_proposal')
            ->get();

        if ($pelamarData->isEmpty()) {
            return redirect()->back()->with('error', 'Belum ada data pelamar yang siap diseleksi (nilai AI belum lengkap).');
        }

        // ==========================================
        // EKSEKUSI SAW & SIMPAN KE DATABASE
        // ==========================================
        $hasilSAW = $spkService->calculateSAW($pelamarData, $weights, $criteriaTypes);

        $kuotaPenerimaan = 10;

        foreach ($hasilSAW as $hasil) {
            $statusAkhir = ($hasil['ranking'] <= $kuotaPenerimaan) ? 'Lulus' : 'Tidak Lulus';
            
            DB::table('hasil_seleksi')->updateOrInsert(
                ['pelamar_id' => $hasil['id']],
                [
                    'nilai_preferensi_v' => $hasil['nilai_preferensi_v'],
                    'ranking'  => $hasil['ranking'],
                    'status' => $statusAkhir,
                    'updated_at' => now()
                ]
            );
        }

        return redirect()->back()->with('success', 'Perhitungan SAW berhasil! Cek halaman Hasil Seleksi.');
    }

    public function exportPDF()
    {
        // Mengambil data perangkingan SAW terbaru
        $laporan = DB::table('hasil_seleksi')
            ->join('pelamar', 'hasil_seleksi.pelamar_id', '=', 'pelamar.id')
            ->select('pelamar.nama_lengkap', 'pelamar.nim', 'pelamar.asal_universitas', 'pelamar.prodi', 'hasil_seleksi.nilai_preferensi_v', 'hasil_seleksi.ranking', 'hasil_seleksi.status')
            ->orderBy('hasil_seleksi.ranking', 'asc')
            ->get();

        // Merender ke view murni blade khusus cetak cetak
        $pdf = Pdf::loadView('pdf.laporan_seleksi', compact('laporan'));
        
        // Mendownload otomatis saat rute diakses
        return $pdf->download('Laporan_Hasil_Seleksi_Magang_' . now()->format('Y-m-d') . '.pdf');
    }

}
