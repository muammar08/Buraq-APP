<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kurir extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kurir',
        'nohp_kurir',
        'alamat_kurir',
        'id_user',
    ];

    public function user() {
        
        return $this->belongsTo(User::class, 'id_user');
    }
}
