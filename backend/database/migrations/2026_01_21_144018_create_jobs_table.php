<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();

            // Visitor filter fields
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            $table->foreignId('country_id')->constrained('countries')->restrictOnDelete();
            $table->foreignId('city_id')->nullable()->constrained('cities')->nullOnDelete();

            // Job content
            $table->string('company_name');
            $table->string('company_logo_path')->nullable(); // storage path: company-logos/xxx.png
            $table->string('title');
            $table->longText('description');
            $table->longText('requirements')->nullable();

            $table->string('location_text')->nullable(); // optional free text shown on card
            $table->string('apply_url');

            // SEO fields per job
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();

            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index(['category_id', 'country_id', 'city_id']);
            $table->index(['published_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
