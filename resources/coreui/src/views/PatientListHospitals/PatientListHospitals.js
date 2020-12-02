import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {createHashHistory} from 'history';
// import axios from 'axios';
import axios, { post } from 'axios';
import $ from "jquery";
import Pagination from "react-js-pagination";
import {Link} from 'react-router-dom';

import { ExternalLink } from 'react-external-link';
import SweetAlert from 'sweetalert2-react';
// import TimePicker from 'react-time-picker';
// import TimeField from 'react-simple-timefield';

import { PayPalButton } from "react-paypal-button-v2";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Table,
  ListGroup, 
  ListGroupItem, 
  ListGroupItemHeading, 
  ListGroupItemText,
  TabContent, 
  TabPane,
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
} from 'reactstrap';

let hashHistory = createHashHistory()

class PatientListHospitals extends Component {
  constructor(props) {
    super(props);
    // ////////////////MODAL
    this.togglePrimary      = this.togglePrimary.bind(this);
    this.toggleViewDoctors  = this.toggleViewDoctors.bind(this);
    this.toggleViewDoctor   = this.toggleViewDoctor.bind(this);
    this.toggleViewAppointments = this.toggleViewAppointments.bind(this);
    this.toggleMakePayment      = this.toggleMakePayment.bind(this);
    // this.toggleEnterReport = this.toggleEnterReport.bind(this);

    // bing toggle functions and values
    // this.toggle = this.toggle.bind(this);
    // this.toggle_identification    = this.toggle_identification.bind(this);
    // this.toggle_app_instructions  = this.toggle_app_instructions.bind(this);

    this.onChangeDate     =this.onChangeDate.bind(this);
    this.onChangeTime     =this.onChangeTime.bind(this);
    this.onChangeSubject  =this.onChangeSubject.bind(this);
    this.onChangeMessage  =this.onChangeMessage.bind(this);
    // this.onChangeAllergiesUpdate            =this.onChangeAllergiesUpdate.bind(this);
    // this.onChangeBloodGroupUpdate           =this.onChangeBloodGroupUpdate.bind(this);
    // this.onChangeUnderlyingConditionsUpdate =this.onChangeUnderlyingConditionsUpdate.bind(this);
    // this.onChangeFamilyMedicalHistoryUpdate =this.onChangeFamilyMedicalHistoryUpdate.bind(this);
    // this.onChangeHypertensiveUpdate         =this.onChangeHypertensiveUpdate.bind(this);
    // this.onChangeDiabeticUpdate             =this.onChangeDiabeticUpdate.bind(this);
    // this.onChangePrescriptionUpdate         =this.onChangePrescriptionUpdate.bind(this);
    // this.onChangeLabTestUpdate              =this.onChangeLabTestUpdate.bind(this);
    // this.onChangeNoteUpdate                 =this.onChangeNoteUpdate.bind(this);

    this.onChangeMessageBox  = this.onChangeMessageBox.bind(this);

    this.sendMessage = this.sendMessage.bind(this);

    // /////////////////////////////////////////////////////////////////

    this.onSubmitBookAppointment = this.onSubmitBookAppointment.bind(this);

    // medical record tab toggle
    // this.toggleMedRecTab = this.toggleMedRecTab.bind(this);
    // this.onChangeDate             =this.onChangeDate.bind(this);
    // this.onChangeTime             =this.onChangeTime.bind(this);

    this.state = {
      token: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.auth_token
        : "",
      id: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.id
        : "",
      username: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.username
        : "",
      first_name: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.first_name
        : "",
      last_name: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.last_name
        : "",
      middle_name: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.middle_name
        : "",

      // store array of data when a patient is clicked 
      // medications_currently_using: [],
      // allergies: [],
      // blood_group: [],
      // underlying_conditions: [],
      // family_medical_history: [],
      // hypertensive: [],
      // diabetic: [],
      // prescription: [],
      // lab_test: [],
      // note: [],

      // store new data entered to be stored/submitted
      // medications_currently_using_update: "",
      // allergies_update: "",
      // blood_group_update: "",
      // underlying_conditions_update: "",
      // family_medical_history_update: "",
      // hypertensive_update: "",
      // diabetic_update: "",
      // prescription_update: "",
      // lab_test_update: "",
      // note_update: "",

      currentTime : new Date().toLocaleString(),


      // for chat
      message_box: "",
      // for append chat message
      
      // ////////////////////////////////////////////////////
      hospitals_list:[],
      number_hospital: 1,
      activePage_hospital:1,
      itemsCountPerPage_hospital:1,
      totalItemsCount_hospital:1,
      pageRangeDisplayed_hospital:3,
      currentPage2_hospital:'',
      status_hospital: '1',

      doctors_list:[],
      number: 1,
      activePage:1,
      itemsCountPerPage:1,
      totalItemsCount:1,
      pageRangeDisplayed:3,
      currentPage2:'',
      status: '1',

      appointments_list:[],
      number_appointments: 1,
      activePage_appointments:1,
      itemsCountPerPage_appointments:1,
      totalItemsCount_appointments:1,
      pageRangeDisplayed_appointments:3,
      currentPage2_appointments:'',
      status_appointments: '1',
      

      status: "",
      created_at: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.created_at
        : "",
      user_type: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.user_type
        : "",

      collapse: false,
      collapse_identification: false,
      collapse_app_instructions: false,
      fadeIn: true,
      timeout: 300,
      // //////////////////////////////////////////////////
      hospital_id: "",
      hospital_name: "",
      // patient clicks for message
      doctor_id: "",
      doctor_name: "",

      doc_id: "",
      doc_name: "",
      
      startDate: new Date(),
      date: "",
      time: '12:34',
      subject: "",
      message: "",
      // //////////////////modal
      primary: false,
      primaryViewDoctors: false,
      primaryViewDoctor: false,
      primaryViewAppointments: false,
      primaryMakePayment: false,
      enterReport: false,
      // ///////////////////////////////////////////////////////
      showSuccess:  false,
      showError:    false,
      successMessage: "Successful",
      errorMessage: "Failed",
      // ///////////////////////////////////////////
      doctor_fee: "",
      country_handling_fee: "",
      total_fee: "",
      // ///////////////////////////////////////
      chatBtn: "",


    };
    this.handlePageChange=this.handlePageChange.bind(this);
    // this.onTimeChange = this.onTimeChange.bind(this);

  }

