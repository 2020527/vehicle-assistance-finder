<?php

use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\MechanicsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => 'mechanics'], function() {
    Route::get('', [MechanicsController::class, 'index']);
    Route::post('', [MechanicsController::class, 'store']);
});

Route::group(['prefix' => 'user'], function() {
    Route::post('/login', [UserAuthController::class, 'login']);
    Route::post('/register', [UserAuthController::class, 'register']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
