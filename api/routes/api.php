<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (){
    Route::post('/register', [AuthController::class,'register',])->middleware('throttle:5,1')->name('register');
    Route::post('/login', [AuthController::class, 'login',])->middleware('throttle:5,1');
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();

    return response()->json([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'mobile_number' => $user->mobile_number,
            'email' => $user->email,
        ],
    ]);
});
