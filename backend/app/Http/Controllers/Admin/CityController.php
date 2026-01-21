<?php

namespace App\Http\Controllers\Admin;

use App\Models\City;
use App\Models\Country;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CityStoreRequest;

class CityController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            City::query()
                ->with(['country:id,name,iso2,flag_emoji'])
                ->orderBy('country_id')
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get()
        );
    }

    public function store(CityStoreRequest $request): JsonResponse
    {
        $countryName = $request->string('country_name')->toString();

        $country = Country::query()->where('name', $countryName)->first();

        if (!$country) {
            return response()->json(['message' => 'Country not found by name'], 422);
        }

        $name = $request->string('name')->toString();

        $city = City::query()->create([
            'country_id' => $country->id,
            'name' => $name,
            'slug' => Str::slug($name),
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => (int) $request->input('sort_order', 0),
        ]);

        return response()->json($city->load(['country:id,name,iso2,flag_emoji']), 201);
    }

    public function show(City $city): JsonResponse
    {
        return response()->json($city->load(['country:id,name,iso2,flag_emoji']));
    }

    public function update(CityStoreRequest $request, City $city): JsonResponse
    {
        $countryName = $request->string('country_name')->toString();

        $country = Country::query()->where('name', $countryName)->first();

        if (!$country) {
            return response()->json(['message' => 'Country not found by name'], 422);
        }

        $name = $request->string('name')->toString();

        $city->update([
            'country_id' => $country->id,
            'name' => $name,
            'slug' => Str::slug($name),
            'is_active' => $request->boolean('is_active', $city->is_active),
            'sort_order' => (int) $request->input('sort_order', $city->sort_order),
        ]);

        return response()->json($city->load(['country:id,name,iso2,flag_emoji']));
    }

    public function destroy(City $city): JsonResponse
    {
        $city->delete();

        return response()->json(['message' => 'City deleted']);
    }
}
