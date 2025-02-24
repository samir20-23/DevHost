<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = ['name', 'description', 'price', 'quantity', 'category_id'];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'commandes');
    }

    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
}
