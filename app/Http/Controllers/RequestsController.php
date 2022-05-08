<?php

namespace App\Http\Controllers;

use App\Models\Garage;
use App\Models\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequestsController extends Controller
{
    //

    public function index(Request $request)
    {
        $user = auth()->guard('api')->user();

        if (!$user) {
            return response(['data' => 'You are not logged in'], 401);
        }

        $requests = Requests::where('user_id', $user->id)->get();

        if (!$requests) {
            return response(['data' => 'No Requests found on you'], 404);
        }

        foreach ($requests as $request) {
            $request['user'] = $user;
            $request['garage'] = Garage::where('id', $request->garage_id)->get()->first();
        }

        return response($requests, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $user = auth()->guard('api')->user();
        if (!$user) {
            return response('You are not logged in, please try again', 400);
        }
        $validator = Validator::make($data, [
            'garage_id' => 'required',
            'requested_date' => 'required',
            'requested_address' => 'required',
            'requested_pincode' => 'required',
            'repair_for' => 'required'
        ]);


        if ($validator->fails()) {
            return response($validator->errors(), 400);
        }

        $data['user_id'] = $user->id;
        $request = Requests::create($data);
        return response($request, 200);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->guard('api')->user();
        $data = $request->all();

        if (!$user) {
            return response(['data' => 'You are not loggedin'], 401);
        }

        $request1 = Requests::where('id', $id)->get()->first();
        if (!$request1) {
            return response(['data' => 'Request not found with given ID'], 404);
        }

        $data['user_id'] = $user->id;
        $request1->fill($data);
        $request1->save();

        $request1['user'] = $user;
        $request1['garage'] = Garage::where('id', $data['garage_id'])->get()->first();

        return response($request1, 200);
    }

    public function destroy($id)
    {
        $request = Requests::where('id', $id)->get()->first();

        $request -> delete();

        return response($request, 200);
    }
}
