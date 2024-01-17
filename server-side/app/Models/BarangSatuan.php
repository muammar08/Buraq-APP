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
        'id_admin',
        'no_resi_satuan',
        'nama_barang',
        'jumlah_barang',
        'nama_penerima',
        'nama_pengirim',
        'alamat_penerima',
        'nohp_penerima',
        'daerah_satuan',
        'pembayaran',
        'harga',
        'status',
        'foto',
    ];

    public function kurir()
    {
        return $this->belongsTo(Kurir::class, 'id_kurir', 'id_kurir');
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin', 'id_admin');
    }
}
