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

class AssociateHospitalsList extends Component {
  constructor(props) {
    super(props);
    // ////////////////MODAL    
    this.toggleHospitalView     = this.toggleHospitalView.bind(this);
    this.toggleHospitalDoctors  = this.toggleHospitalDoctors.bind(this);
    this.toggleDoctorView       = this.toggleDoctorView.bind(this);

    // /////////////////////////////////////////////////////////////////

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
      hospitalView: false,
      doctorView: false,
      // ////////////////////////////////////////////////////
      hospitals_list:[],
      number_hospitals: 1,
      activePage_hospitals:1,
      itemsCountPerPage_hospitals:1,
      totalItemsCount_hospitals:1,
      pageRangeDisplayed_hospitals:3,
      currentPage2_hospitals:'',
      status_hospitals: '1',
      // ////////////////////////////////////////////////////
      doctors_list:[],
      number_doctors: 1,
      activePage_doctors:1,
      itemsCountPerPage_doctors:1,
      totalItemsCount_doctors:1,
      pageRangeDisplayed_doctors:3,
      currentPage2_doctors:'',
      status_doctors: '1',
      // //////////////////////////////////////////////////
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

  }

  // fetch data from db
  componentDidMount()
  {
    this.checkIfProfileCompleted();

    this.state.login_as   = localStorage.getItem("login_from");
    if( this.state.login_as != "associate"){
      hashHistory.push('/premontessori');
    }else{
      axios.get(`/api/associate/list_hospitals/`+this.state.id+`?token=${this.state.token}`)
      .then(response => {
        // console.log("ROI Cartoon");
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          // console.log("hospitals_list");
          // console.log(typeof(json.data.data.data));
          // console.log(json.data.data.data);
          this.setState({ 
            hospitals_list: json.data.data.data,
            itemsCountPerPage_hospitals: json.data.data.per_page,
            totalItemsCount_hospitals: json.data.data.total,
            activePage_hospitals: json.data.data.current_page
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
  handlePageChangeHospitals(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/associate/list_hospitals/`+this.state.id+`?token=${this.state.token}&page=`+pageNumber)
    .then(response => {
      return response;
    })
    .then(json => {
      if (json.data.success) {
        this.setState({ 
          hospitals_list: json.data.data.data,
          itemsCountPerPage_hospitals: json.data.data.per_page,
          totalItemsCount_hospitals: json.data.data.total,
          activePage_hospitals: json.data.data.current_page
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
  
  toggleHospitalView = (username,name,zip_code,telephone,email,country,district_province_state,address,logo) => {
    this.setState({
      hospitalView: !this.state.hospitalView,
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

  getDoctors(hospital_id)
  {
    this.setState({ 
      hospital_id: hospital_id,
    });
    
    axios.get(`/api/associate/hospital/list_doctors/`+hospital_id+`?token=${this.state.token}`)
    .then(response => {
      // console.log("ROI Cartoon");
      // console.log(response);
      return response;
    })
    .then(json => {
      // console.log(json.data);
      if (json.data.success) {
        if(json.data.data.total != "0"){
          this.setState({ 
            no_table_data: "none",
            doctors_list: json.data.data.data,
            itemsCountPerPage_doctors: json.data.data.per_page,
            totalItemsCount_doctors: json.data.data.total,
            activePage_doctors: json.data.data.current_page
          }, this.toggleHospitalDoctors);
        }else{
          // display no data using table-row because block does not show well
          this.setState({ 
            no_table_data: "table-row",
          }, this.toggleHospitalDoctors);
        }
      } else {
        this.setState({ 
          no_table_data: "table-row",
        }, this.toggleHospitalDoctors);
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  // Pagination handler
  handlePageChangeDoctors(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/associate/hospital/list_doctors/`+this.state.hospital_id+`?token=${this.state.token}&page=`+pageNumber)
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

  toggleHospitalDoctors = () => {
    this.setState({
      hospitalDoctors: !this.state.hospitalDoctors,
    });
  }

  toggleDoctorView = (username,first_name,last_name,middle_name,zip_code,telephone,email,gender,nationality,country_of_residence,district_province_state,contact_address,area_of_specialization,profile_picture,consultation_fee) => {
    this.setState({
      doctorView: !this.state.doctorView,
      username: username,
      first_name: first_name,
      last_name: last_name,
      middle_name: middle_name,
      zip_code: zip_code,
      telephone: telephone,
      email: email,
      gender: gender,
      nationality: nationality,
      country_of_residence: country_of_residence,
      district_province_state: district_province_state,
      contact_address: contact_address,
      area_of_specialization: area_of_specialization,
      profile_picture: profile_picture,
      consultation_fee: consultation_fee
    });
  }

  render() {
    
    // const { product_image} = this.state
    return (
      
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="3">
            <h3>Hospitals</h3>  
          </Col>
        </Row><br></br> 
        <Row>
            
            {/* ///////// TABLE ///////////// */}
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> List of Hospitals 
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
                        <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        // Calculation for the page S/N
                        this.state.currentPage = ((this.state.activePage_hospitals * 10) - (10 - 1)),
                        // ////////////////////////////////////////////////////////////
                        this.state.hospitals_list.map(hospital=>{
                          if(hospital.status == 1){
                            this.state.status = <Badge color="success">Consultation Open</Badge>;
                          }else{
                            this.state.status = <Badge color="danger">Consultation Closed</Badge>;
                          }
                          const patient_id  = hospital.patient_id;
                          const name        = hospital.patient_first_name +" "+hospital.patient_last_name+" "+hospital.patient_middle_name;
                          return(
                            <tr key={hospital.id}>
                              {/* <th scope="row">{this.state.pageNumber++}</th> */}
                              <th scope="row">{this.state.currentPage++}</th>
                              <td>{hospital.username}</td>
                              <td>{hospital.name}</td>
                              <td>{hospital.zip_code} {hospital.telephone}</td>
                              <td>{hospital.email}</td>
                              <td>{hospital.country}</td>
                              {/* <td>{this.state.status}</td> */}
                              <td>
                                <Button size="sm" onClick={() => this.toggleHospitalView(hospital.username,hospital.name,hospital.zip_code,hospital.telephone,hospital.email,hospital.country,hospital.district_province_state,hospital.address,hospital.logo)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View hospital"><i className="fa fa-eye"></i></Button>
                                {/* <Button size="sm" onClick={this.togglePrimary} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-eye"></i></Button> */}
                                <Button size="sm" onClick={() => this.getDoctors(hospital.id)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-hospital-o" title="View doctors"></i></Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-center">
                    <Pagination
                      activePage={this.state.activePage_hospitals}
                      itemsCountPerPage={this.state.itemsCountPerPage_hospitals}
                      totalItemsCount={this.state.totalItemsCount_hospitals}
                      pageRangeDisplayed={this.state.pageRangeDisplayed_hospitals}
                      onChange={this.handlePageChangeHospitals}
                      itemClass='page-item'
                      linkClass='page-link'
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>

          {/* //////////// View Hospital  //////////////////////////////////////////////////////// */}
          <Modal isOpen={this.state.hospitalView} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
            <ModalHeader toggle={() => this.toggleHospitalView("close", "close")}>View Hospital</ModalHeader>
            <ModalBody>
              
              {/* //////////////////////////////////// */}
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>{this.state.name} Hospital's Data
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
              <Button color="secondary" onClick={() => this.toggleHospitalView("close", "close")}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* //////////// View Hospital Doctors  //////////////////////////////////////////////////////// */}
          <Modal isOpen={this.state.hospitalDoctors} className={'modal-primary ' + this.props.className} style={{maxWidth: "1200px"}}>
            <ModalHeader toggle={() => this.toggleHospitalDoctors("close", "close")}>
              <i className="fa fa-align-justify"></i> Doctors 
            </ModalHeader>
            <ModalBody>
              <Row>
                {/* ///////// DOCTORS TABLE ///////////// */}
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
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr style={{display: this.state.no_table_data}}>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td style={{fontWeight: "700", fontSize: "20px"}}>No Data</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          {
                            // Calculation for the page S/N
                            this.state.currentPage = ((this.state.activePage_doctors * 10) - (10 - 1)),
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
                                  {/* <td>{this.state.status}</td> */}
                                  <td>
                                  {/* <Button size="sm" onClick={this.togglePrimary} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-eye"></i></Button> */}
                                  {/* <Button size="sm" onClick={() => this.getPateintMedicalRec(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-hospital-o" title="View medical record"></i></Button> */}

                                  <Button size="sm" onClick={() => this.toggleDoctorView(doctor.username,doctor.first_name,doctor.last_name,doctor.middle_name,doctor.zip_code,doctor.telephone,doctor.email,doctor.gender,doctor.nationality,doctor.country_of_residence,doctor.district_province_state,doctor.contact_address,doctor.area_of_specialization,doctor.profile_picture,doctor.consultation_fee)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View doctor"><i className="fa fa-eye"></i></Button>
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
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => this.toggleHospitalDoctors("close", "close")}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* //////////// View Doctor  //////////////////////////////////////////////////////// */}
          <Modal isOpen={this.state.doctorView} className={'modal-primary ' + this.props.className} style={{maxWidth: "1000px"}}>
            <ModalHeader toggle={() => this.toggleDoctorView("close", "close")}>View Hospital</ModalHeader>
            <ModalBody>
              
              {/* //////////////////////////////////// */}
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>{this.state.name} Hospital's Data
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
                                src={this.state.profile_picture}
                                alt={this.state.first_name}
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
                                    <th>First Name</th>
                                    <td>{this.state.first_name}</td>
                                  </tr>
                                  <tr>
                                    <th>Last Name</th>
                                    <td>{this.state.last_name}</td>
                                  </tr>
                                  <tr>
                                    <th>Middle Name</th>
                                    <td>{this.state.middle_name}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                          <Table responsive striped>
                            <tbody>
                              <tr>
                                <th>Email</th>
                                <td>{this.state.email}</td>
                              </tr>
                              <tr>
                                <th>Zip code</th>
                                <td>{this.state.zip_code}</td>
                              </tr>
                              <tr>
                                <th>Telephone</th>
                                <td>{this.state.telephone}</td>
                              </tr>
                              <tr>
                                <th>Gender</th>
                                <td>{this.state.gender}</td>
                              </tr>
                              <tr>
                                <th>Nationality</th>
                                <td>{this.state.nationality}</td>
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
                                <th>Address</th>
                                <td>{this.state.contact_address}</td>
                              </tr>
                              <tr>
                                <th>Area of Specialization</th>
                                <td>{this.state.area_of_specialization}</td>
                              </tr>
                              <tr>
                                <th>Consultation Fee</th>
                                <td>{this.state.consultation_fee}</td>
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
              <Button color="secondary" onClick={() => this.toggleDoctorView("close", "close")}>Cancel</Button>
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

export default AssociateHospitalsList;
