<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetOtp extends Model
{
    protected $fillable = [
        'email',
        'otp',
        'token',
        'expires_at',
    ];

    // Treat expires_at as a date/time rather than just a string.
    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
