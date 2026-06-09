<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class SPKService
{
    // Logika perhitungan AHP untuk mendapatkan bobot kriteria
    public function hitungAHP() 
    {
        // Masukkan algoritma AHP di sini
    }

    // Logika perhitungan SAW
    public function hitungSAW()
    {
        // 1. Ambil bobot dari hitungAHP()
        // 2. Ambil nilai alternatif dari tabel hasil_ekstraksi
        // 3. Normalisasi matriks
        // 4. Hitung nilai preferensi (V)
    }
}