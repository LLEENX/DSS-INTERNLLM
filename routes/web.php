<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicantController;
use App\Services\SPKService;

Route::get('/', function () {
    if (Auth::check()) {
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('pelamar.dashboard');
    }

    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {

    // Route untuk admin
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        // Route untuk data pelamar
        Route::get('/data-pelamar', [AdminController::class, 'dataPelamar'])->name('admin.data-pelamar');
        Route::get('/data-pelamar/{id}/edit', [AdminController::class, 'editPelamar'])->name('admin.data-pelamar.edit');
        Route::post('/admin/data-pelamar/{id}', [AdminController::class, 'editPelamar'])->name('admin.data-pelamar.update');
        Route::delete('/data-pelamar/{id}', [AdminController::class, 'destroyPelamar'])->name('admin.data-pelamar.destroy');
        
        // Route untuk Manajemen Kriteria
        Route::get('/manajemen-kriteria', [AdminController::class, 'manajemenKriteria'])->name('admin.manajemen-kriteria');
        // Rute untuk mengeksekusi update
        Route::put('/manajemen-kriteria/update', [AdminController::class, 'updateKriteria'])->name('admin.manajemen-kriteria.update');
    });

    // Route untuk pelamar
    Route::prefix('applicant')->group(function () {
        Route::get('/dashboard', [ApplicantController::class, 'dashboard'])->name('applicant.dashboard');
        Route::get('/profil', [ApplicantController::class, 'profil'])->name('applicant.profil');
        Route::post('/profil/submit', [ApplicantController::class, 'submitApplication'])->name('applicant.submit');
        Route::get('/status', [ApplicantController::class, 'status'])->name('applicant.status');
    });

    // Route untuk penilaian
    Route::get('/penilaian', [AdminController::class, 'penilaian'])->name('admin.penilaian');
    Route::post('/penilaian/proses-nlp', [AdminController::class, 'prosesNLP'])->name('admin.proses-nlp');

    // Route untuk hasil seleksi
    Route::get('/hasil-seleksi', [AdminController::class, 'hasilSeleksi'])->name('admin.hasil-seleksi');
    Route::post('/hasil-seleksi/eksekusi', [AdminController::class, 'prosesSeleksi'])->name('admin.proses-seleksi-eksekusi');

    // Route untuk proses AHP dan SAW
    Route::post('/proses-ahp-saw', [AdminController::class, 'prosesSeleksi'])->name('admin.proses-spk');

});

require __DIR__ . '/auth.php';
