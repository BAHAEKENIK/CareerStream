<?php

namespace App\Http\Controllers\Admin;

use App\Models\SeoMeta;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class SeoController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            SeoMeta::query()
                ->orderBy('page_key')
                ->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'page_key' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'canonical_url' => ['nullable', 'url', 'max:255'],
        ]);

        $seo = SeoMeta::query()->create($data);

        return response()->json($seo, 201);
    }

    public function update(Request $request, SeoMeta $seo): JsonResponse
    {
        $data = $request->validate([
            'page_key' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'canonical_url' => ['nullable', 'url', 'max:255'],
        ]);

        $seo->update($data);

        return response()->json($seo);
    }
}
