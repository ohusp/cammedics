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

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.toggleView   = this.toggleView.bind(this);
    this.toggleReply  = this.toggleReply.bind(this);
    // /////////////////////////////////////////////////////////////////
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
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
      reply: false,
      sender_name: "",
      sender_email: "",
      sender_subject: "",
      sender_message: "",

      reply_subject: "",
      reply_message: "",

      status: "",
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////
      
    };
    this.handlePageChange=this.handlePageChange.bind(this);

  }


  // fetch data from db
  componentDidMount()
  {
    axios.get(`/api/admin/list_contacts?token=${this.state.token}`)
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

  // Pagination handler
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/admin/list_contacts?token=${this.state.token}&page=`+pageNumber)
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

  onChangeSubject(e)  { this.setState({ reply_subject:e.target.value }); }
  onChangeMessage(e)  { this.setState({ reply_message:e.target.value }); }

  toggleView = (name, email, subject, message) => {
    this.setState({
      view: !this.state.view,
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
  }

  toggleReply = (id, name, email, subject, message) => {
    this.setState({
      reply: !this.state.reply,
      sender_id: id,
      sender_name: name,
      sender_email: email,
      sender_subject: subject,
      sender_message: message,
    });
  }

  onSubmit(e)
  {
    e.preventDefault();
    if(
      this.state.reply_subject == ""    || this.state.reply_message == "" || 
      this.state.reply_subject == null  || this.state.reply_message == null 
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
        reply_subject : this.state.reply_subject, 
        reply_message : this.state.reply_message, 
        sender_id : this.state.sender_id, 
        sender_email : this.state.sender_email, 
      }
      axios.post(`/api/admin/reply/contact_message/`+this.state.id+`?token=${this.state.token}`, contact_data)
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
            successMessage: "Reply successfully sent",
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

  render() {
    
    if(this.state.status == "0"){ this.state.status = "Not activated" }
    if(this.state.status == "1"){ this.state.status = "Activated" }
    // const { product_image} = this.state
    return (
      
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="3">
            <h3>Contact us messages</h3>  
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
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>SUBJECT</th>
                        <th>MESSAGE</th>
                        <th>VIEW</th>
                        <th>REPLY</th>
                        <th>STATUS</th>
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
                              <td>{contact.name}</td>
                              <td>{contact.email}</td>
                              <td>{contact.subject}</td>
                              <td>{contact.message}</td>
                              {/* <td>{this.state.status}</td> */}
                              <td>
                                <Button size="sm" onClick={() => this.toggleView(contact.name, contact.email, contact.subject, contact.message)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View contact"><i className="fa fa-eye"></i></Button>
                              </td>
                              <td>
                                <Button size="sm" onClick={() => this.toggleReply(contact.id, contact.name, contact.email, contact.subject, contact.message)} className="btn-facebook btn-brand icon mr-1 mb-1" title="Reply contact message"><i className="fa fa-reply"></i></Button>
                              </td>
                              <td>{this.state.status}</td>
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

        {/* //////////// Reply Message  //////////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.reply} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
          <ModalHeader toggle={() => this.toggleReply("close", "close")}>Reply Message</ModalHeader>
          <ModalBody>
            
            {/* //////////////////////////////////// */}
            <Card>
              <CardHeader>
                Reply Contact Us Message
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
                                  <th>Subject</th>
                                  <td>{this.state.sender_subject}</td>
                                </tr>
                                <tr>
                                  <th>Message</th>
                                  <td>{this.state.sender_message}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                          
                    <Card>
                      <CardBody>
                        <Row>
                          <Col xs="12" lg="12">
                          <Form onSubmit={this.onSubmit}>
                            <Row>
                              <Col xs="12" sm="12">
                                {/* //// NAME //////// */}
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>Subject</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" onChange={this.onChangeSubject} />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText><span className="asterisk">*</span>Message</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="textarea" rows="4" onChange={this.onChangeMessage} placeholder=" Reply message" />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                                    </InputGroupAddon>
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
            <Button color="secondary" onClick={() => this.toggleReply("close", "close")}>Cancel</Button>
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

export default ContactUs;
