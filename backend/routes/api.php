<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\CountryController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Public\PublicJobController;
use App\Http\Controllers\Public\PublicSeoController;
use App\Http\Controllers\Public\PublicTaxonomyController;

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);

        Route::post('/upload/company-logo', [UploadController::class, 'uploadCompanyLogo']);

        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('countries', CountryController::class);
        Route::apiResource('cities', CityController::class);
        Route::apiResource('jobs', JobController::class);
        Route::apiResource('seo', SeoController::class)->only(['index', 'store', 'update']);
    });
});

// PUBLIC JOBS API (no auth)
Route::get('/jobs', [PublicJobController::class, 'index']);
Route::get('/jobs/{job}', [PublicJobController::class, 'show']);

// PUBLIC TAXONOMY API (no auth)
Route::get('/taxonomies/categories', [PublicTaxonomyController::class, 'categories']);
Route::get('/taxonomies/countries', [PublicTaxonomyController::class, 'countries']);
Route::get('/taxonomies/countries/{iso2}/cities', [PublicTaxonomyController::class, 'citiesByCountryIso2']);

// PUBLIC SEO API (no auth)
Route::get('/seo/page', [PublicSeoController::class, 'page']);
Route::get('/seo/job/{id}', [PublicSeoController::class, 'job']);
