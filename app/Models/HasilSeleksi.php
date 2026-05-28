<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HasilSeleksi extends Model
{
    protected $table = 'hasil_seleksi';

    protected $fillable = [
        'pelamar_id',
        'nilai_preferensi_v',
        'rangking',
        'status'
    ];

    // Relasi balik ke Pelamar
    public function pelamar(): BelongsTo
    {
        return $this->belongsTo(Pelamar::class);
    }
}
