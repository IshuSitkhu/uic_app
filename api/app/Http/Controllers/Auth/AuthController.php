<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

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
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->currentAccessToken();

        if($accessToken && method_exists($accessToken, 'delete')){
            $accessToken->delete();
        }

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' =>[
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'mobile_number' => $user->mobile_number,
                'email' => $user->email,
            ]
        ]);
    }
}
