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
        'id_admin',
        'no_resi',
        'nama_barang',
        'jumlah_barang',
        'nama_penerima',
        'alamat_penerima',
        'nohp_penerima',
        'daerah_barang',
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

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin', 'id_admin');
    }
}
