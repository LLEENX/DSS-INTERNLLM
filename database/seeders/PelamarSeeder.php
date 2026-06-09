<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pelamar;

class PelamarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datapelamar = [
            [
                'user_id' => '2',
                'nama_lengkap' => 'Ahmad Bayu',
                'nim' => '22533792',
                'asal_universitas' => 'Universitas Muhammadiyah Ponorogo',
                'prodi' => 'Teknik Informatika',
                'jenjang' => 'S1',
                'semester' => '5',
                'path_cv' => '',
                'path_proposal' => '',
            ],
            [
                'user_id' => '3',
                'nama_lengkap' => 'Shinta Ayu Lestari',
                'nim' => '22533893',
                'asal_universitas' => 'Universitas Muhammadiyah Ponorogo',
                'prodi' => 'Manajemen',
                'jenjang' => 'S1',
                'semester' => '5',
                'path_cv' => '',
                'path_proposal' => '',
            ],
            [
                'user_id' => '4',
                'nama_lengkap' => 'Subekti',
                'nim' => '19942021',
                'asal_universitas' => 'Universitas Islam Negeri Ponorogo',
                'prodi' => 'Manajemen Bisnis Syariah',
                'jenjang' => 'S1',
                'semester' => '7',
                'path_cv' => '',
                'path_proposal' => '',
            ],
            [
                'user_id' => '5',
                'nama_lengkap' => 'user03',
                'nim' => '03user123',
                'asal_universitas' => 'Universitas Gadjah Mada',
                'prodi' => 'Statistika',
                'jenjang' => 'S1',
                'semester' => '5',
                'path_cv' => '',
                'path_proposal' => '',

            ],
        ];

        foreach ($datapelamar as $pelamar) {
            Pelamar::create($pelamar);
        }
    }
}
