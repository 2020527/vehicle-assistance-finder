<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    //

    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'image' => 'required | image | max: 2048'
        ]);

        if ($validator->fails()) {
            return response($validator->errors(), 400);
        }

        $fileName = $request->file('image')->getClientOriginalName();
        $filePath = '/storage/app/'.$request->file('image')->store('public');

        $photo = new Photo();

        $photo->name = $fileName;
        $photo->path = $filePath;

        $photo -> save();

        return response($photo, 200);
    }
}
