<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLedgerAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ledger_account', function (Blueprint $table) {
            $table->bigIncrements('ledger_account_id');
            $table->bigInteger('account_id');
            $table->foreign('account_id')->references('account_id')->on('account');
            $table->decimal('balance', $precision = 10, $scale = 4);
            $table->decimal('debit_balance', $precision = 10, $scale = 4);
            $table->decimal('credit_balance', $precision = 10, $scale = 4);
            $table->integer('foundation_id');
            $table->foreign('foundation_id')->references('foundation_id')->on('foundation');

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
        Schema::dropIfExists('ledger_account');
    }
}