  // onTimeChange(time) {
  //   this.setState({time});
  // }

  // onChange = time => this.setState({ time })

  // medical record tab toggle
  // toggleMedRecTab(tab) {
  //   if (this.state.activeTab !== tab) {
  //     this.setState({
  //       activeTab: tab
  //     });
  //   }
  // }

  onChangeDate(e) { this.setState({ date:e.target.value  }); }
  onChangeTime(e) { this.setState({ time:e.target.value  }); }
  onChangeSubject(e) { this.setState({ subject:e.target.value  }); }
  onChangeMessage(e) { this.setState({ message:e.target.value  }); }
  // onChangeAllergiesUpdate(e)      { this.setState({ allergies_update:e.target.value  }); }
  // onChangeBloodGroupUpdate(e)     { this.setState({ blood_group_update:e.target.value  }); }
  // onChangeUnderlyingConditionsUpdate(e)     { this.setState({ underlying_conditions_update:e.target.value  }); }
  // onChangeFamilyMedicalHistoryUpdate(e)     { this.setState({ family_medical_history_update:e.target.value  }); }
  // onChangeHypertensiveUpdate(e)     { this.setState({ hypertensive_update:e.target.value  }); }
  // onChangeDiabeticUpdate(e)         { this.setState({ diabetic_update:e.target.value  }); }
  // onChangePrescriptionUpdate(e)     { this.setState({ prescription_update:e.target.value  }); }
  // onChangeLabTestUpdate(e)          { this.setState({ lab_test_update:e.target.value  }); }
  // onChangeNoteUpdate(e)             { this.setState({ note_update:e.target.value  }); }


  // onChangeDate(e)           { this.setState({ date:e.target.value  }); }
  // onChangeTime(e)           { this.setState({ time:e.target.value  }); }


