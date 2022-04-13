<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Videochat;

// namespace App\Http\Controllers;
// use Illuminate\Http\Request;
// use App\User;
use JWTAuth;
use JWTAuthException;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;

class VideoChatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $videochat = Videochat::paginate(10);
        // return $result;
        $response = ['success'=>true, 'data'=>$videochat];
        return response()->json($response, 201);
    }

    public function save(Request $request, $id)
    {   
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'login_as'  => 'required|string|max:255', 
            'username'  => 'required|string|max:255', 
            'name'      => 'required|string|max:255', 
            'roomLink'  => 'required|string|max:255', 
            'passcode'  => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $login_as   = Sanitizes::my_sanitize_string($request->login_as);
        $username   = Sanitizes::my_sanitize_string($request->username);
        $name       = Sanitizes::my_sanitize_string($request->name);
        $roomLink   = Sanitizes::my_sanitize_string($request->roomLink);
        $passcode   = Sanitizes::my_sanitize_string($request->passcode);

        $payload = [
            'user_id'   =>$id,
            'user_type'  =>$login_as,
            'username'  =>$username,
            'name'      =>$name, 
            'roomLink'  =>$roomLink, 
            'passcode'  =>$passcode, 
        ];
                
        $shared = new \App\Videochat($payload);
        if ($shared->save())
        {
            $response = ['success'=>true, 'data'=>"saved"];
            return response()->json($response, 201);
        }else{
            $response = ['success'=>false, 'data'=>"not saved"];
            return response()->json($response, 201);
        }

    }

    public function checkIfExist(Request $request, $id){
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'roomLink'  => 'required|string|max:255', 
            'passcode'  => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $roomLink   = Sanitizes::my_sanitize_string($request->roomLink);
        $passcode   = Sanitizes::my_sanitize_string($request->passcode);

        // return "roomLink-> ". $roomLink . "passcode-> ". $passcode;
        
        $exist = Videochat::where([['roomLink', $roomLink], ['passcode', $passcode]])->get()->first();
            
        if($exist){
            // return "Paulo";
            $status = 2;
            // update status to 2 if user checks link and status is 1
            // $exist->update([[ 'status' => $status ], ['patient_id' => $id]]);
            if($exist->status == "1"){
                $exist->status = $status;
                $exist->save();
            }
            
            // DB::table('videochats') 
            // ->where([['roomLink', $roomLink], ['passcode', $passcode], ['status', "1"]])
            // ->update([[ 'status' => $status ], ['patient_id' => $id]]);
            $response = ['success'=>true, 'data'=>"Ok"];
            return response()->json($response, 201);
        }else{
            $response = ['success'=>false, 'data'=>"Not Ok"];
            return response()->json($response, 201);
        }
    }

    public function update(Request $request, $id)
    {   
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'login_as'  => 'required|string|max:255', 
            'username'  => 'required|string|max:255', 
            'name'      => 'required|string|max:255', 
            'roomLink'  => 'required|string|max:255', 
            'passcode'  => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $login_as   = Sanitizes::my_sanitize_string($request->login_as);
        $username   = Sanitizes::my_sanitize_string($request->username);
        $name       = Sanitizes::my_sanitize_string($request->name);
        $roomLink   = Sanitizes::my_sanitize_string($request->roomLink);
        $passcode   = Sanitizes::my_sanitize_string($request->passcode);
        $status     = "3";

        // $payload = [
        //     'patient_username'  =>$username,
        //     'patient_name'      =>$name, 
        //     'status'            =>$status,
        // ];
                
        $videochat = Videochat::where([['roomLink', $roomLink], ['passcode', $passcode]])->get()->first();
        $videochat->patient_id       = $id;
        $videochat->patient_username = $username;
        $videochat->patient_name     = $name;
        $videochat->status           = $status;
        $videochat->save();
        if ($videochat->save())
        {
            $response = ['success'=>true, 'data'=>"saved"];
            return response()->json($response, 201);
        }

    }

    public function logout(Request $request, $id)
    {   
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'roomLink'  => 'required|string|max:255', 
            'passcode'  => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }

        $roomLink   = Sanitizes::my_sanitize_string($request->roomLink);
        $passcode   = Sanitizes::my_sanitize_string($request->passcode);
        $status     = "4";
                
        $videochat = Videochat::where([['roomLink', $roomLink], ['passcode', $passcode]])->get()->first();
        $videochat->status = $status;
        $videochat->save();
        if ($videochat->save())
        {
            $response = ['success'=>true, 'data'=>"saved"];
            return response()->json($response, 201);
        }

    }
}
