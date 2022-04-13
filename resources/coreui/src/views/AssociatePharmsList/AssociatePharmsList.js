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

class AssociatePharmsList extends Component {
  constructor(props) {
    super(props);
    // ////////////////MODAL    
    this.togglePharmacyView = this.togglePharmacyView.bind(this);
    this.toggleViewPharmPatient = this.toggleViewPharmPatient.bind(this);

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
      pharms_list:[],
      number_pharms: 1,
      activePage_pharms:1,
      itemsCountPerPage_pharms:1,
      totalItemsCount_pharms:1,
      pageRangeDisplayed_pharms:3,
      currentPage2_pharms:'',
      status_pharms: '1',
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
      pharm_id: "",
      // /////////////////////////////////////////////////
      startDate: new Date(),
      // //////////////////modal
      primary: false,
      primaryPharmPatient: false,
      pharmView: false,
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
    this.handlePageChangePharms=this.handlePageChangePharms.bind(this);
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
      axios.get(`/api/associate/list_pharms/`+this.state.id+`?token=${this.state.token}`)
      .then(response => {
        // console.log("ROI Cartoon");
        // console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          // console.log("pharms_list");
          // console.log(typeof(json.data.data.data));
          // console.log(json.data.data.data);
          this.setState({ 
            pharms_list: json.data.data.data,
            itemsCountPerPage_pharms: json.data.data.per_page,
            totalItemsCount_pharms: json.data.data.total,
            activePage_pharms: json.data.data.current_page
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
  handlePageChangePharms(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/associate/list_pharms/`+this.state.id+`?token=${this.state.token}&page=`+pageNumber)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          pharms_list: json.data.data.data,
          itemsCountPerPage_pharms: json.data.data.per_page,
          totalItemsCount_pharms: json.data.data.total,
          activePage_pharms: json.data.data.current_page
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

  togglePharmacyView = (username,name,zip_code,telephone,email,country,district_province_state,address,logo) => {
    this.setState({
      pharmView: !this.state.pharmView,
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

  toggleViewPharmPatient = () => {
    this.setState({
      primaryPharmPatient: !this.state.primaryPharmPatient,
    });

  }

  viewPharmPatient(pharm_id){
    this.setState({ 
      pharm_id: pharm_id
    });
    axios.get(`/api/pharm/patients_list/`+pharm_id+`?token=${this.state.token}`)
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
        }, this.toggleViewPharmPatient);
      } else {
        this.setState({ 

        }, this.toggleViewPharmPatient);
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
    axios.get(`/api/pharm/patients_list/`+this.state.pharm_id+`?token=${this.state.token}&page=`+pageNumber)
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
          
        }, this.toggleViewPharmPatient);
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
            <h3>Pharmacies</h3>  
          </Col>
        </Row><br></br> 
        <Row>
            
            {/* ///////// ACCOUNT TABLE ///////////// */}
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> List of Pharmacies 
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
                        this.state.pharms_list.map(pharm=>{
                          
                          return(
                            <tr key={pharm.id}>
                              {/* <th scope="row">{this.state.pageNumber++}</th> */}
                              <th scope="row">{this.state.currentPage++}</th>
                              <td>{pharm.username}</td>
                              <td>{pharm.name}</td>
                              <td>{pharm.zip_code} {pharm.telephone}</td>
                              <td>{pharm.email}</td>
                              <td>{pharm.pharm_country}</td>
                              <td>{pharm.pharm_district_province_state}</td>
                              {/* <td>{this.state.status}</td> */}
                              <td>
                                <Button size="sm" onClick={() => this.togglePharmacyView(pharm.username,pharm.name,pharm.zip_code,pharm.telephone,pharm.email,pharm.pharm_country,pharm.pharm_district_province_state,pharm.pharm_address,pharm.pharm_logo)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View pharmacy"><i className="fa fa-eye"></i></Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-center">
                    <Pagination
                      activePage={this.state.activePage_pharms}
                      itemsCountPerPage={this.state.itemsCountPerPage_pharms}
                      totalItemsCount={this.state.totalItemsCount_pharms}
                      pageRangeDisplayed={this.state.pageRangeDisplayed_pharms}
                      onChange={this.handlePageChangePharms}
                      itemClass='page-item'
                      linkClass='page-link'
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>

        {/* //////////// View PHARM  //////////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.pharmView} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
            <ModalHeader toggle={() => this.togglePharmacyView("close", "close")}>View Pharmacy</ModalHeader>
            <ModalBody>
              
              {/* //////////////////////////////////// */}
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>{this.state.name} Pharmacy's Data
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
              <Button color="secondary" onClick={() => this.togglePharmacyView("close", "close")}>Cancel</Button>
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

export default AssociatePharmsList;
