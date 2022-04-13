<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Concert;
use App\Patients;
use App\Doctors;
use App\Labs;
use App\Ports;
use App\Pharmacies;
use App\Doctorbookappointment;
use App\Doctorbookappointmentpayment;
use App\Labbookappointment;
use App\Labbookappointmentpayment;
use App\Portbookappointment;
use App\Portbookappointmentpayment;
use App\Product;
use App\Productcart;

use App\Http\Controllers\ConcertController;
use App\Http\Controllers\PatientsController;

// namespace App\Http\Controllers;
// use Illuminate\Http\Request;
// use App\User;
use JWTAuth;
use JWTAuthException;
use Mail;
use App\Mail\SpreadTheLoveConcert;
use App\Mail\CompleteAppointment;
use App\Mail\AppointmentBooked;
use App\Mail\NewSales;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;

class FlutterwaveController extends Controller
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
    // ///////////////////////// QUICK PAY //////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    public function quickPay(Request $waveRequest)
    {   
        // return $waveRequest;
        $validator  = Validator::make($waveRequest->all(), [ 
            'username'      => 'required|string|unique:patients|max:255', 
            'email'         => 'required|email|unique:patients|max:255', 
            'username'      => 'required|string|max:255',
            'number_ticket' => 'required|string|max:255',
            // 'amount'        => 'required|regex:/^\d+(\.\d{1,2})?$/|max:255',
            'name'          => 'required|string|max:255',
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'password'      => 'required|string|min:8|max:255',
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $username       = Sanitizes::my_sanitize_string($waveRequest->username);
        $number_ticket  = Sanitizes::my_sanitize_string($waveRequest->number_ticket);
        // $amount         = Sanitizes::my_sanitize_string($waveRequest->amount);
        $email          = Sanitizes::my_sanitize_string($waveRequest->email);
        $name           = Sanitizes::my_sanitize_string($waveRequest->name);
        $first_name     = Sanitizes::my_sanitize_string($waveRequest->first_name);
        $last_name      = Sanitizes::my_sanitize_string($waveRequest->last_name);
        $password       = Sanitizes::my_sanitize_string($waveRequest->password);
        $amount         = 13200 * $number_ticket;

        $quickNumberOfTicket = ConcertController::quickNumberOfTicket($username, $number_ticket);

        if($quickNumberOfTicket){
            // return $waveRequest;
            // remove / comment $amount
            // $amount     = "1";
            $name = $name." (".$username.")";

            //* Prepare our rave request
            $request = [
                'tx_ref' => time(),
                'amount' => $amount,
                // remove - change NGN to USD
                'currency' => 'NGN',
                'payment_options' => 'card',
                'redirect_url' => config('global.link1') . 'flutterwave_quick_process',
                'customer' => [
                    'email' => $email,
                    'name'  => $name,
                ],
                'meta' => [
                    'price'         => $amount,
                    'number_ticket' => $number_ticket,
                    'username'      => $username,
                    'email'         => $email,
                    'name'          => $name,
                    'first_name'    => $first_name,
                    'last_name'     => $last_name,
                    'password'      => $password,
                ],
                'customizations' => [
                    'title' => 'CamMedics',
                    'description' => 'Spread the Love Concert',
                    'logo' => 'https://cammedics.com/img/favicon.jpg'
                ]
            ];

            // return $request;

            //* Ca;; f;iterwave emdpoint
            $curl = curl_init();

            curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.flutterwave.com/v3/payments',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($request),
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer FLWSECK-6e7f3b93b7154ac11b098cba7999f899-X',
                'Content-Type: application/json'
            ),
            ));

            $response = curl_exec($curl);
            // return $response;

            curl_close($curl);
            
            $res = json_decode($response);

            if($res->status == 'success')
            {   
                $payload = [
                    'username'  =>$username,
                    'email'     =>$email,
                    'name'      =>$name,
                    'amount'    =>$amount,
                ];
                        
                $concert = new \App\Concert($payload);
                $concert->save();

                $link = $res->data->link;
                // return $link;
                $response = ['success'=>true, 'data'=>$link];
                return response()->json($response, 201);
                // header('Location: '.$link);
            }
            else
            {
                $response = ['success'=>false, 'data'=>'We can not process your payment'];
                return response()->json($response, 201);
            }
        }
    }

    public function quickProcess(Request $waveRequest)
    {  
        // return $waveRequest;
        //* check payment status
        if($waveRequest->status == 'cancelled')
        {
            return redirect(config('global.link1') . "/#/concert?{$waveRequest->status}&{$waveRequest->tx_ref}");
        }
        elseif($waveRequest->status == 'successful')
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
            if($response == ""){
                return $this->quickProcess($waveRequest);
            }
            
            curl_close($curl);
            
            $res = json_decode($response);

            if($res->status == "success")
            {   
                // validate payment to be sure user paid correct amount
                $amountPaid     = $res->data->charged_amount;
                $amountToPay    = $res->data->meta->price;
                $number_ticket  = $res->data->meta->number_ticket;
                $username       = $res->data->meta->username;
                $email          = $res->data->meta->email;
                $first_name     = $res->data->meta->first_name;
                $last_name      = $res->data->meta->last_name;
                $password       = $res->data->meta->password;
                if($amountPaid >= $amountToPay)
                {   
                    // Check if its the amount initiated that was finally paid for
                    $ticketSales = \App\Ticketsales::where([['username', $username], ['number_ticket', $number_ticket], ['status', 1]])->get()->first();
                    $ticketSalesAmount = $ticketSales->total_amount;
                    // remove this below
                    // $ticketSalesAmount = 1;
                    if($amountPaid >= $ticketSalesAmount){
                        // ///////////////////// SAVE USER AS PATIENT /////////////////////////////////////
                        $quickRegister = $this->PatientsController->quickRegister($username, $email, $first_name, $last_name, $password);
                        // ///////////////////// SAVE USER AS PATIENT /////////////////////////////////////
                        $status = "3";
                        $email  = $res->data->customer->email;
                        $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();

                        $concertCodeArray = array();
                        for ($x = 1; $x <= $number_ticket; $x++) {
                            // generate and send concert passcode
                            $concert_code = $concert->username ."_". md5(sprintf("%05x%05x",mt_rand(0,0xffff),mt_rand(0,0xffff)));
                            
                            // Save all in DB
                            $concert->tx_ref         = $res->data->tx_ref;
                            $concert->transaction_id = $waveRequest->transaction_id;
                            $concert->currency       = $res->data->currency;
                            $concert->charged_amount = $res->data->charged_amount;
                            $concert->payment_type   = $res->data->payment_type;
                            $concert->concert_code   = $concert_code;
                            $concert->status         = $status;
                            $concert->save();
                            
                            array_push($concertCodeArray, $concert_code);
                        }

                        // change status to show that that ticket has been paid for
                        $ticketSales->status = "2";
                        $ticketSales->save();

                        // Send email ////////////////////////////////
                        $emailDetails = [
                            'title'         => 'Spread the Love to Save a Life Concert',
                            'username'      => $concert->username,
                            'concert_code'  => $concertCodeArray
                        ];
                
                        Mail::to($email)->send(new SpreadTheLoveConcert($emailDetails));
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        $paymentDetails = [
                            'tx_ref'         =>$res->data->tx_ref,
                            'transaction_id' =>$waveRequest->transaction_id,
                            'currency'       =>$res->data->currency,
                            'charged_amount' =>$res->data->charged_amount,
                            'payment_type'   =>$res->data->payment_type,
                            'email'          =>$res->data->customer->email,
                            'activity'       => 'Transaction successful',
                        ];
                        $activitiespayment = new \App\Activitiespayment($paymentDetails);
                        $activitiespayment->save();
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                        return redirect(config('global.link1') . "#/concert?success&{$waveRequest->transaction_id}");
                        //* Continue to give item to the user
                    }else{
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        $paymentDetails = [
                            'tx_ref'         =>$res->data->tx_ref,
                            'transaction_id' =>$waveRequest->transaction_id,
                            'currency'       =>$res->data->currency,
                            'charged_amount' =>$res->data->charged_amount,
                            'payment_type'   =>$res->data->payment_type,
                            'email'          =>$res->data->customer->email,
                            'activity'       => 'Fraud transaction detected (Difference btw the amount when number of ticket was clicked and amount paid for)',
                        ];
                        $activitiespayment = new \App\Activitiespayment($paymentDetails);
                        $activitiespayment->save();
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        return redirect(config('global.link1') . "#/concert?tampered&{$waveRequest->transaction_id}");
                    }
                }
                else
                {   
                    $status = "4";
                    $email = $res->data->customer->email;
                    $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();
                    $concert->tx_ref         = $res->data->tx_ref;
                    $concert->transaction_id = $waveRequest->transaction_id;
                    $concert->currency       = $res->data->currency;
                    $concert->charged_amount = $res->data->charged_amount;
                    $concert->payment_type   = $res->data->payment_type;
                    $concert->status         = $status;
                    $concert->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'Fraud transaction detected',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/concert?Fraud&{$waveRequest->transaction_id}");
                }
            }
            else
            { 
                if($res->message == "No transaction was found for this id"){
                    $status = "5";
                    $email = $res->data->customer->email;
                    $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();
                    $concert->tx_ref         = $res->data->tx_ref;
                    $concert->transaction_id = $waveRequest->transaction_id;
                    $concert->currency       = $res->data->currency;
                    $concert->charged_amount = $res->data->charged_amount;
                    $concert->payment_type   = $res->data->payment_type;
                    $concert->status         = $status;
                    $concert->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'No transaction was found for this id',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/concert?No-transaction&{$waveRequest->transaction_id}");
                }
            }
        }
    }

    public function quickVerify(Request $waveRequest)
    {  
        // return $waveRequest;
        $txid = $waveRequest->transaction_id;
        $email = $waveRequest->email;

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
        if($response == ""){
            return $this->quickVerify($waveRequest);
        }
        
        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == "success")
        {   
            // validate payment to be sure user paid correct amount
            $amountPaid = $res->data->charged_amount;
            $amountToPay = $res->data->meta->price;
            if($amountPaid >= $amountToPay)
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Transaction successful',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>true, 'data'=>'Transaction Successful'];
                return response()->json($response, 201);
            }
            else
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Fraud transaction detected',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'Fraud transaction detected'];
                return response()->json($response, 201);
            }
        }
        else
        { 
            if($res->message == "No transaction was found for this id"){
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'email'          =>$email,
                    'activity'       => 'No transaction was found for this id',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                
                $response = ['success'=>false, 'data'=>'No transaction was found'];
                return response()->json($response, 201);
            }
        }
        
    }

    // ///////////////////////// PATIENTS //////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    public function pay(Request $waveRequest)
    {   
        // return $waveRequest;
        $validator  = Validator::make($waveRequest->all(), [ 
            'username'      => 'required|string|max:255',
            'number_ticket' => 'required|string|max:255',
            // 'amount'        => 'required|regex:/^\d+(\.\d{1,2})?$/|max:255',
            'email'         => 'required|string|max:255', 
            'name'          => 'required|string|max:255',
            'phone_number'  => 'required|string|max:255',
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $username       = Sanitizes::my_sanitize_string($waveRequest->username);
        $number_ticket  = Sanitizes::my_sanitize_string($waveRequest->number_ticket);
        // $amount         = Sanitizes::my_sanitize_string($waveRequest->amount);
        $email          = Sanitizes::my_sanitize_string($waveRequest->email);
        $name           = Sanitizes::my_sanitize_string($waveRequest->name);
        $phone_number   = Sanitizes::my_sanitize_string($waveRequest->phone_number);
        $amount         = 13200 * $number_ticket;

        // return $waveRequest;
        // remove this below
        // $amount     = "1";
        $name = $name." (".$username.")";
        // $customer_generated_id = "56";

        //* Prepare our rave request
        $request = [
            'tx_ref' => time(),
            'amount' => $amount,
            'currency' => 'NGN',
            'payment_options' => 'card',
            'redirect_url' => config('global.link1') . 'flutterwave_process',
            'customer' => [
                // 'id'    => $customer_generated_id,
                'email' => $email,
                'name'  => $name,
                'phone_number' => $phone_number
            ],
            'meta' => [
                'price' => $amount,
                'number_ticket' =>$number_ticket,
                'username'      =>$username,
            ],
            'customizations' => [
                'title' => 'CamMedics',
                'description' => 'Spread the Love Concert',
                'logo' => 'https://cammedics.com/img/favicon.jpg'
            ]
        ];

        // return $request;

        //* Ca;; f;iterwave emdpoint
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.flutterwave.com/v3/payments',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($request),
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer FLWSECK-6e7f3b93b7154ac11b098cba7999f899-X',
            'Content-Type: application/json'
        ),
        ));

        $response = curl_exec($curl);
        // return $response;

        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == 'success')
        {   
            $payload = [
                'username'  =>$username,
                'email'     =>$email,
                'name'      =>$name,
                'amount'    =>$amount,
            ];
                      
            $concert = new \App\Concert($payload);
            $concert->save();

            $link = $res->data->link;
            // return $link;
            $response = ['success'=>true, 'data'=>$link];
            return response()->json($response, 201);
            // header('Location: '.$link);
        }
        else
        {
            $response = ['success'=>false, 'data'=>'We can not process your payment'];
            return response()->json($response, 201);
        }
    }

    public function process(Request $waveRequest)
    {  
        // return $waveRequest;
        //* check payment status
        if($waveRequest->status == 'cancelled')
        {
            return redirect(config('global.link1') . "/#/spread_the_love?{$waveRequest->status}&{$waveRequest->tx_ref}");
        }
        elseif($waveRequest->status == 'successful')
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
            if($response == ""){
                return $this->process($waveRequest);
            }
            // return $response;
            
            curl_close($curl);
            
            $res = json_decode($response);

            if($res->status == "success")
            {   
                // validate payment to be sure user paid correct amount
                $amountPaid     = $res->data->charged_amount;
                $amountToPay    = $res->data->meta->price;
                $number_ticket  = $res->data->meta->number_ticket;
                $username       = $res->data->meta->username;
                if($amountPaid >= $amountToPay)
                {   
                    // Check if its the amount initiated that was finally paid for
                    $ticketSales = \App\Ticketsales::where([['username', $username], ['number_ticket', $number_ticket], ['status', 1]])->get()->first();
                    $ticketSalesAmount = $ticketSales->total_amount;
                    // remove this below
                    // $ticketSalesAmount = 1;
                    if($amountPaid >= $ticketSalesAmount){
                        $status = "3";
                        $email  = $res->data->customer->email;
                        $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();

                        $concertCodeArray = array();
                        for ($x = 1; $x <= $number_ticket; $x++) {
                            // generate and send concert passcode
                            $concert_code = $concert->username ."_". md5(sprintf("%05x%05x",mt_rand(0,0xffff),mt_rand(0,0xffff)));
                            
                            // Save all in DB
                            $concert->tx_ref         = $res->data->tx_ref;
                            $concert->transaction_id = $waveRequest->transaction_id;
                            $concert->currency       = $res->data->currency;
                            $concert->charged_amount = $res->data->charged_amount;
                            $concert->payment_type   = $res->data->payment_type;
                            $concert->concert_code   = $concert_code;
                            $concert->status         = $status;
                            $concert->save();
                            
                            array_push($concertCodeArray, $concert_code);
                        }

                        // change status to show that that ticket has been paid for
                        $ticketSales->status = "2";
                        $ticketSales->save();

                        // Send email ////////////////////////////////
                        $emailDetails = [
                            'title'         => 'Spread the Love to Save a Life Concert',
                            'username'      => $concert->username,
                            'concert_code'  => $concertCodeArray
                        ];
                
                        Mail::to($email)->send(new SpreadTheLoveConcert($emailDetails));
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        $paymentDetails = [
                            'tx_ref'         =>$res->data->tx_ref,
                            'transaction_id' =>$waveRequest->transaction_id,
                            'currency'       =>$res->data->currency,
                            'charged_amount' =>$res->data->charged_amount,
                            'payment_type'   =>$res->data->payment_type,
                            'email'          =>$res->data->customer->email,
                            'activity'       => 'Transaction successful',
                        ];
                        $activitiespayment = new \App\Activitiespayment($paymentDetails);
                        $activitiespayment->save();
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                        return redirect(config('global.link1') . "#/spread_the_love?success&{$waveRequest->transaction_id}");
                        //* Continue to give item to the user
                    }else{
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        $paymentDetails = [
                            'tx_ref'         =>$res->data->tx_ref,
                            'transaction_id' =>$waveRequest->transaction_id,
                            'currency'       =>$res->data->currency,
                            'charged_amount' =>$res->data->charged_amount,
                            'payment_type'   =>$res->data->payment_type,
                            'email'          =>$res->data->customer->email,
                            'activity'       => 'Fraud transaction detected (Difference btw the amount when number of ticket was clicked and amount paid for)',
                        ];
                        $activitiespayment = new \App\Activitiespayment($paymentDetails);
                        $activitiespayment->save();
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        return redirect(config('global.link1') . "#/spread_the_love?tampered&{$waveRequest->transaction_id}");
                    }
                }
                else
                {   
                    $status = "4";
                    $email = $res->data->customer->email;
                    $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();
                    $concert->tx_ref         = $res->data->tx_ref;
                    $concert->transaction_id = $waveRequest->transaction_id;
                    $concert->currency       = $res->data->currency;
                    $concert->charged_amount = $res->data->charged_amount;
                    $concert->payment_type   = $res->data->payment_type;
                    $concert->status         = $status;
                    $concert->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'Fraud transaction detected',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/spread_the_love?Fraud&{$waveRequest->transaction_id}");
                }
            }
            else
            { 
                if($res->message == "No transaction was found for this id"){
                    $status = "5";
                    $email = $res->data->customer->email;
                    $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();
                    $concert->tx_ref         = $res->data->tx_ref;
                    $concert->transaction_id = $waveRequest->transaction_id;
                    $concert->currency       = $res->data->currency;
                    $concert->charged_amount = $res->data->charged_amount;
                    $concert->payment_type   = $res->data->payment_type;
                    $concert->status         = $status;
                    $concert->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'No transaction was found for this id',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/spread_the_love?No-transaction&{$waveRequest->transaction_id}");
                }
            }
        }
    }

    public function verify(Request $waveRequest)
    {  
        $txid = $waveRequest->transaction_id;
        $email = $waveRequest->email;

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
        if($response == ""){
            return $this->verify($waveRequest);
        }
        
        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == "success")
        {   
            // validate payment to be sure user paid correct amount
            $amountPaid = $res->data->charged_amount;
            $amountToPay = $res->data->meta->price;
            if($amountPaid >= $amountToPay)
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Transaction successful',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>true, 'data'=>'Transaction Successful'];
                return response()->json($response, 201);
            }
            else
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Fraud transaction detected',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'Fraud transaction detected'];
                return response()->json($response, 201);
            }
        }
        else
        { 
            if($res->message == "No transaction was found for this id"){
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'email'          =>$email,
                    'activity'       => 'No transaction was found for this id',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                
                $response = ['success'=>false, 'data'=>'No transaction was found'];
                return response()->json($response, 201);
            }
        }
        
    }

    // ///////////////////////////////// DOCTOR //////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    public function docAppointmentPay(Request $waveRequest, $doctor_id, $patient_id)
    {   
        // return $waveRequest;
        $username       = $waveRequest->username;
        $email          = $waveRequest->email;
        $phone_number   = $waveRequest->phone_number;
        $amount         = $waveRequest->amount;
        $doctor_fee     = $waveRequest->doctor_fee;
        $country_handling_fee = $waveRequest->country_handling_fee;
        $name           = $waveRequest->name." (".$waveRequest->username.")";
        $description    = $waveRequest->description;
        // $customer_generated_id = "56";

        //* Prepare our rave request
        $request = [
            'tx_ref' => time(),
            'amount' => $amount,
            'currency' => 'USD',
            'payment_options' => 'card',
            'redirect_url' => config('global.link1') . 'flutterwave_doc_appointment_process',
            'customer' => [
                // 'id'    => $customer_generated_id,
                'email' => $email,
                'name'  => $name
            ],
            'meta' => [
                'price'       => $amount,
                'doctor_id'   => $doctor_id,
                'patient_id'  => $patient_id,
                'doctor_fee'  => $doctor_fee,
                'country_handling_fee'  => $country_handling_fee,
            ],
            'customizations' => [
                'title' => 'CamMedics',
                'description' => $description,
                'logo' => 'https://cammedics.com/img/favicon.jpg'
            ]
        ];

        //* Ca;; f;iterwave emdpoint
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.flutterwave.com/v3/payments',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($request),
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer FLWSECK-6e7f3b93b7154ac11b098cba7999f899-X',
            'Content-Type: application/json'
        ),
        ));

        $response = curl_exec($curl);
        // return $response;

        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == 'success')
        {   
            // $payload = [
            //     'billing_email_address' =>$email,
            //     'billing_name'          =>$name,
            //     'billing_amount_value'  =>$amount,
            // ];
                      
            // $concert = new \App\Doctorbookappointmentpayment($payload);
            // $concert->save();

            $link = $res->data->link;
            // return $link;
            $response = ['success'=>true, 'data'=>$link];
            return response()->json($response, 201);
            
        }
        else
        {
            $response = ['success'=>false, 'data'=>'We can not process your payment'];
            return response()->json($response, 201);
        }
    }

    public function docAppointmentProcess(Request $waveRequest)
    {  
        // return $waveRequest;
        //* check payment status
        if($waveRequest->status == 'cancelled')
        {
            return redirect(config('global.link1') . "#/list_doctors?{$waveRequest->status}&{$waveRequest->tx_ref}");
        }
        elseif($waveRequest->status == 'successful')
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
            if($response == ""){
                return $this->docAppointmentProcess($waveRequest);
            }
            
            curl_close($curl);
            
            $res = json_decode($response);

            if($res->status == "success")
            {   
                // validate payment to be sure user paid correct amount
                $amountPaid = $res->data->charged_amount;
                $amountToPay = $res->data->meta->price;
                $doctor_id   = $res->data->meta->doctor_id;
                $patient_id  = $res->data->meta->patient_id;
                $doctor_fee  = $res->data->meta->doctor_fee;
                $country_handling_fee  = $res->data->meta->country_handling_fee;
                if($amountPaid >= $amountToPay)
                {   
                    $status = "3";
                    $email  = $res->data->customer->email;
                    $name   = $res->data->customer->name;
                    // $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();
                    $appointment_data = Doctorbookappointment::where([['doc_id', $doctor_id], ['patient_id', $patient_id], ['status', 1]])->first();

                    $paymentDetails = [
                        'appointment_id'                =>$appointment_data->id,
                        'doc_id'                        =>$doctor_id,
                        'patient_id'                    =>$patient_id,
                        'billing_amount_currency'       =>$res->data->currency,
                        'billing_amount_value'          =>$res->data->charged_amount,
                        'billing_doctor_fee'            =>$doctor_fee,
                        'billing_country_handling_fee'  =>$country_handling_fee,
                        'billing_email_address'         =>$email,
                        'billing_name'                  =>$name,
                        'billing_orderID'               =>$waveRequest->transaction_id,
                        'billing_payerID'               =>$res->data->tx_ref,
                    ];
                    $appointmentPayment = new \App\Doctorbookappointmentpayment($paymentDetails);
                    if($appointmentPayment->save()){
                        $appointment_data->status = "2";
                        $appointment_data->save();

                        $patient_data   = Patients::where('id', '=', $patient_id)->first();
                        $doctor_data    = Doctors::where('id', '=', $doctor_id)->first();
                        // ////////// SEND MAIL TO DOCTOR //////////////////////////
                        $emailDetails = [
                            'title'             => 'New Appointment Booked',
                            'name'              => $appointment_data->doc_first_name,
                            'send_username'     => $appointment_data->patient_username,
                            'send_name'         => $appointment_data->patient_first_name." ".$appointment_data->patient_last_name,
                            'date'              => $appointment_data->date,
                            'time'              => $appointment_data->time,
                            'time_zone'         => $appointment_data->time_zone,
                            'subject'           => $appointment_data->subject,
                            'message'           => $appointment_data->message,
                            'footer'            => 'Powered by: CamMedics'
                        ];

                        Mail::to($doctor_data->email)->send(new AppointmentBooked($emailDetails));
                        // ////////////////////////////////////////////////////////////////////////////////////////
                        // ////////// SEND MAIL TO PATIENT //////////////////////////
                        $emailDetails = [
                            'title'             => 'New Appointment Booked',
                            'name'              => $appointment_data->patient_first_name,
                            'send_username'     => $appointment_data->doc_username,
                            'send_name'         => $appointment_data->doc_first_name." ".$appointment_data->doc_last_name,
                            'date'              => $appointment_data->date,
                            'time'              => $appointment_data->time,
                            'time_zone'         => $appointment_data->time_zone,
                            'subject'           => $appointment_data->subject,
                            'message'           => $appointment_data->message,
                            'footer'            => 'Powered by: CamMedics'
                        ];

                        Mail::to($patient_data->email)->send(new AppointmentBooked($emailDetails));
                        // ////////////////////////////////////////////////////////////////////////////////////////
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        $paymentDetails = [
                            'tx_ref'         =>$res->data->tx_ref,
                            'transaction_id' =>$waveRequest->transaction_id,
                            'currency'       =>$res->data->currency,
                            'charged_amount' =>$res->data->charged_amount,
                            'payment_type'   =>$res->data->payment_type,
                            'email'          =>$res->data->customer->email,
                            'activity'       => 'Transaction successful',
                        ];
                        $activitiespayment = new \App\Activitiespayment($paymentDetails);
                        $activitiespayment->save();
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        return redirect(config('global.link1') . "#/list_doctors?success&{$waveRequest->transaction_id}");
                    }
                }
                else
                {   
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'Fraud transaction detected',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/list_doctors?Fraud&{$waveRequest->transaction_id}");
                }
            }
            else
            { 
                if($res->message == "No transaction was found for this id"){
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'No transaction was found for this id',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect("config('global.link1') . '#/list_doctors?No-transaction&{$waveRequest->transaction_id}");
                }
            }
        }
    }

    public function docAppointmentVerify(Request $waveRequest)
    {  
        $txid = $waveRequest->transaction_id;
        $email = $waveRequest->email;

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
        if($response == ""){
            return $this->docAppointmentVerify($waveRequest);
        }
        
        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == "success")
        {   
            // validate payment to be sure user paid correct amount
            $amountPaid = $res->data->charged_amount;
            $amountToPay = $res->data->meta->price;
            if($amountPaid >= $amountToPay)
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Transaction successful',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>true, 'data'=>'Transaction Successful'];
                return response()->json($response, 201);
            }
            else
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Fraud transaction detected',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'Fraud transaction detected'];
                return response()->json($response, 201);
            }
        }
        else
        { 
            if($res->message == "No transaction was found for this id"){
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'email'          =>$email,
                    'activity'       => 'No transaction was found for this id',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'No transaction was found'];
                return response()->json($response, 201);
            }
        }
        
    }

    // ///////////////////////////////// LABORATORY ///////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    public function labAppointmentPay(Request $waveRequest, $lab_id, $test_id, $patient_id)
    {   
        // return $waveRequest;
        $username       = $waveRequest->username;
        $email          = $waveRequest->email;
        $phone_number   = $waveRequest->phone_number;
        $amount         = $waveRequest->amount;
        $test_fee     = $waveRequest->test_fee;
        $country_handling_fee = $waveRequest->country_handling_fee;
        $name           = $waveRequest->name." (".$waveRequest->username.")";
        $description    = $waveRequest->description;
        // $customer_generated_id = "56";

        //* Prepare our rave request
        $request = [
            'tx_ref' => time(),
            'amount' => $amount,
            'currency' => 'USD',
            'payment_options' => 'card',
            'redirect_url' => config('global.link1') . 'flutterwave_lab_appointment_process',
            'customer' => [
                // 'id'    => $customer_generated_id,
                'email' => $email,
                'name'  => $name
            ],
            'meta' => [
                'price'       => $amount,
                'lab_id'      => $lab_id,
                'test_id'     => $test_id,
                'patient_id'  => $patient_id,
                'test_fee'    => $test_fee,
                'country_handling_fee'  => $country_handling_fee,
            ],
            'customizations' => [
                'title' => 'CamMedics',
                'description' => $description,
                'logo' => 'https://cammedics.com/img/favicon.jpg'
            ]
        ];

        //* Ca;; f;iterwave emdpoint
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.flutterwave.com/v3/payments',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($request),
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer FLWSECK-6e7f3b93b7154ac11b098cba7999f899-X',
            'Content-Type: application/json'
        ),
        ));

        $response = curl_exec($curl);
        // return $response;

        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == 'success')
        {   
            $link = $res->data->link;
            // return $link;
            $response = ['success'=>true, 'data'=>$link];
            return response()->json($response, 201);
            
        }
        else
        {
            $response = ['success'=>false, 'data'=>'We can not process your payment'];
            return response()->json($response, 201);
        }
    }

    public function labAppointmentProcess(Request $waveRequest)
    {  
        // return $waveRequest;
        //* check payment status
        if($waveRequest->status == 'cancelled')
        {
            return redirect(config('global.link1') . "#/list_labs?{$waveRequest->status}&{$waveRequest->tx_ref}");
        }
        elseif($waveRequest->status == 'successful')
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
            if($response == ""){
                return $this->labAppointmentProcess($waveRequest);
            }
            
            curl_close($curl);
            
            $res = json_decode($response);

            if($res->status == "success")
            {   
                // validate payment to be sure user paid correct amount
                $amountPaid  = $res->data->charged_amount;
                $amountToPay = $res->data->meta->price;
                $lab_id      = $res->data->meta->lab_id;
                $test_id     = $res->data->meta->test_id;
                $patient_id  = $res->data->meta->patient_id;
                $test_fee    = $res->data->meta->test_fee;
                $country_handling_fee  = $res->data->meta->country_handling_fee;
                if($amountPaid >= $amountToPay)
                {   
                    $status = "3";
                    $email  = $res->data->customer->email;
                    $name   = $res->data->customer->name;
                    // $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();
                    $appointment_data = Labbookappointment::where([['test_id', $test_id], ['lab_id', $lab_id], ['patient_id', $patient_id], ['status', 1]])->first();

                    $paymentDetails = [
                        'appointment_id'                =>$appointment_data->id,
                        'lab_id'                        =>$lab_id,
                        'test_id'                       =>$test_id,
                        'patient_id'                    =>$patient_id,
                        'billing_amount_currency'       =>$res->data->currency,
                        'billing_amount_value'          =>$res->data->charged_amount,
                        'billing_test_fee'              =>$test_fee,
                        'billing_country_handling_fee'  =>$country_handling_fee,
                        'billing_email_address'         =>$email,
                        'billing_name'                  =>$name,
                        'billing_orderID'               =>$waveRequest->transaction_id,
                        'billing_payerID'               =>$res->data->tx_ref,
                    ];
                    $appointmentPayment = new \App\Labbookappointmentpayment($paymentDetails);
                    if($appointmentPayment->save()){
                        $appointment_data->status = "2";
                        $appointment_data->save();

                        $patient_data   = Patients::where('id', '=', $patient_id)->first();
                        $lab_data       = Labs::where('id', '=', $lab_id)->first();
                        // ////////// SEND MAIL TO LABORATORY //////////////////////////
                        $emailDetails = [
                            'title'             => 'New Appointment Booked',
                            'name'              => $appointment_data->lab_name,
                            'send_username'     => $appointment_data->patient_username,
                            'send_name'         => $appointment_data->patient_first_name." ".$appointment_data->patient_last_name,
                            'date'              => $appointment_data->date,
                            'time'              => $appointment_data->time,
                            'time_zone'         => $appointment_data->time_zone,
                            'subject'           => $appointment_data->subject,
                            'message'           => $appointment_data->message,
                            'footer'            => 'Powered by: CamMedics'
                        ];

                        Mail::to($lab_data->email)->send(new AppointmentBooked($emailDetails));
                        // ////////////////////////////////////////////////////////////////////////////////////////
                        // ////////// SEND MAIL TO PATIENT //////////////////////////
                        $emailDetails = [
                            'title'             => 'New Appointment Booked',
                            'name'              => $appointment_data->patient_first_name,
                            'send_username'     => $appointment_data->lab_username,
                            'send_name'         => $appointment_data->lab_name,
                            'date'              => $appointment_data->date,
                            'time'              => $appointment_data->time,
                            'time_zone'         => $appointment_data->time_zone,
                            'subject'           => $appointment_data->subject,
                            'message'           => $appointment_data->message,
                            'footer'            => 'Powered by: CamMedics'
                        ];

                        Mail::to($patient_data->email)->send(new AppointmentBooked($emailDetails));
                        // ////////////////////////////////////////////////////////////////////////////////////////
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        $paymentDetails = [
                            'tx_ref'         =>$res->data->tx_ref,
                            'transaction_id' =>$waveRequest->transaction_id,
                            'currency'       =>$res->data->currency,
                            'charged_amount' =>$res->data->charged_amount,
                            'payment_type'   =>$res->data->payment_type,
                            'email'          =>$res->data->customer->email,
                            'activity'       => 'Transaction successful',
                        ];
                        $activitiespayment = new \App\Activitiespayment($paymentDetails);
                        $activitiespayment->save();
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        return redirect(config('global.link1') . "#/list_labs?success&{$waveRequest->transaction_id}");
                    }
                }
                else
                {   
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'Fraud transaction detected',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/list_labs?Fraud&{$waveRequest->transaction_id}");
                }
            }
            else
            { 
                if($res->message == "No transaction was found for this id"){
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'No transaction was found for this id',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/list_labs?No-transaction&{$waveRequest->transaction_id}");
                }
            }
        }
    }

    public function labAppointmentVerify(Request $waveRequest)
    {  
        $txid = $waveRequest->transaction_id;
        $email = $waveRequest->email;

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
        if($response == ""){
            return $this->labAppointmentVerify($waveRequest);
        }
        
        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == "success")
        {   
            // validate payment to be sure user paid correct amount
            $amountPaid = $res->data->charged_amount;
            $amountToPay = $res->data->meta->price;
            if($amountPaid >= $amountToPay)
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Transaction successful',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>true, 'data'=>'Transaction Successful'];
                return response()->json($response, 201);
            }
            else
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Fraud transaction detected',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'Fraud transaction detected'];
                return response()->json($response, 201);
            }
        }
        else
        { 
            if($res->message == "No transaction was found for this id"){
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'email'          =>$email,
                    'activity'       => 'No transaction was found for this id',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'No transaction was found'];
                return response()->json($response, 201);
            }
        }
        
    }

    // ///////////////////////////////// PORT //////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    public function portAppointmentPay(Request $waveRequest, $port_id, $patient_id)
    {   
        // return $waveRequest;
        $username       = $waveRequest->username;
        $email          = $waveRequest->email;
        $phone_number   = $waveRequest->phone_number;
        $amount         = $waveRequest->amount;
        $port_fee       = $waveRequest->port_fee;
        $country_handling_fee = $waveRequest->country_handling_fee;
        $name           = $waveRequest->name." (".$waveRequest->username.")";
        $description    = $waveRequest->description;
        // $customer_generated_id = "56";

        //* Prepare our rave request
        $request = [
            'tx_ref' => time(),
            'amount' => $amount,
            'currency' => 'USD',
            'payment_options' => 'card',
            'redirect_url' => config('global.link1') . 'flutterwave_port_appointment_process',
            'customer' => [
                // 'id'    => $customer_generated_id,
                'email' => $email,
                'name'  => $name
            ],
            'meta' => [
                'price'       => $amount,
                'port_id'     => $port_id,
                'patient_id'  => $patient_id,
                'port_fee'    => $port_fee,
                'country_handling_fee'  => $country_handling_fee,
            ],
            'customizations' => [
                'title' => 'CamMedics',
                'description' => $description,
                'logo' => 'https://cammedics.com/img/favicon.jpg'
            ]
        ];

        //* Ca;; f;iterwave emdpoint
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.flutterwave.com/v3/payments',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($request),
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer FLWSECK-6e7f3b93b7154ac11b098cba7999f899-X',
            'Content-Type: application/json'
        ),
        ));

        $response = curl_exec($curl);
        // return $response;

        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == 'success')
        {   
            $link = $res->data->link;
            // return $link;
            $response = ['success'=>true, 'data'=>$link];
            return response()->json($response, 201);
            
        }
        else
        {
            $response = ['success'=>false, 'data'=>'We can not process your payment'];
            return response()->json($response, 201);
        }
    }

    public function portAppointmentProcess(Request $waveRequest)
    {  
        // return $waveRequest;
        //* check payment status
        if($waveRequest->status == 'cancelled')
        {

            return redirect(config('global.link1') . "#/list_ports?{$waveRequest->status}&{$waveRequest->tx_ref}");
        }
        elseif($waveRequest->status == 'successful')
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
            if($response == ""){
                return $this->portAppointmentProcess($waveRequest);
            }
            
            curl_close($curl);
            
            $res = json_decode($response);

            if($res->status == "success")
            {   
                // validate payment to be sure user paid correct amount
                $amountPaid = $res->data->charged_amount;
                $amountToPay = $res->data->meta->price;
                $port_id     = $res->data->meta->port_id;
                $patient_id  = $res->data->meta->patient_id;
                $port_fee    = $res->data->meta->port_fee;
                $country_handling_fee  = $res->data->meta->country_handling_fee;
                if($amountPaid >= $amountToPay)
                {   
                    $status = "3";
                    $email  = $res->data->customer->email;
                    $name   = $res->data->customer->name;
                    // $concert = Concert::where([['amount', $amountPaid], ['email', $email], ['status', 1]])->first();
                    $appointment_data = Portbookappointment::where([['port_id', $port_id], ['patient_id', $patient_id], ['status', 1]])->first();

                    $paymentDetails = [
                        'appointment_id'                =>$appointment_data->id,
                        'port_id'                       =>$port_id,
                        'patient_id'                    =>$patient_id,
                        'billing_amount_currency'       =>$res->data->currency,
                        'billing_amount_value'          =>$res->data->charged_amount,
                        'billing_port_fee'              =>$port_fee,
                        'billing_country_handling_fee'  =>$country_handling_fee,
                        'billing_email_address'         =>$email,
                        'billing_name'                  =>$name,
                        'billing_orderID'               =>$waveRequest->transaction_id,
                        'billing_payerID'               =>$res->data->tx_ref,
                    ];
                    $appointmentPayment = new \App\Portbookappointmentpayment($paymentDetails);
                    if($appointmentPayment->save()){
                        $appointment_data->status = "2";
                        $appointment_data->save();

                        $patient_data   = Patients::where('id', '=', $patient_id)->first();
                        $port_data     = Ports::where('id', '=', $port_id)->first();
                        // ////////// SEND MAIL TO PORT //////////////////////////
                        $emailDetails = [
                            'title'             => 'New Appointment Booked',
                            'name'              => $appointment_data->port_name,
                            'send_username'     => $appointment_data->patient_username,
                            'send_name'         => $appointment_data->patient_first_name." ".$appointment_data->patient_last_name,
                            'date'              => $appointment_data->date,
                            'time'              => $appointment_data->time,
                            'time_zone'         => $appointment_data->time_zone,
                            'subject'           => $appointment_data->subject,
                            'message'           => $appointment_data->message,
                            'footer'            => 'Powered by: CamMedics'
                        ];

                        Mail::to($port_data->email)->send(new AppointmentBooked($emailDetails));
                        // ////////////////////////////////////////////////////////////////////////////////////////
                        // ////////// SEND MAIL TO PATIENT //////////////////////////
                        $emailDetails = [
                            'title'             => 'New Appointment Booked',
                            'name'              => $appointment_data->patient_first_name,
                            'send_username'     => $appointment_data->port_username,
                            'send_name'         => $appointment_data->port_name,
                            'date'              => $appointment_data->date,
                            'time'              => $appointment_data->time,
                            'time_zone'         => $appointment_data->time_zone,
                            'subject'           => $appointment_data->subject,
                            'message'           => $appointment_data->message,
                            'footer'            => 'Powered by: CamMedics'
                        ];

                        Mail::to($patient_data->email)->send(new AppointmentBooked($emailDetails));
                        // ////////////////////////////////////////////////////////////////////////////////////////
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        $paymentDetails = [
                            'tx_ref'         =>$res->data->tx_ref,
                            'transaction_id' =>$waveRequest->transaction_id,
                            'currency'       =>$res->data->currency,
                            'charged_amount' =>$res->data->charged_amount,
                            'payment_type'   =>$res->data->payment_type,
                            'email'          =>$res->data->customer->email,
                            'activity'       => 'Transaction successful',
                        ];
                        $activitiespayment = new \App\Activitiespayment($paymentDetails);
                        $activitiespayment->save();
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        return redirect(config('global.link1') . "#/list_ports?success&{$waveRequest->transaction_id}");
                    }
                }
                else
                {   
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'Fraud transaction detected',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/list_ports?Fraud&{$waveRequest->transaction_id}");
                }
            }
            else
            { 
                if($res->message == "No transaction was found for this id"){
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'No transaction was found for this id',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/list_ports?No-transaction&{$waveRequest->transaction_id}");
                }
            }
        }
    }

    public function portAppointmentVerify(Request $waveRequest)
    {  
        $txid = $waveRequest->transaction_id;
        $email = $waveRequest->email;

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
        if($response == ""){
            return $this->portAppointmentVerify($waveRequest);
        }
        
        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == "success")
        {   
            // validate payment to be sure user paid correct amount
            $amountPaid = $res->data->charged_amount;
            $amountToPay = $res->data->meta->price;
            if($amountPaid >= $amountToPay)
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Transaction successful',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>true, 'data'=>'Transaction Successful'];
                return response()->json($response, 201);
            }
            else
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Fraud transaction detected',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'Fraud transaction detected'];
                return response()->json($response, 201);
            }
        }
        else
        { 
            if($res->message == "No transaction was found for this id"){
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'email'          =>$email,
                    'activity'       => 'No transaction was found for this id',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'No transaction was found'];
                return response()->json($response, 201);
            }
        }
        
    }

    // ///////////////////////////////// CHECKOUT //////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    public function checkoutPay(Request $waveRequest, $pharm_id, $patient_id)
    {   
        // return $waveRequest;
        $username       = $waveRequest->username;
        $email          = $waveRequest->email;
        $phone_number   = $waveRequest->phone_number;
        $amount         = $waveRequest->amount;
        $cart_total     = $waveRequest->cart_total;
        $country_handling_fee = $waveRequest->country_handling_fee;
        $name           = $waveRequest->name." (".$waveRequest->username.")";
        $description    = $waveRequest->description;
        // $customer_generated_id = "56";

        //* Prepare our rave request
        $request = [
            'tx_ref' => time(),
            'amount' => $amount,
            'currency' => 'USD',
            'payment_options' => 'card',
            'redirect_url' => config('global.link1') . 'flutterwave_checkout_process',
            'customer' => [
                // 'id'    => $customer_generated_id,
                'email' => $email,
                'name'  => $name
            ],
            'meta' => [
                'price'       => $amount,
                'pharm_id'    => $pharm_id,
                'patient_id'  => $patient_id,
                'cart_total'  => $cart_total,
                'country_handling_fee'  => $country_handling_fee,
            ],
            'customizations' => [
                'title' => 'CamMedics',
                'description' => $description,
                'logo' => 'https://cammedics.com/img/favicon.jpg'
            ]
        ];

        //* Ca;; f;iterwave emdpoint
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.flutterwave.com/v3/payments',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($request),
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer FLWSECK-6e7f3b93b7154ac11b098cba7999f899-X',
            'Content-Type: application/json'
        ),
        ));

        $response = curl_exec($curl);
        // return $response;

        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == 'success')
        {   
            $link = $res->data->link;
            // return $link;
            $response = ['success'=>true, 'data'=>$link];
            return response()->json($response, 201);
            
        }
        else
        {
            $response = ['success'=>false, 'data'=>'We can not process your payment'];
            return response()->json($response, 201);
        }
    }

    public function checkoutProcess(Request $waveRequest)
    {  
        // return $waveRequest;
        //* check payment status
        if($waveRequest->status == 'cancelled')
        {
            return redirect(config('global.link1') . "#/cart?{$waveRequest->status}&{$waveRequest->tx_ref}");
        }
        elseif($waveRequest->status == 'successful')
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
            if($response == ""){
                return $this->checkoutProcess($waveRequest);
            }
            
            curl_close($curl);
            
            $res = json_decode($response);

            if($res->status == "success")
            {   
                // validate payment to be sure user paid correct amount
                $amountPaid = $res->data->charged_amount;
                $amountToPay = $res->data->meta->price;
                $pharm_id    = $res->data->meta->pharm_id;
                $patient_id  = $res->data->meta->patient_id;
                $cart_total  = $res->data->meta->cart_total;
                $country_handling_fee  = $res->data->meta->country_handling_fee;
                if($amountPaid >= $amountToPay)
                {   
                    $email  = $res->data->customer->email;
                    $name   = $res->data->customer->name;
                    $created_at = $res->data->customer->created_at;
                    // Get pharmacy details from username
                    $pharm_data     = Pharmacies::where('id', '=', $pharm_id)->first();
                    $pharm_username = $pharm_data->username;
                    $pharm_name     = $pharm_data->name;
                    $pharm_email    = $pharm_data->email;

                    // Get patients details
                    $patient_data       = Patients::where('id', '=', $patient_id)->first();
                    $patient_username   = $patient_data->username;
                    $patient_first_name = $patient_data->first_name;
                    $patient_last_name  = $patient_data->last_name;
                    $patient_middle_name= $patient_data->middle_name;

                    $payload = [
                        'billing_create_time'       =>$created_at,
                        'billing_update_time'       =>$created_at,
                        'billing_amount_currency'   =>$res->data->currency,
                        'billing_amount_value'      =>$res->data->charged_amount,
                        'billing_cart_total'        =>$cart_total,
                        'billing_handling_fee'      =>$country_handling_fee,
                        'billing_email_address'     =>$email,
                        'billing_name'              =>$name,
                        'billing_orderID'           =>$waveRequest->transaction_id,
                        'billing_payerID'           =>$res->data->tx_ref, 

                        'pharm_id'              =>$pharm_id, 
                        'pharm_username'        =>$pharm_username,
                        'pharm_name'            =>$pharm_name,
                        
                        'patient_id'            =>$patient_id,
                        'patient_username'      =>$patient_username,
                        'patient_first_name'    =>$patient_first_name,
                        'patient_last_name'     =>$patient_last_name,
                        'patient_middle_name'   =>$patient_middle_name,
                    ];

                    $pharmorder = new \App\Pharmorder($payload);
                    if ($pharmorder->save())
                    {   
                        $order_number = $pharmorder->id;
                        $status = 2;
                        DB::table('productcarts') 
                        ->where([['patient_id', $patient_id], ['status', 1]])
                        ->update([ 'pharmorder_no' => $order_number ]);
                        DB::table('productcarts') 
                        ->where([['patient_id', $patient_id], ['status', 1]])
                        ->update([ 'status' => $status ]);

                        // ////////// SEND MAIL //////////////////////////
                        $emailDetails = [
                            'title'             => 'New Sales',
                            'name'              => $pharm_name,
                            'patient_username'  => $patient_username,
                            'patient_name'      => $patient_first_name." ".$patient_middle_name." ".$patient_last_name,
                            'time'              => $created_at,
                            'currency'          => $res->data->currency,
                            'total'             => $cart_total,
                            'footer'            => 'Powered by: CamMedics'
                        ];

                        Mail::to($pharm_email)->send(new NewSales($emailDetails));
                        // ////////////////////////////////////////////////////////////////////////////////////////
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                        $paymentDetails = [
                            'tx_ref'         =>$res->data->tx_ref,
                            'transaction_id' =>$waveRequest->transaction_id,
                            'currency'       =>$res->data->currency,
                            'charged_amount' =>$res->data->charged_amount,
                            'payment_type'   =>$res->data->payment_type,
                            'email'          =>$res->data->customer->email,
                            'activity'       => 'Transaction successful',
                        ];
                        $activitiespayment = new \App\Activitiespayment($paymentDetails);
                        $activitiespayment->save();
                        // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                        return redirect(config('global.link1') . "#/cart?success&{$waveRequest->transaction_id}");
                    }
                    else
                        return redirect(config('global.link1') . "#/cart?Order-failed&{$waveRequest->transaction_id}");
                }
                else
                {   
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'Fraud transaction detected',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/cart?Fraud&{$waveRequest->transaction_id}");
                }
            }
            else
            { 
                if($res->message == "No transaction was found for this id"){
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                    $paymentDetails = [
                        'tx_ref'         =>$res->data->tx_ref,
                        'transaction_id' =>$waveRequest->transaction_id,
                        'currency'       =>$res->data->currency,
                        'charged_amount' =>$res->data->charged_amount,
                        'payment_type'   =>$res->data->payment_type,
                        'email'          =>$res->data->customer->email,
                        'activity'       => 'No transaction was found for this id',
                    ];
                    $activitiespayment = new \App\Activitiespayment($paymentDetails);
                    $activitiespayment->save();
                    // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////

                    return redirect(config('global.link1') . "#/cart?No-transaction&{$waveRequest->transaction_id}");
                }
            }
        }
    }

    public function checkoutVerify(Request $waveRequest)
    {  
        $txid = $waveRequest->transaction_id;
        $email = $waveRequest->email;

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
        if($response == ""){
            return $this->checkoutVerify($waveRequest);
        }
        
        curl_close($curl);
        
        $res = json_decode($response);

        if($res->status == "success")
        {   
            // validate payment to be sure user paid correct amount
            $amountPaid = $res->data->charged_amount;
            $amountToPay = $res->data->meta->price;
            if($amountPaid >= $amountToPay)
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Transaction successful',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>true, 'data'=>'Transaction Successful'];
                return response()->json($response, 201);
            }
            else
            {   
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'tx_ref'         =>$res->data->tx_ref,
                    'transaction_id' =>$waveRequest->transaction_id,
                    'currency'       =>$res->data->currency,
                    'charged_amount' =>$res->data->charged_amount,
                    'payment_type'   =>$res->data->payment_type,
                    'email'          =>$res->data->customer->email,
                    'activity'       => 'Fraud transaction detected',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'Fraud transaction detected'];
                return response()->json($response, 201);
            }
        }
        else
        { 
            if($res->message == "No transaction was found for this id"){
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $paymentDetails = [
                    'email'          =>$email,
                    'activity'       => 'No transaction was found for this id',
                ];
                $activitiespayment = new \App\Activitiespayment($paymentDetails);
                $activitiespayment->save();
                // /////////////////////////////// SAVE ACTIVITY /////////////////////////////////////////
                $response = ['success'=>false, 'data'=>'No transaction was found'];
                return response()->json($response, 201);
            }
        }
        
    }

}
