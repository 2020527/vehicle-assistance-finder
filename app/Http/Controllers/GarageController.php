<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Garage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class GarageController extends Controller
{
    //

    public function index(Request $request)
    {
        $pincode = (int) $request->pincode;
        $garageName = Str::lower($request->garage);
        $address = Str::lower($request->address);

        $garages = Garage::query();

        // return response(['pincode' => $pincode, 'garage' => $garageName, 'address' => $address], 200);

        if ($request->pincode) {
            $garages = $garages->where('pincode', 'LIKE', '%' . $pincode . '%');
        }

        if ($request->garage) {
            $garages = $garages->where(DB::raw('lower(title)'), 'LIKE', '%' . $garageName . '%');
        }

        if ($request->address) {
            $garages = $garages->where(DB::raw('lower(address)'), 'LIKE', '%' . $address . '%');
        }

        $data = $garages->get();

        return response($data, 200);
    }

    public function show($id)
    {
        $garage = Garage::where('id', $id)->get()->first();
        if (!$garage) {
            return response(['data' => 'No Garage found with your ID'], 404);
        }

        return response($garage, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'title' => 'required',
            'description' => 'required',
            'address' => 'required',
            'pincode' => 'required',
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


    public function update(Request $request, $id)
    {
        $garage = Garage::where('id', $id)->get()->first();

        if ($garage) {
            $garage->fill($request->all());
            $garage->save();

            return response($garage, 200);
        }

        return response(['data' => 'No Garage found with your ID'], 404);
    }

    public function destroy($id)
    {
        $garage = Garage::where('id', $id)->get()->first();

        if (!$garage) {
            return response(['data' => 'No Garage found with your ID'], 404);
        }

        $garage->delete();
        return response(['data' => 'Garage Deleted Successfully'], 200);
    }
}
