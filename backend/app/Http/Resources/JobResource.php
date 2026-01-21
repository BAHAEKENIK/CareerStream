<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $logoPath = $this->company_logo_path;

        return [
            'id' => $this->id,

            'company_name' => $this->company_name,
            'company_logo_url' => $logoPath ? asset('storage/' . $logoPath) : null,

            'title' => $this->title,
            'description' => $this->description,
            'requirements' => $this->requirements,

            'category' => $this->whenLoaded('category', fn () => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
            ]),

            'country' => $this->whenLoaded('country', fn () => [
                'id' => $this->country?->id,
                'name' => $this->country?->name,
                'iso2' => $this->country?->iso2,
                'flag_emoji' => $this->country?->flag_emoji,
            ]),

            'city' => $this->whenLoaded('city', fn () => $this->city ? [
                'id' => $this->city->id,
                'name' => $this->city->name,
                'slug' => $this->city->slug,
            ] : null),

            'location_text' => $this->location_text,
            'apply_url' => $this->apply_url,

            'seo' => [
                'title' => $this->seo_title,
                'description' => $this->seo_description,
            ],

            'published_at' => optional($this->published_at)->toISOString(),
            'created_at' => optional($this->created_at)->toISOString(),
            'updated_at' => optional($this->updated_at)->toISOString(),
        ];
    }
}
