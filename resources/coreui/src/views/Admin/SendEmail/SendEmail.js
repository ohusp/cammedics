import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {createHashHistory} from 'history';
import axios, { post } from 'axios';
import $ from "jquery";
import Pagination from "react-js-pagination";
import { ExternalLink } from 'react-external-link';
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
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup, 
  ListGroupItem, 
  TabContent, 
  TabPane,
} from 'reactstrap';

let hashHistory = createHashHistory()

class SendEmail extends Component {
  constructor(props) {
    super(props);
    this.toggleView       = this.toggleView.bind(this);
    this.toggleSendEmail  = this.toggleSendEmail.bind(this);
    // /////////////////////////////////////////////////////////////////
    this.onChangeFrom    = this.onChangeFrom.bind(this);
    this.onChangeEmail   = this.onChangeEmail.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    // this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmit        = this.onSubmit.bind(this);

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
      created_at: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.created_at
        : "",
      user_type: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.user_type
        : "",

      // ////////////////////////////////////////////////////
      list:[],
      number: 1,
      activePage:1,
      itemsCountPerPage:1,
      totalItemsCount:1,
      pageRangeDisplayed:3,
      currentPage2:'',
      status: '1',
      // ///////////////////////////////////////////////////////
      showSuccess:  false,
      showError:    false,
      successMessage: "Successful",
      errorMessage: "Failed",
      // //////////////////////////////////
      view: false,
      send: false,

      from_email: "",
      send_email: "",
      send_subject: "",
      send_message: "",

      status: "",
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////
      editorState: EditorState.createEmpty(),
      // htmlText: "",
      // html1: "",
      login_as: "",
      
    };
    this.handlePageChange=this.handlePageChange.bind(this);

  }


  // fetch data from db
  componentDidMount()
  {
    this.state.login_as   = localStorage.getItem("login_from");
    if( this.state.login_as != "admin_user"){
      hashHistory.push('/premontessori');
    }else{
      axios.get(`/api/admin/list_emails?token=${this.state.token}`)
      .then(response => {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          console.log(typeof(json.data.data.data));
          console.log(json.data.data.data);
          this.setState({ 
            list: json.data.data.data,
            itemsCountPerPage: json.data.data.per_page,
            totalItemsCount: json.data.data.total,
            activePage: json.data.data.current_page
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

  // Pagination handler
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/admin/list_emails?token=${this.state.token}&page=`+pageNumber)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          list: json.data.data.data,
          itemsCountPerPage: json.data.data.per_page,
          totalItemsCount: json.data.data.total,
          activePage: json.data.data.current_page
        });
      } else {
        
      }
    })
  }

  onChangeFrom(e)     { this.setState({ from_email:e.target.value }); }
  onChangeEmail(e)    { this.setState({ send_email:e.target.value }); }
  onChangeSubject(e)  { this.setState({ send_subject:e.target.value }); }
  // onChangeMessage(e)  { this.setState({ send_message:e.target.value }); }

  toggleView = (name, email, subject, message) => {
    this.setState({
      view: !this.state.view,
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
  }

  toggleSendEmail = () => {
    this.setState({
      send: !this.state.send,
    });
  }

  onSubmit(e)
  {
    e.preventDefault();
    alert(this.state.send_message)
    if(
      this.state.from_email == "" || this.state.send_email == "" || this.state.send_subject == "" || this.state.send_message == "" || 
      this.state.from_email == null || this.state.send_email == null || this.state.send_subject == null  || this.state.send_message == null 
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
      const contact_data ={
        from_email : this.state.from_email,
        send_email : this.state.send_email, 
        send_subject : this.state.send_subject, 
        send_message : this.state.send_message, 
      }
      axios.post(`/api/admin/send/email/`+this.state.id+`?token=${this.state.token}`, contact_data)
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
            successMessage: "Email successfully sent",
            showSuccess: true
          });
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
  }

  changeStatus(id){
    axios.get(`/api/admin/contact_us/change_status/`+id+`?token=${this.state.token}`)
    .then(response => {
      console.log("ROI Cartoon");
      console.log(response);
      return response;
    })
    .then(json => {
      console.log(json.data)
      if (json.data.success) {
        this.setState({ 

        }, this.componentDidMount);
      } else {
        
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      // hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.state.send_message = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if(this.state.status == "0"){ this.state.status = "Not activated" }
    if(this.state.status == "1"){ this.state.status = "Activated" }
    // const { product_image} = this.state
    return (
      
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="3">
            <h3>Send email</h3>  
          </Col>
        </Row><br></br> 
        <Row>
            
            {/* ///////// Contact TABLE ///////////// */}
            <Col xs="12" lg="12">
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
                  <i className="fa fa-align-justify"></i> List of Messages 
                  <Button type="submit" style={{float :"right" }} size="sm" color="primary" onClick={() => this.toggleSendEmail()}>Send Email</Button>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th>EMAIL</th>
                        <th>SUBJECT</th>
                        <th>MESSAGE</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        // Calculation for the page S/N
                        this.state.currentPage = ((this.state.activePage * 10) - (10 - 1)),
                        // ////////////////////////////////////////////////////////////
                        this.state.list.map(contact=>{
                          if(contact.status == 1){
                            this.state.status = <Button size="sm" onClick={() => this.changeStatus(contact.id)} active color="danger" title="Make as read" aria-pressed="true"><i className="fa fa-close"></i></Button>;
                          }else{
                            this.state.status = <Button size="sm" onClick={() => this.changeStatus(contact.id)} active color="success" title="Make as unread" aria-pressed="true"><i className="fa fa-check"></i></Button>;
                          }
                          const contact_id  = contact.id;

                          return(
                            <tr key={contact.id}>
                              {/* <th scope="row">{this.state.pageNumber++}</th> */}
                              <th scope="row">{this.state.currentPage++}</th>
                              <td>{contact.send_email}</td>
                              <td>{contact.send_subject}</td>
                              <td>{contact.send_message}</td>
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
                </CardBody>
              </Card>
            </Col>
        </Row>

        {/* //////////// View Message  //////////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.view} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
          <ModalHeader toggle={() => this.toggleView("close", "close")}>View Message</ModalHeader>
          <ModalBody>
            
            {/* //////////////////////////////////// */}
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{this.state.patient_name} Contact Message
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" sm="12">
                    <Card>
                      <CardBody>
                        <Row>
                          <Col xs="12" lg="12">
                            <Table responsive striped>
                              <tbody>
                                <tr>
                                  <th>Name</th>
                                  <td>{this.state.name}</td>
                                </tr>
                                <tr>
                                  <th>Email</th>
                                  <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                  <th>Subject</th>
                                  <td>{this.state.subject}</td>
                                </tr>
                                <tr>
                                  <th>Message</th>
                                  <td>{this.state.message}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleView("close", "close")}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* //////////// Send Email  //////////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.send} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
          <ModalHeader toggle={() => this.toggleSendEmail("close", "close")}>Send Email</ModalHeader>
          <ModalBody>
            
            {/* //////////////////////////////////// */}
            <Card>
              <CardHeader>
                Send Email
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" sm="12">
                    <Card>
                      <CardBody>
                        <Row>
                          <Col xs="12" lg="12">
                          <Form onSubmit={this.onSubmit}>
                            <Row>
                              <Col xs="12" sm="12">
                                {/* //// FROM //////// */}
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>From</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" onChange={this.onChangeFrom} placeholder="info@cammedics.com"/>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                {/* //// EMAIL //////// */}
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>Email</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" onChange={this.onChangeEmail} placeholder="enter email"/>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                {/* //// SUBJECT //////// */}
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>Subject</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" onChange={this.onChangeSubject} placeholder="enter subject"/>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <InputGroup>
                                    <div style={{border:"1px solid #c8ced3", height: "190px", borderRadius: "2px"}}>
                                      <Editor 
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={this.onEditorStateChange}
                                      />
                                      {/* <textarea
                                        disabled
                                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                      ></textarea> */}
                                    </div>
                                  </InputGroup>
                                </FormGroup>                       
                              </Col>
                            </Row>
                            <FormGroup className="form-actions">
                              <Button type="submit" size="sm" color="primary">Reply</Button>
                            </FormGroup>
                          </Form>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleSendEmail("close", "close")}>Cancel</Button>
          </ModalFooter>
        </Modal>

        
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

export default SendEmail;
