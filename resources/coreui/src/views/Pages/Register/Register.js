import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Badge, Alert } from 'reactstrap';
// import {register} from './../../../functions/UserFunctions'
import { AesEncrypt, AesDecrypt } from 'aes';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class Register extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMsg: '',
      errors: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      alert_message:'',

      avatar: require("./../../../images/logo/cam-medics-logo.png"),
      Cam_Medics: 'CamMedics Logo'
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

  onSubmit(e){
    e.preventDefault()

    // validate check if fields are empty
    if(this.state.username == "" || this.state.first_name == "" || this.state.last_name == "" || this.state.email == "" || this.state.password == "" || this.state.confirmPassword == ""){
      this.setState({alert_message:"error"});
      this.setState({errorMsg:"Please fill all required fields"});

    // validate check if theres no error in the form 
    }else if(validateForm(this.state.errors)) {
      const newUser = {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      }

      const encrypted_user_data = AesEncrypt(newUser, 'where do you go when you by yourself' );
      
      axios
        .post('api/patient/register', { user: encrypted_user_data }, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          if(response.data.success){
            // console.log("The form is correct")
            this.setState({alert_message:"success"});
            // redirect after 3 secs
            const timer = setTimeout(() => {
              this.props.history.push('/login')
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
                      placeholder="enter username"
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
                      placeholder="enter first name"
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

                    <InputGroup className="mb-4" style={{marginLeft: "25px"}}>
                      <Input className="form-check-input" type="checkbox" required />
                      <p>
                        I agree to CamMedics<a href="/#/terms_conditions" target="_blank" > Terms & Conditions</a> and <a href="/#/privacy_policy" target="_blank">Privacy Policy</a> 
                      </p>
                    </InputGroup>

                    {errors.confirmPassword.length > 0 && <Badge style={{marginBottom: 25}} className="mr-1" color="danger">{errors.confirmPassword}</Badge>}

                    <button type="submit" className="btn btn-lg kiu-btn btn-block">Sign up</button>
                  </Form>
                  <br></br><p>Already have an account? <a href="/#/login">sign in</a></p>
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
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
