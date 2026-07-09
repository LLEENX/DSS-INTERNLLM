<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kriteria;

class KriteriaController extends Controller
{
    public function kalkulasiAHP(Request $request)
    {
        // Ambil data payload dari React
        $data = $request->all();
        $n = 5; // Jumlah kriteria

        // Pemetaan indeks array (C1=0, C2=1, C3=2, C4=3, C5=4)
        $map = ['c1' => 0, 'c2' => 1, 'c3' => 2, 'c4' => 3, 'c5' => 4];
        
        // =================================================================
        // 1) MATRIKS PERBANDINGAN BERPASANGAN
        // =================================================================
        // Inisialisasi Matriks Persegi 5x5 dengan nilai diagonal 1
        $matrix = array_fill(0, $n, array_fill(0, $n, 1));

        $pairs = [
            'c1_c2', 'c1_c3', 'c1_c4', 'c1_c5', 
            'c2_c3', 'c2_c4', 'c2_c5', 
            'c3_c4', 'c3_c5', 
            'c4_c5'
        ];

        // Mengisi matriks dan matriks cerminannya (1/x)
        foreach ($pairs as $pair) {
            $keys = explode('_', $pair); 
            $idx1 = $map[$keys[0]];
            $idx2 = $map[$keys[1]];
            
            $winner = $data[$pair]['winner'];
            $scale = (float) $data[$pair]['scale'];
            
            if ($winner === $keys[0]) {
                $matrix[$idx1][$idx2] = $scale;
                $matrix[$idx2][$idx1] = 1 / $scale;
            } else {
                $matrix[$idx1][$idx2] = 1 / $scale;
                $matrix[$idx2][$idx1] = $scale;
            }
        }

        // =================================================================
        // 2) MENGHITUNG BOBOT PRIORITAS (W)
        // =================================================================
        // a. Perhitungan Normalisasi Total per Kolom
        $colSums = array_fill(0, $n, 0);
        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                $colSums[$j] += $matrix[$i][$j];
            }
        }

        // b. Normalisasi Matriks & Menghitung Bobot Prioritas (W)
        $weights = array_fill(0, $n, 0);
        for ($i = 0; $i < $n; $i++) {
            $rowSum = 0;
            for ($j = 0; $j < $n; $j++) {
                $normalizedVal = $matrix[$i][$j] / $colSums[$j];
                $rowSum += $normalizedVal;
            }
            // Bobot = Rata-rata baris yang dinormalisasi (dibulatkan 3 desimal)
            $weights[$i] = round($rowSum / $n, 3); 
        }

        // =================================================================
        // 3) MENGUKUR KONSISTENSI LOGIS (CR)
        // =================================================================
        // a. Menghitung Nilai Eigen Maksimum (Lambda Max)
        $lambdaMax = 0;
        for ($i = 0; $i < $n; $i++) {
            $lambdaMax += $colSums[$i] * $weights[$i];
        }

        // b. Menghitung Consistency Index (CI)
        $ci = ($lambdaMax - $n) / ($n - 1);

        // c. Menghitung Consistency Ratio (CR)
        $ri = 1.12; // Nilai Random Index untuk n = 5
        $cr = $ci / $ri;

        // Validasi Kelayakan Konsistensi (< 0.1 atau 10%)
        if ($cr > 0.1) {
            $persenCr = round($cr * 100, 2);
            return back()->withErrors([
                'ahp_error' =>
                "Matriks tidak konsisten! Nilai CR mencapai {$persenCr}% (Batas maksimal 10%). Silakan perbaiki logika perbandingan Anda."
            ]);
        }

        // =================================================================
        // 4) SIMPAN KE DATABASE JIKA VALID
        // =================================================================
        Kriteria::where('kode_kriteria', 'C1')->update(['bobot_ahp' => $weights[0]]);
        Kriteria::where('kode_kriteria', 'C2')->update(['bobot_ahp' => $weights[1]]);
        Kriteria::where('kode_kriteria', 'C3')->update(['bobot_ahp' => $weights[2]]);
        Kriteria::where('kode_kriteria', 'C4')->update(['bobot_ahp' => $weights[3]]);
        Kriteria::where('kode_kriteria', 'C5')->update(['bobot_ahp' => $weights[4]]);
         

        return back()->with('success', 'Kalkulasi AHP berhasil! Matriks konsisten dan bobot prioritas telah diperbarui.');
    }
}
