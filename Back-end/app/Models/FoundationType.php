<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoundationType extends Model
{
    use HasFactory;
    protected $table = 'foundation_type';
    protected $primaryKey = 'foundation_type_id';

    public function foundations(){
        return $this->hasMany(Foundation::class ,'foundation_type_id' , 'foundation_type_id' );
    }
    
}
