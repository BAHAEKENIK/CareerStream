<?php

namespace App\Http\Controllers\Public;

use App\Models\Job;
use App\Models\SeoMeta;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class PublicSeoController extends Controller
{
    public function page(Request $request): JsonResponse
    {
        $key = trim((string) $request->query('key', ''));

        if ($key === '') {
            return response()->json(['message' => 'Missing key'], 422);
        }

        $seo = SeoMeta::query()->where('page_key', $key)->first();

        return response()->json([
            'page_key' => $key,
            'title' => $seo?->title,
            'description' => $seo?->description,
            'canonical_url' => $seo?->canonical_url,
        ]);
    }

    public function job(int $id): JsonResponse
    {
        // Never expose unpublished jobs
        $job = Job::query()
            ->whereNotNull('published_at')
            ->where('id', $id)
            ->firstOrFail();

        return response()->json([
            'page_key' => 'job:' . $job->id,
            'title' => $job->seo_title ?: ($job->title . ' | CareerStream'),
            'description' => $job->seo_description ?: null,
            'canonical_url' => null,
        ]);
    }
}
