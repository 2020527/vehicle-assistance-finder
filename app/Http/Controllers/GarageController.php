<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Garage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GarageController extends Controller
{
    //

    public function index()
    {
        $data = DB::table('garages')->get();

        return response($data, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'title' => 'required',
            'description' => 'required',
            'address' => 'required',
            'pinCode' => 'required',
            'rating' => 'required',
            'phone' => 'required',
            'visiting_charges' => 'required',
            'experience_in' => 'required',
            'image' => 'required'
        ]);

        if ($validator->fails()) {
            return response($validator->errors(), 400);
        }

        $mechanic = Garage::create($data);

        if (!$mechanic) {
            return response('Unable to add mechanic into database', 500);
        }

        return response($mechanic, 200);

        return response('Unable to create!', 500);
    }
}
