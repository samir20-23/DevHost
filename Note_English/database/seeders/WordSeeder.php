<?php

namespace Database\Seeders;

use App\Models\Words;
use Illuminate\Database\Seeder;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $words = [
            ['word' => 'parentheses', 'translation' => 'أقواس', 'language' => 'english<->arabic'],
            ['word' => 'facing', 'translation' => 'مواجهة', 'language' => 'english<->arabic'],
            ['word' => 'angle', 'translation' => 'زاوية', 'language' => 'english<->arabic'],
            ['word' => 'enumeration', 'translation' => 'تعداد', 'language' => 'english<->arabic'],
            ['word' => 'Staged', 'translation' => 'مُنتظم', 'language' => 'english<->arabic'],
            ['word' => 'received', 'translation' => 'تم الاستلام', 'language' => 'english<->arabic'],
            ['word' => 'related', 'translation' => 'مرتبط', 'language' => 'english<->arabic'],
            ['word' => 'assistance', 'translation' => 'مساعدة', 'language' => 'english<->arabic'],
            ['word' => 'configure', 'translation' => 'تهيئة', 'language' => 'english<->arabic'],
            ['word' => 'resolving', 'translation' => 'حل', 'language' => 'english<->arabic'],
            ['word' => 'protect', 'translation' => 'حماية', 'language' => 'english<->arabic'],
            ['word' => 'Difficulty', 'translation' => 'صعوبة', 'language' => 'english<->arabic'],
            ['word' => 'determine', 'translation' => 'تحديد', 'language' => 'english<->arabic'],
            ['word' => 'compiler', 'translation' => 'مُصرّف', 'language' => 'english<->arabic'],
            ['word' => 'Configuration', 'translation' => 'تهيئة', 'language' => 'english<->arabic'],
            ['word' => 'companion', 'translation' => 'رفيق', 'language' => 'english<->arabic'],
            ['word' => 'implemented', 'translation' => 'تم تنفيذه', 'language' => 'english<->arabic'],
            ['word' => 'marked', 'translation' => 'مُعلّم', 'language' => 'english<->arabic'],
            ['word' => 'predict', 'translation' => 'التنبؤ', 'language' => 'english<->arabic'],
            ['word' => 'existing', 'translation' => 'موجود', 'language' => 'english<->arabic'],
            ['word' => 'property', 'translation' => 'خاصية', 'language' => 'english<->arabic'],
            ['word' => 'Progress', 'translation' => 'تقدم', 'language' => 'english<->arabic'],
            ['word' => 'knowledge', 'translation' => 'معرفة', 'language' => 'english<->arabic'],
            ['word' => 'Conditional', 'translation' => 'شرطي', 'language' => 'english<->arabic'],
            ['word' => 'trigger', 'translation' => 'إطلاق', 'language' => 'english<->arabic'],
            ['word' => 'launching', 'translation' => 'إطلاق', 'language' => 'english<->arabic'],
            ['word' => 'Explicit', 'translation' => 'صريح', 'language' => 'english<->arabic'],
            ['word' => 'common', 'translation' => 'شائع', 'language' => 'english<->arabic'],
            ['word' => 'Purpose', 'translation' => 'غرض', 'language' => 'english<->arabic'],
            ['word' => 'diagnose', 'translation' => 'تشخيص', 'language' => 'english<->arabic'],
            ['word' => 'Exceptions', 'translation' => 'استثناءات', 'language' => 'english<->arabic'],
        ];

        foreach ($words as $word) {
            Words::create($word);
        }
    }
}