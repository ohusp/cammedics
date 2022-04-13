<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Concert;

// namespace App\Http\Controllers;
// use Illuminate\Http\Request;
// use App\User;
use JWTAuth;
use JWTAuthException;
use Mail;
use App\Mail\SpreadTheLoveConcert;
use App\Http\Controllers\PatientsController;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;

class PaypalController extends Controller
{   
    protected $PatientsController;
    public function __construct(PatientsController $PatientsController)
    {
        $this->PatientsController = $PatientsController;
    }
    // public function __construct()
    // {
    //     $this->middleware('role:superadministrator');
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function pay(Request $request)
    {   
        $validator  = Validator::make($request->all(), [ 
            'username'                  => 'required|string|max:255',
            'number_ticket'             => 'required|string|max:255',
            'billing_email_address'     => 'required|string|max:255', 
            'billing_name'              => 'required|string|max:255',
            'billing_amount_currency'   => 'required|string|max:255',
            'billing_amount_value'      => 'required|string|max:255',
            'billing_orderID'           => 'required|string|max:255',
            'billing_payerID'           => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $username   = Sanitizes::my_sanitize_string($request->username);
        $number_ticket = Sanitizes::my_sanitize_string($request->number_ticket);
        $email      = Sanitizes::my_sanitize_string($request->billing_email_address);
        $name       = Sanitizes::my_sanitize_string($request->billing_name);
        $currency   = Sanitizes::my_sanitize_string($request->billing_amount_currency);
        $amount     = Sanitizes::my_sanitize_string($request->billing_amount_value);
        $orderID    = Sanitizes::my_sanitize_string($request->billing_orderID);
        $payerID    = Sanitizes::my_sanitize_string($request->billing_payerID);

        // Check if its the amount initiated that was finally paid for
        $ticketSales = \App\Ticketsales::where([['username', $username], ['number_ticket', $number_ticket], ['status', 1]])->get()->first();
        if($amount >= $ticketSales->total_amount){
            // change status to show that that ticket has been paid for
            $ticketSales->status = "2";
            $ticketSales->save();
            $status = "3";

            $concertCodeArray = array();
            for ($x = 1; $x <= $number_ticket; $x++) {
                // generate and send concert passcode
                $concert_code = $username ."_". md5(sprintf("%05x%05x",mt_rand(0,0xffff),mt_rand(0,0xffff)));

                $payload = [
                    'username'      =>$username,
                    'email'         =>$email,
                    'name'          =>$name,
                    'amount'        =>$amount,
                    'tx_ref'        =>$payerID,
                    'transaction_id'=>$orderID,
                    'currency'      =>$currency,
                    'charged_amount'=>$amount,
                    'payment_type'  =>"paypal",
                    'concert_code'  =>$concert_code,
                    'status'        =>$status,
                ];
                
                // Save all in DB
                $concert = new \App\Concert($payload);
                $concert->save();

                array_push($concertCodeArray, $concert_code);
            }
            // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
            $paymentDetails = [
                'tx_ref'         =>$payerID,
                'transaction_id' =>$orderID,
                'currency'       =>$currency,
                'charged_amount' =>$amount,
                'payment_type'   =>"paypal",
                'email'          =>$email,
                'activity'       => 'Transaction successful',
            ];
            $activitiespayment = new \App\Activitiespayment($paymentDetails);
            $activitiespayment->save();
            // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

            // $email = 'mendes.paul25@yahoo.com';
            // Send email ////////////////////////////////
            $emailDetails = [
                'title'         => 'Spread the Love to Save a Life Concert',
                'username'      => $concert->username,
                'concert_code'  => $concertCodeArray,
            ];
            // remove this below
            // $email = "mendes.paul28@gmail.com";

            Mail::to($email)->send(new SpreadTheLoveConcert($emailDetails));

            $response = ['success'=>true, 'data'=>"Concert booked"];
            return response()->json($response, 201);
        }else{
            // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
            $paymentDetails = [
                'tx_ref'         =>$payerID,
                'transaction_id' =>$orderID,
                'currency'       =>$currency,
                'charged_amount' =>$amount,
                'payment_type'   =>"paypal",
                'email'          =>$email,
                'activity'       => 'Fraud transaction detected (Difference btw the amount when number of ticket was clicked and amount paid for)',
            ];
            $activitiespayment = new \App\Activitiespayment($paymentDetails);
            $activitiespayment->save();
            // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
        }
        
        
    }

    public function quickPay(Request $request)
    {   
        $validator  = Validator::make($request->all(), [ 
            'username'                  => 'required|string|max:255',
            'email'                     => 'required|string|max:255',
            'first_name'                => 'required|string|max:255',
            'last_name'                 => 'required|string|max:255',
            'password'                  => 'required|string|max:255',
            'number_ticket'             => 'required|string|max:255',
            'billing_email_address'     => 'required|string|max:255', 
            'billing_name'              => 'required|string|max:255',
            'billing_amount_currency'   => 'required|string|max:255',
            'billing_amount_value'      => 'required|string|max:255',
            'billing_orderID'           => 'required|string|max:255',
            'billing_payerID'           => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $username   = Sanitizes::my_sanitize_string($request->username);
        $email      = Sanitizes::my_sanitize_string($request->email);
        $first_name = Sanitizes::my_sanitize_string($request->first_name);
        $last_name  = Sanitizes::my_sanitize_string($request->last_name);
        $password   = Sanitizes::my_sanitize_string($request->password);
        $number_ticket = Sanitizes::my_sanitize_string($request->number_ticket);
        $billing_email = Sanitizes::my_sanitize_string($request->billing_email_address);
        $name       = Sanitizes::my_sanitize_string($request->billing_name);
        $currency   = Sanitizes::my_sanitize_string($request->billing_amount_currency);
        $amount     = Sanitizes::my_sanitize_string($request->billing_amount_value);
        $orderID    = Sanitizes::my_sanitize_string($request->billing_orderID);
        $payerID    = Sanitizes::my_sanitize_string($request->billing_payerID);

        $quickNumberOfTicket = ConcertController::quickNumberOfTicket($username, $number_ticket);

        // Check if its the amount initiated that was finally paid for
        // $ticketSales = \App\Ticketsales::where([['username', $username], ['number_ticket', $number_ticket], ['status', 1]])->get()->first();
        // if($amount >= $ticketSales->total_amount){
            // change status to show that that ticket has been paid for
            // $ticketSales->status = "2";
            // $ticketSales->save();
            // ///////////////////// SAVE USER AS PATIENT /////////////////////////////////////
            $quickRegister = $this->PatientsController->quickRegister($username, $email, $first_name, $last_name, $password);
            // ///////////////////// SAVE USER AS PATIENT /////////////////////////////////////
            $status = "3";

            $concertCodeArray = array();
            for ($x = 1; $x <= $number_ticket; $x++) {
                // generate and send concert passcode
                $concert_code = $username ."_". md5(sprintf("%05x%05x",mt_rand(0,0xffff),mt_rand(0,0xffff)));

                $payload = [
                    'username'      =>$username,
                    'email'         =>$billing_email,
                    'name'          =>$name,
                    'amount'        =>$amount,
                    'tx_ref'        =>$payerID,
                    'transaction_id'=>$orderID,
                    'currency'      =>$currency,
                    'charged_amount'=>$amount,
                    'payment_type'  =>"paypal",
                    'concert_code'  =>$concert_code,
                    'status'        =>$status,
                ];
                
                // Save all in DB
                $concert = new \App\Concert($payload);
                $concert->save();

                array_push($concertCodeArray, $concert_code);
            }
            // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
            $paymentDetails = [
                'tx_ref'         =>$payerID,
                'transaction_id' =>$orderID,
                'currency'       =>$currency,
                'charged_amount' =>$amount,
                'payment_type'   =>"paypal",
                'email'          =>$email,
                'activity'       => 'Transaction successful',
            ];
            $activitiespayment = new \App\Activitiespayment($paymentDetails);
            $activitiespayment->save();
            // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

            // $email = 'mendes.paul25@yahoo.com';
            // Send email ////////////////////////////////
            $emailDetails = [
                'title'         => 'Spread the Love to Save a Life Concert',
                'username'      => $concert->username,
                'concert_code'  => $concertCodeArray,
            ];
            // remove this below
            // $email = "mendes.paul28@gmail.com";

            Mail::to($email)->send(new SpreadTheLoveConcert($emailDetails));

            $response = ['success'=>true, 'data'=>"Concert booked"];
            return response()->json($response, 201);
        // }else{
        //     // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
        //     $paymentDetails = [
        //         'tx_ref'         =>$payerID,
        //         'transaction_id' =>$orderID,
        //         'currency'       =>$currency,
        //         'charged_amount' =>$amount,
        //         'payment_type'   =>"paypal",
        //         'email'          =>$email,
        //         'activity'       => 'Fraud transaction detected (Difference btw the amount when number of ticket was clicked and amount paid for)',
        //     ];
        //     $activitiespayment = new \App\Activitiespayment($paymentDetails);
        //     $activitiespayment->save();
        //     // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
        // }
        
        
    }

    public function verify(Request $waveRequest)
    {  
        $txid = $waveRequest->transaction_id;

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.flutterwave.com/v3/transactions/{$txid}/verify",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json",
                "Authorization: Bearer FLWSECK-6e7f3b93b7154ac11b098cba7999f899-X"
            ),
        ));
            
        $response = curl_exec($curl);
        // return $response;
        
        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == "success")
        {   
            // validate payment to be sure user paid correct amount
            $amountPaid = $res->data->charged_amount;
            $amountToPay = $res->data->meta->price;
            if($amountPaid >= $amountToPay)
            {   
                $response = ['success'=>true, 'data'=>'Transaction Successful'];
                return response()->json($response, 201);
            }
            else
            {   
                $response = ['success'=>false, 'data'=>'Fraud transaction detected'];
                return response()->json($response, 201);
            }
        }
        else
        { 
            if($res->message == "No transaction was found for this id"){
                
                $response = ['success'=>false, 'data'=>'No transaction was found'];
                return response()->json($response, 201);
            }
        }
        
    }

}
