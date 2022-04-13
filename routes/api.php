<?php

use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/payment', function() {
    return view('payment');
});

// Laravel 5.1.17 and above
Route::post('/pay/{id}', 'PaymentController@redirectToGateway')->name('pay');

Route::get('/payment/callback', 'PaymentController@handleGatewayCallback');

// ///////////////////////////////////////////////////////////////////////////////////////////////
// // /////////////////////// FLUTTER WAVE /////////////////////////////////////////////////////////
// Route::post('/pay', 'RaveController@initialize')->name('pay');
// Route::post('/rave/callback', 'RaveController@callback')->name('callback');
// //////////////////////////////////////////////////////////////////////////////////////////

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('/applications', function (Request $request) {
    return $request->applications();
});


// Route::group(['middleware' => ['jwt.auth','api-header']], function () {
    // ///////////////////// ADMIN ////////////////////////////////////////
    // all routes to protected resources are registered here  
    // Route::get('users/list', function(){
    //     $users = App\User::all();
        
    //     $response = ['success'=>true, 'data'=>$users];
    //     return response()->json($response, 201);
    // });
    // //////////////////////////////////////// ADMIN //////////////////////////////////////////////////
    Route::get('/admin/list_appointments', 'GeneralAppointmentController@index');
    Route::get('/admin/general_appointments/change_status/{id}', 'GeneralAppointmentController@changeStatus');
    Route::post('/admin/reply/appointment_message/{id}', 'GeneralAppointmentController@reply');

    Route::get('/admin/list_contacts', 'ContactController@index');
    Route::get('/admin/contact_us/change_status/{id}', 'ContactController@changeStatus');
    Route::post('/admin/reply/contact_message/{id}', 'ContactController@reply');

    Route::post('/admin/send/email/{id}', 'SendEmailController@sendEmail');
    Route::get('/admin/list_emails', 'SendEmailController@index');

    Route::get('/admin/patients_list', 'AdminController2@patientsList');
    Route::get('/admin/patient/get/{patient_id}', 'AdminController2@getPatient');
    Route::get('/admin/patientMedRec/get/{patient_id}', 'AdminController2@patientMedRec');
    Route::get('/admin/appointments/get/{patient_id}', 'AdminController2@patientAppointments');
    Route::get('/admin/list_doctors', 'AdminController2@listDoctors');
    Route::get('/admin/doc/change_status/{doctor_id}', 'AdminController2@changeDocStatus');
    Route::get('/admin/doctor/get/{doctor_id}', 'AdminController2@getDoctor');
    Route::get('/admin/doc/account/{doctor_id}', 'AdminController2@docAccount');
    Route::get('/admin/doc/change_account_status/{account_id}', 'AdminController2@changeDocAccountStatus');
    Route::get('/admin/list_hospitals', 'AdminController2@listHospitals');
    Route::get('/admin/hospital/change_status/{hospital_id}', 'AdminController2@changeHospitalStatus');
    Route::get('/admin/hospital/get/{hospital_id}', 'AdminController2@getHospital');
    Route::get('/admin/hospital/get/{hospital_id}', 'AdminController2@getHospital');
    Route::get('/admin/hospital/doc/{hospital_id}', 'AdminController2@getHospitalDoctors');
    Route::get('/admin/list_ports', 'AdminController2@listPorts');
    Route::get('/admin/port/get/{port_id}', 'AdminController2@getPort');
    Route::get('/admin/port/account/{port_id}', 'AdminController2@portAccount');
    Route::get('/admin/port/change_status/{port_id}', 'AdminController2@changePortStatus');
    Route::get('/admin/port/change_account_status/{account_id}', 'AdminController2@changePortAccountStatus');
    Route::get('/admin/list_pharms', 'AdminController2@listPharms');
    Route::get('/admin/pharm/get/{pharm_id}', 'AdminController2@getPharm');
    Route::get('/admin/pharm/account/{pharm_id}', 'AdminController2@pharmAccount');
    Route::get('/admin/pharm/change_status/{pharm_id}', 'AdminController2@changePharmStatus');
    Route::get('/admin/pharm/change_account_status/{account_id}', 'AdminController2@changePharmAccountStatus');
    Route::get('/admin/list_labs', 'AdminController2@listLabs');
    Route::get('/admin/lab/change_status/{lab_id}', 'AdminController2@changeLabStatus');
    Route::get('/admin/lab/get/{lab_id}', 'AdminController2@getLab');
    Route::get('/admin/lab/account/{lab_id}', 'AdminController2@labAccount');
    Route::get('/admin/lab/change_account_status/{account_id}', 'AdminController2@changeLabAccountStatus');
    // //////////////////////////////////////// ADMIN //////////////////////////////////////////////////

    // ////////////////////// GENERAL ROUTE /////////////////////////////////////////
    // get all countries
    Route::get('/get/countries', 'CountriesController@index');
    // get all time zones
    Route::get('/get/time_zones', 'TimezoneController@index');
    // check if associate exist
    Route::post('check/username', 'AssociateController2@checkUsername');
    
    // Video chat
    Route::post('/save/chat_details/{id}', 'VideoChatController@save');
    Route::post('/check/appointment_if_exist/{id}', 'VideoChatController@checkIfExist');
    Route::post('/update/chat_details/{id}', 'VideoChatController@update');
    Route::post('/update/logout/{id}', 'VideoChatController@logout');

    // /////Pateints and Doctors
    Route::get('/patient/doc/chat/message/get/{doctor_id}/{patient_id}', 'MessageController@patientGetDocMessages');
    Route::get('/doc/patient/chat/message/get/{patient_id}/{doctor_id}', 'MessageController@docGetPatientMessages');
    Route::post('/patient/doc/chat/message/send/{doctor_id}/{patient_id}', 'MessageController@patientSendDocMessage');
    Route::post('/doc/patient/chat/message/send/{patient_id}/{doctor_id}', 'MessageController@docSendPatientMessage');
    Route::post('/patient/doc/chat/file/send/{doctor_id}/{patient_id}','MessageController@patientSendDocFile');
    Route::post('/doc/patient/chat/file/send/{patient_id}/{doctor_id}','MessageController@docSendPatientFile');

    // /////Pateints and Ports
    Route::get('/patient/port/chat/message/get/{port_id}/{patient_id}', 'MessageController@patientGetPortMessages');
    Route::get('/port/patient/chat/message/get/{patient_id}/{port_id}', 'MessageController@portGetPatientMessages');
    Route::post('/patient/port/chat/message/send/{port_id}/{patient_id}', 'MessageController@patientSendPortMessage');
    Route::post('/port/patient/chat/message/send/{patient_id}/{port_id}', 'MessageController@portSendPatientMessage');
    Route::post('/patient/port/chat/file/send/{port_id}/{patient_id}','MessageController@patientSendPortFile');
    Route::post('/port/patient/chat/file/send/{patient_id}/{port_id}','MessageController@portSendPatientFile');

    // /////Pateints and Labs
    Route::get('/patient/lab/chat/message/get/{lab_id}/{patient_id}', 'MessageController@patientGetLabMessages');
    Route::get('/lab/patient/chat/message/get/{patient_id}/{lab_id}', 'MessageController@labGetPatientMessages');
    Route::post('/patient/lab/chat/message/send/{lab_id}/{patient_id}', 'MessageController@patientSendLabMessage');
    Route::post('/lab/patient/chat/message/send/{patient_id}/{lab_id}', 'MessageController@labSendPatientMessage');
    Route::post('/patient/lab/chat/file/send/{lab_id}/{patient_id}','MessageController@patientSendLabFile');
    Route::post('/lab/patient/chat/file/send/{patient_id}/{lab_id}','MessageController@labSendPatientFile');

    // /////Pateints and pharm
    Route::get('/patient/pharm/chat/message/get/{pharm_id}/{patient_id}', 'MessageController@patientGetPharmMessages');
    Route::get('/pharm/patient/chat/message/get/{patient_id}/{pharm_id}', 'MessageController@pharmGetPatientMessages');
    Route::post('/patient/pharm/chat/message/send/{pharm_id}/{patient_id}', 'MessageController@patientSendPharmMessage');
    Route::post('/pharm/patient/chat/message/send/{patient_id}/{pharm_id}', 'MessageController@pharmSendPatientMessage');
    Route::post('/patient/pharm/chat/file/send/{pharm_id}/{patient_id}','MessageController@patientSendPharmFile');
    Route::post('/pharm/patient/chat/file/send/{patient_id}/{pharm_id}','MessageController@pharmSendPatientFile');


    Route::get('/lab/chat/message/get/{patient_id}/{lab_id}', 'MessageController@getLabMessages');
    Route::post('/lab/chat/message/send/{patient_id}/{lab_id}', 'MessageController@sendLabMessage');
    Route::post('/chat/message/send/{patient_id}/{sender_id}', 'MessageController@sendMessage');
    

    // ///////////////////// PATIENTS ////////////////////////////////////////
        Route::get('/patient/get/{id}', 'PatientsController2@show');
        Route::post('/patient/update/{id}', 'PatientsController2@update');
        Route::post('/patient/updateMed/{id}', 'PatientsController2@updateMedHis');
        Route::post('/patient/updateProfilePicture/{id}','PatientsController2@updateProfilePicture');
        Route::post('/patient/shareMedHistoryDoc/{id}','PatientsController2@shareMedHistoryDoc');
        Route::post('/patient/shareMedHistoryPort/{id}','PatientsController2@shareMedHistoryPort');
        Route::get('/SharedMedRecDoc/list/{id}', 'PatientsController2@SharedMedRecDoc');
        Route::get('/SharedMedRecPort/list/{id}', 'PatientsController2@SharedMedRecPort');

        Route::get('/patient/patientMedRec/get/{patient_id}', 'PatientsController2@patientMedRec');
        Route::post('/patient/patientMedRec/update/{patient_id}', 'PatientsController2@patientMedRecUpdate');
        Route::post('/patient/sharePrescription/{id}','PatientsController2@sharePrescription');
        Route::get('/patient/SharedPrescriptions/list/{id}', 'PatientsController2@SharedPrescriptions');
        Route::post('/patient/shareLabTest/{id}','PatientsController2@shareLabTest');
        Route::get('/patient/SharedLabTests/list/{id}', 'PatientsController2@SharedLabTests');

        Route::get('/patient/doctors_list/{patient_id}', 'PatientsController2@doctorList');
        Route::get('/patient/doctors/get/{doctor_id}/{patient_id}', 'PatientsController2@viewDoctor');
        Route::get('/patient/doc_appointments/get/{patient_id}', 'PatientsController2@getDocAppointments');
        // Route::get('/patient/doctor_fee/get/{doctor_id}/{patient_id}', 'PatientsController2@getDocFee');
        Route::post('/patient/book_doc_appointment/{doctor_id}/{patient_id}', 'PatientsController2@bookDocAppointment');
        Route::post('/patient/book_doc_appointment_pay/{doctor_id}/{patient_id}', 'PatientsController2@bookDocAppointmentPay');
        Route::post('/patient/get_doctor_fee/{doctor_id}/{patient_id}', 'PatientsController2@getDocFee');

        Route::get('/patient/labs_list/{id}', 'PatientsController2@labList');
        Route::get('/patient/labs/get/{lab_id}/{patient_id}', 'PatientsController2@viewLab');
        Route::get('/patient/test_fee/get/{lab_id}/{test_id}/{patient_id}', 'PatientsController2@getLabFee');
        Route::post('/patient/book_test_appointment/{lab_id}/{test_id}/{patient_id}', 'PatientsController2@bookTestAppointment');
        Route::post('/patient/book_test_appointment_pay/{lab_id}/{test_id}/{patient_id}', 'PatientsController2@bookTestAppointmentPay');
        Route::get('/patient/lab_appointments/get/{patient_id}', 'PatientsController2@getLabAppointments');
        Route::get('/patient/lab/result/list/{patient_id}/{lab_id}', 'PatientsController2@getLabResults');

        Route::get('/patient/ports_list/{id}', 'PatientsController2@portList');
        Route::get('/patient/ports/get/{port_id}/{patient_id}', 'PatientsController2@viewPort');
        Route::get('/patient/port_appointments/get/{patient_id}', 'PatientsController2@getPortAppointments');
        // Route::get('/patient/port_fee/get/{port_id}/{patient_id}', 'PatientsController2@getPortFee');
        // Route::post('/patient/book_port_appointment/{port_id}/{patient_id}', 'PatientsController2@bookPortAppointment');
        Route::post('/patient/book_port_appointment/{port_id}/{patient_id}', 'PatientsController2@bookPortAppointment');
        Route::post('/patient/book_port_appointment_pay/{port_id}/{patient_id}', 'PatientsController2@bookPortAppointmentPay');
        Route::post('/patient/get_port_fee/{port_id}/{patient_id}', 'PatientsController2@getPortFee');

        Route::get('/patient/pharm_list/{id}', 'PatientsController2@pharmaciesList');
        Route::get('/patient/pharms/get/{pharm_id}/{patient_id}', 'PatientsController2@viewPharm');
        Route::get('/pharm/product/list/{id}', 'PatientsController2@pharmaciesProducts');
        Route::get('/patient/product/get/{product_id}/{patient_id}', 'PatientsController2@viewProduct');
        Route::post('/patient/product/add_to_cart/{patient_id}', 'PatientsController2@addToCart');
        // from defaultheader.js
        Route::get('/patient/product_in_cart/get/{patient_id}', 'PatientsController2@getCart');

        Route::get('/patient/product_in_cart/get_all/{patient_id}', 'PatientsController2@getCartAll');
        Route::post('/patient/product_qty/update/{patient_id}', 'PatientsController2@updateProductQty');
        Route::post('/patient/product/delete/{patient_id}', 'PatientsController2@deleteProduct');
        Route::get('/patient/product/checkout1/{pharm_id}/{patient_id}', 'PatientsController2@checkout1');
        Route::post('/patient/product/checkout2/{pharm_id}/{patient_id}', 'PatientsController2@checkout2');

        Route::get('/patient/hospital/doctors_list/{hospital_id}/{patient_id}', 'PatientsController2@hospitalDoctorList');
        Route::get('/patient/hospitals_list/{id}', 'PatientsController2@hospitalList');

    // ///////////////////// PHARM ////////////////////////////////////////
        Route::get('/pharm/get/{id}', 'PharmController2@show');
        Route::post('/pharm/update/{id}', 'PharmController2@update');

        Route::post('/pharm/updateLogo/{id}','PharmController2@updateLogo');

        Route::get('/products/list/{id}', 'ProductController@getProducts');
        Route::post('/products/add/{id}', 'ProductController@addProduct');
        Route::post('/products/addImage/{product_id}/{pharm_id}', 'ProductController@addProductImage');
        Route::get('/pharm/product/get/{product_id}/{id}', 'ProductController@getProduct');
        Route::get('/get/product_categories', 'ProductCategoriesController@index');
        Route::post('/pharm/products/edit/{id}/{product_id}', 'ProductController@editProduct');
        Route::post('/pharm/products/editImage/{pharm_id}/{product_id}', 'ProductController@editProductImage');

        Route::post('/pharm/pharmacist/add/{id}', 'PharmController2@addPharmacist');
        Route::get('/pharm/pharmacist/list/{id}', 'PharmController2@getPharmacist');
        Route::post('/pharm/account_details/add/{id}', 'PharmController2@updateAccountDetails');

        Route::post('/pharm/updateMedicalLicense/{id}', 'PharmController2@updateMedicalLicense');

        Route::get('/pharm/order_list/{id}', 'PharmController2@getOrders');
        Route::get('/pharm/order/get/{id}', 'PharmController2@getOrder');
        Route::post('/pharm/product/delivered/{patient_id}/{pharm_id}', 'PharmController2@productDelivered');
        Route::get('/pharm/order/account/{pharm_id}', 'PharmController2@orderAccount');

        

    // ///////////////////// DOC ////////////////////////////////////////
        Route::get('/doc/get/{id}', 'DocController2@show');
        Route::post('/doc/update/{id}', 'DocController2@update');
        Route::post('/doc/updateprofilepicture/{id}', 'DocController2@updateProfilePicture');
        Route::post('/doc/updateMedicalCertificate/{id}', 'DocController2@updateMedicalCertificate');
        Route::post('/doc/updateMedicalLicense/{id}', 'DocController2@updateMedicalLicense');

        // Listpatients.js
        Route::get('/doc/patients_list/{id}', 'DocController2@patientsList');
        Route::get('/doc/patientMedRec/get/{patient_id}/{doctor_id}', 'DocController2@patientMedRec');
        Route::post('/doc/patientMedRec/update/{patient_id}/{doctor_id}', 'DocController2@patientMedRecUpdate');

        Route::post('/doc/account_details/add/{id}', 'DocController2@updateAccountDetails');
        Route::get('/doc/appointment/get/{patient_id}/{doctor_id}', 'DocController2@getAppointment');
        Route::get('/doc/appointment/end/{patient_id}/{doctor_id}/{appointment_id}', 'DocController2@endAppointment');

        Route::get('/doc/account/{id}', 'DocController2@account');

    // ///////////////////// HOSPITAL ////////////////////////////////////////
        Route::get('/hospital/get/{id}', 'HospitalController2@show');
        Route::post('/hospital/doctor/add/{hospital_id}', 'DocController@addDoctor');

        Route::post('/hospital/update/{id}', 'HospitalController2@update');
        Route::post('/hospital/updateLogo/{id}', 'HospitalController2@updateLogo');
        // Route::post('/hospital/updateMedicalCertificate/{id}', 'DocController2@updateMedicalCertificate');
        // Route::post('/hospital/updateMedicalLicense/{id}', 'DocController2@updateMedicalLicense');

        // Route::get('/doc/patients_list/{id}', 'DocController2@patientsList');

        Route::post('/hospital/updateMedicalCertificate/{id}', 'HospitalController2@updateMedicalCertificate');
        Route::post('/hospital/updateMedicalLicense/{id}', 'HospitalController2@updateMedicalLicense');
        Route::post('/hospital/account_details/add/{id}', 'HospitalController2@updateAccountDetails');

        Route::get('/hospital/list_doctors/{hospital_id}', 'HospitalController2@listDoctors');
        Route::get('/hospital/account/{id}', 'HospitalController2@account');

    // ///////////////////// PORT ////////////////////////////////////////
        Route::get('/port/get/{id}', 'PortController2@show');
        Route::post('/port/update/{id}', 'PortController2@update');
        Route::post('/port/updateLogo/{id}','PortController2@updateLogo');

        // Route::post('/doc/updateprofilepicture/{id}', 'DocController2@updateProfilePicture');
        // Route::post('/doc/updateMedicalCertificate/{id}', 'DocController2@updateMedicalCertificate');
        Route::post('/port/updateMedicalLicense/{id}', 'PortController2@updateMedicalLicense');

        // Listpatients.js
        Route::get('/port/patients_list/{id}', 'PortController2@patientsList');
        Route::get('/port/patientMedRec/get/{patient_id}/{port_id}', 'PortController2@patientMedRec');
        Route::get('/port/portReport/get/{patient_id}/{port_id}', 'PortController2@portReportGet');
        Route::post('/port/portReport/save/{patient_id}/{port_id}', 'PortController2@portReportSave');

        Route::post('/port/account_details/add/{id}', 'PortController2@updateAccountDetails');

        Route::get('/port/appointment/get/{patient_id}/{port_id}', 'PortController2@getAppointment');
        Route::get('/port/appointment/end/{patient_id}/{port_id}/{appointment_id}', 'PortController2@endAppointment');
        Route::get('/port/account/{id}', 'PortController2@account');

    // ///////////////////// LAB ////////////////////////////////////////
        Route::get('/lab/get/{id}', 'LabController2@show');
        Route::get('/lab/test/list/{id}', 'LabController2@getLabTest');
        Route::post('/lab/test/add/{id}', 'LabController2@addLabTest');
        Route::get('/lab/sharedLabTest/get/{patient_id}/{lab_id}', 'LabController2@sharedLabTest');
        Route::get('/lab/labResult/get/{patient_id}/{lab_id}', 'LabController2@getLabResults');
        Route::post('/lab/labResult/save/{patient_id}/{lab_id}', 'LabController2@labTestResultSave');

        Route::post('/lab/update/{id}', 'LabController2@update');
        Route::post('/lab/logo/update/{id}', 'LabController2@updateLogo');
        Route::post('/lab/updateMedicalLicense/{id}', 'LabController2@updateMedicalLicense');

        // Listpatients.js
        Route::get('/lab/patients_list/{id}', 'LabController2@patientsList');
        Route::get('/lab/appointment/get/{patient_id}/{lab_id}', 'LabController2@getAppointment');
        Route::get('/lab/appointment/end/{patient_id}/{lab_id}/{appointment_id}', 'LabController2@endAppointment');
        Route::get('/lab/account/{id}', 'LabController2@account');

        // Route::get('/doc/patientMedRec/get/{patient_id}/{doctor_id}', 'DocController2@patientMedRec');

        Route::post('/lab/account_details/add/{id}', 'LabController2@updateAccountDetails');

    // ///////////////////// ASSOCIATE ////////////////////////////////////////
        Route::get('/associate/get/{id}', 'AssociateController2@show');
        Route::post('/associate/update/{id}', 'AssociateController2@update');
        Route::post('/associate/account_details/add/{id}', 'AssociateController2@updateAccountDetails');
        Route::post('/associate/updateLogo/{id}', 'AssociateController2@updateLogo');
        Route::post('/associate/updateCertificate/{id}', 'AssociateController2@updateCertificate');

        Route::post('/associate/doctor/add/{associate_id}', 'DocController@associateAddDoctor');
        Route::get('/associate/list_doctors/{associate_id}', 'AssociateController2@listDoctors');
        Route::get('/associate/account/{id}', 'AssociateController2@account');
        
        Route::post('/associate/hospital/add/{associate_id}', 'HospitalController@associateAddHospital');
        Route::get('/associate/list_hospitals/{associate_id}', 'AssociateController2@listHopitals');
        Route::get('/associate/hospital/list_doctors/{hospital_id}', 'HospitalController2@listDoctors');
        Route::get('/associate/hospital/doctor_account/{id}', 'AssociateController2@account');

        Route::get('/associate/list_labs/{associate_id}', 'AssociateController2@listLabs');
        Route::post('/associate/lab/add/{associate_id}', 'LabController@associateAddLab');
        Route::get('/associate/lab/account/{id}', 'AssociateController2@labAccount');

        Route::get('/associate/list_pharms/{associate_id}', 'AssociateController2@listPharms');
        Route::post('/associate/pharm/add/{associate_id}', 'PharmController@associateAddPharm');
        Route::get('/associate/pharm/account/{id}', 'AssociateController2@pharmAccount');

        Route::get('/associate/list_ports/{associate_id}', 'AssociateController2@listPorts');
        Route::post('/associate/port/add/{associate_id}', 'PortController@associateAddPort');
        Route::get('/associate/port/account/{id}', 'AssociateController2@portAccount');

    
