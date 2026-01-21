<?php

namespace App\Http\Controllers\Public;

use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Resources\JobResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PublicJobController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = (int) $request->input('per_page', 20);
        if ($perPage < 1) {
            $perPage = 20;
        }
        if ($perPage > 50) {
            $perPage = 50;
        }

        $q = trim((string) $request->input('q', ''));
        $category = trim((string) $request->input('category', '')); // slug OR name
        $country = trim((string) $request->input('country', ''));   // iso2 OR name
        $city = trim((string) $request->input('city', ''));         // slug OR name

        $query = Job::query()
            ->with(['category', 'country', 'city'])
            ->whereNotNull('published_at');

        // Keyword search
        if ($q !== '') {
            $query->where(function ($sub) use ($q) {
                $like = '%' . $q . '%';
                $sub->where('title', 'like', $like)
                    ->orWhere('company_name', 'like', $like)
                    ->orWhere('description', 'like', $like)
                    ->orWhere('requirements', 'like', $like);
            });
        }

        // Category filter (visitor searches by category)
        if ($category !== '') {
            $query->whereHas('category', function ($sub) use ($category) {
                $sub->where('slug', $category)->orWhere('name', $category);
            });
        }

        // Country filter (dropdown with flag emoji)
        if ($country !== '') {
            $iso2 = strtoupper($country);
            $query->whereHas('country', function ($sub) use ($country, $iso2) {
                $sub->where('iso2', $iso2)->orWhere('name', $country);
            });
        }

        // City filter (dependent dropdown after country; optional)
        if ($city !== '' && strtolower($city) !== 'all') {
            $query->whereHas('city', function ($sub) use ($city) {
                $sub->where('slug', $city)->orWhere('name', $city);
            });
        }

        $jobs = $query
            ->orderByDesc('published_at')
            ->paginate($perPage)
            ->withQueryString();

        return JobResource::collection($jobs);
    }

    public function show(int $job): JobResource
    {
        // SECURITY FIX: never expose unpublished jobs
        $jobModel = Job::query()
            ->with(['category', 'country', 'city'])
            ->whereNotNull('published_at')
            ->where('id', $job)
            ->firstOrFail();

        return new JobResource($jobModel);
    }
}
