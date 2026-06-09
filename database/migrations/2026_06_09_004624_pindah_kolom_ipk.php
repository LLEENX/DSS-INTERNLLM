<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Menghapus kolom 'ipk' dari tabel 'pelamar'
        Schema::table('pelamar', function (Blueprint $table) {
            $table->dropColumn('ipk');
        });

        // 2. Menambahkan kolom 'ipk_ekstraksi' ke tabel 'hasil_ekstraksi'
        Schema::table('hasil_ekstraksi', function (Blueprint $table) {
            // Ditambahkan setelah kolom jumlah_skill agar urutannya rapi
            $table->float('ipk_ekstraksi')->nullable()->after('jumlah_skill');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Fungsi down() digunakan jika kita ingin me-rollback (membatalkan) perintah up() di atas
        Schema::table('pelamar', function (Blueprint $table) {
            $table->float('ipk')->nullable();
        });

        Schema::table('hasil_ekstraksi', function (Blueprint $table) {
            $table->dropColumn('ipk_ekstraksi');
        });
    }
};