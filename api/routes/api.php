<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (){
    Route::post('/register', [AuthController::class,'register',])->middleware('throttle:5,1')->name('register');
    Route::post('/login', [AuthController::class, 'login',])->middleware('throttle:5,1');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:5,1');
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp'])->middleware('throttle:5,1');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:5,1');

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::put('profile', [AuthController::class, 'updateProfile']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     $user = $request->user();

//     return response()->json([
//         'user' => [
//             'id' => $user->id,
//             'name' => $user->name,
//             'username' => $user->username,
//             'mobile_number' => $user->mobile_number,
//             'email' => $user->email,
//         ],
//     ]);
// });
