<?php

// namespace App;

// // use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Notifications\Notifiable;
// use Illuminate\Foundation\Auth\User as Authenticatable;

// use Tymon\JWTAuth\Contracts\JWTSubject;
// use Illuminate\Database\Eloquent\Model;
// use Laratrust\Traits\LaratrustUserTrait;

// class Generalappointment extends Authenticatable implements JWTSubject
namespace App;
  
use Illuminate\Database\Eloquent\Model;

class Concert extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'concert';

    protected $fillable = [
        'username', 
        'email',
        'name', 
        'amount',
        'transaction_id',
        'tx_ref',
        'currency',
        'charged_amount',
        'payment_type',
        'concert_code',
        'concert_status',
        'status'
    ];
  
}