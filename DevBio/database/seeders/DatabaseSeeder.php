<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Link;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Insert links directly
        $links = [
            ['title' => 'Twitter', 'url' => 'https://x.com/Samir_Germany1', 'category' => 'Social Media', 'icon' => 'fab fa-twitter'],
            ['title' => 'Instagram', 'url' => 'https://www.instagram.com/samir_devgenius/', 'category' => 'Social Media', 'icon' => 'fab fa-instagram'],
            ['title' => 'Facebook', 'url' => 'https://web.facebook.com/profile.php?id=100022274520025', 'category' => 'Social Media', 'icon' => 'fab fa-facebook'],
            ['title' => 'WhatsApp', 'url' => 'https://wa.me/212718087106', 'category' => 'Social Media', 'icon' => 'fab fa-whatsapp'],
            ['title' => 'LinkedIn', 'url' => 'https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/', 'category' => 'Social Media', 'icon' => 'fab fa-linkedin'],

            ['title' => 'GitHub Attack', 'url' => 'https://github.com/samir20-23/devgenius-attack_app', 'category' => 'Projects', 'icon' => 'fab fa-github'],
            ['title' => 'GitHub', 'url' => 'https://github.com/samir20-23', 'category' => 'Projects', 'icon' => 'fab fa-github'],
            ['title' => 'Portfolio', 'url' => './portfolio.html', 'category' => 'Projects', 'icon' => 'fas fa-laptop-code'],
            ['title' => 'Latest Work', 'url' => 'https://github.com/samir20-23?tab=repositories', 'category' => 'Projects', 'icon' => 'fas fa-file-code'],

            ['title' => 'Store', 'url' => 'https://samir20-23.github.io/DevStore/DevStore/index.html', 'category' => 'Content', 'icon' => 'fas fa-store'],
            ['title' => 'YouTube', 'url' => 'https://github.com/samir20-23/samir20-23', 'category' => 'Content', 'icon' => 'fab fa-youtube'],
            ['title' => 'Blog', 'url' => 'https://github.com/samir20-23/samir20-23', 'category' => 'Content', 'icon' => 'fas fa-pen-fancy'],
            ['title' => 'Tutorials', 'url' => 'https://github.com/samir20-23/samir20-23', 'category' => 'Content', 'icon' => 'fas fa-graduation-cap'],
        ];


        foreach ($links as $link) {
            Link::create($link);
        }
    }
}
