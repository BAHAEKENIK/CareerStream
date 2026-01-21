<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryStoreRequest;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Category::query()
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get()
        );
    }

    public function store(CategoryStoreRequest $request): JsonResponse
    {
        $name = $request->string('name')->toString();

        $category = Category::query()->create([
            'name' => $name,
            'slug' => Str::slug($name),
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => (int) $request->input('sort_order', 0),
        ]);

        return response()->json($category, 201);
    }

    public function show(Category $category): JsonResponse
    {
        return response()->json($category);
    }

    public function update(CategoryStoreRequest $request, Category $category): JsonResponse
    {
        $name = $request->string('name')->toString();

        $category->update([
            'name' => $name,
            'slug' => Str::slug($name),
            'is_active' => $request->boolean('is_active', $category->is_active),
            'sort_order' => (int) $request->input('sort_order', $category->sort_order),
        ]);

        return response()->json($category);
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();

        return response()->json(['message' => 'Category deleted']);
    }
}
