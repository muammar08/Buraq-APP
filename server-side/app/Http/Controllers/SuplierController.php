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

class SuplierController extends Controller
{
    protected $user;

    public function __construct() {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getSuplier() {

        $suplier = Suplier::get([
            'id_suplier',
            'nama_suplier',
        ])->toArray();

        return response()->json([
            'success' => true,
            'data' => $suplier
        ], 200);
    }

    public function suplierDash(Request $request) {

        $user = auth()->user();

        $suplier = Suplier::where('id_user', $user->id)->first();

        if(!$suplier) {
            return response()->json([
                'success' => false,
                'message' => 'Supplier not found for this user' 
            ], 404);
        }

        $barangSuplier = Barang::where('id_suplier', $suplier->id_suplier)->get();
        
        return response()->json([
            'success' => true,
            'data' => $barangSuplier
        ], 200);
    }
}
