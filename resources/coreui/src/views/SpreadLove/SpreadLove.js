import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {createHashHistory} from 'history';
// import axios from 'axios';
import axios, { post } from 'axios';
import $ from "jquery";
import SweetAlert from 'sweetalert2-react';
import { PayPalButton } from "react-paypal-button-v2";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
// ////////// LOADER /////////////////////////////////
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// ///////////////////////////////////////////////////

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
  ListGroup, 
  ListGroupItem,
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
} from 'reactstrap';

let hashHistory = createHashHistory()

class SpreadLove extends Component {
  constructor(props) {
    super(props);

    this.toggleMakePayment        = this.toggleMakePayment.bind(this);
    this.onSubmitFlutterPay       = this.onSubmitFlutterPay.bind(this);
    this.onSubmitNumberofTicket   = this.onSubmitNumberofTicket.bind(this);
    this.onChangeNumberTicket     = this.onChangeNumberTicket.bind(this);
    this.onSubmitJoinConcert      = this.onSubmitJoinConcert.bind(this);
    this.onSubmitNominee          = this.onSubmitNominee.bind(this);
    this.toggleNominate           = this.toggleNominate.bind(this);
    this.onChangeNomineeName      = this.onChangeNomineeName.bind(this);
    this.onChangeNomineeEmail     = this.onChangeNomineeEmail.bind(this);
    this.onChangeNomineeTelephone = this.onChangeNomineeTelephone.bind(this);
    this.onChangeNomineeAddress   = this.onChangeNomineeAddress.bind(this);

    this.toggleJoinConcert  = this.toggleJoinConcert.bind(this);
    this.onChangePasscode   = this.onChangePasscode.bind(this);

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
      primaryMakePayment: false,
      primaryNominate: false,
      primaryJoinConcert: false,
      concert_fee: 27.50,
      naira_concert_fee: 13200,
      concert_fee_display: 25,
      naira_concert_fee_display: 12000,
      handling_fee: 2.50,
      naira_handling_fee: 1200,
      number_ticket: "1",
      showNomination: "none",
      showPayForTicket: "none",
      showInputNumberTicket: "none",
      showNumberTicketButton: "block",

      getDetails: "",
      firstname: "",
      lastname: "",
      name: "",
      email: "",
      telephone: "",
      // ////////////////////////
      passcode: "",
      nominee_name: "",
      nominee_email: "",
      nominee_telephone: "",
      nominee_address: "",
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////
      concertInfoDiv: "block",
      liveConcertDiv: "none",

      successMessage: "Successful",
      errorMessage: "Failed",      
      // /////////////////////////////////////////////////////////////
      // ////////////////////// SEARCH FOR THIS ///////////////////////////////////////
      // path_link: "http://localhost:3001",
      path_link: "https://concert.cammedics.com",
    };
    
  }

  componentDidMount()
  { 
    try {
      // get the url param
      var url_string = window.location.href;
      var transaction_details = url_string.split('?')[1];
      var transaction_details = transaction_details.split('&');
      var transaction_status  = transaction_details[0];
      var transaction_ref     = transaction_details[1];
      // if successful, verify again before displaying success message for flutter, else display error message
      if(transaction_status == "success"){
        // ////////////// LOADER ////////////
        this.setState({
          showDiv: "block",
          loading: true,
        });
        // ////////////////////////////////
        const payment_data ={
          transaction_id : transaction_ref, 
          email : this.state.email,
        }
        axios.post(`/flutterwave_verify`, payment_data)
        .then(response => {
          // console.log(response);
          return response;
        })
        .then(json => {
          // ////////// LOADER //////////////
            this.setState({
              showDiv: "none",
              loading: false,
            });
          // ///////////////////////////////
          if (json.data.success) {
            // console.log(json.data.data)
            this.setState({ 
              successMessage: "Payment successful",
              showSuccess: true
            }, this.toggleNominate);
            // this.props.history.push(`/spread_the_love`)
          } else{
            this.setState({ 
              errorMessage: json.data.data,
              showError: true
            });
            // history.push("/spread_the_love");
          }
        })
        .catch(error => {
          // console.error(`An Error Occuredd! ${error}`);
        });
      }else if(transaction_status == "tampered"){
        this.setState({ 
          errorMessage: "Transaction error. Transaction has been tampered with",
          showError: true
        });
      }else if(transaction_status == "Fraud"){
        this.setState({ 
          errorMessage: "Transaction error. Fraud transaction detected",
          showError: true
        });
      }else if(transaction_status == "No-transaction"){
        this.setState({ 
          errorMessage: "No transaction was found",
          showError: true
        });
      }
      else{
        this.setState({ 
          errorMessage: transaction_status,
          showError: true
        });
      }
      
    } catch (error) {
      // check category of user then attach the appropriate link to fetch details
      var login_from  = localStorage.getItem("login_from");
      if(login_from == "patient"){
        this.setState({ 
          getDetails: "/api/patient/get/"
        }, this.getDetails)
      }
      else if(login_from == "doctor"){
        this.setState({ 
          getDetails: "/api/doc/get/"
        }, this.getDetails)
      }
      else if(login_from == "pharm"){
        this.setState({ 
          getDetails: "/api/pharm/get/"
        }, this.getDetails)
      }
      else if(login_from == "hospital"){
        this.setState({ 
          getDetails: "/api/hospital/get/"
        }, this.getDetails)
      }
      else if(login_from == "port"){
        this.setState({ 
          getDetails: "/api/port/get/"
        }, this.getDetails)
      }
      else if(login_from == "laboratory"){
        this.setState({ 
          getDetails: "/api/lab/get/"
        }, this.getDetails)
      }
    }
  }

  getDetails()
  { 
    axios.get(`${this.state.getDetails}`+this.state.id+`?token=${this.state.token}`)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        if(json.data.data.telephone == null || json.data.data.telephone == ""){
          this.setState({ 
            errorMessage: "Please go to profile page and complete your profile update",
            showError: true
          });
        }
        // console.log(json.data.data)
        var login_from  = localStorage.getItem("login_from");
        if(login_from == "patient"){
          this.setState({ 
            email: json.data.data.email,
            name: json.data.data.first_name +" "+json.data.data.last_name,
            username: json.data.data.username,
            telephone: json.data.data.zip_code+json.data.data.telephone,
          });
        }
        if(login_from == "doctor"){
          this.setState({ 
            email: json.data.data.email,
            name: json.data.data.first_name +" "+json.data.data.last_name,
            username: json.data.data.username,
            telephone: json.data.data.zip_code+json.data.data.telephone,
          });
        }
        if(login_from == "pharm" || "hospital" || "port" || "laboratory"){
          this.setState({ 
            email: json.data.data.email,
            name: json.data.data.name,
            username: json.data.data.username,
            telephone: json.data.data.zip_code+json.data.data.telephone,
          });
        }
      } else {
        
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      // console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  // checkConcertBookings(){
  //   // alert(this.state.username)
  //   const concert_data ={
  //     username : this.state.username,  
  //   }
  //   axios.post(`/check/concert/`+this.state.id+`?token=${this.state.token}`, concert_data)
  //   .then(response => {
  //     return response;
  //   })
  //   .then(json => {
  //     console.log(json.data)
  //     if (json.data.success) {
  //       this.setState({ 
  //         // reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleJoinConcert()} style={{float: "right", marginRight: "10px"}}>Join Concert Now</Button>,
  //         reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Register Now</Button>,
  //       })
  //     } else {
  //       this.setState({ 
  //         reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Register Now</Button>,
  //       })
  //     }
  //   })
  //   .catch(error => {
  //     // redirect user to previous page if user does not have autorization to the page
  //     // hashHistory.push('/premontessori');
  //     console.error(`An Error Occuredd! ${error}`);
      
  //   });
  // }

  onChangeNumberTicket(e)   { this.setState({ number_ticket:e.target.value }); }
  onChangePasscode(e)       { this.setState({ passcode:e.target.value }); }

  onChangeNomineeName(e)      { this.setState({ nominee_name:e.target.value }); }
  onChangeNomineeEmail(e)     { this.setState({ nominee_email:e.target.value }); }
  onChangeNomineeTelephone(e) { this.setState({ nominee_telephone:e.target.value }); }
  onChangeNomineeAddress(e)   { this.setState({ nominee_address:e.target.value }); }

  // /////////////// Make payment
  toggleMakePayment(data1, data2) {
    // console.log(id);
    if(data1 == "close"){
      this.setState({
        primaryMakePayment: false,
      });
    }else{
      this.setState({
        primaryMakePayment: !this.state.primaryMakePayment,
        showInputNumberTicket: "none",
        showPayForTicket: "none",
        showNumberTicketButton: "block",
      });
    }
  }

  buySingleTicket(){
    this.setState({
      number_ticket: "1",
      showInputNumberTicket: "none",
      showPayForTicket: "block",
      showNumberTicketButton: "none",
    }, this.onSubmitNumberofTicket);
  }

  buyMultipleTicket(){
    this.setState({
      showPayForTicket: "none",
      showInputNumberTicket: "block",
      showNumberTicketButton: "none",
    });
  }

  noNomination(){
    this.toggleNominate("close", "close")
    this.props.history.push(`/spread_the_love`)
  }

  yesNomination(){
    this.setState({
      showNomination: "block",
    });
  }

  // /////////////// Nominate beneficiary
  toggleNominate(data1, data2) {
    // console.log(id);
    // this.toggleNominate("close", "close");
    if(data1 == "close"){
      this.setState({
        primaryNominate: false,
      });
    }else{
      this.setState({
        primaryNominate: !this.state.primaryNominate,
      });
    }
  }

  // /////////////// JOin Concert
  toggleJoinConcert(data1, data2) {
    // console.log(id);
    if(data1 == "close"){
      this.setState({
        primaryJoinConcert: false,
      });
    }else{
      this.setState({
        primaryJoinConcert: !this.state.primaryJoinConcert,
      });
    }
  }

  onSubmitNumberofTicket(e){
    if(e){
      e.preventDefault();
    }
    
    const payment_data ={
      username : this.state.username, 
      number_ticket : this.state.number_ticket, 
    }
    axios.post(`/number/ticket/`+this.state.id+`?token=${this.state.token}`, payment_data)
    .then(response => {
      // console.log(response);
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({
          number_ticket: json.data.data.number_ticket,
          concert_fee: json.data.data.total_amount,
          naira_concert_fee: json.data.data.naira_total_amount,
          showInputNumberTicket: "none",
          showPayForTicket: "block",
          handling_fee: this.state.number_ticket * 2.50,
          naira_handling_fee: this.state.number_ticket * 1200,
          concert_fee_display: this.state.number_ticket * 25,
          naira_concert_fee_display: this.state.number_ticket * 12000,
        });
      } else{
        this.setState({
          showError: true
        });
      }
    })
    .catch(error => {
      
    });
  }

  onSubmitFlutterPay(e)
  {
    e.preventDefault();
    const payment_data ={
      // amount : this.state.amount, 
      username : this.state.username,
      number_ticket : this.state.number_ticket,
      amount : this.state.concert_fee,
      email : this.state.email, 
      name : this.state.first_name +" "+this.state.last_name,  
      phone_number : this.state.telephone, 
    }
    axios.post(`/flutterwave_pay`, payment_data)
    .then(response => {
      // console.log(response);
      return response;
    })
    .then(json => {
      if (json.data.success) {
        // console.log(json.data.data)
        // this.setState({
        //   showSuccess: true
        // });
        // var win = window.open(json.data.data, '_blank');
        var win = window.open(json.data.data, '_self');
        win.focus();
      } else{
        this.setState({
          showError: true
        });
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      // console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  onSubmitPayPal()
  {
    // ////////////// LOADER ////////////
    this.setState({
      showDiv: "block",
      loading: true,
    });
    // ////////////////////////////////
    const payment_data ={
      username : this.state.username,
      number_ticket : this.state.number_ticket, 
      billing_email_address : this.state.billing_email_address, 
      billing_name : this.state.billing_name, 
      billing_amount_currency : this.state.billing_amount_currency,
      billing_amount_value : this.state.billing_amount_value, 
      billing_orderID : this.state.billing_orderID, 
      billing_payerID : this.state.billing_payerID, 
    }
    axios.post(`/paypal_pay`, payment_data)
    .then(response => {
      // console.log(response);
      return response;
    })
    .then(json => {
      // ////////// LOADER //////////////
        this.setState({
          showDiv: "none",
          loading: false,
        });
      // ///////////////////////////////
      if (json.data.success) {
        // console.log(json.data.data)
        this.setState({ 
          successMessage: "Payment successful",
          showSuccess: true
        }, this.toggleNominate);
      } else{
        this.setState({
          showError: true
        });
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      // console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  onSubmitJoinConcert(e)
  {
    e.preventDefault();
    var login_from  = localStorage.getItem("login_from");
    if(
      this.state.passcode == "" || this.state.passcode == null
    ){
      this.setState({
        errorMessage: "Please fill all required field",
        showError: true
      });
    }else{
      const concert_data ={
        user_type: login_from,
        passcode : this.state.passcode, 
      }
      axios.post(`/check/concert/passcode/`+this.state.id+`?token=${this.state.token}`, concert_data)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {
          console.log(json.data.data)
          // if successful display successful message, hide login div, call passPatientDataToIframe and pass details
          this.setState({ 
            successMessage: "Correct",
            showSuccess: true,
            showDiv: "none",
            concertInfoDiv: "none",
            liveConcertDiv: "block",
          }, this.passPatientDataToIframe(json.data.data));
        } else {
          this.setState({ 
            errorMessage: "Link does not exist",
            showError: true
          });
        }
      })
      .catch(error => {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        // console.error(`An Error Occuredd! ${error}`);
        
      });
    }
  }

  passPatientDataToIframe(roomLink){
    this.toggleJoinConcert("close", "close");
    // click to toggle n expand div
    document.getElementById("navigationToggler").click();
    // hide header
    document.getElementById("navigationPanel").style.display = "none";
    document.getElementById("footer-bottom").style.display = "none";
    // pass the link the user pasted into the iframe
    var screen_video = roomLink;
    var iframe    = document.createElement("iframe");
    iframe.src    = screen_video;
    iframe.id     = "live_chat_frame";
    iframe.width  = "100%";
    iframe.height = "700px";
    iframe.allow  = "camera *;microphone *";

    document.getElementById("live_concert_div").innerHTML = "";
    document.getElementById("live_concert_div").appendChild(iframe);
    
    // var login_as    = this.state.login_as;
    var username    = this.state.username;
    // var first_name  = this.state.first_name;
    // var last_name   = this.state.last_name;
    var path_link   = this.state.path_link;
    setTimeout(function(){ 
      // var name  = first_name+" "+last_name;
      var messageSent = username;
      document.getElementById('live_chat_frame').contentWindow.postMessage(messageSent, path_link);
    }, 1000);
  }

  onSubmitNominee(e)
  {
    e.preventDefault();
    // var login_from  = localStorage.getItem("login_from");
    if(
      this.state.nominee_name == "" || this.state.nominee_email == "" || this.state.nominee_telephone == "" || this.state.nominee_address == "" || 
      this.state.nominee_name == null || this.state.nominee_email == null || this.state.nominee_telephone == null || this.state.nominee_address == null 
    ){
      this.setState({
        errorMessage: "Please fill all required field",
        showError: true
      });
    }else{
      const nominee_data ={
        username : this.state.username,
        nominee_name : this.state.nominee_name,
        nominee_email : this.state.nominee_email,
        nominee_telephone : this.state.nominee_telephone,
        nominee_address : this.state.nominee_address, 
      }
      axios.post(`/nominate/beneficiary/`+this.state.id+`?token=${this.state.token}`, nominee_data)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {
          this.setState({ 
            successMessage: "Beneficiary nominated",
            showSuccess: true,
            showDiv: "none"
          }, this.props.history.push(`/spread_the_love`));
          this.toggleNominate("close", "close")
        } else {
          this.setState({ 
            errorMessage: json.data.data,
            showError: true
          }, this.props.history.push(`/spread_the_love`));
        }
      })
      .catch(error => {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        // console.error(`An Error Occuredd! ${error}`);
        
      });
    }
  }

  render() {

    return (
      <div className="animated fadeIn"> 
        <span style={{display: this.state.liveConcertDiv}}>
          <div id="live_concert_div"></div>
        </span>
        <span style={{display: this.state.concertInfoDiv}}>
          <Row> 
            <Col xs="12" sm="12" className="text-center">
              <h4>
                {/* <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "1.53125rem"}}> </i> {" "}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "1.33125rem"}}> </i> {" "}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "1.13125rem"}}> </i> {" "} */}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "0.93125rem"}}> </i> {" "}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "0.73125rem"}}> </i> {" "}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "0.53125rem"}}> </i> {" "}
                {/* <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "0.33125rem"}}> </i> {" "}  */}
                <span style={{fontWeight: "700"}}>Spread the Love Concert {" "} </span>
                {/* <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "0.33125rem"}}> </i> {" "} */}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "0.53125rem"}}> </i> {" "}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "0.73125rem"}}> </i> {" "}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "0.93125rem"}}> </i> {" "}
                {/* <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "1.13125rem"}}> </i> {" "}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "1.33125rem"}}> </i> {" "}
                <i className="fa fa-heart" style={{color: "#ca333a", fontSize: "1.53125rem"}}> </i> {" "} */}
              </h4>    
            </Col>
          </Row><br></br> 
          
          <Row>
            <Col xs="12" sm="12">
              {/* // ////////// LOADER ////////////// */}
              <div className="sweet-loading" style={{position: "fixed", height:"100%", width:"100%", display: this.state.showDiv, top:"50%", left:"50%",zIndex:"1500"}}>
                    <div style={{position: "absolute", backgroundColor: "#ffffffcf",width:"100px",padding:"15px",borderRadius:"20px" }}>
                      <ScaleLoader
                        css={override}
                        height={50}
                        width={3}
                        radius={2}
                        margin={5}
                        color={"#2167ac"}
                        loading={this.state.loading}
                      />
                      <h6 style={{color: "#ca333a"}}>Loading...</h6>
                    </div>
              </div>
              {/* // ///////////////// ////////////// */}
              {/* ////////////////////// Profile INSTRUCTIONS ////////////////////////////////////// */}
              <Card>
                <CardBody> 
                  <Row>
                    <Col xs="12" sm="7" style={{marginBottom: "25px"}}>
                      <strong>ADOPT A POOR NIGERIAN FOR FREE MEDICAL TREATMENT THIS YEAR</strong>
                    </Col>
                    <Col xs="12" sm="5" style={{marginBottom: "25px"}}>
                      <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Get a Ticket Now</Button>
                      <Button type="submit" size="sm" color="primary" onClick={() => this.toggleJoinConcert()} style={{float: "right", marginRight: "10px"}} >Join Concert Now</Button>
                    </Col>
                      {/* {this.state.reg_join_concert} */}
                      <br></br><br></br>
                  </Row>
                  Sickness should not be a death sentence, but for most Nigerians, it is, because they cannot afford to pay for their medical treatment. <br></br><br></br>

                  CamMedics is partnering with FCT HEALTH INSURANCE SCHEME to reach such vulnerable people.<br></br><br></br>

                  To benefit from the program, they must be;<br></br><br></br>

                  (a) Nigerian citizens or residents. <br></br>
                  (b)  Unable to pay for their medical treatment without external assistance and fall into one or more of the following categories:<br></br>
                  1. Elderly or retirees above the age of 60 years.<br></br>
                  2. Students and unemployed youths under the age of 40 years.<br></br>
                  3.Unemployed pregnant women, widows or single mothers.<br></br>
                  4. Physically challenged persons.<br></br>
                  4. Mentally challenged persons.<br></br>
                  5. Self employed rural dwellers like farmers, artisans, traders etc.<br></br>
                  6. Employees in the informal sector earning the minimum wage or below.<br></br><br></br>

                  This valentine you can Spread the love, to save a life  by purchasing a ticket of $25 usd for the  online concert and nominating a vulnerable Nigerian that falls into the above category for free medical treatment throughout the year 2021.<br></br>
                  Sending a vulnerable person a gift of free medical treatment can make a difference between life and death.<br></br>
                  We can save a life now and not wait until the person has a medical emergency or they  are in their death bed to appeal for assistance.<br></br><br></br>

                  If you qualify to benefit from this program, you are free to appeal for your own sponsor and appeal to the person to nominate you for the free medical treatment. <br></br><br></br>

                  Please support this initiative.<br></br><br></br>

                  Get a ticket for the, SPREAD THE LOVE, TO SAVE A LOVE CONCERT.<br></br><br></br>

                  #Spreadthelovetosavealife this valentine.<br></br><br></br>

                  <Button type="submit" color="primary" onClick={() => this.toggleMakePayment()} style={{width: "100%"}}>Get a Ticket Now</Button>
                </CardBody>
                <p style={{marginLeft: "30px", fontSize: "12px", color: "#ca333a"}}>For quick assitance or question, please contact +234 816 525 3939 / +186 9765 1697 / +234 806 894 8689 (WhatsApp)</p>
              </Card>
            </Col>
          </Row>
        </span>
          {/* /////////////////////////// MAKE PAYMENT //////////////////////////////////// */}
            <Modal isOpen={this.state.primaryMakePayment} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
              <ModalHeader toggle={() => this.toggleMakePayment("close", "close")}>Make Payment</ModalHeader>
              <ModalBody>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>{this.state.patient_name} Make Payment 
                  </CardHeader>
                  <CardBody>
                    <Card style={{display: this.state.showNumberTicketButton, marginBottom: "25px"}}>
                      <CardBody>
                        <Row>
                          <Col xs="12" sm="12" style={{marginBottom: "25px"}}>
                            <h5 className="text-center">How many tickets will you like to buy</h5>
                          </Col>
                          <Col xs="12" sm="6" style={{marginBottom: "25px"}}>
                            <Button type="submit" color="primary" onClick={() => this.buySingleTicket()} style={{width: "100%"}}>Buy a Single Ticket</Button>
                          </Col>
                          <Col xs="12" sm="6" style={{marginBottom: "25px"}}>
                            <Button type="submit" color="primary" onClick={() => this.buyMultipleTicket()} style={{width: "100%"}}>Buy Multiple Ticket</Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>

                    <Card style={{display: this.state.showInputNumberTicket, marginBottom: "25px"}}>
                      <CardBody>
                        <Row>
                          <Col xs="12" sm="2"></Col>
                          <Col xs="12" sm="8">
                            <Form onSubmit={this.onSubmitNumberofTicket}>
                              <Row>
                                <Col xs="12" sm="12">
                                  {/* //// Number of Ticket //////// */}
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText><span className="asterisk">*</span>Number of Tickets</InputGroupText>
                                      </InputGroupAddon>
                                      <Input type="number" onChange={this.onChangeNumberTicket} />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fa fa-ticket-alt"></i></InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </FormGroup>                     
                                </Col>
                              </Row>
                              <FormGroup className="form-actions">
                                <Button type="submit" size="sm" color="primary" style={{width: "25%"}}>Submit</Button>
                              </FormGroup>
                            </Form>
                          </Col>
                          <Col xs="12" sm="2"></Col>
                        </Row>
                      </CardBody>
                    </Card>

                    <Card style={{display: this.state.showPayForTicket, marginBottom: "25px"}}>
                      <CardBody>
                        <Row>
                          <Col xs="12" sm="3"></Col>
                          <Col xs="12" sm="6">
                              <ListGroup>
                                <ListGroupItem className="justify-content-between">
                                  Number of Ticket(s): <strong style={{float: "right"}}>{this.state.number_ticket}</strong>
                                </ListGroupItem>
                              </ListGroup>
                              <ListGroup>
                                <ListGroupItem className="justify-content-between">
                                  Concert Fee: <strong style={{float: "right"}}>${this.state.concert_fee_display} (₦{this.state.naira_concert_fee_display})</strong>
                                </ListGroupItem>
                              </ListGroup>
                              <ListGroup>
                                <ListGroupItem className="justify-content-between">
                                  Handling Fee: <strong style={{float: "right"}}>${this.state.handling_fee} (₦{this.state.naira_handling_fee})</strong>
                                </ListGroupItem>
                              </ListGroup>
                              <ListGroup>
                                <ListGroupItem className="justify-content-between">
                                  Total: <strong style={{float: "right"}}>${this.state.concert_fee} (₦{this.state.naira_concert_fee})</strong>
                                </ListGroupItem>
                              </ListGroup><br></br>
                              {/* <p style={{marginBottom: "25px"}}>You can pay with your paypal account or with your debit or credit card.</p> */}

                              <Card>
                                <CardHeader>
                                  Pay in USD <strong style={{float: "right"}}>${this.state.concert_fee}</strong>
                                </CardHeader>
                                <CardBody>
                                  <PayPalButton
                                    amount={this.state.concert_fee}
                                    
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
                                      return this.onSubmitPayPal()
                                    }}

                                    onError={(err) => {
                                      alert(err);
                                      window.location.reload();
                                    }}

                                    options={{
                                      clientId: "AVx-UESGmRd47pO8XzTG7_vMWsTHaAybTQIhdOHz2vxId7vHZxtzQL07KKs0JN7Z2pECJw4Jk-0KGszf",
                                      // disableFunding: "card"
                                    }}
                                    
                                  />
                                </CardBody>
                              </Card>
                              <Card>
                                <CardHeader>
                                  Pay in Naira <strong style={{float: "right"}}>₦{this.state.naira_concert_fee}</strong>
                                </CardHeader>
                                <CardBody>
                                  <Button type="submit" className="btn-lg" color="primary" onClick={this.onSubmitFlutterPay} style={{width: "100%", backgroundColor: "#c88009"}}>Flutterwave</Button>
                                </CardBody>
                              </Card>
                            
                          </Col>
                          <Col xs="12" sm="3"></Col>
                        </Row>
                      </CardBody>
                    </Card>
                  
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.toggleMakePayment("close", "close")}>Cancel</Button>
              </ModalFooter>
            </Modal>
          {/* /////////////////////////// MAKE PAYMENT //////////////////////////////////// */}

          {/* /////////////////////////// NOMINATE PREFERRED BENEFICIARY //////////////////////////////////// */}
          <Modal isOpen={this.state.primaryNominate} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
              <ModalHeader toggle={() => this.toggleNominate("close", "close")}>Nominate Beneficiary</ModalHeader>
              <ModalBody>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>{this.state.patient_name} Nominate your preferred beneficiary 
                  </CardHeader>
                  <CardBody>
                    <Card style={{marginBottom: "25px"}}>
                      <CardBody>
                        <Row>
                          <Col xs="12" sm="12" style={{marginBottom: "25px"}}>
                            <h5>Would you like to Nominate a beneficiary for our health insurance scheme</h5>
                          </Col>
                          <Col xs="12" sm="6">
                            <Button type="submit" color="primary" onClick={() => this.yesNomination()} style={{width: "100%"}}>Yes</Button>
                          </Col>
                          <Col xs="12" sm="6">
                            <Button type="submit" onClick={() => this.noNomination()} style={{width: "100%", backgroundColor: "#ca333a", color: "#ffffff"}}>No</Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    
                    <Card style={{display: this.state.showNomination, marginBottom: "25px"}}>
                      <CardBody>
                        <Row>
                          <Col xs="3" sm="1"></Col>
                          <Col xs="6" sm="10">
                          <Form onSubmit={this.onSubmitNominee}>
                            <Row>
                              <p>Do you have anyone you would love to nominate as beneficiary for our health insurance, kindly fill in their details below.</p>
                              <Col xs="12" sm="12">
                                {/* //// Name //////// */}
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>Name</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="nominee_name" onChange={this.onChangeNomineeName} />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup> 
                                {/* //// Address //////// */}
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>Email</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="nominee_email" onChange={this.onChangeNomineeEmail} />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup> 
                                {/* //// Address //////// */}
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>Telephone Number</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="nominee_telephone" onChange={this.onChangeNomineeTelephone} />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup> 
                                {/* /////// ADDRESS //////// */}
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>Address</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="textarea" id="nominee_address" rows="2" onChange={this.onChangeNomineeAddress} placeholder=" Address" />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>                    
                              </Col>
                            </Row>
                            <FormGroup className="form-actions">
                              <Button type="submit" size="sm" color="primary">Submit</Button>
                            </FormGroup>
                          </Form>
                            
                          </Col>
                          <Col xs="3" sm="1"></Col>
                        </Row>
                      </CardBody>
                    </Card>
                  
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.toggleNominate("close", "close")}>Cancel</Button>
              </ModalFooter>
            </Modal>
          {/* /////////////////////////// NOMINATE PREFERRED BENEFICIARY //////////////////////////////////// */}

          {/* /////////////////////////// JOIN CONCERT //////////////////////////////////// */}
          <Modal isOpen={this.state.primaryJoinConcert} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
              <ModalHeader toggle={() => this.toggleJoinConcert("close", "close")}>Join Concert</ModalHeader>
              <ModalBody>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>{this.state.patient_name} Join Concert 
                  </CardHeader>
                  <CardBody>
                    <p>Please paste your concert passcode here. Copy it from the email sent to you after payment</p>
                    <Row>
                      <Col xs="3" sm="2"></Col>
                      <Col xs="12" sm="8">
                        <Form onSubmit={this.onSubmitJoinConcert}>
                          <Row>
                            <Col xs="12" sm="12">
                              {/* //// passcode //////// */}
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><span className="asterisk">*</span>Passcode</InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" id="passcode" defaultValue={this.state.passcode} onChange={this.onChangePasscode} />
                                  <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                  </InputGroupAddon>
                                </InputGroup>
                              </FormGroup>                     
                            </Col>
                          </Row>
                          <FormGroup className="form-actions">
                            <Button type="submit" size="sm" color="primary">Join</Button>
                          </FormGroup>
                        </Form>
                        
                      </Col>
                      <Col xs="3" sm="2"></Col>
                    </Row>
                  
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.toggleJoinConcert("close", "close")}>Cancel</Button>
              </ModalFooter>
            </Modal>
          {/* /////////////////////////// JOIN CONCERT //////////////////////////////////// */}

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
          {/* ///////////////// Sweet Alerts //////////////////////////////////// */}
        
      </div>
    );
  }
}

export default SpreadLove;
