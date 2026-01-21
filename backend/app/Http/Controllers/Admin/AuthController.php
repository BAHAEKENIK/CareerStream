<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Admin\LoginRequest;
use App\Http\Requests\Admin\ResetPasswordRequest;
use App\Http\Requests\Admin\ForgotPasswordRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $email = $request->string('email')->lower()->toString();
        $password = $request->string('password')->toString();

        $admin = Admin::query()->where('email', $email)->first();

        if (!$admin || !Hash::check($password, $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $admin->forceFill(['last_login_at' => now()])->save();

        $token = $admin->createToken('admin-api')->plainTextToken;

        return response()->json([
            'token' => $token,
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'force_password_change' => (bool) $admin->force_password_change,
            ],
        ]);
    }

    public function me(Request $request)
    {
        /** @var \App\Models\Admin $admin */
        $admin = $request->user();

        return response()->json([
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'force_password_change' => (bool) $admin->force_password_change,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'string', 'min:8'],
            'new_password' => ['required', 'string', 'min:10', 'confirmed'],
        ]);

        /** @var \App\Models\Admin $admin */
        $admin = $request->user();

        if (!Hash::check($request->string('current_password')->toString(), $admin->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        $admin->forceFill([
            'password' => Hash::make($request->string('new_password')->toString()),
            'force_password_change' => false,
        ])->save();

        return response()->json(['message' => 'Password changed']);
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $email = $request->string('email')->lower()->toString();

        $adminExists = Admin::query()->where('email', $email)->exists();

        // Always return same message (no account enumeration)
        if (!$adminExists) {
            return response()->json(['message' => 'If the email exists, a reset token was generated.'], 200);
        }

        $tokenPlain = Str::random(64);
        $tokenHash = Hash::make($tokenPlain);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            ['token' => $tokenHash, 'created_at' => now()]
        );

        // Low-budget + no marketing email: log token (development only)
        logger()->warning('ADMIN_RESET_TOKEN', ['email' => $email, 'token' => $tokenPlain]);

        return response()->json(['message' => 'If the email exists, a reset token was generated.'], 200);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $email = $request->string('email')->lower()->toString();
        $tokenPlain = $request->string('token')->toString();
        $newPassword = $request->string('password')->toString();

        $row = DB::table('password_reset_tokens')->where('email', $email)->first();

        if (!$row || !Hash::check($tokenPlain, (string) $row->token)) {
            return response()->json(['message' => 'Invalid token'], 422);
        }

        $admin = Admin::query()->where('email', $email)->first();

        if (!$admin) {
            return response()->json(['message' => 'Invalid token'], 422);
        }

        $admin->forceFill([
            'password' => Hash::make($newPassword),
            'force_password_change' => false,
        ])->save();

        DB::table('password_reset_tokens')->where('email', $email)->delete();

        return response()->json(['message' => 'Password reset successful']);
    }
}
