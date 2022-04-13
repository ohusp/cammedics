import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {createHashHistory} from 'history';
// import axios from 'axios';
import axios, { post } from 'axios';
import Pagination from "react-js-pagination";

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
} from 'reactstrap';

let hashHistory = createHashHistory()

class AssociatePharmAccount extends Component {
  constructor(props) {
    super(props);
    // ////////////////MODAL    
    this.toggleViewPharmAccount = this.toggleViewPharmAccount.bind(this);

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

      // ////////////////////////////////////////////////////
      applications_list:[],
      number: 1,
      activePage:1,
      itemsCountPerPage:1,
      totalItemsCount:1,
      pageRangeDisplayed:3,
      currentPage2:'',
      status: '1',
      // ////////////////////////////////////////////////////
      pharms_list:[],
      number_pharms: 1,
      activePage_pharms:1,
      itemsCountPerPage_pharms:1,
      totalItemsCount_pharms:1,
      pageRangeDisplayed_pharms:3,
      currentPage2_pharms:'',
      status_pharms: '1',
      // ///////////////////////////////////////////////////
      primaryPharmAccount: false,

      status: "",
      created_at: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.created_at
        : "",
      user_type: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.user_type
        : "",
      login_as: "",
    };
    this.handlePageChangeGetAccount=this.handlePageChangeGetAccount.bind(this);
    this.handlePageChangePharms = this.handlePageChangePharms.bind(this);

  }

  toggleViewPharmAccount = () => {
    this.setState({
      primaryPharmAccount: !this.state.primaryPharmAccount,
    });

  }

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

  // fetch data from db
  getAccount(pharm_id)
  {
    this.setState({ 
      pharm_id: pharm_id
    });
    axios.get(`/api/associate/pharm/account/`+pharm_id+`?token=${this.state.token}`)
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
        }, this.toggleViewPharmAccount);
      } else {
        
      }
    })
    .catch(error => {
      // redirect user to previous page if user does not have autorization to the page
      hashHistory.push('/premontessori');
      console.error(`An Error Occuredd! ${error}`);
      
    });
  }

  // Pagination handler
  handlePageChangeGetAccount(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    axios.get(`/api/associate/pharm/account/`+this.state.pharm_id+`?token=${this.state.token}&page=`+pageNumber)
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


  render() {
    
    // const { product_image} = this.state
    return (
      
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="3">
            <h3>Account</h3>  
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
                          if(pharm.status == 1){
                            this.state.status = <Badge color="success">Consultation Open</Badge>;
                          }else{
                            this.state.status = <Badge color="danger">Consultation Closed</Badge>;
                          }
                          const patient_id  = pharm.patient_id;
                          const name        = pharm.patient_first_name +" "+pharm.patient_last_name+" "+pharm.patient_middle_name;
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
                              {/* <Button size="sm" onClick={this.togglePrimary} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-eye"></i></Button> */}
                              {/* <Button size="sm" onClick={() => this.getPateintMedicalRec(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-hospital-o" title="View medical record"></i></Button> */}

                              <Button size="sm" onClick={() => this.getAccount(pharm.id)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View pharmacy's patient"><i className="fa fa-eye"></i></Button>
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
        {/* /////////////////////// VIEW PHARM's ACCOUNT /////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.primaryPharmAccount} className={'modal-primary ' + this.props.className} style={{maxWidth: "1200px"}}>
          <ModalHeader toggle={() => this.toggleViewPharmAccount("close", "close")}>
            <i className="fa fa-align-justify"></i> ACCOUNT 
          </ModalHeader>
          <ModalBody>
            <Row>
              {/* ///////// ACCOUNT TABLE ///////////// */}
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> List of Payments 
                  </CardHeader>
                  <CardBody>
                    <Table responsive bordered>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th>USERNAME</th>
                          <th>NAME</th>
                          <th>AMOUNT</th>
                          <th>CURRENCY</th>
                          <th>ORDER NO</th>
                          <th>DATE</th>
                          <th>STATUS</th>
                          {/* <th>Action</th> */}
                      </tr>
                      </thead>
                      <tbody>
                        {
                          // Calculation for the page S/N
                          this.state.currentPage = ((this.state.activePage * 10) - (10 - 1)),
                          // ////////////////////////////////////////////////////////////
                          this.state.applications_list.map(application=>{
                            if(application.status == 1){
                              this.state.status = <Badge color="success">Consultation Open</Badge>;
                            }else{
                              this.state.status = <Badge color="danger">Consultation Closed</Badge>;
                            }
                            const patient_id  = application.patient_id;
                            const name        = application.patient_first_name +" "+application.patient_last_name+" "+application.patient_middle_name;
                            return(
                              <tr key={application.id}>
                                {/* <th scope="row">{this.state.pageNumber++}</th> */}
                                <th scope="row">{this.state.currentPage++}</th>
                                <td>{application.patient_username}</td>
                                <td>{name}</td>
                                <td>{application.billing_amount_value}</td>
                                <td>{application.billing_amount_currency}</td>
                                <td>{application.billing_orderID}</td>
                                <td>{application.created_at}</td>
                                <td>{this.state.status}</td>
                                {/* <td> */}
                                {/* <Button size="sm" onClick={this.togglePrimary} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-eye"></i></Button> */}
                                {/* <Button size="sm" onClick={() => this.getPateintMedicalRec(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-hospital-o" title="View medical record"></i></Button> */}

                                {/* <Button size="sm" onClick={() => this.viewAppointment(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View appointment"><i className="fa fa-calendar-check-o"></i></Button> */}
                                {/* </td> */}
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
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleViewPharmAccount("close", "close")}>Cancel</Button>
          </ModalFooter>
        </Modal>





        

      </div>
    
    );
  }
}

export default AssociatePharmAccount;
