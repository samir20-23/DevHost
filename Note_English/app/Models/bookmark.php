<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class bookmark extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'word_id'];
}
