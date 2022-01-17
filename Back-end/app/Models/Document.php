<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $table = 'document';
    protected $primaryKey = 'document_id';
    
    public function foundation(){
        return $this->belongsTo(Foundation::class , 'foundation_id' ,'foundation_id');
    }

    public function entryAccounts(){

        return $this->hasMany(EntryAccount::class , 'document_id' ,'document_id');
    }
}
