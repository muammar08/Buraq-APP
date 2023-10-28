<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Kurir;
use App\Models\Suplier;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class KurirController extends Controller
{
    protected $user;

    public function __construct() {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getKurir() {

        $kurir = Kurir::get([
            'id_kurir',
            'nama_kurir',
        ])->toArray();

        return response()->json([
            'success' => true,
            'data' => $kurir
        ], 200);
    }

    public function setKurir(Request $request) {

        $validator = $this->validate($request, [
            'id_kurir' => 'required|integer',
            'select' => 'required|array',
        ]);

        $kurir = $request->id_kurir;
        $selected = $request->select;

        Barang::whereIn('id_barang', $selected)->update(['id_kurir' => $kurir]);

        return response()->json([
            'success' => true,
            'message' => 'Success Update'
        ], 200);
    }

    public function kurirDash(Request $request) {
        // Mendapatkan user ID dari user yang login
        $user = auth()->user();

        // Mencari ID Kurir berdasarkan user ID
        $kurir = Kurir::where('id_user', $user->id)->first();

        // Jika Kurir tidak ditemukan, kembalikan respon dengan pesan
        if (!$kurir) {
            return response()->json([
                'success' => false,
                'message' => 'Kurir not found for this user',
            ], 404);
        }

        // Mengambil barang yang dimiliki oleh Kurir berdasarkan ID Kurir
        $barangKurir = Barang::where('id_kurir', $kurir->id_kurir)->get();

        return response()->json([
            'success' => true,
            'data' => $barangKurir
        ], 200);
    } 
}
