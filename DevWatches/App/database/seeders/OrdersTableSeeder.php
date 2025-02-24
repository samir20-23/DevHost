<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            ['user_id' => 1, 'product_id' => 1, 'phone_number' => '0612345678', 'quantity' => 1],
            ['user_id' => 1, 'product_id' => 2, 'phone_number' => '0612345678', 'quantity' => 2],
            ['user_id' => 2, 'product_id' => 3, 'phone_number' => '0623456789', 'quantity' => 1],
            ['user_id' => 2, 'product_id' => 4, 'phone_number' => '0623456789', 'quantity' => 1],
            ['user_id' => 1, 'product_id' => 5, 'phone_number' => '0612345678', 'quantity' => 1],
            ['user_id' => 2, 'product_id' => 1, 'phone_number' => '0623456789', 'quantity' => 2],
            ['user_id' => 1, 'product_id' => 3, 'phone_number' => '0612345678', 'quantity' => 1],
        ]);
    }
}
