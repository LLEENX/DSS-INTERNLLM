<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    /**
     * Menampilkan Halaman Formulir Pendaftaran
     */
    public function showRegistrationForm()
    {
        return Inertia::render('Applicant/Register');
    }

    /**
     * Memproses Data Pendaftaran & Upload File
     */
    public function register(Request $request)
    {
        // 1. VALIDASI INPUT & FILE (PENTING!)
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'asal_universitas' => 'required|string|max:255',
            'semester' => 'required|integer|min:1|max:14',
            // File harus PDF, maks 2MB untuk CV, 5MB untuk Proposal
            'file_cv' => 'required|file|mimes:pdf|max:2048', 
            'file_proposal' => 'required|file|mimes:pdf|max:10240', 
        ], [
            // Pesan Error
            'file_cv.mimes' => 'Dokumen CV harus berformat PDF.',
            'file_cv.max' => 'Ukuran CV tidak boleh melebihi 2MB.',
            'file_proposal.mimes' => 'Dokumen Proposal harus berformat PDF.',
            'file_proposal.max' => 'Ukuran Proposal tidak boleh melebihi 10MB.',
        ]);

        try {
            DB::beginTransaction();

            // MENANGANI UNGGAHAN FILE
            // File disimpan di storage/app/public/dokumen/...
            // Kita menggunakan disk 'public' agar bisa diakses oleh Admin
            
            $pathCv = null;
            if ($request->hasFile('file_cv')) {
                $file = $request->file('file_cv');
                // Beri nama unik: id_waktu_namafile.pdf
                $fileName = time() . '_cv_' . $file->getClientOriginalName();
                $pathCv = $file->storeAs('dokumen/cv', $fileName, 'public');
            }

            $pathProposal = null;
            if ($request->hasFile('file_proposal')) {
                $file = $request->file('file_proposal');
                $fileName = time() . '_proposal_' . $file->getClientOriginalName();
                $pathProposal = $file->storeAs('dokumen/proposal', $fileName, 'public');
            }

            // SIMPAN DATA KE TABEL PELAMAR
            $pelamarId = DB::table('pelamar')->insertGetId([
                'nama_lengkap' => $request->nama_lengkap,
                'nim' => $request->nim,
                'asal_universitas' => $request->asal_universitas,
                'semester' => $request->semester,
                'path_cv' => $pathCv,
                'path_proposal' => $pathProposal,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // BUAT BARIS KOSONG DI TABEL SPK (hasil_ekstraksi)
            // Ini agar Admin bisa melihat pelamar baru di tabel Penilaian AI
            DB::table('hasil_ekstraksi')->insert([
                'pelamar_id' => $pelamarId,
                'status_proses' => 'menunggu', // Status awal
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::commit();

            // Redirect kembali ke halaman pendaftaran dengan pesan sukses
            return redirect()->route('daftar.show')->with('success', 'Pendaftaran berhasil! Data dan dokumen Anda telah kami terima.');

        } catch (\Exception $e) {
            DB::rollBack();
            // Jika gagal, hapus file yang mungkin sudah terlanjur ter-upload
            if ($pathCv) Storage::disk('public')->delete($pathCv);
            if ($pathProposal) Storage::disk('public')->delete($pathProposal);

            return redirect()->back()->with('error', 'Terjadi kesalahan sistem: ' . $e->getMessage());
        }
    }
}