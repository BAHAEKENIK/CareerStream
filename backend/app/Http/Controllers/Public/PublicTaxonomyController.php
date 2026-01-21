<?php

namespace App\Http\Controllers\Public;

use App\Models\City;
use App\Models\Country;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class PublicTaxonomyController extends Controller
{
    public function categories(): JsonResponse
    {
        $categories = Category::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function countries(): JsonResponse
    {
        $countries = Country::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'iso2', 'flag_emoji']);

        return response()->json([
            'countries' => $countries,
        ]);
    }

    public function citiesByCountryIso2(string $iso2): JsonResponse
    {
        $iso2 = strtoupper(trim($iso2));

        $country = Country::query()
            ->active()
            ->where('iso2', $iso2)
            ->firstOrFail(['id', 'name', 'iso2', 'flag_emoji']);

        $cities = City::query()
            ->where('country_id', $country->id)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'country_id']);

        return response()->json([
            'country' => $country,
            'cities' => $cities,
        ]);
    }
}
