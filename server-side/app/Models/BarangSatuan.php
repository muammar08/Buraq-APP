<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarangSatuan extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_satuan';

    protected $fillable = [
        'id_kurir',
        'no_resi_satuan',
        'nama_barang',
        'jumlah_barang',
        'nama_penerima',
        'alamat_penerima',
        'nohp_penerima',
        'pembayaran',
        'harga',
        'status',
        'foto',
    ];

    public function kurir()
    {
        return $this->belongsTo(Kurir::class, 'id_kurir', 'id_kurir');
    }
}
