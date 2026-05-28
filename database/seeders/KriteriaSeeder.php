<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kriteria;

class KriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dataKriteria = [
            [
                'nama_kriteria' => 'IPK',
                'kode_kriteria' => 'C1',
                'bobot_ahp' => 0.059,
                'tipe' => 'Benefit'
            ],
            [
                'nama_kriteria' => 'Semester',
                'kode_kriteria' => 'C2',
                'bobot_ahp' => 0.085,
                'tipe' => 'Benefit'
            ],
            [
                'nama_kriteria' => 'Jurusan',
                'kode_kriteria' => 'C3',
                'bobot_ahp' => 0.158,
                'tipe' => 'Benefit'
            ],
            [
                'nama_kriteria' => 'Skill',
                'kode_kriteria' => 'C4',
                'bobot_ahp' => 0.278,
                'tipe' => 'Benefit'
            ],
            [
                'nama_kriteria' => 'Proposal Kegiatan',
                'kode_kriteria' => 'C5',
                'bobot_ahp' => 0.420,
                'tipe' => 'Benefit'
            ]
        ];

        foreach ($dataKriteria as $kriteria) {
            Kriteria::create($kriteria);
        };
    }
}
