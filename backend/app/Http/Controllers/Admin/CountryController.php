<?php

namespace App\Http\Controllers\Admin;

use App\Models\Country;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CountryStoreRequest;

class CountryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Country::query()
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get()
        );
    }

    public function store(CountryStoreRequest $request): JsonResponse
    {
        $country = Country::query()->create([
            'name' => $request->string('name')->toString(),
            'iso2' => strtoupper($request->string('iso2')->toString()),
            'flag_emoji' => $request->input('flag_emoji'),
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => (int) $request->input('sort_order', 0),
        ]);

        return response()->json($country, 201);
    }

    public function show(Country $country): JsonResponse
    {
        return response()->json($country);
    }

    public function update(CountryStoreRequest $request, Country $country): JsonResponse
    {
        $country->update([
            'name' => $request->string('name')->toString(),
            'iso2' => strtoupper($request->string('iso2')->toString()),
            'flag_emoji' => $request->input('flag_emoji'),
            'is_active' => $request->boolean('is_active', $country->is_active),
            'sort_order' => (int) $request->input('sort_order', $country->sort_order),
        ]);

        return response()->json($country);
    }

    public function destroy(Country $country): JsonResponse
    {
        $country->delete();

        return response()->json(['message' => 'Country deleted']);
    }
}
