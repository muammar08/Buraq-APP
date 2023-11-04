<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\SuplierController;
use App\Http\Controllers\KurirController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('getuser', [AuthController::class, 'getUser']);
    Route::post('registerkurir', [AuthController::class, 'registerKurir']);
    Route::post('registersuplier', [AuthController::class, 'registerSuplier']);
    Route::get('listbarang', [BarangController::class, 'adminDash']);
    Route::get('getsuplier', [SuplierController::class, 'getSuplier']);
    Route::post('createbarang', [BarangController::class, 'store']);
    Route::get('getkurir', [KurirController::class, 'getKurir']);
    Route::get('listforkurir', [BarangController::class, 'pickKurir']);
    Route::post('setkurir', [KurirController::class, 'setKurir']);
    Route::get('riwayat', [BarangController::class, 'barangDone']);

    Route::get('listbarangkurir', [KurirController::class, 'kurirDash']);
    Route::put('upfoto/{barang}', [KurirController::class, 'uploadFoto']);
    Route::get('listbarangsuplier', [SuplierController::class, 'suplierDash']);
});
