<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    if (Auth::check()) {
        // Jika admin, lempar ke dashboard admin
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        // Jika pelamar, lempar ke dashboard pelamar
        return redirect()->route('pelamar.dashboard');
    }

    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Wadah rute khusus Admin
    // Route::prefix('admin')->group(function () {
    //     Route::get('/dashboard', function () {
    //         return Inertia::render('Admin/DashboardAdmin');
    //     })->name('admin.dashboard');
    // });

    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    });

    Route::prefix('pelamar')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Pelamar/DashboardPelamar');
        })->name('pelamar.dashboard');
    });

});

require __DIR__.'/auth.php';
