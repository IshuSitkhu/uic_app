<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

use App\Models\PasswordResetOtp;
use App\Mail\PasswordResetOtpMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use App\Models\UserDetail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated =$request->validate([
            'name' => ['required', 'string','min:3', 'max:255'],
            'username' =>['required', 'string', 'min:3','max:255', 'unique:users,username',],
            'mobile_number' =>['required', 'regex:/^9[678]\d{8}$/', 'digits:10', 'unique:users,mobile_number',],
            'email' =>['required', 'string', 'email:rfc,dns','max:255','unique:users,email',],
            'password' => ['required', 'confirmed',
                            Password::min(8)
                            ->mixedCase()
                            ->numbers()
                            ->symbols(),
                        ],

        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'mobile_number' => $validated['mobile_number'],
            'email' => $validated['email'],
            'password'=> Hash::make($validated['password']),
            'role' => 'user',
            'status' => 'active',
        ]);

        UserDetail::create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Registration successful.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'mobile_number' => $user->mobile_number,
                'email' => $user->email,
            ],

        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate(
        [
            'email'=>['required','email','max:255',],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        if (!Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $token = $user->createToken('mobile-app')->plainTextToken;

        return response()->json([
            'message' => 'Login Successful.',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'mobile_number' => $user->mobile_number,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->currentAccessToken();

        // if($accessToken && method_exists($accessToken, 'delete')){
        //     $accessToken->delete();
        // }

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user()->load('profile');

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'mobile_number' => $user->mobile_number,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,

                'profile' => $user->profile ? [
                    'address' => $user->profile->address,
                    'gender' => $user->profile->gender,
                    'profile_pic' => $user->profile->profile_pic,
                    'dob' => $user->profile->dob?->format('Y-m-d'),
                ] : null,
            ],
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'username' => [
                'required',
                'string',
                'min:3',
                'max:255',
                'unique:users,username,' . $user->id,
            ],

            'mobile_number' => [
                'required',
                'regex:/^9[678]\d{8}$/',
                'digits:10',
                'unique:users,mobile_number,' . $user->id,
            ],

            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
                'unique:users,email,' . $user->id,
            ],

            'gender' => [
                'nullable',
                'string',
                'max:50',
            ],

            'address' => [
                'nullable',
                'string',
                'max:255',
            ],

            'dob' => [
                'nullable',
                'date',
                'before_or_equal:today',
            ],
        ]);

        // Update users table
        $user->update([
            'username' => $validated['username'],
            'mobile_number' => $validated['mobile_number'],
            'email' => $validated['email'],
        ]);

        // Update user_details table
        $user->profile()->updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'gender' => $validated['gender'] ?? null,
                'address' => $validated['address'] ?? null,
                'dob' => $validated['dob'] ?? null,
            ]
        );

        // Get fresh data
        $user->load('profile');

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'mobile_number' => $user->mobile_number,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,

                'profile' => $user->profile ? [
                    'address' => $user->profile->address,
                    'gender' => $user->profile->gender,
                    'profile_pic' => $user->profile->profile_pic,
                    'dob' => $user->profile->dob?->format('Y-m-d'),
                ] : null,
            ],
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'No account found with this email address.',
            ], 404);
        }

        // Generate a 6-digit OTP
        $otp = (string) random_int(100000, 999999);

        // Delete previous OTP
        PasswordResetOtp::where('email', $user->email)->delete();

        // Store new OTP
        PasswordResetOtp::create([
            'email' => $user->email,
            'otp' => $otp,
            'expires_at' => Carbon::now()->addMinutes(10),
        ]);

        // Send OTP email
        Mail::to($user->email)->send(
            new PasswordResetOtpMail($otp)
        );

        return response()->json([
            'message' => 'A password reset code has been sent to your email.',
        ]);
    }


    public function verifyOtp(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'otp' => ['required', 'digits:6'],
        ]);

        //Find a matching OTP
        $resetOtp = PasswordResetOtp::where('email', $validated['email'])
            ->where('otp', $validated['otp'])
            ->first();

        if (!$resetOtp) {
            return response()->json([
                'message' => 'Invalid verification code.',
            ], 422);
        }

        //check wheather otp expried
        if ($resetOtp->expires_at->isPast()) {
            $resetOtp->delete();

            return response()->json([
                'message' => 'This verification code has expired.',
            ], 422);
        }

        // Generate temporary reset token
        $resetToken = Str::random(64);

        $resetOtp->update([
            'token' => $resetToken,
        ]);

        return response()->json([
            'message' => 'OTP verified successfully.',
            'reset_token' => $resetToken,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'reset_token' => ['required', 'string'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        // Find the reset request
        $resetOtp = PasswordResetOtp::where('email', $validated['email'])
            ->where('token', $validated['reset_token'])
            ->first();

        if (!$resetOtp) {
            return response()->json([
                'message' => 'Invalid or expired password reset request.',
            ], 422);
        }

        if ($resetOtp->expires_at->isPast()) {
            $resetOtp->delete();

            return response()->json([
                'message' => 'The password reset request has expired.',
            ], 422);
        }

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        if (Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Your new password cannot be the same as your previous password.',
            ], 422);
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        // Delete the reset OTP/token so it cannot be reused
        $resetOtp->delete();

        return response()->json([
            'message' => 'Password reset successfully.',
        ]);
    }
}
