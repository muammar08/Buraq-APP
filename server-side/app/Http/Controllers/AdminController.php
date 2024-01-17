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
            ->whereNull('barangs.foto')
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
            ->whereNull('barang_satuans.foto')
            ->select('barang_satuans.*')
            ->get()->toArray();

        return response()->json([
            'success' => true,
            'data' => $barangSatuan,
        ], 200);
    }

    public function adminDaerahUpFoto(Request $request, Barang $barang) {
        $authenticatedAdmin = Auth::user();
        $admin = Admin::where('id_user', $authenticatedAdmin->id)->select('id_admin')->first(); // Use first() instead of get()

        $validator = Validator::make($request->all(), [
            'foto' => 'image|mimes:jpeg,png,jpg,gif|max:5000',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $barang = Barang::where('id_barang', $barang->id_barang)->first();
    
        if (!$barang) {
            return response()->json(['message' => 'Barang not found'], 400);
        }
    
        $uploadFile = $request->file('foto');
    
        $filename = time() . '.' . $uploadFile->getClientOriginalExtension();
    
        $uploadFile->move(public_path() . '/img/', $filename);
    
        $barang->update([
            'foto' => $filename,
            'status' => 'berhasil',
            'id_admin' => $admin->id_admin,
        ]);
    
        return response()->json([
            'message' => 'Barang updated successfully',
            'data' => $barang,
        ], 200);
    } 
    
    public function adminDaerahUpFotoSatuan(Request $request, BarangSatuan $satuan) {
        $authenticatedAdmin = Auth::user();
        $admin = Admin::where('id_user', $authenticatedAdmin->id)->select('id_admin')->first(); // Use first() instead of get()

        $validator = Validator::make($request->all(), [
            'foto' => 'image|mimes:jpeg,png,jpg,gif|max:5000',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $satuan = BarangSatuan::where('id_satuan', $satuan->id_satuan)->first();
    
        if (!$satuan) {
            return response()->json(['message' => 'Barang not found'], 400);
        }
    
        $uploadFile = $request->file('foto');
    
        $filename = time() . '.' . $uploadFile->getClientOriginalExtension();
    
        $uploadFile->move(public_path() . '/img/', $filename);
    
        $satuan->update([
            'foto' => $filename,
            'status' => 'berhasil',
            'id_admin' => $admin->id_admin,
        ]);
    
        return response()->json([
            'message' => 'Barang updated successfully',
            'data' => $satuan,
        ], 200);
    }  
}
