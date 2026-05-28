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
        Schema::create('pelamar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nama_lengkap');
            $table->string('nim')->unique();
            $table->string('asal_universitas');
            $table->string('prodi');
            $table->enum('jenjang', ['D3', 'D4', 'S1']);
            $table->float('ipk');
            $table->integer('semester');
            $table->string('path_cv');
            $table->string('path_proposal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelamar');
    }
};
