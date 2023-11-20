<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Barang;
use App\Models\BarangSatuan;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class ResiController extends Controller
{
    public function cekResi(Request $request) {

        try {
            $validator = Validator::make($request->all(), [
                'no_resi' => 'required|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid request. Missing or invalid parameters.',
                ], 400);
            }

            $noResi = $request->input('no_resi');
            $result = Barang::select('no_resi', 'nama_barang', 'daerah_barang', 'status')
                            ->where('no_resi', $noResi);

            $result = $result->union(
                BarangSatuan::select('no_resi_satuan as no_resi', 'nama_barang as nama_barang', 'daerah_satuan as daerah_barang', 'status as status')
                            ->where('no_resi_satuan', $noResi)
            );

            $finalResult = $result->first();
            if ($finalResult) {
                // Nomor resi ditemukan, kembalikan respons sukses
                return response()->json([
                    'success' => true,
                    'data' => $finalResult,
                ], 200);
            } else {
                // Nomor resi tidak ditemukan di kedua tabel
                return response()->json([
                    'success' => false,
                    'message' => 'Nomor resi tidak ditemukan.',
                ], 404);
            }
        } catch (\Exception $e) {
            // Tangani kesalahan
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
