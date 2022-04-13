import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Badge, Alert } from 'reactstrap';
// import {register} from './../../../functions/UserFunctions'
import SweetAlert from 'sweetalert2-react';
import { AesEncrypt, AesDecrypt } from 'aes';
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

class RegisterDoc extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      associate_username: '',
      errorMsg: '',
      errors: {
        email: '',
        password: '',
        confirmPassword: '',
        associate_username: '',
      },
      alert_message:'',
      successMessage: "Successful",
      errorMessage: "Failed",
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////

      avatar: require("./../../../images/logo/cam-medics-logo.png"),
      Cam_Medics: 'Cam-Medics Logo'
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    this.onChangeState(e)
    // this.handleChange(e)
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

      case 'associate_username': 
          this.checkAssociateUsername(value);
        break;

      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
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

  // onchange for setting state
  onChangeState (e) {
    this.setState({ [e.target.name]: e.target.value });
    this.handleChange(e)
  }

  checkAssociateUsername(value){
    let errors = this.state.errors;
    const user_data ={
      username : value, 
    }
    axios.post('api/check/username', user_data)
    .then(response => {
      console.log(response)
      return response;
    })
    .then(json => {
      if (json.data.success) {
        errors.associate_username = ""
      }else{
        errors.associate_username = "The associate username does not exist"
        this.setState({alert_message:"error"});
        this.setState({errorMsg:"The associate username does not exist. Please make sure it is correct."});
      }
    })
    .catch(error => {
    });
  }

  onSubmit(e){
    e.preventDefault()
    // validate check if fields are empty
    if(this.state.username == "" || this.state.first_name == "" || this.state.last_name == "" || this.state.email == "" || this.state.password == "" || this.state.confirmPassword == ""){
      this.setState({alert_message:"error"});
      this.setState({errorMsg:"Please fill all required fields"});

    // validate check if theres no error in the form 
    }else if(validateForm(this.state.errors)) {
      // ////////////// LOADER ////////////
      this.setState({
        showDiv: "block",
        loading: true,
      });
      // ////////////////////////////////
      const newUser = {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        associate_username: this.state.associate_username
      }

      const encrypted_user_data = AesEncrypt(newUser, 'where do you go when you by yourself' );
      
      axios
        .post('api/doctor/register', { user: encrypted_user_data }, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          // ////////// LOADER //////////////
            this.setState({
              showDiv: "none",
              loading: false,
            });
          // ///////////////////////////////
          if(response.data.success){
            // console.log("The form is correct")
            this.setState({alert_message:"success"});
            // redirect after 3 secs
            const timer = setTimeout(() => {
              this.props.history.push('/login_doctor')
            }, 3000);
          }else{
            // console.log(response.data.data)
            const { username, first_name, last_name, email, password } = response.data.data;
            // if email error is returned, loop through it and display else display normal error
            if(email){
              email.map(emailErr=>{ 
                this.setState({alert_message:"error"});
                this.setState({errorMsg: emailErr});
              })
            }else if(username){
              username.map(usernameErr=>{ 
                this.setState({alert_message:"error"});
                this.setState({errorMsg: usernameErr});
              })
            }else{
              this.setState({alert_message:"error"});
              this.setState({errorMsg:"Please fill form correctly"});
            }
            
          } 
        })
        .catch(err => {
            // console.log(err)
            // this.setState({alert_message:"success"});
            this.setState({alert_message:"error"});
            this.setState({errorMsg:"Please fill form correctly"});
        });
    }else{
      console.error(this.state.errors.email,", ", this.state.errors.password)
      this.setState({alert_message:"error"});
      this.setState({errorMsg:"Please fill form correctly"});
    }
  }

  // this.setState({alert_message:"success"})
  //           }).catch(error=>{
  //               this.setState({alert_message:"error"});
  //           })

  render() {
    const {errors} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <div className="mb-3 mx-auto text-center"  style={{marginTop: "100px"}}>
                <a href="https://cammedics.com">
                  <img
                    className=""
                    src={this.state.avatar}
                    alt={this.state.Cam_Medics}
                    width="160"
                  />
                </a>
                <h5 className="text-center" style={{marginTop: "15px"}}>Doctor</h5>
              </div>
              <Card className="mx-4">
                <CardBody className="p-4">
                  
                  <Form noValidate onSubmit={this.onSubmit}>
                    <h1>Create an Account</h1>
                    <p className="text-muted">Create your account and begin registration process</p>
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
                      placeholder="Enter Username"
                      value={this.state.username}
                      onChange={this.onChange}/>
                    </InputGroup>

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
                      placeholder="Enter First Name"
                      value={this.state.first_name}
                      onChange={this.onChange}/>
                    </InputGroup>

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
                    
                    {/* Associate */}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <input type="text"
                      className="form-control"
                      name="associate_username"
                      placeholder="Enter associate username (optional)"
                      value={this.state.associate_username}
                      onChange={this.onChange}/>
                    </InputGroup>

                    <InputGroup className="mb-4" style={{marginLeft: "25px"}}>
                      <Input className="form-check-input" type="checkbox" required />
                      <p>
                        I agree to CamMedics<a href="/#/terms_conditions" target="_blank" > Terms & Conditions</a>, <a href="/#/privacy_policy" target="_blank">Privacy Policy</a> and 
                        <br></br><a href="/#/providers_agreement" target="_blank">Providers' Agreement</a>
                      </p>
                    </InputGroup>
                    <button type="submit" className="btn btn-lg kiu-btn btn-block">Sign up</button>
                  </Form>
                  <br></br><p>Already have an account? <a href="/#/login_doctor">sign in</a></p>
                </CardBody>
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
        </Container>

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

export default RegisterDoc;
