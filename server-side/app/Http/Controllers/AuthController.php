<?php

namespace App\Http\Controllers;


use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Models\Kurir;
use App\Models\Suplier;
use App\Models\Admin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function registerKurir(Request $request) {

        $data = $request->only('username', 'roleId', 'password', 'namaKurir', 'nohpKurir', 'alamatKurir');
        $validator = Validator::make($data, [
            'username' => 'required|string',
            'roleId' => 'required|integer',
            'password' => 'required|string|min:6|max:20',
            'namaKurir' => 'required|string',
            'nohpKurir' => 'required|string',
            'alamatKurir' => 'required|string'
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'role_id' => $request->roleId,
            'password' => bcrypt($request->password)
        ]);

        $kurir = new Kurir([
            'nama_kurir' => $request->namaKurir,
            'nohp_kurir' => $request->nohpKurir,
            'alamat_kurir' => $request->alamatKurir
        ]);

        $user->kurir()->save($kurir);

        return response()->json([
            'success' => true,
            'message' => 'User Created Success',
            'data' => $user,
            'dataKurir' => $kurir
        ], 200);
    }

    public function registerSuplier(Request $request) {

        $data = $request->only('username', 'roleId', 'password', 'namaSuplier');
        $validator = Validator::make($data, [
            'username' => 'required|string',
            'roleId' => 'required|integer',
            'password' => 'required|string|min:6|max:20',
            'namaSuplier' => 'required|string'
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 422);
        }


        $user = User::create([
            'username' => $request->username,
            'role_id' => $request->roleId,
            'password' => bcrypt($request->password)
        ]);

        $suplier = new Suplier([
            'nama_suplier' => $request->namaSuplier
        ]);

        $user->suplier()->save($suplier);

        return response()->json([
            'success' => true,
            'message' => 'User Created Success',
            'data' => $user,
            'dataSuplier' => $suplier
        ], 200);
    }

    public function registerAdmin(Request $request) {

        $data = $request->only('username', 'roleId', 'password', 'adminDaerah', 'daerah');
        $validator = Validator::make($data, [
            'username' => 'required|string',
            'roleId' => 'required|integer',
            'password' => 'required|string|min:6|max:20',
            'adminDaerah' => 'required|string',
            'daerah' => 'required|string'
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'role_id' => $request->roleId,
            'password' => bcrypt($request->password)
        ]);

        $admin = new Admin([
            'admin_daerah' => $request->adminDaerah,
            'daerah' => $request->daerah,
        ]);

        $user->admin()->save($admin);

        return response()->json([
            'success' => true,
            'message' => 'User Created Success',
            'data' => $user,
            'dataAdmin' => $admin
        ], 200);
    }

    public function login(Request $request) {

        $credentials = $request->only('username', 'password');

        $validator = Validator::make($credentials, [
            'username' => 'required|string',
            'password' => 'required|string|min:6|max:20'
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 400);
        }

        try{
            if(! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Login credentials are invalid',
                ], 400);
            }
        } catch (JWTException $e) {
            return $credentials;
            return response()->json([
                'success' => false,
                'message' => 'Could not create token',
            ], 500);
        }

        $user = JWTAuth::user();

        return response()->json([
            'success' => true,
            'data' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request) {

        $validator = Validator::make($request->only('token'), [
            'token' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 422);
        }

        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User has been logout'
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user cannot be logout'
            ], 500);
        }
    }

    public function getUser(Request $request) {


        try {
            $user = JWTAuth::authenticate($request->token);

            return response()->json([
                'user' => $user
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Authentication failed'
            ], 401);
        }
    }
}
