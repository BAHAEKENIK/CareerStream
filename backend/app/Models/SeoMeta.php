<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $table = 'seo_metas';

    protected $fillable = [
        'page_key',
        'title',
        'description',
        'canonical_url',
    ];
}
