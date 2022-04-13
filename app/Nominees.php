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

class Nominees extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'nominees';

    protected $fillable = [
        'username', 
        'nominee_name',
        'nominee_email', 
        'nominee_telephone',
        'nominee_address',
        'status'
    ];
  
}