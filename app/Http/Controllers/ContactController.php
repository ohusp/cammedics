<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Contact;

use Mail;
use App\Mail\ReplyContactMessage;
// namespace App\Http\Controllers;
// use Illuminate\Http\Request;
// use App\User;
use JWTAuth;
use JWTAuthException;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $contactus = Contact::paginate(10);
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

    public function reply(Request $request, $id)
    {   
        // return $request;
        $validator  = Validator::make($request->all(), [  
            'reply_subject' => 'required|string|max:255', 
            'reply_message' => 'required|string|max:65000', 
            'sender_id'     => 'required|integer|max:255', 
            'sender_email'  => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $reply_subject  = Sanitizes::my_sanitize_string( $request->reply_subject );
        $reply_message  = Sanitizes::my_sanitize_html( $request->reply_message );
        $sender_id      = Sanitizes::my_sanitize_string( $request->sender_id );
        $sender_email   = Sanitizes::my_sanitize_email( $request->sender_email );

        $contact_data = Contact::where('id', '=', $id)->first();
        $contact_data->reply_subject  = $reply_subject;
        $contact_data->reply_message  = $reply_message;
        $contact_data->save();

         // ////////// SEND MAIL //////////////////////////
         $emailDetails = [
            'subject'           => $reply_subject,
            'message'           => $reply_message,
            'footer'            => 'Powered by: CamMedics'
        ];

        Mail::to($sender_email)->send(new ReplyContactMessage($emailDetails));
        // ////////////////////////////////////////////////////////////////////////////////////////

        $response = ['success'=>true, 'data'=>"Message successfully sent"];
        return response()->json($response, 201);
    }

}
