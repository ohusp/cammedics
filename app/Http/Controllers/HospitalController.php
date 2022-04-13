<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Hospitals;
use JWTAuth;
use JWTAuthException;
use Mail;

use App\Doctors;
use App\Associates;
use App\Mail\WelcomeMail;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;
use App\Encrypt\Encrypt;

class HospitalController extends Controller
{   
    function __construct()
    {
        // This is use to get the token for Hospitals model. it uses the same for user.
        \Config::set('jwt.user', Hospitals::class);
        \Config::set('auth.providers', ['users' => [
                'driver' => 'eloquent',
                'model' => Hospitals::class,
            ]]);
    }

    private function getToken($email, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    public function login(Request $request)
    {   
        //decrypt request 
        $user = Encrypt::cryptoJsAesDecrypt('where do you go when you by yourself', $request->user);
        // convert array back to laravel request object
        $request = new \Illuminate\Http\Request();
        $request->replace($user);
        $user = $request;
        
        $validator  = Validator::make($user->all(), [ 
            'email'     => 'required|email|max:255', 
            'password'  => 'required|string|min:8|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $email      = Sanitizes::my_sanitize_email( $user->email);
        $password   = Sanitizes::my_sanitize_string( $user->password);

        $hospital_data = \App\Hospitals::where('email', $email)->get()->first();
        if ($hospital_data && \Hash::check($password, $hospital_data->password)) // The passwords match...
        {   
            // This gets the user role name and passed into a variable
            $role_name = $hospital_data->roles->pluck('name');
            $role_name = $role_name[0];

            $token = self::getToken($email, $password);
            $hospital_data->auth_token = $token;
            $hospital_data->save();

            // return $disability_none;

            // send response array to the front
            $response = ['success'=>true, 'data'=>[
                'auth_token'=>$hospital_data->auth_token,
                'id'=>$hospital_data->id,
                'name'=>$hospital_data->name,
                'username'=>$hospital_data->username, 
                'email'=>$hospital_data->email, 
                'zip_code'=>$hospital_data->zip_code, 
                'telephone'=>$hospital_data->telephone, 
                'country'=>$hospital_data->country, 
                'district_province_state'=>$hospital_data->district_province_state, 
                'address'=>$hospital_data->address, 
                'test_carried_out'=>$hospital_data->test_carried_out,
                'status'=>$hospital_data->status, 
                'created_at'=>$hospital_data->created_at
            ]];           
        }
        else 
          $response = ['success'=>false, 'data'=>'Record doesnt exists'];
      

        return response()->json($response, 201);
    }

    public function register(Request $request)
    {   
        // return $request;
        $user = Encrypt::cryptoJsAesDecrypt('where do you go when you by yourself', $request->user);
        // convert array back to laravel request object
        $request = new \Illuminate\Http\Request();
        $request->replace($user);
        // Validate
        $validator = Validator::make($request->all(), [ 
            'name'=> 'required|string|max:250',  
            'username'  => 'required|string|unique:hospitals|max:255',
            'email'     => 'required|email|unique:hospitals|max:255', 
            'password'  => 'required|string|min:8|max:255', 
            'associate_username' => 'nullable|string|max:255',
        ]);
        
        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        // Sanitize inputs
        $name       = Sanitizes::my_sanitize_string( $request->name);
        $username   = Sanitizes::my_sanitize_string( $request->username);
        $email      = Sanitizes::my_sanitize_email( $request->email);
        $password   = Sanitizes::my_sanitize_string( $request->password);
        $associate_username = Sanitizes::my_sanitize_string( $request->associate_username);

        $ev_code = md5(sprintf("%05x%05x",mt_rand(0,0xffff),mt_rand(0,0xffff)));

        $associate      = Associates::where('username', '=', $associate_username)->first();
        if($associate){
            $associate_id   = $associate->id;
        }else{
            $associate_id   = null;
        }

        $payload = [
            'password'  =>\Hash::make($password),
            'username'  =>$username,
            'email'     =>$email,
            'name'      =>$name,
            'auth_token'=> '',
            'ev_code'   =>$ev_code,
            'associate' => $associate_id,
        ];
                  
        $user = new \App\Hospitals($payload);
        if ($user->save())
        {
            
            $token = self::getToken($email, $password); // generate user token
            
            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
            
            $user = \App\Hospitals::where('email', $email)->get()->first();
            
            $user->auth_token = $token; // update user token
            
            $user->save();
            // ///////// ADD ROLE ///////////////////////
            $user->attachRole('user');
            // ////////// SEND MAIL //////////////////////////
            $emailDetails = [
                'title' => 'Welcome to CamMedics',
                'first_name' => $user->name,
                'url' => 'https://dashboard.cammedics.com/#/login_hospital'
            ];
    
            Mail::to($email)->send(new WelcomeMail($emailDetails));

            $response = ['success'=>true, 'data'=>['username'=>$user->username,'name'=>$user->name,'id'=>$user->id,'email'=>$email,'auth_token'=>$token]];        
        }
        else
            $response = ['success'=>false, 'data'=>'Couldnt register user'];
            return response()->json($response, 201);
    }

    public function associateAddHospital(Request $request, $associate_id)
    {   
        // return $request;
        $user = Encrypt::cryptoJsAesDecrypt('where do you go when you by yourself', $request->user);
        // convert array back to laravel request object
        $request = new \Illuminate\Http\Request();
        $request->replace($user);
        // Validate
        $validator = Validator::make($request->all(), [ 
            'name'      => 'required|string|max:250',  
            'username'  => 'required|string|unique:hospitals|max:255',
            'email'     => 'required|email|unique:hospitals|max:255', 
            'zip_code'  => 'required|string|max:255', 
            'telephone' => 'required|string|max:255', 
            'password'  => 'required|string|min:8|max:255', 
            'country'   => 'required|string|max:255', 
            'district_province_state'   => 'required|string|max:255', 
            'address'   => 'required|string|max:65535',
        ]);
        
        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        // Sanitize inputs
        $name       = Sanitizes::my_sanitize_string( $request->name);
        $username   = Sanitizes::my_sanitize_string( $request->username);
        $email      = Sanitizes::my_sanitize_email( $request->email);
        $zip_code   = Sanitizes::my_sanitize_string( $request->zip_code);
        $telephone  = Sanitizes::my_sanitize_string( $request->telephone);
        $country    = Sanitizes::my_sanitize_string( $request->country);
        $district_province_state   = Sanitizes::my_sanitize_string( $request->district_province_state);
        $password   = Sanitizes::my_sanitize_string( $request->password);

        $ev_code = md5(sprintf("%05x%05x",mt_rand(0,0xffff),mt_rand(0,0xffff)));

        $payload = [
            'password'  =>\Hash::make($password),
            'auth_token'=> '',
            'ev_code'   =>$ev_code,

            'name'      =>$name,
            'username'  =>$username,
            'email'     =>$email,
            'zip_code'  =>$zip_code,
            'telephone' =>$telephone,
            'country'   =>$country,
            'associate' => $associate_id,
            'district_province_state' =>$district_province_state,
        ];
                  
        $user = new \App\Hospitals($payload);
        if ($user->save())
        {
            
            $token = self::getToken($email, $password); // generate user token
            
            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
            
            $user = \App\Hospitals::where('email', $email)->get()->first();
            
            $user->auth_token = $token; // update user token
            
            $user->save();
            // ///////// ADD ROLE ///////////////////////
            $user->attachRole('user');
            // ////////// SEND MAIL //////////////////////////
            $emailDetails = [
                'title' => 'Welcome to CamMedics',
                'first_name' => $user->name,
                'url' => 'https://dashboard.cammedics.com/#/login_hospital'
            ];
    
            Mail::to($email)->send(new WelcomeMail($emailDetails));

            $response = ['success'=>true, 'data'=>['username'=>$user->username,'name'=>$user->name,'id'=>$user->id,'email'=>$email,'auth_token'=>$token]];        
        }
        else
            $response = ['success'=>false, 'data'=>'Couldnt register user'];
            return response()->json($response, 201);
    }
    
}