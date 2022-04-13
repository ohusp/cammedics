<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Concert;
use App\Ticketsales;
use App\Nominees;
use App\Patients;
use App\Doctors;
use App\Ports;
use App\Pharmacies;
use App\Labs;
use App\Hospitals;

// namespace App\Http\Controllers;
// use Illuminate\Http\Request;
// use App\User;
use JWTAuth;
use JWTAuthException;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;

class ConcertController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    public function checkIfExist(Request $request, $id){
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'passcode'  => 'required|string|max:512',
            'user_type' => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $passcode   = Sanitizes::my_sanitize_string($request->passcode);
        $user_type  = Sanitizes::my_sanitize_string($request->user_type);
        if($user_type == "patient"){
            $user_data = Patients::where('id', '=', $id)->first();
        }
        else if($user_type == "doctor"){
            $user_data = Doctors::where('id', '=', $id)->first();
        }
        else if($user_type == "pharm"){
            $user_data = Pharmacies::where('id', '=', $id)->first();
        }
        else if($user_type == "hospital"){
            $user_data = Hospitals::where('id', '=', $id)->first();
        }
        else if($user_type == "port"){
            $user_data = Ports::where('id', '=', $id)->first();
        }
        else if($user_type == "laboratory"){
            $user_data = Labs::where('id', '=', $id)->first();
        }

        $username   = $user_data->username;
        // $concertLink= "http://localhost:3001?room=iwB4PJOdbxFymWrjkdpuU1Qa1UvaMIGM_2179212556";
        $concertLink= "https://concert.cammedics.com?room=iwB4PJOdbxFymWrjkdpuU1Qa1UvaMIGM_2179212556";
        $concert    = Concert::where([['concert_code', $passcode]])->get()->first();
            
