<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datauser = [
            [
                'username' => 'adminspk01',
                'email' => 'admin01@gmail.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ],
            [
                'username' => 'user01',
                'email' => 'user01@gmail.com',
                'password' => Hash::make('01user123'),
                'role' => 'pelamar',
            ],
            [
                'username' => 'user02',
                'email' => 'user02@gmail.com',
                'password' => Hash::make('02user123'),
                'role' => 'pelamar',

            ],
            [
                'username' => 'user03',
                'email' => 'user03@gmail.com',
                'password' => Hash::make('03user123'),
                'role' => 'pelamar',

            ],
            [
                'username' => 'user04',
                'email' => 'user04@gmail.com',
                'password' => Hash::make('04user123'),
                'role' => 'pelamar',

            ],
        ];

        foreach ($datauser as $user) {
            User::create($user);
        }
    }
}
