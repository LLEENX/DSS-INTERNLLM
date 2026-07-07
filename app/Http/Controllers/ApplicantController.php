<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    public function dashboard()
    {
        // Gunakan Auth::id() yang 100% aman
        $pelamar = DB::table('pelamar')->where('user_id', Auth::id())->first();
        
        return Inertia::render('Applicant/DashboardApplicant', [
            'hasApplied' => $pelamar ? true : false,
        ]);
    }

    public function profil()
    {
        $pelamar = DB::table('pelamar')->where('user_id', Auth::id())->first();
        
        return Inertia::render('Applicant/ProfileApplicant', [
            'hasApplied' => $pelamar ? true : false,
            'pelamarData' => $pelamar
        ]);
    }

    public function status()
    {
        $pelamar = DB::table('pelamar')
            ->leftJoin('hasil_seleksi', 'pelamar.id', '=', 'hasil_seleksi.pelamar_id')
            ->leftJoin('hasil_ekstraksi', 'pelamar.id', '=', 'hasil_ekstraksi.pelamar_id')
            ->where('pelamar.user_id', Auth::id())
            ->select('pelamar.*', 'hasil_seleksi.status as status_akhir', 'hasil_ekstraksi.status_proses')
            ->first();

        return Inertia::render('Applicant/StatusApplicant', [
            'pelamar' => $pelamar
        ]);
    }

    public function submitApplication(Request $request)
    {
        $sudahMelamar = DB::table('pelamar')->where('user_id', Auth::id())->exists();
    
        if ($sudahMelamar) {
            return redirect()->route('applicant.status')->with('error', 'Anda sudah terdaftar di sistem!');
        }
        
        // 1. Validasi disesuaikan dengan database baru
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nim' => 'required|string|max:50|unique:pelamar,nim',
            'asal_universitas' => 'required|string|max:255',
            'prodi' => 'required|string|max:255',
            'jenjang' => 'required|in:D3,D4,S1',
            'semester' => 'required|integer|min:1|max:14',
            'file_cv' => 'required|file|mimes:pdf|max:2048', 
            'file_proposal' => 'required|file|mimes:pdf|max:5120', 
        ]);

        try {
            DB::beginTransaction();
            
            $pathCv = $request->file('file_cv')->storeAs('dokumen/cv', time() . '_cv_' . $request->file('file_cv')->getClientOriginalName(), 'public');
            $pathProposal = $request->file('file_proposal')->storeAs('dokumen/proposal', time() . '_prop_' . $request->file('file_proposal')->getClientOriginalName(), 'public');

            // 2. Insert ke tabel pelamar
            $pelamarId = DB::table('pelamar')->insertGetId([
                'user_id' => Auth::id(),
                'nama_lengkap' => $request->nama_lengkap,
                'nim' => $request->nim,
                'asal_universitas' => $request->asal_universitas,
                'prodi' => $request->prodi,
                'jenjang' => $request->jenjang,
                'semester' => $request->semester,
                'path_cv' => $pathCv, 
                'path_proposal' => $pathProposal,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('hasil_ekstraksi')->insert([
                'pelamar_id' => $pelamarId,
                'ipk_ekstraksi' => 0,
                'status_proses' => 'menunggu',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::commit();
            return redirect()->route('applicant.status')->with('success', 'Profil dan Dokumen berhasil dikirim!');

        } catch (\Exception $e) {
            DB::rollBack();
            // JURUS DEBUG: Matikan sistem dan cetak pesan error murni dari Database!
            dd("ERROR DATABASE: " . $e->getMessage()); 
        }
    }
}