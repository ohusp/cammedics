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

class AssociateLabAccount extends Component {
  constructor(props) {
    super(props);
    // ////////////////MODAL    
    this.toggleViewLabAccount = this.toggleViewLabAccount.bind(this);

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
      labs_list:[],
      number_labs: 1,
      activePage_labs:1,
      itemsCountPerPage_labs:1,
      totalItemsCount_labs:1,
      pageRangeDisplayed_labs:3,
      currentPage2_labs:'',
      status_labs: '1',
      // ///////////////////////////////////////////////////
      primaryLabAccount: false,

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
    this.handlePageChangeLabs = this.handlePageChangeLabs.bind(this);

  }

  toggleViewLabAccount = () => {
    this.setState({
      primaryLabAccount: !this.state.primaryLabAccount,
    });

  }

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

  // fetch data from db
  getAccount(lab_id)
  {
    this.setState({ 
      lab_id: lab_id
    });
    axios.get(`/api/associate/lab/account/`+lab_id+`?token=${this.state.token}`)
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
        }, this.toggleViewLabAccount);
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
    axios.get(`/api/associate/lab/account/`+this.state.lab_id+`?token=${this.state.token}&page=`+pageNumber)
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
                          if(lab.status == 1){
                            this.state.status = <Badge color="success">Consultation Open</Badge>;
                          }else{
                            this.state.status = <Badge color="danger">Consultation Closed</Badge>;
                          }
                          const patient_id  = lab.patient_id;
                          const name        = lab.patient_first_name +" "+lab.patient_last_name+" "+lab.patient_middle_name;
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
                              {/* <Button size="sm" onClick={this.togglePrimary} className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-eye"></i></Button> */}
                              {/* <Button size="sm" onClick={() => this.getPateintMedicalRec(patient_id, name)} className="btn-facebook btn-brand icon mr-1 mb-1" style={{marginRight: "15px"}}> <i className="fa fa-hospital-o" title="View medical record"></i></Button> */}

                              <Button size="sm" onClick={() => this.getAccount(lab.id)} className="btn-facebook btn-brand icon mr-1 mb-1" title="View laboratory's patient"><i className="fa fa-eye"></i></Button>
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
        {/* /////////////////////// VIEW LAB's ACCOUNT /////////////////////////////////////////////////// */}
        <Modal isOpen={this.state.primaryLabAccount} className={'modal-primary ' + this.props.className} style={{maxWidth: "1200px"}}>
          <ModalHeader toggle={() => this.toggleViewLabAccount("close", "close")}>
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
                                <td>{application.billing_test_fee}</td>
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
            <Button color="secondary" onClick={() => this.toggleViewLabAccount("close", "close")}>Cancel</Button>
          </ModalFooter>
        </Modal>





        

      </div>
    
    );
  }
}

export default AssociateLabAccount;
