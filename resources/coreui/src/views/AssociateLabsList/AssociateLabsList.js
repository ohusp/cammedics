import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {createHashHistory} from 'history';
// import axios from 'axios';
import axios, { post } from 'axios';
import $ from "jquery";
import Pagination from "react-js-pagination";
import { ExternalLink } from 'react-external-link';
import SweetAlert from 'sweetalert2-react';

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

class AssociateLabsList extends Component {
  constructor(props) {
    super(props);
    // ////////////////MODAL    
    this.toggleLaboratoryView = this.toggleLaboratoryView.bind(this);
    this.toggleViewLabPatient = this.toggleViewLabPatient.bind(this);

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
      labs_list:[],
      number_labs: 1,
      activePage_labs:1,
      itemsCountPerPage_labs:1,
      totalItemsCount_labs:1,
      pageRangeDisplayed_labs:3,
      currentPage2_labs:'',
      status_labs: '1',
      // ////////////////////////////////////////////////////
      applications_list:[],
      number: 1,
      activePage:1,
      itemsCountPerPage:1,
      totalItemsCount:1,
      pageRangeDisplayed:3,
      currentPage2:'',
      status: '1',
      // //////////////////////////////////////////////////
      

      currentTime : new Date().toLocaleString(),

      // //////////////////////////////////////////////////
      // patient clicks for message
      patient_id: "",
      patient_name: "",
      lab_id: "",
      // /////////////////////////////////////////////////
      startDate: new Date(),
      // //////////////////modal
      primary: false,
      primaryLabPatient: false,
      labView: false,
      // ///////////////////////////////////////////////////////
      showSuccess:  false,
      showError:    false,
      successMessage: "Successful",
      errorMessage: "Failed",
      // //////////////////////////////////
      chat_btn_status: false,

      status: "",
      login_as: "",
      
    };
    this.handlePageChangeLabs=this.handlePageChangeLabs.bind(this);
    this.handlePageChange=this.handlePageChange.bind(this);

  }



  // fetch data from db
  componentDidMount()
  {
    this.checkIfProfileCompleted();

    this.state.login_as   = localStorage.getItem("login_from");
    if( this.state.login_as != "associate"){
      hashHistory.push('/premontessori');
    }else{
      axios.get(`/api/associate/list_labs/`+this.state.id+`?token=${this.state.token}`)
      .then(response => {
        // console.log("ROI Cartoon");
        // console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          // console.log("labs_list");
          // console.log(typeof(json.data.data.data));
          // console.log(json.data.data.data);
          this.setState({ 
            labs_list: json.data.data.data,
            itemsCountPerPage_labs: json.data.data.per_page,
            totalItemsCount_labs: json.data.data.total,
            activePage_labs: json.data.data.current_page
          });
        } else {
          
        }
      })
      .catch(error => {
        // redirect user to previous page if user does not have autorization to the page
        hashHistory.push('/premontessori');
        console.error(`An Error Occuredd! ${error}`);
        
      });
    }
  }

  // Pagination handler
  handlePageChangeLabs(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/associate/list_labs/`+this.state.id+`?token=${this.state.token}&page=`+pageNumber)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          labs_list: json.data.data.data,
          itemsCountPerPage_labs: json.data.data.per_page,
          totalItemsCount_labs: json.data.data.total,
          activePage_labs: json.data.data.current_page
        });
      } else {
        
      }
    })
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

  toggleLaboratoryView = (username,name,zip_code,telephone,email,country,district_province_state,address,logo) => {
    this.setState({
      labView: !this.state.labView,
      username: username,
      name: name,
      zip_code: zip_code,
      telephone: telephone,
      email: email,
      country: country,
      district_province_state: district_province_state,
      address: address,
      logo: logo
    });
  }

  toggleViewLabPatient = () => {
    this.setState({
      primaryLabPatient: !this.state.primaryLabPatient,
    });

  }

  viewLabPatient(lab_id){
    this.setState({ 
      lab_id: lab_id
    });
    axios.get(`/api/lab/patients_list/`+lab_id+`?token=${this.state.token}`)
    .then(response => {
      // console.log("ROI Cartoon");
      // console.log(response);
      return response;
    })
    .then(json => {
      if (json.data.success) {
        // console.log("applications_list");
        // console.log(typeof(json.data.data.data));
        // console.log(json.data.data.data);
        this.setState({ 
          applications_list: json.data.data.data,
          itemsCountPerPage: json.data.data.per_page,
          totalItemsCount: json.data.data.total,
          activePage: json.data.data.current_page
        }, this.toggleViewLabPatient);
      } else {
        this.setState({ 

        }, this.toggleViewLabPatient);
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/lab/patients_list/`+this.state.lab_id+`?token=${this.state.token}&page=`+pageNumber)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          applications_list: json.data.data.data,
          itemsCountPerPage: json.data.data.per_page,
          totalItemsCount: json.data.data.total,
          activePage: json.data.data.current_page
        });
      } else {
        this.setState({ 
          
        }, this.toggleViewLabPatient);
      }
    })
  }

  // //////////////////////////////////////////////////////////////////////



  render() {
    
    // const { product_image} = this.state
    return (
      
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="3">
            <h3>Laboratories</h3>  
          </Col>
        </Row><br></br> 
        <Row>
            
            {/* ///////// ACCOUNT TABLE ///////////// */}
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> List of Laboratories 
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th>USERNAME</th>
                        <th>NAME</th>
                        <th>TELEPHONE</th>
                        <th>EMAIL</th>
                        <th>COUNTRY</th>
                        <th>DISTRICT/PROVINCE/STATE</th>
                        <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        // Calculation for the page S/N
                        this.state.currentPage = ((this.state.activePage * 10) - (10 - 1)),
                        // ////////////////////////////////////////////////////////////
                        this.state.labs_list.map(lab=>{
                          
                          return(
                            <tr key={lab.id}>
                              {/* <th scope="row">{this.state.pageNumber++}</th> */}
                              <th scope="row">{this.state.currentPage++}</th>
                              <td>{lab.username}</td>
                              <td>{lab.name}</td>
                              <td>{lab.zip_code} {lab.telephone}</td>
                              <td>{lab.email}</td>
                              <td>{lab.country}</td>
                              <td>{lab.district_province_state}</td>
                              {/* <td>{this.state.status}</td> */}
                              <td>

                              <Button size="sm" onClick={() => this.toggleLaboratoryView(lab.username,lab.name,lab.zip_code,lab.telephone,lab.email,lab.country,lab.district_province_state,lab.address,lab.logo)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View laboratory"><i className="fa fa-eye"></i></Button>

                              <Button size="sm" onClick={() => this.viewLabPatient(lab.id)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View laboratory's patient"><i className="fa fa-hospital-o"></i></Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-center">
                    <Pagination
                      activePage={this.state.activePage_labs}
                      itemsCountPerPage={this.state.itemsCountPerPage_labs}
                      totalItemsCount={this.state.totalItemsCount_labs}
                      pageRangeDisplayed={this.state.pageRangeDisplayed_labs}
                      onChange={this.handlePageChangeLabs}
                      itemClass='page-item'
                      linkClass='page-link'
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>

        {/* //////////// View LAB  //////////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.labView} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
            <ModalHeader toggle={() => this.toggleLaboratoryView("close", "close")}>View Laboratory</ModalHeader>
            <ModalBody>
              
              {/* //////////////////////////////////// */}
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>{this.state.name} Laboratory's Data
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12" sm="12">
                      <Card>
                        <CardBody>
                          <Row>
                            <Col xs="3" lg="3">
                              <img
                                // className="rounded-circle"
                                src={this.state.logo}
                                alt={this.state.name}
                                width="150"
                              />
                            </Col>
                            <Col xs="9" lg="9">
                              <Table responsive striped>
                                <tbody>
                                  <tr>
                                    <th>Username</th>
                                    <td>{this.state.username}</td>
                                  </tr>
                                  <tr>
                                    <th>Name</th>
                                    <td>{this.state.name}</td>
                                  </tr>
                                  <tr>
                                    <th>Email</th>
                                    <td>{this.state.email}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                          <Table responsive striped>
                            <tbody>
                              <tr>
                                <th>Zip code</th>
                                <td>{this.state.zip_code}</td>
                              </tr>
                              <tr>
                                <th>Telephone</th>
                                <td>{this.state.telephone}</td>
                              </tr>
                              <tr>
                                <th>Country</th>
                                <td>{this.state.country}</td>
                              </tr>
                              <tr>
                                <th>District/Province/State</th>
                                <td>{this.state.district_province_state}</td>
                              </tr>
                              <tr>
                                <th>Country</th>
                                <td>{this.state.country}</td>
                              </tr>
                              <tr>
                                <th>Address</th>
                                <td>{this.state.address}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => this.toggleLaboratoryView("close", "close")}>Cancel</Button>
            </ModalFooter>
          </Modal>

        {/* /////////////////////// VIEW LABORATORY's PATIENTS /////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.primaryLabPatient} className={'modal-primary ' + this.props.className} style={{maxWidth: "1200px"}}>
          <ModalHeader toggle={() => this.toggleViewLabPatient("close", "close")}>
            <i className="fa fa-align-justify"></i> Patients 
            {/* <span style={{float: "right"}}>
              <ExternalLink href="https://live.cammedics.com/" style={{float: "right"}}>
                <Button  style={{backgroundColor: "#fff", color: "#2167ac"}}>Start a Video Chat</Button>
              </ExternalLink>
            </span> */}
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{this.state.patient_name} List of Patients 
                <Badge color={this.state.appointment_status_color} style={{float: "right", padding: "5px 10px"}}>{this.state.appointment_status}</Badge>
              </CardHeader>
              <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Middle Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        // Calculation for the page S/N
                        this.state.currentPage = ((this.state.activePage * 10) - (10 - 1)),
                        // ////////////////////////////////////////////////////////////
                        this.state.applications_list.map(application=>{
                          if(application.status == 2){
                            this.state.status = <Badge color="success">Open</Badge>;
                          }else if(application.status == 3){
                            this.state.status = <Badge color="danger">Closed</Badge>;
                          }
                          const patient_id  = application.patient_id;
                          const name        = application.patient_first_name +" "+application.patient_last_name;
                          return(
                            <tr key={application.id}>
                              {/* <th scope="row">{this.state.pageNumber++}</th> */}
                              <th scope="row">{this.state.currentPage++}</th>
                              <td>{application.patient_username}</td>
                              <td>{application.patient_first_name}</td>
                              <td>{application.patient_last_name}</td>
                              <td>{application.patient_middle_name}</td>
                              <td>{application.date}</td>
                              <td>{application.time}</td>
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
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleViewLabPatient("close", "close")}>Cancel</Button>
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

export default AssociateLabsList;
