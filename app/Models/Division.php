<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory;
    protected $fillable = ['name','level','collaborator','ambassador','parent_id'];

    public function subdivisions(){
        return $this->hasMany(Division::class,'parent_id','id');
    }

    public function parent(){
        return $this->belongsTo(Division::class);
    }
}
