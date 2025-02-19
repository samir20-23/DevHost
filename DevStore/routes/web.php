<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
// 😑😑😐😐😐😑😑😑
Route::get('/', function () {
    return view('index');
});
Route::get('/Devstore', function () {
    return view('index');
});
Route::get('/product', function () {
    return view('index');
});
Route::middleware('auth')->group(function () {
});

    Route::resource('/',  function () {
        return view('index');
    });


require __DIR__.'/auth.php';

    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('/dashboard', function () {
    //     return view('admin.dashboard');
    // })->name('dashboard');

    // Route::resource('categories', CategoryController::class);
    // Route::resource('products', ProductController::class);
    // Route::delete('products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');


