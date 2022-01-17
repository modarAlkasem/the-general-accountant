<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoundationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('foundation', function (Blueprint $table) {
            $table->increments('foundation_id');
            $table->string('name', 150);
            $table->integer('foundation_type_id');
            $table->foreign('foundation_type_id')->references('foundation_type_id')->on('foundation_type');
            $table->string('country',100);
            $table->string('currency',50);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foundation');
    }
}
