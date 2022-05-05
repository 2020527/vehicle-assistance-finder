<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserAuthController extends Controller
{
    public function register(Request $request) {
        $data = $request -> all();

        $validator = Validator::make($data, [
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
            'address' => 'required',
            'pinCode' => 'required'
        ]);

        if ($validator -> fails()) {
            return response($validator -> errors(), 400);
        }

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        $token = $user -> createToken('API Token') -> accessToken;

        return response(['user' => $user, 'token' => $token], 200);
    }

    public function login (Request $request) {
        $data = $request -> all();

        $validator = Validator::make($data, [
            'email' => 'required',
            'password' => 'required'
        ]);

        if($validator -> fails()) {
            return response($validator -> errors(), 400);
        }

        if (!auth() -> attempt($data)) {
            return response('Invalid creadentials, please try again', 401);
        }

        $user = $request -> user();

        $token = $user -> createToken('API Token') -> accessToken;

        return response(['user' => auth() -> user(), 'token' => $token], 200);
    }


    public function getUser(Request $request) {
        $user = $request -> user();

        if (!$user) {
            return response('No User found, please try again', 401);
        }

        return response($user, 200);
    }
}
