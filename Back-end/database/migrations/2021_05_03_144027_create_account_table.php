<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account', function (Blueprint $table) {
            $table->bigIncrements('account_id');
            $table->string('name' , 150);
            $table->text('description');
            $table->integer('level');
            $table->bigInteger('parent_account_id');
            $table->foreign('parent_account_id')->references('account_id')->on('account');
            $table->integer('foundation_id');
            $table->foreign('foundation_id')->references('foundation_id')->on('foundation');
            $table->integer('child_number');
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
        Schema::dropIfExists('account');
    }
}
