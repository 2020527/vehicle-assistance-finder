<?php

namespace App\Http\Controllers;

use App\Models\Mechanics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MechanicsController extends Controller
{
    //

    public function index()
    {
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
            'proficiency' => 'required',
            'image' => 'required'
        ]);

        if ($validator->fails()) {
            return response($validator->errors(), 400);
        }

        if ($files = $request->file('image')) {
            $file = $request->file->store('public/images');

            if (!$file) {
                return response('Unable to save file', 500);
            }

            $data['image'] = $file;

            $mechanic = Mechanics::create($data);

            if (!$mechanic) {
                return response('Unable to add mechanic into database', 500);
            }

            return response($mechanic, 200);
        }
    }
}
