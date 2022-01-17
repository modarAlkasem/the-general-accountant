<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    protected $table = 'account';
    protected $primaryKey = 'account_id';

    public function ledgerAccount(){

        return $this->hasOne(LedgerAccount::class , 'account_id', 'account_id');
    }
    public function foundation(){

        return $this->belongsTo(Foundation::class , 'foundation_id' ,'foundation_id'  );
    }
}
