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

class TestPage extends Component {
  constructor(props) {
    super(props);

    this.toggleMakePayment  = this.toggleMakePayment.bind(this);
    this.onSubmitFlutterPay = this.onSubmitFlutterPay.bind(this);
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
      primaryJoinConcert: false,
      concert_fee: 25,

      getDetails: "",
      firstname: "",
      lastname: "",
      name: "",
      email: "",
      telephone: "",
      // ////////////////////////
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////

      successMessage: "Successful",
      errorMessage: "Failed",      
      // /////////////////////////////////////////////////////////////
      reg_join_concert: "",
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
        const payment_data ={
          transaction_id : transaction_ref, 
          email : this.state.email,
        }
        axios.post(`/flutterwave_verify`, payment_data)
        .then(response => {
          console.log(response);
          return response;
        })
        .then(json => {
          if (json.data.success) {
            // console.log(json.data.data)
            this.setState({ 
              successMessage: "Payment successful",
              showSuccess: true
            });
          } else{
            this.setState({ 
              errorMessage: json.data.data,
              showError: true
            });
          }
        })
        .catch(error => {
          // console.error(`An Error Occuredd! ${error}`);
        });
      }else{
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
        console.log(json.data.data)
        var login_from  = localStorage.getItem("login_from");
        if(login_from == "patient"){
          this.setState({ 
            email: json.data.data.email,
            name: json.data.data.first_name +" "+json.data.data.last_name,
            username: json.data.data.username,
            telephone: json.data.data.zip_code+json.data.data.telephone,
          }, this.checkConcertBookings);
        }
        if(login_from == "doctor"){
          this.setState({ 
            email: json.data.data.email,
            name: json.data.data.first_name +" "+json.data.data.last_name,
            username: json.data.data.username,
            telephone: json.data.data.zip_code+json.data.data.telephone,
          }, this.checkConcertBookings);
        }
        if(login_from == "pharm" || "hospital" || "port" || "laboratory"){
          this.setState({ 
            email: json.data.data.email,
            name: json.data.data.name,
            username: json.data.data.username,
            telephone: json.data.data.zip_code+json.data.data.telephone,
          }, this.checkConcertBookings);
        }
      } else {
        
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  checkConcertBookings(){
    // alert(this.state.username)
    const concert_data ={
      username : this.state.username,  
    }
    axios.post(`/check/concert/`+this.state.id+`?token=${this.state.token}`, concert_data)
    .then(response => {
      return response;
    })
    .then(json => {
      console.log(json.data)
      if (json.data.success) {
        this.setState({ 
          reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleJoinConcert()} style={{float: "right", marginRight: "10px"}}>Join Concert Now</Button>,
          // reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Register Now</Button>,
        })
      } else {
        this.setState({ 
          reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Register Now</Button>,
        })
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

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

  onSubmitFlutterPay(e)
  {
    e.preventDefault();
    const payment_data ={
      // amount : this.state.amount, 
      username : this.state.username,
      email : this.state.email, 
      name : this.state.name,  
      phone_number : this.state.telephone, 
    }
    axios.post(`/flutterwave_pay`, payment_data)
    .then(response => {
      console.log(response);
      return response;
    })
    .then(json => {
      if (json.data.success) {
        console.log(json.data.data)
        // this.setState({
        //   showSuccess: true
        // });
        // var win = window.open(json.data.data, '_blank');
        var win = window.open(json.data.data);
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
      console.error(`An Error Occuredd! ${error}`);
      
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
      billing_email_address : this.state.billing_email_address, 
      billing_name : this.state.billing_name, 
      billing_amount_currency : this.state.billing_amount_currency,
      billing_amount_value : this.state.billing_amount_value, 
      billing_orderID : this.state.billing_orderID, 
      billing_payerID : this.state.billing_payerID, 
    }
    axios.post(`/paypal_pay`, payment_data)
    .then(response => {
      console.log(response);
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
        console.log(json.data.data)
        this.setState({ 
          successMessage: "Payment successful",
          showSuccess: true
        });
      } else{
        this.setState({
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

  onChangePasscode(e)  { this.setState({ passcode:e.target.value }); }

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
          // if successful display successful message, hide login div, call passPatientDataToIframe and pass details
          this.setState({ 
            successMessage: "Correct",
            showSuccess: true,
            showDiv: "none"
          }, this.passPatientDataToIframe);
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

  render() {

    return (
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="12">
            <h3>Spread the Love Concert</h3>  
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
                <strong>THIS YEAR, THERE WILL BE NO CHRISTMAS FOR 58,000 POOR NIGERIAN WOMEN</strong>
                {/* <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Register Now</Button> */}
                {/* <Button type="submit" size="sm" color="primary" onClick={() => this.toggleJoinConcert()} style={{float: "right", marginRight: "10px"}}>Join Concert Now</Button> */}
                {this.state.reg_join_concert}
                <br></br><br></br>
                It is indeed a season to be jolly, but for thousands of families in Nigeria, there will be an empty seat at the Christmas dinner table because according to verified records and confirmed by a study carried out by Health Watch, a health advocacy publication headed by Dr Ifeanyi Nsofor affirms that in our country, 58,000 women die every year due to pregnancy and child-birth related complications. Most of these women die simply because they are too poor to afford basic antenatal, birth and post-natal care.<br></br><br></br>

                All around us, as we celebrate, there are vulnerable Nigerians who are very sick, but will stay at home to face certain death because no hospital will treat them without payment. Some cannot even afford to pay 500 Naira to open a hospital card. Others have been given the estimated medical bill for surgery, dialysis, transplants and other life-saving medical procedures. They have sold all they have and still they will be unable to pay. They can only resort to begging for contributions from public spirited individuals but unfortunately in most cases,  such donations will be too little, too late.<br></br><br></br>

                In a country with over 80 million of her citizens living below the poverty line, even feeding is a problem and so the most basic medical care has become a luxury most cannot afford.<br></br><br></br>

                We can continue to pass the bulk on who is to blame. But the truth is that our brilliant intellectual debates will be more useful to the vulnerable, if we tailor it to ask the question; What can be done?<br></br><br></br>

                That is why at the International Medical Law Centre, St. Kitts, W.I., we are happy to announce today, the signing of the MOU with FCT HEALTH INSURANCE SCHEME to organize the first ever; SPREAD THE LOVE , TO SAVE A LIFE CONCERT. This initiative is programmed to feature a virtual concert with performances from the best Nigerian musicians, comedians, artistes, poets, Nollywood actors and actresses, including special appearances by a galaxy of both Nigerian and International stars.  This 12-hour rivetingly,  captivating event will be streamed live on cammedics.com, on the 14th of February 2021. We have reached out to the most entertaining artistes in the industry to package a sensational show.  The goal is to have subscribers purchase a $25 USD ticket to enjoy the concert, and that will be used to provide the annual  medical insurance premium for vulnerable Nigerians. So for each ticket purchased, one Nigerian's medical bills will be fully paid for one year.<br></br><br></br>

                That is how we can reduce the number of empty chairs at the Christmas dinner table of Nigerian families next year.<br></br><br></br>

                That is how we can save lives.<br></br><br></br>

                Please support this initiative.<br></br><br></br>

                Get a ticket for the, SPREAD THE LOVE, TO SAVE A LOVE CONCERT.<br></br><br></br>

                <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{width: "100%"}}>Register Now</Button>


                <div id="live_chat_div"></div>
              </CardBody>
            </Card>
          </Col>
        </Row>

          {/* /////////////////////////// MAKE PAYMENT //////////////////////////////////// */}
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
                              Concert Fee: <strong style={{float: "right"}}>${this.state.concert_fee}</strong>
                            </ListGroupItem>
                          </ListGroup><br></br>
                          <p style={{marginBottom: "25px"}}>You can pay with your paypal account or with your debit or credit card.</p>

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

                            console.log(details);
                            console.log(data);
                            console.log(details.purchase_units[0].amount.currency_code)
                            console.log(details.purchase_units[0].amount.value)
                            alert(this.state.billing_name);
                            alert("Successful");
                            return this.onSubmitPayPal()
                          }}

                          onError={(err) => {
                            alert(err);
                            window.location.reload();
                          }}

                          options={{
                            clientId: "AQ40k3d3ewjABnwQAzBPYcnR-IyQSCKtTR2RpfYmJUZctaSWtaJMiUYZGxzSEPSkoGHWWHDCtHfuUgZx",
                            disableFunding: "card"
                          }}
                          
                        /><br></br>
                        <Button type="submit" className="btn-lg" color="primary" onClick={this.onSubmitFlutterPay} style={{width: "100%"}}>Debit or Credit Card</Button>
                        
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
          {/* /////////////////////////// MAKE PAYMENT //////////////////////////////////// */}



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
                      <Col xs="6" sm="8">
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

export default TestPage;
