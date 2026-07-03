<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth; // Tambahkan import Auth Facade
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
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'asal_universitas' => 'required|string|max:255',
            'ipk' => 'required|numeric|min:0|max:4',
            'semester' => 'required|integer|min:1|max:14',
            'esai_motivasi' => 'required|string|min:50',
            'file_cv' => 'required|file|mimes:pdf|max:2048', 
            'file_proposal' => 'required|file|mimes:pdf|max:5120', 
        ]);

        try {
            DB::beginTransaction();
            
            $pathCv = $request->file('file_cv')->storeAs('dokumen/cv', time() . '_cv_' . $request->file('file_cv')->getClientOriginalName(), 'public');
            $pathProposal = $request->file('file_proposal')->storeAs('dokumen/proposal', time() . '_prop_' . $request->file('file_proposal')->getClientOriginalName(), 'public');

            $pelamarId = DB::table('pelamar')->insertGetId([
                'user_id' => Auth::id(),
                'nama_lengkap' => $request->nama_lengkap,
                'asal_universitas' => $request->asal_universitas,
                'semester' => $request->semester,
                'esai_motivasi' => $request->esai_motivasi,
                'path_cv' => $pathCv, 
                'path_proposal' => $pathProposal,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('hasil_ekstraksi')->insert([
                'pelamar_id' => $pelamarId,
                'ipk_ekstraksi' => (float) $request->ipk, 
                'status_proses' => 'menunggu',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::commit();
            return redirect()->route('applicant.status')->with('success', 'Profil dan Dokumen berhasil dikirim!');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan sistem: ' . $e->getMessage());
        }
    }
}