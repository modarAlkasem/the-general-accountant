<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LedgerAccount extends Model
{
    use HasFactory;
    protected $table = 'ledger_account';
    protected $primaryKey = 'ledger_account_id';


    public function account(){

        return $this->belongsTo(Account::class , 'account_id' , 'account_id');
    }

    public function foundation (){
        return $this->belongsTo(Foundation::class , 'foundation_id' ,'foundation_id' );
    }

    public function entryAccounts(){

        return $this->hasMany(EntryAccount::class , 'ledger_account_id' ,'ledger_account_id'  );
    }
    
}
