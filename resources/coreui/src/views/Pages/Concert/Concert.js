import React, { Component } from 'react';
import { 
  Button, 
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col, 
  Container, 
  Form, 
  FormGroup,
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Row, 
  Badge, 
  Alert,
  InputGroupButtonDropdown,
  Label,
  ListGroup, 
  ListGroupItem,
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
} from 'reactstrap';
// import {register} from './../../../functions/UserFunctions'
import { AesEncrypt, AesDecrypt } from 'aes';
import { PayPalButton } from "react-paypal-button-v2";
import SweetAlert from 'sweetalert2-react';
// ////////// LOADER /////////////////////////////////
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// ///////////////////////////////////////////////////

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};


class Concert extends Component {
  constructor(){
    super()

    this.toggleMakePayment        = this.toggleMakePayment.bind(this);
    this.onSubmitFlutterPay       = this.onSubmitFlutterPay.bind(this);
    this.onChangeNumberTicket     = this.onChangeNumberTicket.bind(this);
    this.onChangeTC               = this.onChangeTC.bind(this);
    this.onSubmitNominee          = this.onSubmitNominee.bind(this);
    this.toggleNominate           = this.toggleNominate.bind(this);
    this.onChangeNomineeName      = this.onChangeNomineeName.bind(this);
    this.onChangeNomineeEmail     = this.onChangeNomineeEmail.bind(this);
    this.onChangeNomineeTelephone = this.onChangeNomineeTelephone.bind(this);
    this.onChangeNomineeAddress   = this.onChangeNomineeAddress.bind(this);

    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      telephone: '00000000000',
      errorMsg: '',
      errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        t_c: '',
      },
      alert_message:'',
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////

      avatar: require("./../../../images/logo/cam-medics-logo.png"),
      Cam_Medics: 'CamMedics Logo',
      // ////////////////////////////////////////////////////////////////////////////
      concert_fee: 27.50,
      naira_concert_fee: 13200,
      concert_fee_display: 25,
      naira_concert_fee_display: 12000,
      handling_fee: 2.50,
      naira_handling_fee: 1200,
      number_ticket: "1",
      T_C: "",
      showNomination: "none",

