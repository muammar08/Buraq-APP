<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Barang;
use App\Models\Kurir;
use App\Models\Suplier;
use App\Models\BarangSatuan;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    protected $user;

    public function __construct() {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getAdmin() {

        $admin = Admin::get()->toArray();

        return response()->json([
            'success' => true,
            'data' => $admin
        ], 200);
    }

    public function adminDaerah(Barang $barang, BarangSatuan $satuan) {

        $authenticatedAdmin = Auth::user();

        // Retrieve barang data based on the daerah of the authenticated admin
        $barangData = $barang
            ->join('admins', 'barangs.daerah_barang', '=', 'admins.daerah')
            ->where('admins.id_user', $authenticatedAdmin->id)
            ->whereNull('barangs.id_kurir')
            ->select('barangs.*')
            ->get()
            ->toArray();

        return response()->json([
            'success' => true,
            'data' => $barangData,
        ], 200);
    }

    public function adminDaerahSatuan(BarangSatuan $satuan) {

        $authenticatedAdmin = Auth::user();

        // Retrieve barang data based on the daerah of the authenticated admin
        $barangSatuan = $satuan
            ->join('admins', 'barang_satuans.daerah_satuan', '=', 'admins.daerah')
            ->where('admins.id_user', $authenticatedAdmin->id)
            ->whereNull('barang_satuans.id_kurir')
            ->select('barang_satuans.*')
            ->get()->toArray();

        return response()->json([
            'success' => true,
            'data' => $barangSatuan,
        ], 200);
    }
}
