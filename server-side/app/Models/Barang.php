<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_barang';

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

    public function suplier()
    {
        return $this->belongsTo(Suplier::class, 'id_suplier', 'id_suplier');
    }

    public function kurir()
    {
        return $this->belongsTo(Kurir::class, 'id_kurir', 'id_kurir');
    }
}
