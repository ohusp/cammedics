<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Sendemail;

use Mail;
use App\Mail\CamMedicsEmail;
// namespace App\Http\Controllers;
// use Illuminate\Http\Request;
// use App\User;
use JWTAuth;
use JWTAuthException;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;

class SendEmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $contactus = Sendemail::paginate(10);
        // return $result;
        $response = ['success'=>true, 'data'=>$contactus];
        return response()->json($response, 201);
    }

    public function changeStatus($id)
    {
        $data = Contact::where('id', '=', $id)->first();
        $status    = $data->status;
        if($status == 1){ 
            $data->status = 2;
            $data->save();
            $response = ['success'=>true, 'data'=>$data];
            return response()->json($response, 201);
        }
        if($status == 2){ 
            $data->status = 1;
            $data->save();
            $response = ['success'=>true, 'data'=>$data];
            return response()->json($response, 201);
        }
    }

    public function sendEmail(Request $request, $id)
    {   
        // return $request;
        $validator  = Validator::make($request->all(), [  
            'from_email'    => 'required|string|max:255',
            'send_email'    => 'required|string|max:255',
            'send_subject'  => 'required|string|max:255', 
            'send_message'  => 'required|string|max:65000', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $from_email     = Sanitizes::my_sanitize_string( $request->from_email );
        $send_email     = Sanitizes::my_sanitize_string( $request->send_email );
        $send_subject   = Sanitizes::my_sanitize_string( $request->send_subject );
        // $send_message   = Sanitizes::my_sanitize_html( $request->send_message );

        $payload = [
            'from_email'   =>$from_email,
            'send_email'   =>$send_email,
            'send_subject' =>$send_subject,
            'send_message' =>$request->send_message, 
        ];
                
        $shared = new \App\Sendemail($payload);
        if ($shared->save())
        {
            // ////////// SEND MAIL //////////////////////////
            $emailDetails = [
                'from'     => $from_email,
                'email'    => $send_email,
                'subject'  => $send_subject,
                'message'  => $request->send_message,
                'footer'   => 'Powered by: CamMedics'
            ];

            Mail::to($send_email)->send(new CamMedicsEmail($emailDetails));
            // ////////////////////////////////////////////////////////////////////////////////////////
            $response = ['success'=>true, 'data'=>"Email sent"];
            return response()->json($response, 201);
        }else{
            $response = ['success'=>false, 'data'=>"Email not sent"];
            return response()->json($response, 201);
        }
    }


}
