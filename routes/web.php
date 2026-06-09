<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminController;

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

    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        // Route untuk data pelamar
        Route::get('/data-pelamar', [AdminController::class, 'dataPelamar'])->name('admin.data-pelamar');
        Route::get('/data-pelamar/{id}/edit', [AdminController::class, 'editPelamar'])->name('admin.data-pelamar.edit');
        Route::put('/data-pelamar/{id}', [AdminController::class, 'updatePelamar'])->name('admin.data-pelamar.update');
        Route::delete('/data-pelamar/{id}', [AdminController::class, 'destroyPelamar'])->name('admin.data-pelamar.destroy');
        
        // Route untuk Manajemen Kriteria
        Route::get('/manajemen-kriteria', [AdminController::class, 'manajemenKriteria'])->name('admin.manajemen-kriteria');
        // Rute untuk mengeksekusi update
        Route::put('/manajemen-kriteria/update', [AdminController::class, 'updateKriteria'])->name('admin.manajemen-kriteria.update');
    });

    Route::prefix('pelamar')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Pelamar/DashboardPelamar');
        })->name('pelamar.dashboard');
    });

    // Route untuk penilaian
    Route::get('/penilaian', [AdminController::class, 'penilaian'])->name('admin.penilaian');
    Route::post('/penilaian/proses-nlp', [AdminController::class, 'prosesNLP'])->name('admin.proses-nlp');

});

require __DIR__ . '/auth.php';
