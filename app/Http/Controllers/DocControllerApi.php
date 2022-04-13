<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Doctors;
use App\Associates;
use JWTAuth;
use JWTAuthException;
use Mail;

use App\Mail\WelcomeMailAssociate;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;
use App\Encrypt\Encrypt;

class DocControllerApi extends Controller
{   
    function __construct()
    {
        // This is use to get the token for Doctors model. it uses the same for user.
        \Config::set('jwt.user', Doctors::class);
        \Config::set('auth.providers', ['users' => [
                'driver' => 'eloquent',
                'model' => Doctors::class,
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

    public function associateAddDoctor(Request $request, $associate_username)
    {   
        // return $request;
        // $host = $request->getSchemeAndHttpHost();
        // return $host;

        $validator = Validator::make($request->all(), [  
            'contact_address'           => 'required|string|max:65535', 
            'country_of_residence'      => 'required|string|max:255', 
            'district_province_state'   => 'required|string|max:255', 
            'email'                     => 'required|email|unique:doctors|max:255', 
            'first_name'                => 'required|string|max:255', 
            'last_name'                 => 'required|string|max:255', 
            'password'                  => 'required|string|min:8|max:255', 
            'telephone'                 => 'required|string|max:255', 
            'username'                  => 'required|string|unique:doctors|max:255',
            'zip_code'                  => 'required|string|max:255', 
            'consultation_fee'          => 'required|string|max:255', 
            'secret_key'                => 'required|string|max:255',
        ]);
        
        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        // Sanitize inputs
        $contact_address            = Sanitizes::my_sanitize_string( $request->contact_address);
        $country_of_residence       = Sanitizes::my_sanitize_string( $request->country_of_residence);
        $district_province_state    = Sanitizes::my_sanitize_string( $request->district_province_state);
        $email                      = Sanitizes::my_sanitize_email( $request->email);
        $first_name                 = Sanitizes::my_sanitize_string( $request->first_name);
        $last_name                  = Sanitizes::my_sanitize_string( $request->last_name);
        $password                   = Sanitizes::my_sanitize_string( $request->password);
        $telephone                  = Sanitizes::my_sanitize_number( $request->telephone);
        $username                   = Sanitizes::my_sanitize_string( $request->username);
        $zip_code                   = Sanitizes::my_sanitize_string( $request->zip_code);
        $consultation_fee           = Sanitizes::my_sanitize_number( $request->consultation_fee);
        $associate_username         = Sanitizes::my_sanitize_string( $associate_username);
        $secret_key                 = Sanitizes::my_sanitize_string( $request->secret_key);
        
        $ev_code = md5(sprintf("%05x%05x",mt_rand(0,0xffff),mt_rand(0,0xffff)));

        $associate_data = Associates::where([['username', $associate_username], ['secret_key', $secret_key]])->get()->first();
        if($associate_data){
            $associate_id   = $associate_data->id;

            $payload = [
                'password'  =>\Hash::make($password),
                'auth_token'=> '',
                'ev_code'   =>$ev_code,

                'contact_address'           => $contact_address, 
                'country_of_residence'      => $country_of_residence, 
                'district_province_state'   => $district_province_state, 
                'email'                     => $email, 
                'first_name'                => $first_name, 
                'last_name'                 => $last_name, 
                'telephone'                 => $telephone, 
                'username'                  => $username,
                'zip_code'                  => $zip_code, 
                'associate'                 => $associate_id,
                'consultation_fee'          => $consultation_fee,
            ];
            
            $user = new \App\Doctors($payload);
            if ($user->save())
            {
                
                $token = self::getToken($email, $password); // generate user token
                
                if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
                
                $user = \App\Doctors::where('email', $email)->get()->first();
                
                $user->auth_token = $token; // update user token
                
                $user->save();
                // ///////// ADD ROLE ///////////////////////
                $user->attachRole('user');
                // ////////// SEND MAIL //////////////////////////
                $emailDetails = [
                    'title' => 'Welcome to CamMedics',
                    'first_name' => $first_name,
                    'username'  => $username,
                    'email'     => $email,
                    'password'  => $password,
                    'url' => 'https://dashboard.cammedics.com/#/login_doctor'
                ];
        
                Mail::to($email)->send(new WelcomeMailAssociate($emailDetails));

                $response = ['success'=>true, 'data'=>"Doctor added successfully"];        
            }
            else
                $response = ['success'=>false, 'data'=>'Couldnt register user'];
                return response()->json($response, 201);
        }else{
            $response = ['success'=>false, 'data'=>'Incorrect credentials'];
            return response()->json($response, 201);
        }
    }

    public function listDoctors(Request $request, $associate_username)
    {   
        $validator = Validator::make($request->all(), [  
            'secret_key' => 'required|string|max:255',
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

            // $doctorsList = Doctors::where('associate', '=', $associate_id)->get('username','first_name','last_name','middle_name','email','zip_code','telephone','gender','gender_others','dob','nationality','country_of_residence','district_province_state','contact_address','area_of_specialization','consultation_fee')->all();

            $doctorsList = DB::table('doctors')
                ->select('username','first_name','last_name','middle_name','email','zip_code','telephone','gender','gender_others','dob','nationality','country_of_residence','district_province_state','contact_address','area_of_specialization','consultation_fee')
                ->where('associate', '=', $associate_id)
                ->get();

            // return $result;
            $response = ['success'=>true, 'data'=>$doctorsList];
            return response()->json($response, 201);
        }else{
            $response = ['success'=>false, 'data'=>'Incorrect credentials'];
            return response()->json($response, 201);
        }
    }

    public function account(Request $request, $associate_username,$doc_username)
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
            $doctor = Doctors::where([['username', $doc_username], ['associate', $associate_id]])->get()->first();
            if($doctor){
                $doctor_id = $doctor->id;
                $account = DB::table('doctorbookappointmentpayments')
                ->join('doctorbookappointments', 'doctorbookappointmentpayments.appointment_id', '=', 'doctorbookappointments.id')
                ->select('doctorbookappointmentpayments.billing_amount_currency','doctorbookappointmentpayments.billing_amount_value','doctorbookappointmentpayments.billing_doctor_fee','doctorbookappointmentpayments.billing_country_handling_fee','doctorbookappointmentpayments.billing_name','doctorbookappointmentpayments.billing_orderID',  
                'doctorbookappointments.date','doctorbookappointments.time','doctorbookappointments.time_zone','doctorbookappointments.subject','doctorbookappointments.message','doctorbookappointments.doc_username','doctorbookappointments.doc_first_name','doctorbookappointments.doc_last_name','doctorbookappointments.patient_username','doctorbookappointments.patient_first_name','doctorbookappointments.patient_last_name')
                ->where('doctorbookappointmentpayments.doc_id', '=', $doctor_id)
                ->get();

                // return $result;
                $response = ['success'=>true, 'data'=>$account];
                return response()->json($response, 201);
            }else{
                $response = ['success'=>true, 'data'=>"invalid doctor username"];
                return response()->json($response, 201);
            }
        }else{
            $response = ['success'=>false, 'data'=>'Incorrect credentials'];
            return response()->json($response, 201);
        }
    }
}