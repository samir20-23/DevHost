<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LinkController;

 

Route::get('/', [LinkController::class, 'index']);
Route::post('/store', [LinkController::class, 'store']);
