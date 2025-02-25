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
                'name' => 'samir aoulad amar',
                'email' => 'aouladamarsamir@gmail.com',
                'password' => Hash::make('samiraouladamar'),
                'role' => 'client',
            ], 
             [
                'name' => 'morad aoulad amar',
                'email' => 'aouladamarmorad@gmail.com',
                'password' => Hash::make('moradaouladamar'),
                'role' => 'client',
            ], 
            
        ]);
    }
}
