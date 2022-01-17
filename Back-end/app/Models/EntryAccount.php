<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntryAccount extends Model
{
    use HasFactory;
    protected $table = 'entry_account';
    protected $primaryKey = 'entry_account_id';

    public function ledgerAccount(){

        return $this->belongsTo(LedgerAccount::class , 'ledger_account_id','ledger_account_id');
    }

    public function document(){

        return $this->belongsTo(Document::class , 'document_id' ,'document_id');

    }
}
