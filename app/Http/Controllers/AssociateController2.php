<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Associates;
use App\Patientslist;
use App\Doctors;
use App\Hospitals;
use App\Labs;
use App\Ports;
use App\Pharmacies;
use App\Pharmorder;

// namespace App\Http\Controllers;
// use Illuminate\Http\Request;
// use App\User;
use JWTAuth;
use JWTAuthException;

use Illuminate\Support\Facades\Validator;
use App\Sanitizes\Sanitizes;

class AssociateController2 extends Controller
{   
    // public function __construct()
    // {
    //     $this->middleware('role:superadministrator');
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    

    public function show($id)
    {
        //
        $associate_data = Associates::where('id', '=', $id)->first();

        // return $pharm_data;

        $response = ['success'=>true, 'data'=>[
            'auth_token'=>$associate_data->auth_token,
            'id'=>$associate_data->id,
            'username'=>$associate_data->username,
            'name'=>$associate_data->name,
            'email'=>$associate_data->email, 
            'zip_code'=>$associate_data->zip_code, 
            'telephone'=>$associate_data->telephone, 
            'country'=>$associate_data->country, 
            'district_province_state'=>$associate_data->district_province_state, 
            'address'=>$associate_data->address, 
            'test_carried_out'=>$associate_data->test_carried_out, 
            'logo'=>$associate_data->logo,
            'medical_certificate'=>$associate_data->medical_certificate,
            'medical_license'=>$associate_data->medical_license, 

            'bank_name'=>$associate_data->bank_name,
            'bank_account_name'=>$associate_data->bank_account_name,
            'bank_account_number'=>$associate_data->bank_account_number,

            'status'=>$associate_data->status, 
            'created_at'=>$associate_data->created_at
        ]];

        return response()->json($response, 201);
    }

