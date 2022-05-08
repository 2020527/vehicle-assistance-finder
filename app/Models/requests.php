<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requests extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'garage_id', 'requested_date', 'requested_address', 'requested_pincode', 'repair_for'];
}
