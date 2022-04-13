<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Labs;
use App\Associates;
use JWTAuth;
use JWTAuthException;
use Mail;

use App\Mail\WelcomeMailAssociate;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;
use App\Encrypt\Encrypt;

class LabControllerApi extends Controller
{   
    function __construct()
    {
        // This is use to get the token for Labs model. it uses the same for user.
        \Config::set('jwt.user', Labs::class);
        \Config::set('auth.providers', ['users' => [
                'driver' => 'eloquent',
                'model' => Labs::class,
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

    public function associateAddLab(Request $request, $associate_username)
    {   
        // return $request;
        $validator = Validator::make($request->all(), [ 
            'name'      => 'required|string|max:250',  
            'username'  => 'required|string|unique:labs|max:255',
            'email'     => 'required|email|unique:labs|max:255', 
            'zip_code'  => 'required|string|max:255', 
            'telephone' => 'required|string|max:255', 
            'password'  => 'required|string|min:8|max:255', 
            'country'   => 'required|string|max:255', 
            'district_province_state'   => 'required|string|max:255', 
            'address'   => 'required|string|max:65535',
            'secret_key'=> 'required|string|max:255',
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
        $address    = Sanitizes::my_sanitize_string( $request->address);
        $password   = Sanitizes::my_sanitize_string( $request->password);
        $associate_username = Sanitizes::my_sanitize_string( $associate_username);
        $secret_key         = Sanitizes::my_sanitize_string( $request->secret_key);

        $ev_code = md5(sprintf("%05x%05x",mt_rand(0,0xffff),mt_rand(0,0xffff)));

        $associate_data = Associates::where([['username', $associate_username], ['secret_key', $secret_key]])->get()->first();
        if($associate_data){
            $associate_id   = $associate_data->id;

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
                'address'   =>$address,
            ];
                    
            $user = new \App\Labs($payload);
            if ($user->save())
            {
                
                $token = self::getToken($email, $password); // generate user token
                
                if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
                
                $user = \App\Labs::where('email', $email)->get()->first();
                
                $user->auth_token = $token; // update user token
                
                $user->save();
                // ///////// ADD ROLE ///////////////////////
                $user->attachRole('user');
                // ////////// SEND MAIL //////////////////////////
                $emailDetails = [
                    'title' => 'Welcome to CamMedics',
                    'first_name' => $name,
                    'username'  => $username,
                    'email'     => $email,
                    'password'  => $password,
                    'url' => 'https://dashboard.cammedics.com/#/login_lab'
                ];
        
                Mail::to($email)->send(new WelcomeMailAssociate($emailDetails));

                $response = ['success'=>true, 'data'=>"Laboratory added successfully"];        
            }
            else
                $response = ['success'=>false, 'data'=>'Couldnt register user'];
                return response()->json($response, 201);

        }else{
            $response = ['success'=>false, 'data'=>'Incorrect credentials'];
            return response()->json($response, 201);
        }
    }

    public function listLabs(Request $request, $associate_username)
    {   
        $validator = Validator::make($request->all(), [  
            'secret_key'                => 'required|string|max:255',
        ]);
        
        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $secret_key = Sanitizes::my_sanitize_string( $request->secret_key);

        $associate_data = Associates::where([['username', $associate_username], ['secret_key', $secret_key]])->get()->first();
        if($associate_data){
            // $associate      = Associates::where('username', '=', $associate_username)->get()->first();
            $associate_id   = $associate_data->id;

            $labsList = DB::table('labs')
                ->select('username','name','email','zip_code','telephone','country','district_province_state','address')
                ->where('associate', '=', $associate_id)
                ->get();

            // return $result;
            $response = ['success'=>true, 'data'=>$labsList];
            return response()->json($response, 201);
        }else{
            $response = ['success'=>false, 'data'=>'Incorrect credentials'];
            return response()->json($response, 201);
        }
    }

    public function account(Request $request, $associate_username,$lab_username)
    {   
        $validator = Validator::make($request->all(), [  
            'secret_key'                => 'required|string|max:255',
        ]);
        
        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $secret_key = Sanitizes::my_sanitize_string( $request->secret_key);

        $associate_data = Associates::where([['username', $associate_username], ['secret_key', $secret_key]])->get()->first();
        if($associate_data){
            $associate_id = $associate_data->id;
            $lab = Labs::where([['username', $lab_username], ['associate', $associate_id]])->get()->first();
            if($lab){
                $lab_id = $lab->id;
                $account = DB::table('labbookappointmentpayments')
                ->join('labbookappointments', 'labbookappointmentpayments.appointment_id', '=', 'labbookappointments.id')
                ->select('labbookappointmentpayments.billing_amount_currency','labbookappointmentpayments.billing_amount_value','labbookappointmentpayments.billing_test_fee','labbookappointmentpayments.billing_country_handling_fee','labbookappointmentpayments.billing_name','labbookappointmentpayments.billing_orderID',  
                'labbookappointments.date','labbookappointments.time','labbookappointments.time_zone','labbookappointments.subject','labbookappointments.message','labbookappointments.lab_username','labbookappointments.lab_name','labbookappointments.patient_username','labbookappointments.patient_first_name','labbookappointments.patient_last_name')
                ->where('labbookappointmentpayments.lab_id', '=', $lab_id)
                ->get();

                // return $result;
                $response = ['success'=>true, 'data'=>$account];
                return response()->json($response, 201);
            }else{
                $response = ['success'=>true, 'data'=>"invalid lab username"];
                return response()->json($response, 201);
            }
        }else{
            $response = ['success'=>false, 'data'=>'Incorrect credentials'];
            return response()->json($response, 201);
        }
    }
}