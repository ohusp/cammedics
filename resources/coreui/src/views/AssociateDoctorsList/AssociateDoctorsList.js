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

class AssociateDoctorsList extends Component {
  constructor(props) {
    super(props);
    // ////////////////MODAL    
    this.toggleViewDoctorPatient = this.toggleViewDoctorPatient.bind(this);

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
      doctors_list:[],
      number_doctors: 1,
      activePage_doctors:1,
      itemsCountPerPage_doctors:1,
      totalItemsCount_doctors:1,
      pageRangeDisplayed_doctors:3,
      currentPage2_doctors:'',
      status_doctors: '1',
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
      doctor_id: "",
      // /////////////////////////////////////////////////
      startDate: new Date(),
      // //////////////////modal
      primary: false,
      primaryDoctorPatient: false,
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
    this.handlePageChangeDoctors=this.handlePageChangeDoctors.bind(this);
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
      axios.get(`/api/associate/list_doctors/`+this.state.id+`?token=${this.state.token}`)
      .then(response => {
        // console.log("ROI Cartoon");
        // console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          // console.log("doctors_list");
          // console.log(typeof(json.data.data.data));
          // console.log(json.data.data.data);
          this.setState({ 
            doctors_list: json.data.data.data,
            itemsCountPerPage_doctors: json.data.data.per_page,
            totalItemsCount_doctors: json.data.data.total,
            activePage_doctors: json.data.data.current_page
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

  // Pagination handler
  handlePageChangeDoctors(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/associate/list_doctors/`+this.state.id+`?token=${this.state.token}&page=`+pageNumber)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          doctors_list: json.data.data.data,
          itemsCountPerPage_doctors: json.data.data.per_page,
          totalItemsCount_doctors: json.data.data.total,
          activePage_doctors: json.data.data.current_page
        });
      } else {
        
      }
    })
  }

  toggleViewDoctorPatient = () => {
    this.setState({
      primaryDoctorPatient: !this.state.primaryDoctorPatient,
    });

  }

  viewDoctorPatient(doctor_id){
    this.setState({ 
      doctor_id: doctor_id
    });
    axios.get(`/api/doc/patients_list/`+doctor_id+`?token=${this.state.token}`)
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
        }, this.toggleViewDoctorPatient);
      } else {
        
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
    axios.get(`/api/doc/patients_list/`+this.state.doctor_id+`?token=${this.state.token}&page=`+pageNumber)
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
        
      }
    })
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  // //////////////////////////////////////////////////////////////////////



  render() {
    
    // const { product_image} = this.state
    return (
      
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="3">
            <h3>Doctors</h3>  
          </Col>
        </Row><br></br> 
        <Row>
            
            {/* ///////// ACCOUNT TABLE ///////////// */}
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> List of Doctors 
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th>USERNAME</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>TELEPHONE</th>
                        <th>EMAIL</th>
                        <th>NATIONALITY</th>
                        <th>COUNTRY OF RESIDENCE</th>
                        <th>AREA OF SPECIALIZATION</th>
                        <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        // Calculation for the page S/N
                        this.state.currentPage = ((this.state.activePage * 10) - (10 - 1)),
                        // ////////////////////////////////////////////////////////////
                        this.state.doctors_list.map(doctor=>{
                          if(doctor.status == 1){
                            this.state.status = <Badge color="success">Consultation Open</Badge>;
                          }else{
                            this.state.status = <Badge color="danger">Consultation Closed</Badge>;
                          }
                          const patient_id  = doctor.patient_id;
                          const name        = doctor.patient_first_name +" "+doctor.patient_last_name+" "+doctor.patient_middle_name;
                          return(
                            <tr key={doctor.id}>
                              {/* <th scope="row">{this.state.pageNumber++}</th> */}
                              <th scope="row">{this.state.currentPage++}</th>
                              <td>{doctor.username}</td>
                              <td>{doctor.first_name}</td>
                              <td>{doctor.last_name}</td>
                              <td>{doctor.zip_code} {doctor.telephone}</td>
                              <td>{doctor.email}</td>
                              <td>{doctor.nationality}</td>
                              <td>{doctor.country_of_residence}</td>
                              <td>{doctor.area_of_specialization}</td>
                              {/* <td>{this.state.status}</td> */}
                              <td>

                              <Button size="sm" onClick={() => this.viewDoctorPatient(doctor.id)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View doctor's patient"><i className="fa fa-eye"></i></Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-center">
                    <Pagination
                      activePage={this.state.activePage_doctors}
                      itemsCountPerPage={this.state.itemsCountPerPage_doctors}
                      totalItemsCount={this.state.totalItemsCount_doctors}
                      pageRangeDisplayed={this.state.pageRangeDisplayed_doctors}
                      onChange={this.handlePageChangeDoctors}
                      itemClass='page-item'
                      linkClass='page-link'
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>

        {/* /////////////////////// VIEW DOCTOR's PATIENTS /////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.primaryDoctorPatient} className={'modal-primary ' + this.props.className} style={{maxWidth: "1200px"}}>
          <ModalHeader toggle={() => this.toggleViewDoctorPatient("close", "close")}>
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
            <Button color="secondary" onClick={() => this.toggleViewDoctorPatient("close", "close")}>Cancel</Button>
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

export default AssociateDoctorsList;