      nominee_name: "",
      nominee_email: "",
      nominee_telephone: "",
      nominee_address: "",

    }

    this.onChange = this.onChange.bind(this)
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
      var email               = localStorage.getItem("email");
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
          email : email,
        }
        axios.post(`/flutterwave_quick_verify`, payment_data)
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
      
    }
  }

  onChange = e => {
    this.onChangeState(e)
    // this.handleChange(e)
  }

  // onchange for setting state
  onChangeState (e) {
    this.setState({ [e.target.name]: e.target.value });
    this.handleChange(e)
  }

  // for handling validation
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // called to empty thec alert on top of the form
    this.setState({alert_message:""})

    switch (name) {
      // case 'fullName': 
      //   errors.fullName = 
      //     value.length < 5
      //       ? 'Full Name must be at least 5 characters long!'
      //       : '';
      //   break;
      case 'username': 
          this.checkUsername(value);
        break;

      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
            this.checkEmail(value);
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';

        break;
      case 'confirmPassword': 
        if(this.state.password !== value){
          errors.confirmPassword = "Password and Confirm Password does not match.";
        }else{
          errors.confirmPassword = "";
        }
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  checkUsername(value){
    let errors = this.state.errors;
    const user_data ={
      username : value, 
    }
    axios.post('check/username', user_data)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        errors.username = "The username has already been taken"
        this.setState({alert_message:"error"});
        this.setState({errorMsg:"The username has already been taken. If you already registered or got a ticket, please login to your dashboard and click of the Spread the Love link on the side menu to get a ticket. Thank you."});
      }else{
        errors.username = ""
      }
    })
    .catch(error => {
    });
  }

  checkEmail(value){
    let errors = this.state.errors;
    const user_data ={
      email : value, 
    }
    axios.post('check/email', user_data)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        errors.email = "The email has already been taken"
        this.setState({alert_message:"error"});
        this.setState({errorMsg:"The email has already been taken. If you already registered or got a ticket, please login to your dashboard and click of the Spread the Love link on the side menu to get a ticket. Thank you."});
      }else{
        errors.email = ""
      }
    })
    .catch(error => {
    });
  }

  onChangeNumberTicket(e)   { 
    this.setState({ 
      number_ticket:e.target.value,
    }, this.onChangeFee); 
  }

  onChangeFee(e)   { 
    this.setState({ 
      handling_fee: this.state.number_ticket * 2.50,
      naira_handling_fee: this.state.number_ticket * 1200,
      concert_fee_display: this.state.number_ticket * 25, 
      naira_concert_fee_display: this.state.number_ticket * 12000, 
      concert_fee: this.state.number_ticket * 27.50, 
      naira_concert_fee: this.state.number_ticket * 13200,
    }); 
  }

  onChangeTC(e){
    let errors = this.state.errors;
    this.setState({ 
      T_C:e.target.checked,
    }); 
    if(e.target.checked){
      errors.t_c = "",
      this.setState({alert_message:""});
      this.setState({errorMsg:""});
    }
  }

  // /////////////// Make payment
  toggleMakePayment(data1, data2) {
    // console.log(id);
    if(data1 == "close"){
      this.setState({
        primaryMakePayment: false,
      });
    }else{
      if(validateForm(this.state.errors)) {
        if(this.state.username == "" || this.state.first_name == "" || this.state.last_name == "" || this.state.email == "" || this.state.password == "" || this.state.confirmPassword == "" || this.state.number_ticket == "" || this.state.number_ticket == "0" || this.state.T_C == "" || this.state.T_C == false){
          this.setState({alert_message:"error"});
          this.setState({errorMsg:"Please fill all required fields"});
        }else{
          this.setState({
            primaryMakePayment: !this.state.primaryMakePayment,
          });
        }
      }else{
        this.setState({alert_message:"error"});
        this.setState({errorMsg:"Please fill form correctly"});
      }
    }
  }

  onSubmitFlutterPay(e)
  {
    e.preventDefault();
    localStorage["email"] = this.state.email;

    const payment_data ={
      // amount : this.state.amount, 
      username : this.state.username,
      number_ticket : this.state.number_ticket,
      amount : this.state.concert_fee,
      email : this.state.email, 
      name : this.state.first_name +" "+this.state.last_name,  
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password
    }
    axios.post(`/flutterwave_quick_pay`, payment_data)
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
        var win = window.open(json.data.data, '_self');
        // var win = window.open(json.data.data);
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
    // e.preventDefault();
    // ////////////// LOADER ////////////
    this.setState({
      showDiv: "block",
      loading: true,
    });
    // ////////////////////////////////

    localStorage["email"] = this.state.email;
    const payment_data ={
      username : this.state.username,
      email : this.state.email, 
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      number_ticket : this.state.number_ticket, 
      billing_email_address : this.state.billing_email_address, 
      billing_name : this.state.billing_name, 
      billing_amount_currency : this.state.billing_amount_currency,
      billing_amount_value : this.state.billing_amount_value, 
      billing_orderID : this.state.billing_orderID, 
      billing_payerID : this.state.billing_payerID, 
    }
    
    axios.post(`/paypal_quick_pay`, payment_data)
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

  // /////////////// Nominate beneficiary
  toggleNominate(data1, data2) {
    // console.log(id);
    this.toggleMakePayment("close", "close");
    if(data1 == "close"){
      this.setState({
        primaryNominate: false,
      });
    }else{
      this.setState({
        primaryNominate: !this.state.primaryNominate,
      });
    }
    this.props.history.push(`/concert`)
  }

  noNomination(){
    this.toggleNominate("close", "close")
  }

  yesNomination(){
    this.setState({
      showNomination: "block",
    });
  }

  onChangeNomineeName(e)      { this.setState({ nominee_name:e.target.value }); }
  onChangeNomineeEmail(e)     { this.setState({ nominee_email:e.target.value }); }
  onChangeNomineeTelephone(e) { this.setState({ nominee_telephone:e.target.value }); }
  onChangeNomineeAddress(e)   { this.setState({ nominee_address:e.target.value }); }

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
      var email               = localStorage.getItem("email");
      const nominee_data ={
        username : email,
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
          // if successful display successful message, hide login div, call passPatientDataToIframe and pass details
          this.setState({ 
            successMessage: "Beneficiary nominated",
            showSuccess: true,
            showDiv: "none"
          }, this.props.history.push(`/concert`));
          this.toggleNominate("close", "close")
        } else {
          this.setState({ 
            errorMessage: json.data.data,
            showError: true
          }, this.props.history.push(`/concert`));
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
    const {errors} = this.state;
    return (
      
      <div className="app align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="12" lg="12" xl="12">
              <div className="mb-3 mx-auto text-center" style={{marginTop: "100px"}}>
                <a href="https://cammedics.com">
                  <img
                    className=""
                    src={this.state.avatar}
                    alt={this.state.Cam_Medics}
                    width="160"
                  />
                </a>
              </div>
              <Card className="mx-4">
                <CardBody className="p-4">
                  
                  {/* <Form noValidate onSubmit={this.toggleMakePayment}> */}
                    <h1>Spread the Love Concert</h1>
                    <p className="text-muted">Kindly fill in the following information to enable you join the concert</p>
                    {this.state.alert_message=="success"?
                      <Alert color="success">
                      Registration Successful
                      </Alert>
                    :null}
                    {this.state.alert_message=="error"?
                      <Alert color="danger">
                        {/* {this.state.errors.email,", ", this.state.errors.password} */}
                        {this.state.errorMsg}
                      </Alert>
                    :null}
                    <Row>
                      <Col xs="12" sm="8">
                        <Card>
                          <CardBody>
                            <Row>
                              <Col xs="12" sm="6">
                                {/* Username */}
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="icon-user"></i>
                                      <span className="asterisk">*</span>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <input type="text"
                                  className="form-control"
                                  name="username"
                                  placeholder="enter username"
                                  value={this.state.username}
                                  onChange={this.onChange}/>
                                </InputGroup>
                              </Col>
                              <Col xs="12" sm="6">
                                {/* Email */}
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    @
                                    <span className="asterisk">*</span>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <input type="email"
                                  className="form-control"
                                  name="email"
                                  placeholder="enter email"
                                  value={this.state.email}
                                  onChange={this.onChange}
                                  // onBlur={this.onChange}
                                  noValidate/>
                                </InputGroup>
                                {errors.email.length > 0 && <Badge style={{marginBottom: 25}} className="mr-1" color="danger">{errors.email}</Badge>}
                              </Col>
                              <Col xs="12" sm="6">
                                {/* First Name */}
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="icon-user"></i>
                                      <span className="asterisk">*</span>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <input type="text"
                                  className="form-control"
                                  name="first_name"
                                  placeholder="enter first name"
                                  value={this.state.first_name}
                                  onChange={this.onChange}/>
                                </InputGroup>
                              </Col>
                              <Col xs="12" sm="6">
                                {/* Last Name */}
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="icon-user"></i>
                                      <span className="asterisk">*</span>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <input type="text"
                                  className="form-control"
                                  name="last_name"
                                  placeholder="enter last name"
                                  value={this.state.last_name}
                                  onChange={this.onChange}/>
                                </InputGroup>
                              </Col>
                              <Col xs="12" sm="6">
                                {/* Password */}
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="icon-lock"></i>
                                      <span className="asterisk">*</span>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <input type="password"
                                  className="form-control"
                                  name="password"
                                  placeholder="enter password"
                                  onChange={this.onChange}
                                  // onBlur={this.onChange}
                                  noValidate/>
                                </InputGroup>
                                {errors.password.length > 0 && <Badge style={{marginBottom: 25}} className="mr-1" color="danger">{errors.password}</Badge>}
                              </Col>
                              <Col xs="12" sm="6">
                                {/* Confirm Password */}
                                <InputGroup className="mb-4">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="icon-lock"></i>
                                      <span className="asterisk">*</span>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input 
                                    type="password" 
                                    placeholder="Confirm password" 
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.onChange}
                                    // onBlur={this.onChange}
                                    noValidate/>
                                </InputGroup>
                                {errors.confirmPassword.length > 0 && <Badge style={{marginBottom: 25}} className="mr-1" color="danger">{errors.confirmPassword}</Badge>}
                              </Col>
                              <Col xs="12" sm="12">
                                {/* Confirm Password */}
                                <InputGroup className="mb-4">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="icon-lock"></i>
                                      <span className="asterisk">*</span>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input 
                                    type="number" 
                                    placeholder="Enter number of ticket you want to buy" 
                                    name="number_ticket"
                                    value={this.state.number_ticket}
                                    onChange={this.onChangeNumberTicket}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xs="12" sm="4">
                        <Card>
                          <CardBody style={{marginBottom: "30px"}}>
                            <Row>
                              <Col xs="12" sm="12">
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
                                </ListGroup>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <InputGroup className="mb-4" style={{marginLeft: "25px"}}>
                      <Input className="form-check-input" type="checkbox" onChange={this.onChangeTC} required />
                      <p>
                        I agree to CamMedics<a href="/#/terms_conditions" target="_blank" > Terms & Conditions</a> and <a href="/#/privacy_policy" target="_blank">Privacy Policy</a> 
                      </p>
                    </InputGroup>

                    <button type="submit" className="btn btn-lg kiu-btn btn-block" onClick={() => this.toggleMakePayment()}>Buy a Ticket</button>
                  {/* </Form> */}
                  {/* <br></br><p>Already have an account? <a href="/#/login">sign in</a></p> */}
                </CardBody>
                <p style={{marginLeft: "30px", fontSize: "12px", color: "#ca333a"}}>For quick assitance or question, please contact +234 816 525 3939 / +186 9765 1697 / +234 806 894 8689 (WhatsApp)</p>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
            {/* // ////////// LOADER ////////////// */}
            <div className="sweet-loading" style={{position: "fixed", height:"100%", width:"100%", display: this.state.showDiv}}>
                <div style={{position: "absolute", top:"50%", left:"50%",backgroundColor: "#ffffffcf",width:"100px",padding:"15px",borderRadius:"20px" }}>
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
                    <Card style={{ marginBottom: "25px" }}>
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
                                      clientId: 
                                      "AVx-UESGmRd47pO8XzTG7_vMWsTHaAybTQIhdOHz2vxId7vHZxtzQL07KKs0JN7Z2pECJw4Jk-0KGszf",
                                      // "AQ40k3d3ewjABnwQAzBPYcnR-IyQSCKtTR2RpfYmJUZctaSWtaJMiUYZGxzSEPSkoGHWWHDCtHfuUgZx",
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

        </Container>
      </div>
    );
  }
}

export default Concert;
