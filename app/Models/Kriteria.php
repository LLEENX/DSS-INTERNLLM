<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kriteria extends Model
{
    protected $fillable = [
        'nama_kriteria',
        'kode_kriteria',
        'bobot_ahp',
        'tipe'
    ];
}