    public function update(Request $request, $id)
    {   
        $validator  = Validator::make($request->all(), [ 
            'name'      => 'required|string|max:255', 
            'zip_code'  => 'required|string|max:255', 
            'telephone' => 'required|string|max:255', 
            'country'   => 'required|string|max:255', 
            'district_province_state'     => 'required|string|max:255', 
            'address'   => 'required|string|max:65000', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }
        // Find user with that id
        $associate_data = Associates::where('id', '=', $id)->first();

        $associate_data->name        = Sanitizes::my_sanitize_string( $request->name);
        $associate_data->zip_code    = Sanitizes::my_sanitize_string( $request->zip_code);
        $associate_data->telephone   = Sanitizes::my_sanitize_string( $request->telephone);
        $associate_data->country     = Sanitizes::my_sanitize_string( $request->country);
        $associate_data->district_province_state     = Sanitizes::my_sanitize_string( $request->district_province_state);
        $associate_data->address     = Sanitizes::my_sanitize_string( $request->address);
        $associate_data->save();
        
        $response = ['success'=>true, 'data'=>$associate_data];
        return response()->json($response, 201);
    }

    public function updateAccountDetails(Request $request, $id)
    {   
        // return $request;
        $validator  = Validator::make($request->all(), [ 
            'bank_name'             => 'required|string|max:255', 
            'bank_account_name'     => 'required|string|max:255', 
            'bank_account_number'   => 'required|string|max:255', 
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }
        // Find user with that id
        $associate_data = Associates::where('id', '=', $id)->first();

        $associate_data->bank_name           = Sanitizes::my_sanitize_string( $request->bank_name );
        $associate_data->bank_account_name   = Sanitizes::my_sanitize_string( $request->bank_account_name );
        $associate_data->bank_account_number = Sanitizes::my_sanitize_string( $request->bank_account_number );
        $associate_data->save();

        // $pharm_data->update($request->all());
        $response = ['success'=>true, 'data'=>$associate_data];
        return response()->json($response, 201);
    }

    public function updateLogo(Request $request, $id) {
        // return $request;
        $validator = Validator::make($request->all(), [ 
            'logo' => 'mimes:pdf,jpeg,png,jpg|max:512'
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }
        
        // get the user_id to update
        $associate_data = Associates::where('id', '=', $id)->first();

        // get the file from the request and concartinate time with the name
        $file = $request->file('logo');

        $fileName = $id .'-'. time().'-'.$file->getClientOriginalName();

        // Path where the file will be saved
        $path = config('global.file_path1') . 'associates/logo/'.$id;
        $destinationPath = public_path().$path;
        // return $destinationPath;
  
        // This moved file to server folder
        $file->move($destinationPath,$fileName);

        // save file name in database
        $associate_data->logo = config('global.file_path2') . "associates/logo/".$id."/".$fileName;
        // for online
        // $associate_data->logo = "/dashboard/public/images/uploads/associates/logo/".$id."/".$fileName;
        $associate_data->save();

        // return response
        $response = ['success'=>true, 'data'=>$associate_data];
        return response()->json($response, 201);
    }

    public function updateCertificate(Request $request, $id) {
        // return $request;
        $validator = Validator::make($request->all(), [ 
            'medical_certificate' => 'mimes:pdf,jpeg,png,jpg|max:512'
        ]);

        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>false, 'data'=>$validationError];
            return response()->json($response, 201);
        }
        
        // get the user_id to update
        $associate_data = Associates::where('id', '=', $id)->first();

        // get the file from the request and concartinate time with the name
        $file = $request->file('medical_certificate');

        $fileName = $id .'.'. time().'.'.$file->getClientOriginalName();

        // Path where the file will be saved
        $path = config('global.file_path1') . 'associates/medical_certificate/'.$id;
        $destinationPath = public_path().$path;
        // return $destinationPath;
  
        // This moved file to server folder
        $file->move($destinationPath,$fileName);

        // save file name in database
        $associate_data->medical_certificate = config('global.file_path2') . "associates/medical_certificate/".$id."/".$fileName;
        // for online
        // $associate_data->medical_certificate = "/dashboard/public/images/uploads/associates/medical_certificate/".$id."/".$fileName;
        $associate_data->save();

        // return response
        $response = ['success'=>true, 'data'=>$associate_data];
        return response()->json($response, 201);
    }
    
    public function listDoctors($associate_id)
    {   
        $doctorsList = Doctors::where('associate', '=', $associate_id)->paginate(10);

        // return $result;
        $response = ['success'=>true, 'data'=>$doctorsList];
        return response()->json($response, 201);
    }

    public function account($id)
    {   
        // $account = Doctorbookappointmentpayment::where('doc_id', '=', $id)->paginate(10);
        // $appointment_id = $account->appointment_id;

        // $appointment = Doctorbookappointment::where('appointment_id', '=', $appointment_id)->paginate(10);

        $account = DB::table('doctorbookappointmentpayments')
            ->join('doctorbookappointments', 'doctorbookappointmentpayments.appointment_id', '=', 'doctorbookappointments.id')
            ->select('doctorbookappointmentpayments.*', 'doctorbookappointments.*')
            ->where('doctorbookappointmentpayments.doc_id', '=', $id)
            ->paginate(10);

        // return $result;
        $response = ['success'=>true, 'data'=>$account];
        return response()->json($response, 201);
    }

    public function listHopitals($associate_id)
    {   
        $hospitalsList = Hospitals::where('associate', '=', $associate_id)->paginate(10);

        // return $result;
        $response = ['success'=>true, 'data'=>$hospitalsList];
        return response()->json($response, 201);
    }

    public function listLabs($associate_id)
    {   
        $labsList = Labs::where('associate', '=', $associate_id)->paginate(10);

        // return $result;
        $response = ['success'=>true, 'data'=>$labsList];
        return response()->json($response, 201);
    }

    public function labAccount($id)
    {   
        $account = DB::table('labbookappointmentpayments')
            ->join('labbookappointments', 'labbookappointmentpayments.appointment_id', '=', 'labbookappointments.id')
            ->select('labbookappointmentpayments.*', 'labbookappointments.*')
            ->where('labbookappointmentpayments.lab_id', '=', $id)
            ->paginate(10);

        // return $result;
        $response = ['success'=>true, 'data'=>$account];
        return response()->json($response, 201);
    }

    public function listPharms($associate_id)
    {   
        $pharmsList = Pharmacies::where('associate', '=', $associate_id)->paginate(10);

        // return $result;
        $response = ['success'=>true, 'data'=>$pharmsList];
        return response()->json($response, 201);
    }

    public function pharmAccount($id)
    {   
        // return $id;
        //
        $order_list = Pharmorder::where('pharm_id', '=', $id)->paginate(10);
        // return $result;
        $response = ['success'=>true, 'data'=>$order_list];
        return response()->json($response, 201);
    }

    public function checkUsername(Request $request){
        $validator = Validator::make($request->all(), [ 
            'username'  => 'required|string|unique:associates|max:255', 
        ]);
        
        // Return validation error
        if ($validator->fails()) { 
            $validationError = $validator->errors(); 
            $response = ['success'=>true, 'data'=>$validationError];
            return response()->json($response, 201);
        }else{
            $response = ['success'=>false, 'data'=>"username ok"];
            return response()->json($response, 201);
        }
    }

    public function listPorts($associate_id)
    {   
        $portsList = Ports::where('associate', '=', $associate_id)->paginate(10);

        // return $result;
        $response = ['success'=>true, 'data'=>$portsList];
        return response()->json($response, 201);
    }
    
    public function portAccount($id)
    {   
        $account = DB::table('portbookappointmentpayments')
            ->join('portbookappointments', 'portbookappointmentpayments.appointment_id', '=', 'portbookappointments.id')
            ->select('portbookappointmentpayments.*', 'portbookappointments.*')
            ->where('portbookappointmentpayments.port_id', '=', $id)
            ->paginate(10);

        // return $result;
        $response = ['success'=>true, 'data'=>$account];
        return response()->json($response, 201);
    }

}
