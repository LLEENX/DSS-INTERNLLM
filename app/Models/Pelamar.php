<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Pelamar extends Model
{
    protected $table = 'pelamar';

    protected $fillable = [
        'user_id', 'nama_lengkap', 'nim', 'asal_universitas', 
        'prodi', 'jenjang', 'ipk', 'semester', 
        'path_cv', 'path_proposal'
    ];

    // Relasi balik ke User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relasi 1-to-1 ke Hasil Ekstraksi
    public function hasilEkstraksi(): HasOne
    {
        return $this->hasOne(HasilEkstraksi::class);
    }

    // Relasi 1-to-1 ke Hasil Seleksi
    public function hasilSeleksi(): HasOne
    {
        return $this->hasOne(HasilSeleksi::class);
    }
}
