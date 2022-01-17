<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foundation extends Model
{
    use HasFactory;
    protected $table = 'foundation';
    protected $primaryKey = 'foundation_id';

    public function user(){

        return $this->hasOne(User::class , 'foundation_id' ,'foundation_id');
    }
    public function foundationType(){
        return $this->belongsTo(FoundationType::class , 'foundation_type_id' , 'foundation_type_id');
    }

    public function accounts(){
        return $this->hasMany(Account::class , 'foundation_id' , 'foundation_id');
    }

    public function ledgerAccounts(){
        return $this->hasMany(LedgerAccount::class , 'foundation_id' ,'foundation_id' );
    }

    public function documents(){
        return $this->hasMany(Document::class , 'foundation_id' , 'foundation_id');
    }
}