// });

Route::group(['middleware' => 'api-header'], function () {

    // Route::get('doc/patients_list/{id}', 'DocController2@patientsList');

    // Route::post('products/add/{id}', 'ProductController@addProduct');
    // Route::get('doc/get/{id}', 'DocController2@show');
  
    // The registration and login requests doesn't come with tokens 
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    //////////////////////// ADMIN ///////////////////////////////////// 
    Route::post('/admin/login', 'AdminController@login');
    Route::post('/admin/register', 'AdminController@register');

    // ///////////////////// USERS //////////////////////////////////////////
    Route::post('/patient/register', 'PatientsController@register');
    Route::post('/patient/login', 'PatientsController@login');
    // Route::post('user/forgetpassword', 'ApplyController@forgetpassword');

    Route::post('/patient/forgetPassword','PasswordController@forgetPasswordPatient');
    Route::get('/patient/reset/{code}','PasswordController@resetPatient');
    Route::post('/patient/check','PasswordController@checkResetPasswordPatient');
    Route::post('/patient/resetPassword','PasswordController@resetPasswordPatient');

    // ///////////////////// DOCTORS //////////////////////////////////////////
    Route::post('/doctor/register', 'DocController@register');
    Route::post('/doctor/login', 'DocController@login');

    Route::post('/doctor/forgetPassword','PasswordController@forgetPasswordDoctor');
    Route::get('/doctor/reset/{code}','PasswordController@resetDoctor');
    Route::post('/doctor/check','PasswordController@checkResetPasswordDoctor');
    Route::post('/doctor/resetPassword','PasswordController@resetPasswordDoctor');

    // ///////////////////// PHARM //////////////////////////////////////////
    Route::post('/pharm/register', 'PharmController@register');
    Route::post('/pharm/login', 'PharmController@login');

    Route::post('/pharm/forgetPassword','PasswordController@forgetPasswordPharm');
    Route::get('/pharm/reset/{code}','PasswordController@resetPharm');
    Route::post('/pharm/check','PasswordController@checkResetPasswordPharm');
    Route::post('/pharm/resetPassword','PasswordController@resetPasswordPharm');

    // ///////////////////// PORT //////////////////////////////////////////
    Route::post('/port/register', 'PortController@register');
    Route::post('/port/login', 'PortController@login');

    Route::post('/port/forgetPassword','PasswordController@forgetPasswordPort');
    Route::get('/port/reset/{code}','PasswordController@resetPort');
    Route::post('/port/check','PasswordController@checkResetPasswordPort');
    Route::post('/port/resetPassword','PasswordController@resetPasswordPort');

    // ///////////////////// LAB //////////////////////////////////////////
    Route::post('/lab/register', 'LabController@register');
    Route::post('/lab/login', 'LabController@login');

    Route::post('/lab/forgetPassword','PasswordController@forgetPasswordLab');
    Route::get('/lab/reset/{code}','PasswordController@resetLab');
    Route::post('/lab/check','PasswordController@checkResetPasswordLab');
    Route::post('/lab/resetPassword','PasswordController@resetPasswordLab');

    // ///////////////////// HOSPITAL //////////////////////////////////////////
    Route::post('/hospital/register', 'HospitalController@register');
    Route::post('/hospital/login', 'HospitalController@login');

    Route::post('/hospital/forgetPassword','PasswordController@forgetPasswordHospital');
    Route::get('/hospital/reset/{code}','PasswordController@resetHospital');
    Route::post('/hospital/check','PasswordController@checkResetPasswordHospital');
    Route::post('/hospital/resetPassword','PasswordController@resetPasswordHospital');

    // ///////////////////// ASSOCIATE /////////////////////////////////////////////
    Route::post('/associate/register', 'AssociateController@register');
    Route::post('/associate/login', 'AssociateController@login');

    Route::post('/associate/forgetPassword','PasswordController@forgetPasswordAssociate');
    Route::get('/associate/reset/{code}','PasswordController@resetAssociate');
    Route::post('/associate/check','PasswordController@checkResetPasswordAssociate');
    Route::post('/associate/resetPassword','PasswordController@resetPasswordAssociate');
    
    // ///////////////////// ASSOCIATE API////////////////////////////////////////

    Route::post('/associate_api/doctor/add/{username}', 'DocControllerApi@associateAddDoctor');
    Route::get('/associate_api/list_doctors/{username}', 'DocControllerApi@listDoctors');
    Route::get('/associate_api/doctor/account/{username}/{doc_username}', 'DocControllerApi@account');
    
    Route::post('/associate_api/hospital/add/{username}', 'HospitalControllerApi@associateAddHospital');
    Route::get('/associate_api/list_hospitals/{username}', 'HospitalControllerApi@listHopitals');
    Route::get('/associate_api/hospital/list_doctors/{username}/{hospital_username}', 'HospitalControllerApi@listDoctors');
    Route::get('/associate_api/hospital/doctor_account/{username}/{hospital_username}/{doc_username}', 'HospitalControllerApi@account');

    Route::post('/associate_api/lab/add/{username}', 'LabControllerApi@associateAddLab');
    Route::get('/associate_api/list_labs/{username}', 'LabControllerApi@listLabs');
    Route::get('/associate_api/lab/account/{username}/{lab_username}', 'LabControllerApi@account');

    Route::post('/associate_api/pharm/add/{username}', 'PharmControllerApi@associateAddPharm');
    Route::get('/associate_api/list_pharms/{username}', 'PharmControllerApi@listPharms');
    Route::get('/associate_api/pharm/account/{username}/{pharm_username}', 'PharmControllerApi@account');

    Route::post('/associate_api/port/add/{username}', 'PortControllerApi@associateAddPort');
    Route::get('/associate_api/list_ports/{username}', 'PortControllerApi@listPorts');
    Route::get('/associate_api/port/account/{username}/{port_username}', 'PortControllerApi@account');
    
});
// Route::get('SharedMedRec/list/{id}', 'PatientsController2@SharedMedRec');

// Route::post('doc/updateprofilepicture/{id}', 'DocController2@updateProfilePicture');
// Route::get('SharedMedRecPort/list/{id}', 'PatientsController2@SharedMedRecPort');

Route::get('/appointments/get', 'GeneralAppointmentController@index');
