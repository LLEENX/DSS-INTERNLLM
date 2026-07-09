<?php

namespace App\Services;

class SPKService
{
    /**
     * ==========================================
     * SAW (Simple Additive Weighting)
     * ==========================================
     */
    public function calculateSAW(iterable $pelamarData, array $weights, array $criteriaTypes): array
    {
        $results = [];
        $dataArray = json_decode(json_encode($pelamarData), true);
        
        if (empty($dataArray)) {
            return [];
        }

        // Kunci kriteria: c1, c2, c3, c4, c5
        $criteriaKeys = ['c1', 'c2', 'c3', 'c4', 'c5'];
        $maxValues = [];
        $minValues = [];

        // 1. Cari nilai Max dan Min
        foreach ($criteriaKeys as $key) {
            $columnValues = array_column($dataArray, $key);
            $maxValues[$key] = !empty($columnValues) ? max($columnValues) : 0;
            $minValues[$key] = !empty($columnValues) ? min($columnValues) : 0;
        }

        // 2. Proses Normalisasi & Skor Akhir
        foreach ($dataArray as $pelamar) {
            $normalized = [];
            $finalScore = 0;

            foreach ($criteriaKeys as $index => $key) {
                $val = isset($pelamar[$key]) ? (float) $pelamar[$key] : 0;
            
                $type = strtolower(trim($criteriaTypes[$index])); 

                // Rumus Normalisasi SAW
                if ($type === 'benefit') {
                    $norm = ($maxValues[$key] != 0) ? ($val / $maxValues[$key]) : 0;
                } else { // 'cost'
                    $norm = ($val != 0) ? ($minValues[$key] / $val) : 0;
                }

                $normalized[$key] = $norm;
                $finalScore += $norm * $weights[$index];
            }

            $pelamar['nilai_normalisasi'] = $normalized;
            $pelamar['nilai_preferensi_v'] = round($finalScore, 4);
            $results[] = $pelamar;
        }

        // Perangkingan (Urutkan nilai_preferensi_v dari terbesar ke terkecil)
        usort($results, function ($a, $b) {
            return $b['nilai_preferensi_v'] <=> $a['nilai_preferensi_v'];
        });

        // Pemberian Peringkat
        foreach ($results as $index => $pelamar) {
            $results[$index]['ranking'] = $index + 1;
        }

        return $results;
    }
}