        if($concert){
            if($concert->concert_status == "0"){
                $concert->concert_status    = "1";
                $concert->concert_username  = $username;
                $concert->save();
                $response = ['success'=>true, 'data'=>$concertLink];
                return response()->json($response, 201);
            }else if($concert->concert_status == "1"){
                $concert = Concert::where([['username', $username], ['concert_code', $passcode]])->get()->first();
                if($concert){
                    $response = ['success'=>true, 'data'=>$concertLink];
                    return response()->json($response, 201);
                }else{
                    $response = ['success'=>false, 'data'=>"Not Ok"];
                    return response()->json($response, 201);
                }
            }
        }else{
            $response = ['success'=>false, 'data'=>"Not Ok"];
            return response()->json($response, 201);
        }
    }

    public function checkIfConcertBooked(Request $request, $id){
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'username' => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $username = Sanitizes::my_sanitize_string($request->username);
        
        $concert  = Concert::where('username', '=', $username)->first();
            
        if($concert){
            $concert_code = $concert->concert_code;
            if($concert_code != ""){
                $response = ['success'=>true, 'data'=>"Ok"];
                return response()->json($response, 201);
            }else{
                $response = ['success'=>false, 'data'=>"Not Ok"];
                return response()->json($response, 201);
            }
        }else{
            $response = ['success'=>false, 'data'=>"Not Ok"];
            return response()->json($response, 201);
        }
    }

    public function nominateBeneficiary(Request $request, $id)
    {   
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'username'          => 'required|string|max:255',
            'nominee_name'      => 'required|string|max:255',  
            'nominee_email'     => 'required|string|max:255', 
            'nominee_telephone' => 'required|string|max:255',
            'nominee_address'   => 'required|string|max:2000', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $username           = Sanitizes::my_sanitize_string($request->username);
        $nominee_name       = Sanitizes::my_sanitize_string($request->nominee_name);
        $nominee_email      = Sanitizes::my_sanitize_string($request->nominee_email);
        $nominee_telephone  = Sanitizes::my_sanitize_string($request->nominee_telephone);
        $nominee_address    = Sanitizes::my_sanitize_string($request->nominee_address);

        // check if username already nominated
        $exist = \App\Nominees::where([['username', $username], ['status', 1]])->get()->first();
        
        if($exist){
            $response = ['success'=>false, 'data'=>"You have already nominated a beneficiary"];
            return response()->json($response, 201);
        }else{
            $status = 1;
            $payload = [
                'username'          =>$username,
                'nominee_name'      =>$nominee_name,
                'nominee_email'     =>$nominee_email, 
                'nominee_telephone' =>$nominee_telephone, 
                'nominee_address'   =>$nominee_address, 
                'status'            =>$status, 
            ];
                    
            $shared = new \App\Nominees($payload);
            if ($shared->save())
            {
                $response = ['success'=>true, 'data'=>"Nomination successful"];
                return response()->json($response, 201);
            }
        }
    }

    public function numberOfTicket(Request $request, $id)
    {   
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'username'      => 'required|string|max:2000',
            'number_ticket' => 'required|string|max:2000', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $username       = Sanitizes::my_sanitize_string($request->username);
        $number_ticket  = Sanitizes::my_sanitize_string($request->number_ticket);
        $total_amount   = $number_ticket * 27.50;
        $naira_total_amount = $number_ticket * 13200;

        // check if theres any ticket initiated before that payment was not made. If any update and if none save new information
        $ticketSales = \App\Ticketsales::where([['username', $username], ['status', 1]])->get()->first();
        
        if($ticketSales){
            $ticketSales->number_ticket = $number_ticket;
            $ticketSales->total_amount  = $total_amount;
            $ticketSales->save();

            $response = ['success'=>true, 'data'=>['number_ticket'=>$number_ticket, 'total_amount'=>$total_amount, 'naira_total_amount'=>$naira_total_amount]];
            return response()->json($response, 201);
        }else{
            $payload = [
                'username'      =>$username,
                'number_ticket' =>$number_ticket,
                'total_amount'  =>$total_amount,
            ];
                    
            $ticketSales = new \App\Ticketsales($payload);
            if ($ticketSales->save())
            {
                $response = ['success'=>true, 'data'=>['number_ticket'=>$number_ticket, 'total_amount'=>$total_amount, 'naira_total_amount'=>$naira_total_amount]];
                return response()->json($response, 201);
            }
        }
    }

    public function checkUsername(Request $request){
        $validator = Validator::make($request->all(), [ 
            'username'  => 'required|string|unique:patients|max:255', 
        ]);
        
        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>true, 'data'=>$validationError];
            return response()->json($response, 201);
        }
    }

    public function checkEmail(Request $request){
        $validator = Validator::make($request->all(), [ 
            'email'  => 'required|string|unique:patients|max:255', 
        ]);
        
        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>true, 'data'=>$validationError];
            return response()->json($response, 201);
        }
    }

    public static function quickNumberOfTicket($username, $number_ticket)
    {   
        // return $request;
        $total_amount   = $number_ticket * 27.50;

        // check if theres any ticket initiated before that payment was not made. If any update and if none save new information
        $ticketSales = \App\Ticketsales::where([['username', $username], ['status', 1]])->get()->first();
        
        if($ticketSales){
            $ticketSales->number_ticket = $number_ticket;
            $ticketSales->total_amount  = $total_amount;
            $ticketSales->save();

            $response = ['success'=>true, 'data'=>['number_ticket'=>$number_ticket, 'total_amount'=>$total_amount]];
            return true;
        }else{
            $payload = [
                'username'      =>$username,
                'number_ticket' =>$number_ticket,
                'total_amount'  =>$total_amount,
            ];
                    
            $ticketSales = new \App\Ticketsales($payload);
            if ($ticketSales->save())
            {
                $response = ['success'=>true, 'data'=>['number_ticket'=>$number_ticket, 'total_amount'=>$total_amount]];
                return true;
            }
        }
    }

}