  // fetch data from db
  componentDidMount()
  {
    axios.get(`/api/patient/hospitals_list/`+this.state.id+`?token=${this.state.token}`)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          hospitals_list: json.data.data.data,
          itemsCountPerPage_hospital: json.data.data.per_page,
          totalItemsCount_hospital: json.data.data.total,
          activePage_hospital: json.data.data.current_page
        });
      } else {
        
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  // Pagination handler
  handlePageChangeHospital(pageNumber) {
    // this.setState({activePage: pageNumber});
    axios.get(`/api/patient/hospitals_list/`+this.state.id+`?token=${this.state.token}&page=`+pageNumber)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          hospitals_list: json.data.data.data,
          itemsCountPerPage_hospital: json.data.data.per_page,
          totalItemsCount_hospital: json.data.data.total,
          activePage_hospital: json.data.data.current_page
        });
      } else {
        
      }
    })
  }

  toggleViewDoctors() {
    this.setState({
      primaryViewDoctors: !this.state.primaryViewDoctors,
      // doctor_id: id,
      // doctor_name: name,
    });
  }

  getDoctors(hospital_id, hospital_name)
  { 
    this.setState({ 
      hospital_id: hospital_id,
      hospital_name: hospital_name
    });
    axios.get(`/api/patient/hospital/doctors_list/`+hospital_id+'/'+this.state.id+`?token=${this.state.token}`)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          doctors_list: json.data.data.data,
          itemsCountPerPage: json.data.data.per_page,
          totalItemsCount: json.data.data.total,
          activePage: json.data.data.current_page
        }, this.toggleViewDoctors);
      } else {
        
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  // Pagination handler
  handlePageChange(pageNumber) {
    // this.setState({activePage: pageNumber});
    axios.get(`/api/patient/hospital/doctors_list/`+hospital_id+'/'+this.state.id+`?token=${this.state.token}&page=`+pageNumber)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          doctors_list: json.data.data.data,
          itemsCountPerPage: json.data.data.per_page,
          totalItemsCount: json.data.data.total,
          activePage: json.data.data.current_page
        });
      } else {
        
      }
    })
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  // toggle collapse and expand application instruction
  // toggle_app_instructions() {
  //   this.setState({ collapse_app_instructions: !this.state.collapse_app_instructions });
  // }

  // toggle collapse and expand personal data
  // toggle() {
  //   this.setState({ collapse: !this.state.collapse });
  // }

  // toggle collapse and expand identification
  // toggle_identification() {
  //   this.setState({ collapse_identification: !this.state.collapse_identification });
  // }
  
  // //////////////////////////////////////////////////////////////////////
  // /////////////// Patient chat
  togglePrimary(doc_id, doc_name) {
    this.setState({
      doc_id: doc_id,
      doc_name: doc_name,
    });
    // if the variable passed is closed do not call axios
    if(doc_id == "close"){
      clearInterval(this.interval);
      this.setState({
        primary: !this.state.primary,
      });
    }else{
      this.setState({
        primary: !this.state.primary,
      }, this.getMessages1(doc_id));
      
    }
  }
  // get message and set interval incase of new messages
  getMessages1(doc_id){
    this.getMessages2(doc_id)
    this.interval = setInterval(() => this.getMessages2(doc_id), 5000);
  }
  // get messages
  getMessages2(doc_id){
    // alert("Paulo");
    axios.get(`/api/patient/doc/chat/message/get/`+doc_id+'/'+this.state.id+`?token=${this.state.token}`)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {
          this.setState({ 
            message_list: json.data.messages.message
          }, this.loadMessages(json.data.messages.message));
        } else {
          
        }
      })
      .catch(error => {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error(`An Error Occuredd! ${error}`);
        
      });
  }

  // get messages from db, do a foreach on the array of messages
  loadMessages(passMessageArray){
    // empty message area before adding new message
    $('#message_area').empty();
    passMessageArray.forEach(this.splitMessage);
  }

  // split the messages to know that of doctor and patient
  splitMessage(item){
    const item_split  = item.split("|-|")
    const from        = item_split[0].slice(1)
    const id          = item_split[1]
    const message     = item_split[2]
    const fileName    = item_split[3].slice(0, -1)
    if(from == "patient"){
      $("#message_area").append("<li style='background-color: rgb(33, 103, 172); color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>"+ message +"</li>");
    }else if(from == "doctor"){
      $("#message_area").append("<li style='background-color: #ca333a; color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>"+ message +"</li>");
    }else if(from == "patient_file"){
      $("#message_area").append("<a href='"+message+"' target='_blank'><li style='background-color: rgb(33, 103, 172); color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>"+ fileName +"<i class='fa fa-paperclip' style='font-size: 1.5em; float: right'></i></li></a>");
    }else if(from == "doctor_file"){
      $("#message_area").append("<a href='"+message+"' target='_blank'><li style='background-color: #ca333a; color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>"+ fileName +"<i class='fa fa-paperclip' style='font-size: 1.5em; float: right'></i></li></a>");
    }
    
  }

  onChangeMessageBox(e)     { this.setState({ message_box:e.target.value  }); }

  // send chat message
  sendMessage(){
      // const message ={ message_box : this.state.message_box }
    if( this.state.message_box != ""){
      const message = this.state.message_box;
      $("#message_area").append("<li style='background-color: rgb(33, 103, 172); color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>"+ message +"</li>");
      // auto scroll to bottom of page
      $('#message_area').animate({ scrollTop: $('#message_area')[0].scrollHeight}, 2000);

        const send_message ={
          message : message,
        }
        axios.post(`/api/patient/doc/chat/message/send/`+this.state.doc_id+'/'+this.state.id+`?token=${this.state.token}`, send_message)
        .then(response => {
          return response;
        })
        .then(json => {
          if (json.status == 200) {
            $("#message_box").val("")
          } else {

          }
        })
        .catch(error => {
          // redirect user to previous page if user does not have autorization to the page
          // hashHistory.push('/premontessori');
          console.error(`An Error Occuredd! ${error}`);
          
        });
    }
  }

  sendFile(e) {
    this.setState({send_file:e.target.files[0]
    }, this.submitSendFile);
  }

  trigerSendFile(){
    $('#send_file').trigger('click');
  }

  submitSendFile(e){
    // e.preventDefault() // Stop form submit
    this.uploadSendFile()
    .then((response)=>{
      if (response.data.success) {
        // this.setState({
        //   successMessage: "Profile picture uploaded successfully",
        //   showSuccess: true
        // });
      } else{
        // this.setState({
        //   errorMessage: response.data.data.profile_picture,
        //   showError: true
        // });
      }
    }).catch(error => {
      this.setState({
        showError: true
      });
    });
  }
 
  uploadSendFile(){
    const url = '/api/patient/doc/chat/file/send/'+this.state.doc_id+'/'+this.state.id+`?token=${this.state.token}`;
    const formData = new FormData();
    formData.append('send_file',this.state.send_file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  // //////////////////////////////////////////////////////////////////////////

  // /////////////// VIEW DOCTOR
  toggleViewDoctor(id, name) {
    this.setState({
      primaryViewDoctor: !this.state.primaryViewDoctor,
      doctor_id: id,
      doctor_name: name,
    });
  }

  viewDoctor(doctor_id, name) {
    axios.get(`/api/patient/doctors/get/`+doctor_id+'/'+this.state.id+`?token=${this.state.token}`)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          doctor_username: json.data.doctor_data.username,
          doctor_first_name: json.data.doctor_data.first_name,
          doctor_last_name: json.data.doctor_data.last_name,
          doctor_middle_name: json.data.doctor_data.middle_name,
          doctor_title: json.data.doctor_data.title,
          doctor_gender: json.data.doctor_data.gender,
          doctor_gender_others: json.data.doctor_data.gender_others,
          doctor_dob: json.data.doctor_data.dob,
          doctor_nationality: json.data.doctor_data.nationality,
          doctor_country_of_residence: json.data.doctor_data.country_of_residence,
          doctor_district_province_state: json.data.doctor_data.district_province_state,
          doctor_area_of_specialization: json.data.doctor_data.area_of_specialization,
          doctor_available_on_appointment: json.data.doctor_data.available_on_appointment,
          doctor_available_on_emergency: json.data.doctor_data.available_on_emergency,
          doctor_available_by_time: json.data.doctor_data.available_by_time,
          doctor_profile_picture: json.data.doctor_data.profile_picture,

          status: json.data.status,

        }, this.toggleViewDoctor(doctor_id, name));
      } else {
        this.setState({
          errorMessage: json.data.data,
          showError: true
        });
      }
  
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }
  
  onSubmitBookAppointment(e)
  { 
    e.preventDefault();
    if(
      this.state.date == "" || this.state.time == "" || this.state.subject == "" || this.state.message == "" || 
      this.state.date == null || this.state.time == null || this.state.subject == null || this.state.message == null
    ){
      this.setState({
        errorMessage: "Please fill all required field",
        showError: true
      });
    }else{
      // get doctor's fee
      axios.get(`/api/patient/doctor_fee/get/`+this.state.doctor_id+'/'+this.state.id+`?token=${this.state.token}`)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {
          // const total_fee = parseInt(json.data.doctor_fee) + parseInt(json.data.country_handling_fee);
          this.setState({ 
            doctor_fee: json.data.doctor_fee,
            country_handling_fee: json.data.country_handling_fee,
            total_fee: json.data.total_fee,
          }, this.toggleMakePayment());
        } else {
          
        }
      })
      .catch(error => {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        
      });
    }
  }

  onSubmitBookAppointment2()
  {
      // e.preventDefault();
      // alert("here");
      this.setState({ 
        successMessage: "Payment successful",
        showSuccess: true,
      }, this.onSubmitBookAppointment3);
  }

  onSubmitBookAppointment3()
  {
      const appointment_data ={
        date : this.state.date, 
        time : this.state.time, 
        subject : this.state.subject, 
        message : this.state.message, 
        // /////////////////////////////////////////////
        billing_amount_currency: this.state.billing_amount_currency,
        billing_amount_value: this.state.billing_amount_value,
        billing_doctor_fee: this.state.doctor_fee,
        billing_country_handling_fee: this.state.country_handling_fee,
        billing_email_address: this.state.billing_email_address,
        billing_name: this.state.billing_name,
        billing_orderID: this.state.billing_orderID,
        billing_payerID: this.state.billing_payerID
      }
      axios.post(`/api/patient/book_doc_appointment/`+this.state.doctor_id+'/'+this.state.id+`?token=${this.state.token}`, appointment_data)
      .then(response => {
        return response;
      }, this.toggleMakePayment("close", "close"))
      .then(json => {
        if (json.data.success) {
          this.setState({
            successMessage: json.data.data,
            showSuccess: true
          });
        } else{
          this.setState({
            successMessage: json.data.data,
            showError: true
          });
        }
      })
      .catch(error => {
        this.setState({
          showError: true
        });
        
      });
  }

  // /////////////// VIEW APPOINTMENTS
  toggleViewAppointments() {
    this.setState({
      primaryViewAppointments: !this.state.primaryViewAppointments,
      // doctor_id: id,
      // doctor_name: name,
    });
  }

  viewAppointments()
  {
    axios.get(`/api/patient/doc_appointments/get/`+this.state.id+`?token=${this.state.token}`)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          appointments_list: json.data.data.data,
          itemsCountPerPage_appointments: json.data.data.per_page,
          totalItemsCount_appointments: json.data.data.total,
          activePage_appointments: json.data.data.current_page
        }, this.toggleViewAppointments());
      } else {
        
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  handlePageChangeAppointments(pageNumber) {
    // this.setState({activePage: pageNumber});
    axios.get(`/api/patient/doc_appointments/get/`+this.state.id+`?token=${this.state.token}`)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          appointments_list: json.data.data.data,
          itemsCountPerPage_appointments: json.data.data.per_page,
          totalItemsCount_appointments: json.data.data.total,
          activePage_appointments: json.data.data.current_page
        });
      } else {
        
      }
    })
  }

  // /////////////// Make payment
  toggleMakePayment() {
    this.setState({
      primaryMakePayment: !this.state.primaryMakePayment,
      // doctor_id: id,
      // doctor_name: name,
    });
  }

  render() {

    if(this.state.doctor_gender == "0"){ this.state.doctor_gender = "Not specified" }
    if(this.state.doctor_gender == "1"){ this.state.doctor_gender = "Male" }
    if(this.state.doctor_gender == "2"){ this.state.doctor_gender = "Female" }
    if(this.state.doctor_gender == "3"){ this.state.doctor_gender = "Prefer not to say" }
    if(this.state.doctor_gender == "4"){ this.state.doctor_gender = this.state.doctor_gender_others }

    if(this.state.doctor_title == "0"){ this.state.doctor_title = "Not specified" }
    if(this.state.doctor_title == "1"){ this.state.doctor_title = "Mr" }
    if(this.state.doctor_title == "2"){ this.state.doctor_title = "Mrs" }
    if(this.state.doctor_title == "3"){ this.state.doctor_title = "Ms" }
    if(this.state.doctor_title == "4"){ this.state.doctor_title = "Miss" }
    
    // const { product_image} = this.state
    // const {time} = this.state;
    return (
      
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="3">
            <h3>Hospitals</h3>  
          </Col>
        </Row><br></br> 
        
        <Row>  
            {/* ///////// HOSPITAL LIST TABLE ///////////// */}
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> List of Doctors 
                  <span style={{float: "right"}}>
                    <Button type="submit" size="sm" color="primary" onClick={() => this.viewAppointments()}>View Appointments</Button>
                  </span>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th>USERNAME</th>
                        <th>NAME</th>
                        <th>COUNTRY</th>
                        <th>DISTRICT/PROVINCE/STATE</th>
                        {/* <th>Status</th> */}
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        // Calculation for the page S/N
                        this.state.currentPage = ((this.state.activePage * 10) - (10 - 1)),
                        // ////////////////////////////////////////////////////////////
                        this.state.hospitals_list.map(hospital=>{
                          if(hospital.status == 1){
                            this.state.status = <Badge color="success">Completed</Badge>;
                          }else{
                            this.state.status = <Badge color="danger">Not Complete</Badge>;
                          }

                          return(
                            <tr key={hospital.id}>
                              {/* <th scope="row">{this.state.pageNumber++}</th> */}
                              <th scope="row">{this.state.currentPage++}</th>
                              <td>{hospital.username}</td>
                              <td>{hospital.name}</td>
                              <td>{hospital.country}</td>
                              <td>{hospital.district_province_state}</td>
                              {/* <td>{this.state.status}</td> */}
                              <td>
                              {/* <Button size="sm" onClick={this.togglePrimary} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-eye"></i></Button> */}
                              <Button size="sm" onClick={() => this.getDoctors(hospital.id, hospital.name)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-eye"></i></Button>

                              {/* <Button size="sm" onClick={() => this.togglePrimary(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-comments"></i></Button> */}
                              
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-center">
                    <Pagination
                      activePage={this.state.activePage_hospital}
                      itemsCountPerPage={this.state.itemsCountPerPage_hospital}
                      totalItemsCount={this.state.totalItemsCount_hospital}
                      pageRangeDisplayed={this.state.pageRangeDisplayed_hospital}
                      onChange={this.handlePageChangeHospital}
                      itemClass='page-item'
                      linkClass='page-link'
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>

        {/* /////////////////////// DOCTORS LIST TABLE /////////////////////////////////////////// */}
        <Modal isOpen={this.state.primaryViewDoctors}  className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
          <ModalHeader toggle={() => this.toggleViewDoctors("close", "close")}>View Doctors</ModalHeader>
          <ModalBody>
            
            {/* //////////////////////////////////// */}
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{this.state.hospital_name}'s Doctors 
                {/* <Button type="submit" size="sm" color="primary" style={{float: "right"}} onClick={() => this.generatePortReport()}>Generate Report</Button> */}
                {/* <Button size="sm" onClick={() => this.getPateintMedicalRec(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-eye"></i></Button> */}
              </CardHeader>
              <CardBody>
                {/* <Row> */}
                  {/* <Col xs="12" sm="12"> */}
                    <Row>
                      <Col xs="12" sm="12">
                        <Form onSubmit={this.onSubmitPortReport}>
                          <Row>
                            <Col xs="12" sm="12">
                            <Table responsive bordered>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th>Username</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Middle Name</th>
                                  <th>Gender</th>
                                  <th>Country</th>
                                  {/* <th>Status</th> */}
                                  <th>Action</th>
                              </tr>
                              </thead>
                              <tbody>
                                {
                                  // Calculation for the page S/N
                                  this.state.currentPage = ((this.state.activePage * 10) - (10 - 1)),
                                  // ////////////////////////////////////////////////////////////
                                  this.state.doctors_list.map(doctor=>{
                                    if(doctor.status == 1){
                                      this.state.status = <Badge color="success">Completed</Badge>;
                                    }else{
                                      this.state.status = <Badge color="danger">Not Complete</Badge>;
                                    }
                                    const doctor_id  = doctor.id;
                                    const name        = doctor.first_name +" "+doctor.last_name;
                                    if(doctor.gender == "0"){ this.state.gender = "Not specified" }
                                    if(doctor.gender == "1"){ this.state.gender = "Male" }
                                    if(doctor.gender == "2"){ this.state.gender = "Female" }
                                    if(doctor.gender == "3"){ this.state.gender = "Prefer not to say" }
                                    if(doctor.gender == "4"){ this.state.gender = doctor.gender_others }

                                    return(
                                      <tr key={doctor.id}>
                                        {/* <th scope="row">{this.state.pageNumber++}</th> */}
                                        <th scope="row">{this.state.currentPage++}</th>
                                        <td>{doctor.username}</td>
                                        <td>{doctor.first_name}</td>
                                        <td>{doctor.last_name}</td>
                                        <td>{doctor.middle_name}</td>
                                        <td>{this.state.gender}</td>
                                        <td>{doctor.country_of_residence}</td>
                                        {/* <td>{this.state.status}</td> */}
                                        <td>
                                        {/* <Button size="sm" onClick={this.togglePrimary} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-eye"></i></Button> */}
                                        <Button size="sm" onClick={() => this.viewDoctor(doctor_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-eye"></i></Button>

                                        {/* <Button size="sm" onClick={() => this.togglePrimary(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-comments"></i></Button> */}
                                        
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </Table>
                            <div className="d-flex justify-content-center">
                              <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={this.state.pageRangeDisplayed}
                                onChange={this.handlePageChange}
                                itemClass='page-item'
                                linkClass='page-link'
                              />
                            </div>
                              
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                    

                  {/* </Col> */}
                {/* </Row> */}
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleViewDoctors("close", "close")}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* //////////// Patient Chat //////////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.primary} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
          <ModalHeader toggle={() => this.togglePrimary("close", "close")}>Messages</ModalHeader>
          <ModalBody>
            
            {/* //////////////////////////////////// */}
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{this.state.doctor_name} Messages
              </CardHeader>
              <CardBody>
                <p>
                  File upload must not be more than 500kb
                </p><hr></hr>
                <ul id="message_area" style={{maxHeight: "300px", overflowX: "auto"}}>
                  {/* <span style={{float: "right", padding: "5px 10px", margin: "5px", borderRadius: "10px", backgroundColor: "#2167ac", color: "#ffffff"}}>Hello Paul</span> */}
                  {/* {this.messageArray} */}
                </ul>

                <FormGroup>
                  <InputGroup>
                    <Input type="textarea" id="message_box" rows="2" onChange={this.onChangeMessageBox} placeholder="type ..." />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fa fa-telegram fa-lg cammedics-color" style={{cursor: "pointer", fontSize: "3em" }} onClick={this.sendMessage}></i>
                      </InputGroupText>
                      <InputGroupText>
                        <i className="fa fa-paperclip fa-lg cammedics-color" style={{cursor: "pointer", fontSize: "2em", float: "right" }} onClick={this.trigerSendFile}></i>
                        <Input 
                          type="file" 
                          color="primary"
                          id="send_file"
                          style={{display: "none"}}
                          // onChange={this.onChangeProfilePicture}
                          onChange={e => { this.sendFile(e) }}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup> 
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.togglePrimary("close", "close")}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* /////////////////////// VIEW DOCTOR /////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.primaryViewDoctor} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
          <ModalHeader toggle={() => this.toggleViewDoctor("close", "close")}>View Doctor</ModalHeader>
          <ModalBody>
            
            {/* //////////////////////////////////// */}
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{this.state.patient_name} Doctor's Data
              </CardHeader>
              <CardBody>
                  <Form>
                    <Row>
                      <Col xs="12" sm="12">
                        {/* ///////// PERSONAL DATA ///////////*/}
                        <Card>
                          <CardHeader>
                            <strong>Doctor's Data</strong>
                          </CardHeader>
                          <CardBody>
                            <Row style={{marginBottom: "25px"}}>
                              {/* <Col xs="2"></Col> */}
                              <Col xs="6">
                                <ListGroup>
                                  <ListGroupItem className="justify-content-between">
                                    Username: <strong>{this.state.doctor_username}</strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Title: <strong>{this.state.doctor_title}</strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    First Name: <strong>{this.state.doctor_first_name}</strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Last Name: <strong><span style={{textAlign: "left"}}>{this.state.doctor_last_name}</span></strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Middle Name: <strong>{this.state.doctor_middle_name}</strong>
                                  </ListGroupItem>
                                </ListGroup>
                              </Col>
                              <Col xs="6">
                                <ListGroup>
                                  <ListGroupItem className="justify-content-between">
                                    Gender: <strong>{this.state.doctor_gender}</strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Date of Birth: <strong><span style={{textAlign: "right"}}>{this.state.doctor_dob}</span></strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Nationality: <strong>{this.state.doctor_nationality}</strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                  Country of Residence: <strong>{this.state.doctor_country_of_residence}</strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                  District/Province/State: <strong>{this.state.doctor_district_province_state}</strong>
                                  </ListGroupItem>
                                </ListGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs="12">
                                <ListGroup>
                                  <ListGroupItem className="justify-content-between">
                                    Nationality: <strong>{this.state.doctor_nationality}</strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Country of Residence: <strong><span style={{textAlign: "right"}}>{this.state.doctor_country_of_residence}</span></strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    District/Province/State: <strong><span style={{textAlign: "right"}}>{this.state.doctor_district_province_state}</span></strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Area of Specialization: <strong><span style={{textAlign: "right"}}>{this.state.doctor_area_of_specialization}</span></strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Available on appointment: <strong><span style={{textAlign: "right"}}>{this.state.doctor_available_on_appointment}</span></strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Available on emergency: <strong><span style={{textAlign: "right"}}>{this.state.doctor_available_on_emergency}</span></strong>
                                  </ListGroupItem>
                                  <ListGroupItem className="justify-content-between">
                                    Available by time: <strong><span style={{textAlign: "right"}}>{this.state.doctor_available_by_time}</span></strong>
                                  </ListGroupItem>
                                </ListGroup>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Form>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{this.state.patient_name} Appointment
              </CardHeader>
              <CardBody>
                  <Form onSubmit={this.onSubmitBookAppointment}>
                    <Row>
                      <Col xs="12" sm="12">
                        {/* ///////////// APPOINTMENT ///////////*/}
                        <Card>
                          <CardHeader>
                            <strong>Book an appointment</strong>
                          </CardHeader>
                          <CardBody>
                            <Row>
                              {/* <Col xs="2"></Col> */}
                              <Col xs="12">
                                  {/* //// DATE //////// */}
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText><span className="asterisk">*</span>Date</InputGroupText>
                                      </InputGroupAddon>
                                      <Input type="date" id="date" defaultValue={this.state.date} onChange={this.onChangeDate} />
                                      {/* <Input type="text" id="time1" defaultValue={this.state.time1} onChange={this.onChangeTime1} /> */}
                                      <Input type="select" id="time" defaultValue={this.state.time} onChange={this.onChangeTime}>
                                        <option value="" selected>Time</option>
                                        <option value="12:00 AM TO 12:30 AM">12:00 AM TO 12:30 AM</option>
                                        <option value="12:30 AM TO 01:00 PM">12:30 AM TO 01:00 PM</option>
                                        <option value="01:00 AM TO 01:30 AM">01:00 AM TO 01:30 AM</option>
                                        <option value="01:30 AM TO 02:00 AM">01:30 AM TO 02:00 AM</option>
                                        <option value="02:00 AM TO 02:30 AM">02:00 AM TO 02:30 AM</option>
                                        <option value="03:30 AM TO 03:00 AM">03:30 AM TO 03:00 AM</option>
                                        <option value="03:00 AM TO 03:30 AM">03:00 AM TO 03:30 AM</option>
                                        <option value="03:30 AM TO 04:00 AM">03:30 AM TO 04:00 AM</option>
                                        <option value="04:00 AM TO 04:30 AM">04:00 AM TO 04:30 AM</option>
                                        <option value="04:30 AM TO 05:00 AM">04:30 AM TO 05:00 AM</option>
                                        <option value="05:00 AM TO 05:30 AM">05:00 AM TO 05:30 AM</option>
                                        <option value="05:30 AM TO 06:00 AM">05:30 AM TO 06:00 AM</option>
                                        <option value="06:00 AM TO 06:30 AM">06:00 AM TO 06:30 AM</option>
                                        <option value="06:30 AM TO 07:00 AM">06:30 AM TO 07:00 AM</option>
                                        <option value="07:00 AM TO 07:30 AM">07:00 AM TO 07:30 AM</option>
                                        <option value="07:30 AM TO 08:00 AM">07:30 AM TO 08:00 AM</option>
                                        <option value="08:00 AM TO 08:30 AM">08:00 AM TO 08:30 AM</option>
                                        <option value="08:30 AM TO 09:00 AM">08:30 AM TO 09:00 AM</option>
                                        <option value="09:00 AM TO 09:30 AM">09:00 AM TO 09:30 AM</option>
                                        <option value="09:30 AM TO 10:00 AM">09:30 AM TO 10:00 AM</option>
                                        <option value="10:00 AM TO 10:30 AM">10:00 AM TO 10:30 AM</option>
                                        <option value="10:30 AM TO 11:00 AM">10:30 AM TO 11:00 AM</option>
                                        <option value="11:00 AM TO 11:30 AM">11:00 AM TO 11:30 AM</option>
                                        <option value="11:30 AM TO 12:00 PM">11:30 AM TO 12:00 PM</option>
                                        <option value="12:00 PM TO 01:30 PM">12:00 PM TO 01:30 PM</option>
                                        <option value="01:30 PM TO 02:00 PM">01:30 PM TO 02:00 PM</option>
                                        <option value="02:00 PM TO 02:30 PM">02:00 PM TO 02:30 PM</option>
                                        <option value="02:30 PM TO 03:00 PM">02:30 PM TO 03:00 PM</option>
                                        <option value="03:00 PM TO 03:30 PM">03:00 PM TO 03:30 PM</option>
                                        <option value="03:30 PM TO 04:00 PM">03:30 PM TO 04:00 PM</option>
                                        <option value="04:00 PM TO 04:30 PM">04:00 PM TO 04:30 PM</option>
                                        <option value="04:30 PM TO 05:00 PM">04:30 PM TO 05:00 PM</option>
                                        <option value="05:00 PM TO 05:30 PM">05:00 PM TO 05:30 PM</option>
                                        <option value="05:30 PM TO 06:00 PM">05:30 PM TO 06:00 PM</option>
                                        <option value="06:00 PM TO 06:30 PM">06:00 PM TO 06:30 PM</option>
                                        <option value="06:30 PM TO 07:00 PM">06:30 PM TO 07:00 PM</option>
                                        <option value="07:00 PM TO 07:30 PM">07:00 PM TO 07:30 PM</option>
                                        <option value="07:30 PM TO 08:00 PM">07:30 PM TO 08:00 PM</option>
                                        <option value="08:00 PM TO 08:30 PM">08:00 PM TO 08:30 PM</option>
                                        <option value="08:30 PM TO 09:00 PM">08:30 PM TO 09:00 PM</option>
                                        <option value="09:00 PM TO 09:30 PM">09:00 PM TO 09:30 PM</option>
                                        <option value="09:30 PM TO 10:00 PM">09:30 PM TO 10:00 PM</option>
                                        <option value="10:00 PM TO 10:30 PM">10:00 PM TO 10:30 PM</option>
                                        <option value="10:30 PM TO 11:00 PM">10:30 PM TO 11:00 PM</option>
                                        <option value="11:00 PM TO 11:30 PM">11:00 PM TO 11:30 PM</option>
                                        <option value="11:30 PM TO 12:00 PM">11:30 PM TO 12:00 PM</option>
                                      </Input>
                                      {/* <TimePicker
                                        onChange={this.onChangeTime}
                                        value={this.state.time}
                                      /> */}
                                      {/* <TimeField value={time} onChange={this.onTimeChange} /> */}
                                      {/* <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                                      </InputGroupAddon> */}
                                    </InputGroup>
                                  </FormGroup>
                                  {/* ///////////////////////// SUBJECT //////////////////////// */}
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText><span className="asterisk">*</span>Subject</InputGroupText>
                                      </InputGroupAddon>
                                      <Input type="text" id="subject" defaultValue={this.state.subject} onChange={this.onChangeSubject}/>
                                      {/* <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                                      </InputGroupAddon> */}
                                    </InputGroup>
                                  </FormGroup>
                                  {/* ////////////////////////// MESSAGE //////////////////////////// */}
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText><span className="asterisk">*</span>Message</InputGroupText>
                                      </InputGroupAddon>
                                      <Input type="textarea" id="message" rows="4" defaultValue={this.state.message} onChange={this.onChangeMessage} placeholder=" enter appointment message" />
                                      {/* <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                                      </InputGroupAddon> */}
                                    </InputGroup>
                                  </FormGroup>  
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>

                      </Col>
                    </Row>
                    <FormGroup className="form-actions">
                      <Button type="submit" size="sm" color="primary">Book appointment</Button>
                    </FormGroup>
                  </Form>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleViewDoctor("close", "close")}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* /////////////////////// VIEW APPOINTMENTS /////////////////////////////////////////// */}
        <Modal isOpen={this.state.primaryViewAppointments} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
          <ModalHeader toggle={() => this.toggleViewAppointments("close", "close")}>View Appointments</ModalHeader>
          <ModalBody>
            
            {/* //////////////////////////////////// */}
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{this.state.patient_name} Appointments 
                {/* <Button type="submit" size="sm" color="primary" style={{float: "right"}} onClick={() => this.generatePortReport()}>Generate Report</Button> */}
                {/* <Button size="sm" onClick={() => this.getPateintMedicalRec(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-eye"></i></Button> */}
              </CardHeader>
              <CardBody>
                {/* <Row> */}
                  {/* <Col xs="12" sm="12"> */}
                    <Row>
                      <Col xs="12" sm="12">
                        <Form onSubmit={this.onSubmitPortReport}>
                          <Row>
                            <Col xs="12" sm="12">
                            <Table responsive bordered>
                              <thead>
                                <tr>
                                  <th scope="col">S/N</th>
                                  <th>Username</th>
                                  <th>Doctor's Name</th>
                                  <th>Subject</th>
                                  <th>Message</th>
                                  <th>Date</th>
                                  <th>Time</th>
                                  <th>Status</th>
                                  <th>Action</th>
                              </tr>
                              </thead>
                              <tbody>
                                {
                                  // Calculation for the page S/N
                                  this.state.currentPage2_appointments = ((this.state.activePage_appointments * 10) - (10 - 1)),
                                  // ////////////////////////////////////////////////////////////
                                  this.state.appointments_list.map(appointment=>{
                                    const name = appointment.doc_first_name+" "+appointment.doc_last_name+" "+appointment.doc_middle_name;
                                    
                                    // if status is 1 allow chat else disable chat that is consultation is done
                                    if(appointment.status == 1){
                                      this.state.status = <Badge color="success">Open</Badge>;
                                      this.state.chatBtn = <Button size="sm" onClick={() => this.togglePrimary(appointment.doc_id, appointment.name)} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-comments"></i></Button>;
                                    }
                                    if(appointment.status == 2){
                                      this.state.status = <Badge color="danger">Close</Badge>;
                                      this.state.chatBtn = <Button size="sm" onClick={() => this.togglePrimary(appointment.doc_id, appointment.name)} className="btn-facebook btn-brand icon mr-1 mb-1" disabled><i className="fa fa-comments"></i></Button>;
                                    }
                                    return(
                                      <tr key={appointment.id}>
                                        {/* <th scope="row">{this.state.pageNumber++}</th> */}
                                        <th scope="row">{this.state.currentPage2_appointments++}</th>
                                        <td>{appointment.doc_username}</td>
                                        <td>{name}</td>
                                        <td>{appointment.subject}</td>
                                        <td>{appointment.message}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>{this.state.status}</td>
                                        <td>
                                          {this.state.chatBtn}
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </Table>
                            <div className="d-flex justify-content-center">
                              <Pagination
                                activePage={this.state.activePage_appointments}
                                itemsCountPerPage={this.state.itemsCountPerPage_appointments}
                                totalItemsCount={this.state.totalItemsCount_appointments}
                                pageRangeDisplayed={this.state.pageRangeDisplayed_appointments}
                                onChange={this.handlePageChangeAppointments}
                                itemClass='page-item'
                                linkClass='page-link'
                              />
                            </div>
                              
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                    

                  {/* </Col> */}
                {/* </Row> */}
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleViewAppointments("close", "close")}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* /////////////////////////// PAY WITH PAYPAL //////////////////////////////////// */}
          <Modal isOpen={this.state.primaryMakePayment} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
            <ModalHeader toggle={() => this.toggleMakePayment("close", "close")}>Make Payment</ModalHeader>
            <ModalBody>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>{this.state.patient_name} Make Payment 
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="3" sm="3"></Col>
                    <Col xs="6" sm="6">
                        <ListGroup>
                          <ListGroupItem className="justify-content-between">
                            Doctor's Consultation Fee: <strong style={{float: "right"}}>${this.state.doctor_fee}</strong>
                          </ListGroupItem>
                          <ListGroupItem className="justify-content-between">
                            Handling Fee: <strong style={{float: "right"}}>${this.state.country_handling_fee}</strong>
                          </ListGroupItem>
                          <ListGroupItem className="justify-content-between">
                            Total: <strong style={{float: "right"}}>${this.state.total_fee}</strong>
                          </ListGroupItem>
                        </ListGroup><br></br>
                        <p style={{marginBottom: "25px"}}>You can pay with your paypal account or with your debit or credit card.</p>

                      <PayPalButton
                        amount={this.state.total_fee}
                        
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {
                          this.state.billing_amount_currency  = details.purchase_units[0].amount.currency_code
                          this.state.billing_amount_value     = details.purchase_units[0].amount.value
                          this.state.billing_orderID          = data.orderID
                          this.state.billing_payerID          = data.payerID
                          this.state.billing_email_address    = details.payer.email_address
                          this.state.billing_name             = details.payer.name.given_name+" "+ details.payer.name.surname;

                          // console.log(details);
                          // console.log(data);
                          // console.log(details.purchase_units[0].amount.currency_code)
                          // console.log(details.purchase_units[0].amount.value)
                          return this.onSubmitBookAppointment2()

                        }}
                        onError={(err) => {
                          alert(err);
                          window.location.reload();
                        }}
                      />
                    </Col>
                    <Col xs="3" sm="3"></Col>
                  </Row>
                
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => this.toggleMakePayment("close", "close")}>Cancel</Button>
            </ModalFooter>
          </Modal>
          {/* /////////////////////////// PAY WITH PAYPAL //////////////////////////////////// */}

       

          {/* ///////////////// Sweet Alerts //////////////////////////////////// */}
                
              <button id="sweet_alert1" style={{display: "none"}} onClick={() => this.setState({ showSuccess: true })}>Alert</button>
              <SweetAlert
                show={this.state.showSuccess}
                // title="Demo"
                type= "success"
                confirmButtonColor="#2167ac"
                animation="true"
                text={this.state.successMessage}
                onConfirm={() => this.setState({ showSuccess: false })}
              />

              <button id="sweet_alert2" style={{display: "none"}} onClick={() => this.setState({ showError: true })}>Alert</button>
              <SweetAlert
                show={this.state.showError}
                // title="Demo"
                type= "warning"
                confirmButtonColor="#2167ac"
                animation="true"
                text={this.state.errorMessage}
                onConfirm={() => this.setState({ showError: false })}
              />
              {/* /////////////////Payment ///////////////////////////// */}
          {/* ///////////////// Sweet Alerts //////////////////////////////////// */}

      </div>
    
    );
  }
}

export default PatientListHospitals;