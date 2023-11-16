<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Kurir;
use App\Models\Suplier;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class BarangController extends Controller
{

    protected $user;

    public function __construct() {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function adminDash()
    {
        $barang = Barang::with(['suplier:id_suplier,nama_suplier'])
            ->where('status', 'proses')
            ->get([
                'id_barang',
                'id_suplier',
                'id_kurir',
                'nama_barang',
                'jumlah_barang',
                'nama_penerima',
                'alamat_penerima',
                'nohp_penerima',
                'status',
                'foto',
                'created_at',
                'updated_at',
            ])->toArray();

        return response()->json([
            'success' => true,
            'data' => $barang
        ], 200);
    }

    public function pickKurir(Barang $barang) {

        $barang = Barang::whereNull('id_kurir')->with(['suplier:id_suplier,nama_suplier'])->get();

        if (!$barang) {
            return response()->json([
                'message' => 'Barang not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'succes' => true,
            'data' => $barang
        ], 200);
    }

    public function barangDone() {
        $barang = Barang::where('status', 'berhasil')
            ->with(['suplier:id_suplier,nama_suplier', 'kurir:id_kurir,nama_kurir'])
            ->get();

        if ($barang->isEmpty()) {
            return response()->json([
                'message' => 'Barang not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $barang
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = [
            'id_suplier'      => $request->namaPerusahaan,
            'nama_barang'     => $request->namaBarang,
            'jumlah_barang'   => $request->jumlahBarang,
            'nama_penerima'   => $request->namaPenerima,
            'alamat_penerima' => $request->alamatPenerima,
            'nohp_penerima'   => $request->nohpPenerima
        ];

        $validator = Validator::make($data, [
            'id_suplier'      => 'required|integer',
            'nama_barang'     => 'required|string',
            'jumlah_barang'   => 'required|string',
            'nama_penerima'   => 'required|string',
            'alamat_penerima' => 'required|string',
            'nohp_penerima'   => 'required|string'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $barang = Barang::create($data);

        return response()->json([
            'success'  => true,
            'message'  => 'Barang Created',
            'data'     => $barang
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Barang  $barang
     * @return \Illuminate\Http\Response
     */
    public function show(Barang $barang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Barang  $barang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Barang $barang)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Barang  $barang
     * @return \Illuminate\Http\Response
     */
    public function destroy(Barang $barang)
    {
        //
    }
}
