<?php

use App\Http\Controllers\LanguagesController;
use Illuminate\Support\Facades\Route;

// Show all languages (index)
Route::get('/languages', [LanguagesController::class, 'index'])->name('languages.index');

// Show the description of a language
Route::get('/languages/{id}/description', [LanguagesController::class, 'description'])->name('languages.description');

// Show the edit form for a language
Route::get('/languages/{id}/edit', [LanguagesController::class, 'edit'])->name('languages.edit');

// Update the language details
Route::post('/languages/{id}/update', [LanguagesController::class, 'update'])->name('languages.update');

// Update the status (for understanding, example, and learning)
Route::post('/languages/{id}/status', [LanguagesController::class, 'updateStatus'])->name('languages.updateStatus');

// Show the create form for a new language
Route::get('/languages/create', [LanguagesController::class, 'create'])->name('languages.create');

// Store a new language
Route::post('/languages', [LanguagesController::class, 'store'])->name('languages.store');
Route::get('/languages/{id}/edit', [LanguagesController::class, 'edit'])->name('languages.edit');
