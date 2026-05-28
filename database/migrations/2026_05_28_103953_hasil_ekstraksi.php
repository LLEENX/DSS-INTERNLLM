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
        Schema::create('hasil_ekstraksi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelamar_id')->constrained()->onDelete('cascade');
            $table->text('teks_mentah')->nullable();
            $table->json('raw_entitas_ner')->nullable();
            $table->float('skor_jurusan')->default(0);
            $table->integer('jumlah_skill')->default(0);
            $table->float('skor_proposal')->default(0);
            $table->string('status_proses', ['tertunda', 'memproses', 'berhasil', 'gagal'])->default('tertunda');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_ekstraksi');
    }
};
