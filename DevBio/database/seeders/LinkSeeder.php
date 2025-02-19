<?php

use Illuminate\Database\Seeder;
use App\Models\Link;

class LinkSeeder extends Seeder
{
    public function run()
    {
        $links = [
            // Social Media
            ['title' => 'Twitter', 'url' => 'https://x.com/Samir_Germany1'],
            ['title' => 'Instagram', 'url' => 'https://www.instagram.com/samir_devgenius/'],
            ['title' => 'Facebook', 'url' => 'https://web.facebook.com/profile.php?id=100022274520025'],
            ['title' => 'WhatsApp', 'url' => 'https://wa.me/212718087106'],
            ['title' => 'LinkedIn', 'url' => 'https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/'],

            // Projects
            ['title' => 'GitHub_attacka', 'url' => 'https://github.com/samir20-23/devgenius-attack_app'],
            ['title' => 'GitHub', 'url' => 'https://github.com/samir20-23'],
            ['title' => 'Portfolio', 'url' => './portfolio.html'],
            ['title' => 'Latest Work', 'url' => 'https://github.com/samir20-23?tab=repositories'],

            // Content
            ['title' => 'Store', 'url' => 'https://samir20-23.github.io/DevStore/DevStore/index.html'],
            ['title' => 'YouTube', 'url' => 'https://github.com/samir20-23/samir20-23'],
            ['title' => 'Blog', 'url' => 'https://github.com/samir20-23/samir20-23'],
            ['title' => 'Tutorials', 'url' => 'https://github.com/samir20-23/samir20-23'],
        ];

        foreach ($links as $link) {
            Link::create($link);
        }
    }
}
