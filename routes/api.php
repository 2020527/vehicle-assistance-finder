<?php

use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\GarageController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\RequestsController;
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

Route::group(['prefix' => 'garages'], function() {
    Route::get('', [GarageController::class, 'index']);
    Route::get('/{id}', [GarageController::class, 'show']);
    Route::post('', [GarageController::class, 'store']);

    Route::post('/update/{id}', [GarageController::class, 'update']);
    Route::post('/delete/{id}', [GarageController::class, 'destroy']);
});

Route::group(['prefix' => 'requests'], function() {
    Route::get('', [RequestsController::class, 'index']);
    Route::get('/{id}', [RequestsController::class, 'show']);
    Route::post('', [RequestsController::class, 'store']);

    Route::post('/update/{id}', [RequestsController::class, 'update']);
    Route::post('/delete/{id}', [RequestsController::class, 'destroy']);
});

Route::group(['prefix' => 'images'], function() {
    Route::post('', [ImageController::class, 'store']);
});

Route::group(['prefix' => 'user'], function() {
    Route::post('/login', [UserAuthController::class, 'login']);
    Route::post('/register', [UserAuthController::class, 'register']);
    Route::get('/current-user', [UserAuthController::class, 'getUser']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
