<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesTable extends Migration
{
    public function up()
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('github_link')->nullable();
            $table->string('logo')->nullable();
            
            // Change these columns to string to store text input
            $table->string('understand')->nullable();
            $table->string('example')->nullable();
            $table->string('learning')->nullable();
    
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('languages');
    }
}
