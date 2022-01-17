<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntryAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entry_account', function (Blueprint $table) {
            $table->bigIncrements('entry_account_id');
            $table->decimal('amount', $precision = 10, $scale = 4);
            $table->integer('type');
            $table->bigInteger('account_id');
            $table->foreign('account_id')->references('account_id')->on('account');
            $table->date('date');
            $table->string('description', 200);
            $table->bigInteger('document_id');
            $table->foreign('document_id')->references('document_id')->on('document');
            $table->bigInteger('ledger_account_id');
            $table->foreign('ledger_account_id')->references('ledger_account_id')->on('ledger_account');
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
        Schema::dropIfExists('entry_account');
    }
}
