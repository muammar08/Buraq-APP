<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_suplier',
        'id_kurir',
        'nama_barang',
        'jumlah_barang',
        'nama_penerima',
        'alamat_penerima',
        'nohp_penerima',
        'status',
        'foto',
    ];
}
