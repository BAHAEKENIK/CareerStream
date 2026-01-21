<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CompanyLogoUploadRequest;

class UploadController extends Controller
{
    public function uploadCompanyLogo(CompanyLogoUploadRequest $request): JsonResponse
    {
        $file = $request->file('file');

        $filename = Str::uuid()->toString() . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs('company-logos', $filename, 'public');

        return response()->json([
            'path' => $path, // store this in jobs.company_logo_path
            'url' => asset('storage/' . $path),
        ], 201);
    }
}
