<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HasilEkstraksi extends Model
{
    protected $table = 'hasil_ekstraksis';

    protected $fillable = [
        'pelamar_id', 'raw_entitas_ner', 'skor_jurusan', 'jumlah_skill',
        'teks_mentah', 'skor_proposal', 'status_proses'
    ];

    protected $casts = [
        'raw_entitas_ner' => 'array',
    ];

    // Relasi balik ke Pelamar
    public function pelamar(): BelongsTo
    {
        return $this->belongsTo(Pelamar::class);
    }

}
