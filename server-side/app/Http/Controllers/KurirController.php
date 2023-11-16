<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Kurir;
use App\Models\Suplier;
use App\Models\BarangSatuan;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
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

        $kurir = Kurir::get()->toArray();

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

    public function setKurirSatuan(Request $request) {

        $validator = $this->validate($request, [
            'id_kurir' => 'required|integer',
            'select' => 'required|array',
        ]);

        $kurir = $request->id_kurir;
        $selected = $request->select;

        BarangSatuan::whereIn('id_satuan', $selected)->update(['id_kurir' => $kurir]);

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
        $barangKurir = Barang::where('id_kurir', $kurir->id_kurir)->where('status', 'proses')->get();
        $satuanKurir = BarangSatuan::where('id_kurir', $kurir->id_kurir)->where('status', 'proses')->get();

        return response()->json([
            'success' => true,
            'data' => $barangKurir,
            'dataSatuan' => $satuanKurir
        ], 200);
    }

    public function uploadFoto(Request $request, Barang $barang) {
        $validator = Validator::make($request->all(), [
            'foto' => 'image|mimes:jpeg,png,jpg,gif', // Adjust file type and size as needed
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $barang = Barang::where('id_barang', $barang->id_barang)->first();
        $satuan = BarangSatuan::where('id_satuan', $satuan->id_satuan)->first();

        if (!$barang) {
            return response()->json(['message' => 'Barang not found'], 404);
        }

        if (!$satuan) {
            return response()->json(['message' => 'Barang not found'], 404);
        }

        // Get the uploaded file
        $uploadedFile = $request->file('foto');

        // Generate a unique filename using a timestamp
        $filename = time() . '.' . $uploadedFile->getClientOriginalExtension();

        // Move the uploaded file to the public directory
        $uploadedFile->move(public_path().'/img', $filename);

        // Update the Barang with the new photo URL and status
        $barang->update([
            'foto' => $filename, // Specify the path to the public directory
            'status' => 'berhasil'
        ]);

        $satuan->update([
            'foto' => $filename,
            'status' => 'berhasil'
        ]);

        return response()->json([
            'message' => 'Barang updated successfully',
            'data' => $barang,
            'dataSatuan' => $satuan
        ], 200);
    } 
}
