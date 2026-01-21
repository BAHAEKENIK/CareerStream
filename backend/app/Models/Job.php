<?php

namespace App\Models;

use App\Models\City;
use App\Models\Country;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Job extends Model
{
    protected $fillable = [
        'category_id',
        'country_id',
        'city_id',
        'company_name',
        'company_logo_path',
        'title',
        'description',
        'requirements',
        'location_text',
        'apply_url',
        'seo_title',
        'seo_description',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }
}
