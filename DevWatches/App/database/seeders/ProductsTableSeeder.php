<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Rolex Submariner',
                'description' => 'Une montre de luxe résistante à l\'eau.',
                'price' => 95000,
                'category_id' => 1,
                'quantity' => 10,
            ],
            [
                'name' => 'Tag Heuer Carrera',
                'description' => 'Montre de sport élégante et robuste.',
                'price' => 45000,
                'category_id' => 2,
                'quantity' => 15,
            ],
            [
                'name' => 'Casio G-Shock',
                'description' => 'Montre ultra résistante pour le sport et l\'aventure.',
                'price' => 2500,
                'category_id' => 2,
                'quantity' => 20,
            ],
            [
                'name' => 'Omega Seamaster',
                'description' => 'Une montre élégante et étanche pour les professionnels.',
                'price' => 80000,
                'category_id' => 1,
                'quantity' => 8,
            ],
            [
                'name' => 'Seiko Presage',
                'description' => 'Montre classique japonaise avec un design raffiné.',
                'price' => 12000,
                'category_id' => 3,
                'quantity' => 12,
            ],
        ]);
    }
}
