<?php

namespace App\Http\Controllers\Admin;

use App\Models\Job;
use App\Models\City;
use App\Models\Country;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\JobStoreRequest;

class JobController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Job::with(['category', 'country', 'city'])
                ->latest()
                ->paginate(20)
        );
    }

    public function store(JobStoreRequest $request): JsonResponse
    {
        $categoryName = $request->string('category_name')->toString();
        $countryName = $request->string('country_name')->toString();
        $cityName = $request->filled('city_name') ? $request->string('city_name')->toString() : null;

        $category = Category::query()->firstOrCreate(
            ['name' => $categoryName],
            ['slug' => Str::slug($categoryName)]
        );

        $country = Country::query()->firstOrCreate(
            ['name' => $countryName],
            [
                'iso2' => strtoupper(substr($countryName, 0, 2)),
                'is_active' => true,
                'sort_order' => 0,
            ]
        );

        $city = null;
        if ($cityName) {
            $city = City::query()->firstOrCreate(
                ['country_id' => $country->id, 'name' => $cityName],
                ['slug' => Str::slug($cityName), 'is_active' => true, 'sort_order' => 0]
            );
        }

        $job = Job::query()->create([
            'category_id' => $category->id,
            'country_id' => $country->id,
            'city_id' => $city?->id,

            'company_name' => $request->string('company_name')->toString(),
            'company_logo_path' => $request->input('company_logo_path'),

            'title' => $request->string('title')->toString(),
            'description' => $request->string('description')->toString(),
            'requirements' => $request->input('requirements'),

            'location_text' => $request->input('location_text'),
            'apply_url' => $request->string('apply_url')->toString(),

            'seo_title' => $request->input('seo_title'),
            'seo_description' => $request->input('seo_description'),

            'published_at' => $request->input('published_at'),
        ]);

        return response()->json($job->load(['category', 'country', 'city']), 201);
    }

    public function show(Job $job): JsonResponse
    {
        return response()->json($job->load(['category', 'country', 'city']));
    }

    public function update(JobStoreRequest $request, Job $job): JsonResponse
    {
        $categoryName = $request->string('category_name')->toString();
        $countryName = $request->string('country_name')->toString();
        $cityName = $request->filled('city_name') ? $request->string('city_name')->toString() : null;

        $category = Category::query()->firstOrCreate(
            ['name' => $categoryName],
            ['slug' => Str::slug($categoryName)]
        );

        $country = Country::query()->firstOrCreate(
            ['name' => $countryName],
            [
                'iso2' => strtoupper(substr($countryName, 0, 2)),
                'is_active' => true,
                'sort_order' => 0,
            ]
        );

        $city = null;
        if ($cityName) {
            $city = City::query()->firstOrCreate(
                ['country_id' => $country->id, 'name' => $cityName],
                ['slug' => Str::slug($cityName), 'is_active' => true, 'sort_order' => 0]
            );
        }

        $job->update([
            'category_id' => $category->id,
            'country_id' => $country->id,
            'city_id' => $city?->id,

            'company_name' => $request->string('company_name')->toString(),
            'company_logo_path' => $request->input('company_logo_path'),

            'title' => $request->string('title')->toString(),
            'description' => $request->string('description')->toString(),
            'requirements' => $request->input('requirements'),

            'location_text' => $request->input('location_text'),
            'apply_url' => $request->string('apply_url')->toString(),

            'seo_title' => $request->input('seo_title'),
            'seo_description' => $request->input('seo_description'),

            'published_at' => $request->input('published_at'),
        ]);

        return response()->json($job->load(['category', 'country', 'city']));
    }

    public function destroy(Job $job): JsonResponse
    {
        $job->delete();

        return response()->json(['message' => 'Job deleted']);
    }
}
