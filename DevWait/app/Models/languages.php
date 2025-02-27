<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class languages extends Model
{
    protected $fillable = ['name', 'logo', 'description', 'understand', 'example', 'learning', 'github_link'];
}
