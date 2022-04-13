import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {createHashHistory} from 'history';
// import axios from 'axios';
import axios, { post } from 'axios';
import $ from "jquery";
import SweetAlert from 'sweetalert2-react';

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
  ListGroupItem,
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
} from 'reactstrap';

let hashHistory = createHashHistory()

class LiveChat extends Component {
  constructor(props) {
    super(props);

    // bind input values on change
    this.onChangeRoomLink   = this.onChangeRoomLink.bind(this);
    this.onChangePasscode   = this.onChangePasscode.bind(this);

    // /////////////////////////////////////////////////////////////////
    this.onSubmit = this.onSubmit.bind(this);

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

      login_as: "",
      name: "",
      roomLink: "",
      passcode: "",

      showChatDiv: "none",
      showDiv: "none",

      successMessage: "Successful",
      errorMessage: "Failed",      
      // ////////////////////// SEARCH FOR THIS ///////////////////////////////////////
      // path_link: "http://localhost:3000",
      path_link: "https://live.cammedics.com",
    };
  }

  componentDidMount()
  {
    this.state.login_as   = localStorage.getItem("login_from");
    var login_as    = this.state.login_as;
    var username    = this.state.username;
    var first_name  = this.state.first_name;
    var last_name   = this.state.last_name;
    // click to toggle n expand div
    document.getElementById("navigationToggler").click();
    // hide header
    document.getElementById("navigationPanel").style.display = "none";

    if(this.state.login_as == ""){
      // if it is patient display login form
      this.setState({
        showDiv: "block",
        showChatDiv: "none",
      });
    }

    else if(this.state.login_as == "patient"){
      // if it is patient display login form
      const already_in_a_chat = sessionStorage.getItem( 'already_in_a_chat' );
      if(already_in_a_chat == "" || already_in_a_chat == null){
        this.setState({
          showDiv: "block",
          showChatDiv: "block"
        });
      }else{
        this.passPatientDataToIframe2()
      }

      // call reactjs function
      var _ = this;
      var path_link = this.state.path_link;
      // ////////////////////// GET PARAMETERS SENT TO DASHBOARD /////////////////////////////////////
      window.addEventListener('message', function (event) {
        if(event.origin !== path_link) return;
        var data      = event.data.split('|-|');
        var isLogout  = data[0];
        if(isLogout != "logout"){
          if(login_as == "patient"){
              var name     = data[2];
              // call reactjs function
              _.updateInDB(name)
          }
        }else{
          sessionStorage.setItem( 'already_in_a_chat', "" );
          sessionStorage.setItem( 'roomLink', "" );
          _.logout();
          location.reload();
        }
      }, false);
      // ////////////////////// GET PARAMETERS SENT TO DASHBOARD ////////////////////////////////////
      
    }

    // if doctor or port or the others open chat and pass the user data
    else if(this.state.login_as == "doctor" || "hospital" || "laboratory" || "pharm" || "port"){
        // show the chat div
        this.setState({
          showChatDiv: "block",
        });

        var path_link = this.state.path_link;
        // is user already logged in
        const already_in_a_chat = sessionStorage.getItem( 'already_in_a_chat' );
        if(already_in_a_chat == "" || already_in_a_chat == null){
          var screen_video = path_link;
        }else{
          var screen_video  = sessionStorage.getItem( 'roomLink' );
          var passcode      = sessionStorage.getItem( 'passcode' );
          // to display at the bottom after reload
          this.setState({
            roomLink: screen_video,
            passcode: passcode
          });
        }

        var iframe    = document.createElement("iframe");
        iframe.src    = screen_video;
        iframe.id     = "live_chat_frame";
        iframe.width  = "100%";
        iframe.height = "700px";
        iframe.allow  = "camera *;microphone *";

        // append the created iframe to the div
        document.getElementById("live_chat_div").appendChild(iframe);

        setTimeout(function(){ 
          var name  = first_name+" "+last_name;
          var messageSent = login_as+"|-|"+username+"|-|"+name;
          document.getElementById('live_chat_frame').contentWindow.postMessage(messageSent, path_link);
        }, 1000);

        var login_as  = this.state.login_as;
        var username  = this.state.username;
        // call reactjs function
        var _ = this;
        var path_link = this.state.path_link;
        // ////////////////////// GET PARAMETERS SENT TO DASHBOARD /////////////////////////////////////
        window.addEventListener('message', function (event) {
          if(event.origin !== path_link) return;
          var data      = event.data.split('|-|');
          var isLogout  = data[0];
          if(isLogout != "logout"){
            if(login_as == "doctor" || "hospital" || "laboratory" || "pharm" || "port"){
              var name     = data[2];
              var roomLink = data[3];
              var passcode = data[4];
              
              // call reactjs function
              _.saveToDB(name, roomLink, passcode)
            }
          }else{
            sessionStorage.setItem( 'already_in_a_chat', "" );
            sessionStorage.setItem( 'roomLink', "" );
            _.logout();
            location.reload();
          }
        }, false);
        // ////////////////////// GET PARAMETERS SENT TO DASHBOARD /////////////////////////////////////
    }

  }


  // ON Change of first name input
  onChangeRoomLink(e)  { this.setState({ roomLink:e.target.value }); }
  onChangePasscode(e)  { this.setState({ passcode:e.target.value }); }
  
  onSubmit(e)
  {
    e.preventDefault();
    if(
      this.state.roomLink == "" || this.state.passcode == "" || 
      this.state.roomLink == null || this.state.passcode == null
    ){
      this.setState({
        errorMessage: "Please fill all required field",
        showError: true
      });
    }else{
      const appointment_data ={
        roomLink : this.state.roomLink, passcode : this.state.passcode, 
      }
      axios.post(`/api/check/appointment_if_exist/`+this.state.id+`?token=${this.state.token}`, appointment_data)
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

  saveToDB(name, roomLink, passcode){
    this.state.name = name
    this.state.roomLink = roomLink
    this.state.passcode = passcode
    // ///////////////// SAVE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////
    if(
      this.state.login_as == "" ||  this.state.username == "" || this.state.name == "" || this.state.roomLink == "" || this.state.passcode == "" ||
      this.state.login_as == null || this.state.username == null || this.state.name == null || this.state.roomLink == null || this.state.passcode == null 
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
      const chat_details ={
        login_as : this.state.login_as, 
        username: this.state.username, 
        name : this.state.name, 
        roomLink : this.state.roomLink, 
        passcode : this.state.passcode, 
      }
      axios.post(`/api/save/chat_details/`+this.state.id+`?token=${this.state.token}`, chat_details)
      .then(response => {
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
          sessionStorage.setItem( 'already_in_a_chat', "already_in_a_chat" );
          var roomLink = this.state.roomLink;
          var passcode = this.state.passcode;
          sessionStorage.setItem( 'roomLink', roomLink );
          sessionStorage.setItem( 'passcode', passcode );
          this.setState({
            successMessage: "Successful! Please share link with patient.",
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
        // this.setState({
        //   showError: true
        // });       
      });
    }
    // ///////////////// SAVE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////
  }

  passPatientDataToIframe(){
    // pass the link the user pasted into the iframe
    var screen_video = this.state.roomLink;
    var iframe    = document.createElement("iframe");
    iframe.src    = screen_video;
    iframe.id     = "live_chat_frame";
    iframe.width  = "100%";
    iframe.height = "700px";
    iframe.allow  = "camera *;microphone *";

    document.getElementById("live_chat_div").innerHTML = "";
    document.getElementById("live_chat_div").appendChild(iframe);
    
    var login_as    = this.state.login_as;
    var username    = this.state.username;
    var first_name  = this.state.first_name;
    var last_name   = this.state.last_name;
    var path_link   = this.state.path_link;
    setTimeout(function(){ 
      var name  = first_name+" "+last_name;
      var messageSent = login_as+"|-|"+username+"|-|"+name;
      document.getElementById('live_chat_frame').contentWindow.postMessage(messageSent, path_link);
    }, 1000);
  }

  // if already in and reloading page
  passPatientDataToIframe2(){
    // pass the link the user pasted into the iframe
    var screen_video  = sessionStorage.getItem( 'roomLink' );
    var passcode      = sessionStorage.getItem( 'passcode' );
    // to display at the bottom after reload
    this.setState({
      roomLink: screen_video,
      passcode: passcode
    });
    
    var iframe    = document.createElement("iframe");
    iframe.src    = screen_video;
    iframe.id     = "live_chat_frame";
    iframe.width  = "100%";
    iframe.height = "700px";
    iframe.allow  = "camera *;microphone *";

    document.getElementById("live_chat_div").innerHTML = "";
    document.getElementById("live_chat_div").appendChild(iframe);
    
    this.setState({
      showChatDiv: "block"
    });
  }

  updateInDB(name){
    // this.state.name = name
    var name  = this.state.first_name+" "+this.state.last_name;
    // ///////////////// UPDATE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////
    if(
      this.state.login_as == "" ||  this.state.username == "" || name == "" || this.state.roomLink == "" || this.state.passcode == "" ||
      this.state.login_as == null || this.state.username == null || name == null || this.state.roomLink == null || this.state.passcode == null 
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
      const chat_details ={
        login_as : this.state.login_as, 
        username: this.state.username, 
        name : name, 
        roomLink : this.state.roomLink, 
        passcode : this.state.passcode, 
      }
      axios.post(`/api/update/chat_details/`+this.state.id+`?token=${this.state.token}`, chat_details)
      .then(response => {
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
          sessionStorage.setItem( 'already_in_a_chat', "already_in_a_chat" );
          var roomLink = this.state.roomLink;
          var passcode = this.state.passcode;
          sessionStorage.setItem( 'roomLink', roomLink );
          sessionStorage.setItem( 'passcode', passcode );
          // this.setState({
          //   successMessage: "Successful! Please share link with patient.",
          //   showSuccess: true
          // });
        } else{
          // this.setState({
          //   successMessage: json.data.data,
          //   showError: true
          // });
        }
      })
      .catch(error => {
        // this.setState({
        //   showError: true
        // });       
      });
    }
    // ///////////////// UPDATE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////
  }

  logout(){
    // ///////////////// UPDATE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////
      // ////////////// LOADER ////////////
      this.setState({
        showDiv: "block",
        loading: true,
      });
      // ////////////////////////////////
      const chat_details ={
        roomLink : this.state.roomLink, 
        passcode : this.state.passcode, 
      }
      axios.post(`/api/update/logout/`+this.state.id+`?token=${this.state.token}`, chat_details)
      .then(response => {
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
            successMessage: "You are logged out",
            showSuccess: true
          });
        } else{
          // this.setState({
          //   successMessage: json.data.data,
          //   showError: true
          // });
        }
      })
      .catch(error => {
        // this.setState({
        //   showError: true
        // });       
      });
    // ///////////////// UPDATE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////
  }
  // ///////////////////////////////////////////////////////////

  render() {

    return (
      <div className="animated fadeIn"> 
        <span style={{display: this.state.showChatDiv}}>
          <div id="live_chat_div"></div>
          <Row>  
            <Col xs="12" sm="1"></Col>
            <Col xs="12" sm="7">
              <p>Chat link: <span style={{color: "#2167ac"}}>{this.state.roomLink}</span></p>
            </Col>
            <Col xs="12" sm="4">
              <p >Passcode: <span style={{color: "#2167ac"}}>{this.state.passcode}</span></p>
            </Col>
          </Row>
        </span>
        <span style={{display: this.state.showDiv, marginTop: "200px"}}>
          <Row>  
            <Col xs="12" sm="3"></Col>
            <Col xs="12" sm="6">
              {/* ////////////////////// ENTER APPOINTMENT ////////////////////////////////////// */}
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i><strong>Login</strong>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col xs="12" sm="12">
                        {/* //// roomLink //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><span className="asterisk">*</span>Link</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="roomLink" defaultValue={this.state.roomLink} onChange={this.onChangeRoomLink} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup> 
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
                      <Button type="submit" size="sm" color="primary">Login</Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="3"></Col>
          </Row>
        </span>
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

export default LiveChat;
