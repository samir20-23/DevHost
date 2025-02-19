<?php
namespace Database\Seeders;

use App\Models\Bookmark;
use App\Models\Words;
use Illuminate\Database\Seeder;

class BookmarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bookmark::create([
            'user_id' => 1, // Add the parentheses to call the method
            'word_id' => Words::inRandomOrder()->first()->id, // Get a random word's ID
        ]);
    }
}
