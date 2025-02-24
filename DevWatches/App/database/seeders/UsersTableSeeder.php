<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Abdelouahab Tamraoui',
                'email' => 'abdelouahab.tamraoui@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'client',
            ],
            [
                'name' => 'Zakaria Tamraoui',
                'email' => 'zakaria.tamraoui@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'client',
            ],
        ]);
    }
}
