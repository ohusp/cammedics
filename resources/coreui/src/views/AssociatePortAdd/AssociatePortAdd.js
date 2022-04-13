import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {createHashHistory} from 'history';
// import axios from 'axios';
import axios, { post } from 'axios';
import $ from "jquery";
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
  ListGroupItem,
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
} from 'reactstrap';

let hashHistory = createHashHistory()

class AssociatePortAdd extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeName         = this.onChangeName.bind(this);
    this.onChangeUsername     = this.onChangeUsername.bind(this);
    this.onChangeEmail        = this.onChangeEmail.bind(this);
    this.onChangeZipCode      = this.onChangeZipCode.bind(this);
    this.onChangeTelephone    = this.onChangeTelephone.bind(this);
    this.onChangePassword     = this.onChangePassword.bind(this);
    this.onChangePortCountry        = this.onChangePortCountry.bind(this);
    this.onChangeDistrictProvinceState  = this.onChangeDistrictProvinceState.bind(this);
    this.onChangePortAddress        = this.onChangePortAddress.bind(this);
    // ///////////////////////////////////////////////////////////////////////////////
    this.onSubmit                   = this.onSubmit.bind(this);
    

    this.state = {
      token: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.auth_token
        : "",
      id: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.id
        : "",
      name: "",
      username: "",
      email: "",
      zip_code: "",
      telephone: "",
      password: "",
      country: "",
      district_province_state: "",
      address: "",
      // ////////////////////////////////////////////////////

      successMessage: "Successful",
      errorMessage: "Failed",      
      
      logo: null,
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////

      status: "",
      created_at: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.created_at
        : "",
      user_type: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.user_type
        : "",

      fadeIn: true,
      timeout: 300,
      // //////////////////////////////////////////////////
      startDate: new Date(),
      // //////////////////modal
      primary: false,

      share_med_history: "",
      countries:[],
      login_as: "",
    };
  }

  componentDidMount()
  { 
    this.checkIfProfileCompleted();

    this.state.login_as   = localStorage.getItem("login_from");
    if( this.state.login_as != "associate"){
      hashHistory.push('/premontessori');
    }else{
      // ///////////////////// get countries /////////////////////////////////////
      axios.get(`/api/get/countries?token=${this.state.token}`)
      .then(response => {
        // console.log("COUNTRIES");
        // console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          // console.log("All Rise");
          this.setState({ 
            countries: json.data.data,
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
  }

  checkIfProfileCompleted()
  { 
    axios.get(`/api/associate/get/`+this.state.id+`?token=${this.state.token}`)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        // console.log(json.data.data)
        if(json.data.data.telephone == null || json.data.data.telephone == ""){
          this.setState({ 
            errorMessage: "Please go to profile page and complete your profile update",
            showError: true
          });
        }
      } else {
        
      }
    })
    .catch(error => {
    });
  }

  onChangeName(e)       { this.setState({ name:e.target.value }); }
  onChangeUsername(e)   { this.setState({ username:e.target.value  }); }
  onChangeEmail(e)      { this.setState({ email:e.target.value  }); }
  onChangeZipCode(e)    { this.setState({ zip_code:e.target.value  }); }
  onChangeTelephone(e)  { this.setState({ telephone:e.target.value  }); }
  onChangePassword(e)   { this.setState({ password:e.target.value  }); }
  onChangePortCountry(e)        { this.setState({ country:e.target.value  }); }
  onChangeDistrictProvinceState(e)  { this.setState({ district_province_state:e.target.value  }); }
  onChangePortAddress(e)        { this.setState({ address:e.target.value  }); }

  onSubmit(e)
  {
    e.preventDefault();
    if(
      this.state.name == "" || this.state.username == "" || this.state.email == "" ||  this.state.zip_code == "select" || this.state.telephone == "" || this.state.password == "" || this.state.country == "select" || this.state.district_province_state == "" || this.state.address == "" || 
      this.state.name == null || this.state.username == null || this.state.email == null || this.state.zip_code == null || this.state.telephone == null || this.state.password == null || this.state.country == null || this.state.district_province_state == null || this.state.address == null
    ){
      this.setState({
        errorMessage: "Please fill all required field",
        showError: true
      });
    }else{
      // ////////////// LOADER ////////////
      this.setState({
        showDiv: "block",
        loading: true,
      });
      // ////////////////////////////////
      const port_data ={
        name : this.state.name, 
        username : this.state.username, 
        email : this.state.email, 
        zip_code : this.state.zip_code, 
        telephone : this.state.telephone, 
        password : this.state.password,
        country : this.state.country, 
        district_province_state : this.state.district_province_state, 
        address : this.state.address, 
      }
      const port_data1 = AesEncrypt(port_data, 'where do you go when you by yourself' );
      axios.post(`/api/associate/port/add/`+this.state.id+`?token=${this.state.token}`, { user: port_data1 })
      .then(response => {
        // console.log("ROI Cartoon");
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
          this.setState({
            successMessage: "Port added successfully",
            showSuccess: true
          });
        } else {
          const { username, first_name, last_name, email, password } = json.data.data;
          
          if(email){
            email.map(emailErr=>{ 
              this.setState({ 
                errorMessage: emailErr,
                showError: true
              });
            })
          }else if(username){
            username.map(usernameErr=>{ 
              this.setState({ 
                errorMessage: usernameErr,
                showError: true
              });
            })
          }else if(password){
            password.map(passwordErr=>{ 
              this.setState({ 
                errorMessage: passwordErr,
                showError: true
              });
            })
          }else{
            this.setState({ 
              errorMessage: "Please fill form correctly",
              showError: true
            });
          }
        }
      })
      .catch(error => {
        // redirect user to previous page if user does not have autorization to the page
        hashHistory.push('/premontessori');
        console.error(`An Error Occuredd! ${error}`);
        
      });
    }
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  render() {

    return (
      <div className="animated fadeIn"> 
        
        <Row> 
          <Col xs="12" sm="3">
            <h3>Add Port</h3>    
          </Col>
        </Row><br></br> 
        
        <Row>
            <Col xs="12" sm="12">
              {/* ////////////////////// PERSONAL DATA ////////////////////////////////////// */}
              <Card>
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
                <CardHeader>
                  <i className="fa fa-align-justify"></i><strong>Port's Data</strong>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col xs="12" sm="12">
                        {/* //// NAME //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>Name</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="name" defaultValue={this.state.name} onChange={this.onChangeName} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* ////  USERNAME //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>Username</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="username" defaultValue={this.state.username} onChange={this.onChangeUsername} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* ////  EMAIL //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>Email</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="email" defaultValue={this.state.email} onChange={this.onChangeEmail} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-envelop"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// PHONE NUMBER //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>Phone Number</InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" id="zip_code" value={this.state.zip_code} onChange={this.onChangeZipCode}>
                              {this.state.countries.map(country => {
                                return (
                                  <option value={country.zip_code}> {country.code} ({country.zip_code}) </option>
                                )
                              })}
                            </Input>
                            <Input type="text" id="telephone" defaultValue={this.state.telephone} onChange={this.onChangeTelephone} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* ////  PASSWORD //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>Password</InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" id="password" placeholder="enter password, minimum of 8 characters" onChange={this.onChangePassword} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// COUNTRY OF RESIDENCE //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>Country</InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" id="country" value={this.state.country} onChange={this.onChangePortCountry}>
                              {this.state.countries.map(country => {
                                return (
                                  <option value={country.name}> {country.name} </option>
                                )
                              })}
                            </Input>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// DISTRICT/PROVINCE/STATE //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>District/Province/State</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="district_province_state" defaultValue={this.state.district_province_state} onChange={this.onChangeDistrictProvinceState}/>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// CONTACT ADDRESS //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>Address</InputGroupText>
                            </InputGroupAddon>
                            <Input type="textarea" id="address" rows="2" defaultValue={this.state.address} onChange={this.onChangePortAddress} placeholder=" Address" />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup> 
                      </Col>
                    </Row>
                    <hr></hr>
                    <FormGroup className="form-actions">
                      <Button type="submit" size="sm" color="primary">Add Port</Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
        </Row>
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

export default AssociatePortAdd;
