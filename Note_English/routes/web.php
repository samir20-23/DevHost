<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WordController;
use Illuminate\Support\Facades\Route;
use App\Models\Bookmark;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Word routes (accessible without authentication)
Route::prefix('word')->group(function () {
    Route::get('/', [WordController::class, 'index'])->name('word.index');
    Route::post('/', [WordController::class, 'store'])->name('word.store');
    Route::get('/{id}/edit', [WordController::class, 'edit'])->name('word.edit');
    Route::put('/{id}', [WordController::class, 'update'])->name('word.update');
    Route::delete('/{id}', [WordController::class, 'destroy'])->name('word.destroy');
});
 
// Routes that require user authentication
Route::middleware('auth')->group(function () {

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Home Routes (Bookmark functionality)
    Route::prefix('home')->group(function () {
        Route::get('/', [HomeController::class, 'index'])->name('home.index');

        // Bookmark routes, saving based on wordId
        Route::post('/save-bookmarks/{wordId}', [HomeController::class, 'saveBookmarks'])->name('home.saveBookmarks');
        // Route::delete('/{id}', [HomeController::class, 'destroy'])->name('home.destroy');
        Route::delete('/home/bookmark/{wordId}', [HomeController::class, 'destroy'])->name('home.destroy');

    });
});

require __DIR__ . '/auth.php';
