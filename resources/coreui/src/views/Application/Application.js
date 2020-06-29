import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {createHashHistory} from 'history';
import axios from 'axios';

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
} from 'reactstrap';

let hashHistory = createHashHistory()

class Application extends Component {
  constructor(props) {
    super(props);

    // bing toggle functions and values
    this.toggle = this.toggle.bind(this);
    this.toggle_identification    = this.toggle_identification.bind(this);
    this.toggle_app_instructions  = this.toggle_app_instructions.bind(this);

    // bind input values on change
    this.onChangeFirstName    =this.onChangeFirstName.bind(this);
    this.onChangeLastName     =this.onChangeLastName.bind(this);
    this.onChangeMiddleName   =this.onChangeMiddleName.bind(this);
    this.onChangeEmail        =this.onChangeEmail.bind(this);
    this.onChangeZipCode      =this.onChangeZipCode.bind(this);
    this.onChangeTelephone    =this.onChangeTelephone.bind(this);
    this.onChangeTitle        =this.onChangeTitle.bind(this);
    this.onChangeGender       =this.onChangeGender.bind(this);
    this.onChangeDob          =this.onChangeDob.bind(this);
    this.onChangeNationality  =this.onChangeNationality.bind(this);
    this.onChangeCountryOfResidence     =this.onChangeCountryOfResidence.bind(this);
    this.onChangeDistrictProvinceState  =this.onChangeDistrictProvinceState.bind(this);
    this.onChangeContactAddress         =this.onChangeContactAddress.bind(this);
    // ////////////////////// DISABILITY //////////////////////////////////////////////////
    this.onChangeDisabilityNone         =this.onChangeDisabilityNone.bind(this);
    this.onChangeDisabilityHearing      =this.onChangeDisabilityHearing.bind(this);
    this.onChangeDisabilityMobility     =this.onChangeDisabilityMobility.bind(this);
    this.onChangeDisabilitySight        =this.onChangeDisabilitySight.bind(this);
    this.onChangeDisabilityLearning     =this.onChangeDisabilityLearning.bind(this);
    this.onChangeDisabilityOthers       =this.onChangeDisabilityOthers.bind(this);
    // ////////////////////////////////////////////////////////////////////////////////////
    this.onChangeParentGuardianName         =this.onChangeParentGuardianName.bind(this);
    this.onChangeParentGuardianRelationship =this.onChangeParentGuardianRelationship.bind(this);
    this.onChangeparentGuardianOccupation   =this.onChangeparentGuardianOccupation.bind(this);
    this.onChangeParentGuardianPhone        =this.onChangeParentGuardianPhone.bind(this);
    this.onChangePassportPhotograph         =this.onChangePassportPhotograph.bind(this);
    this.onChangeTypeOfIdentification       =this.onChangeTypeOfIdentification.bind(this);
    this.onChangeIdPassportNumber           =this.onChangeIdPassportNumber.bind(this);
    this.onChangeIdPassportUpload         =this.onChangeIdPassportUpload.bind(this);
    this.onChangeProgrammeFirstChoice     =this.onChangeProgrammeFirstChoice.bind(this);
    this.onChangeProgrammeSecondChoice    =this.onChangeProgrammeSecondChoice.bind(this);
    this.onChangeProgrammeThirdChoice     =this.onChangeProgrammeThirdChoice.bind(this);
    this.onChangeAcademicSession          =this.onChangeAcademicSession.bind(this);
    this.onChangeAdmissionIntake          =this.onChangeAdmissionIntake.bind(this);
    this.onChangeStudyMode                =this.onChangeStudyMode.bind(this);
    this.onChangePreviousResultTranscript =this.onChangePreviousResultTranscript.bind(this);


    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      token: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.auth_token
        : "",
      id: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.id
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
      email: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.email
        : "",
      zip_code: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.zip_code
        : "",
      telephone: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.telephone
        : "",
      title: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.title
        : "", 
      gender: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.gender
        : "",
      dob: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.dob
        : "",
      nationality: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.nationality
        : "",
      country_of_residence: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.country_of_residence
        : "",
      district_province_state: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.district_province_state
        : "",
      contact_address: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.contact_address
        : "",
      // ///////// DISABILITY /////////////////////////////////////////
      disability_none: true,
      // disability_none: localStorage["appState"]
      //   ? JSON.parse(localStorage["appState"]).user.disability_none
      //   : "",
      disability_hearing: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.disability_hearing
        : "",
      disability_mobility: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.disability_mobility
        : "",
      disability_sight: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.disability_sight
        : "",
      disability_learning: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.disability_learning
        : "",
      disability_others: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.disability_others
        : "",
      // /////////////////////////////////////////////////////////////
      parent_guardian_name: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.parent_guardian_name
        : "",
      parent_guardian_relationship: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.parent_guardian_relationship
        : "",
      parent_guardian_occupation: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.parent_guardian_occupation
        : "", 
      parent_guardian_phone: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.parent_guardian_phone
        : "", 
      passport_photograph: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.passport_photograph
        : "",
      type_of_identification: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.type_of_identification
        : "",
      id_passport_number: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.id_passport_number
        : "",
      id_passport_upload: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.id_passport_upload
        : "",
      programme_first_choice: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.programme_first_choice
        : "",
      programme_second_choice: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.programme_second_choice
        : "",  
      programme_third_choice: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.programme_third_choice
        : "",
      academic_session: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.academic_session
        : "",
      admission_intake: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.admission_intake
        : "",
      study_mode: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.study_mode
        : "",
      previous_result_transcript: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.previous_result_transcript
        : "",
      status: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.status
        : "",
      created_at: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.created_at
        : "",
      user_type: localStorage["appState"]
        ? JSON.parse(localStorage["appState"]).user.user_type
        : "",

      collapse: false,
      collapse_identification: false,
      collapse_app_instructions: false,
      fadeIn: true,
      timeout: 300,
      // //////////////////////////////////////////////////
      
      avatar: require("./../../images/avatars/0.jpg"),
      metaValue:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?",
      startDate: new Date()
    };
  }

  // For datepicker
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  // toggle collapse and expand application instruction
  toggle_app_instructions() {
    this.setState({ collapse_app_instructions: !this.state.collapse_app_instructions });
  }

  // toggle collapse and expand personal data
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  // toggle collapse and expand identification
  toggle_identification() {
    this.setState({ collapse_identification: !this.state.collapse_identification });
  }

  // ON Change of first name input
  onChangeFirstName(e)  { this.setState({ first_name:e.target.value }); }
  onChangeLastName(e)   { this.setState({ last_name:e.target.value  }); }
  onChangeLastName(e)   { this.setState({ last_name:e.target.value  }); }
  onChangeMiddleName(e) { this.setState({ middle_name:e.target.value  }); }
  onChangeEmail(e)      { this.setState({ email:e.target.value  }); }
  onChangeZipCode(e)    { this.setState({ zip_code:e.target.value  }); }
  onChangeTelephone(e)  { this.setState({ telephone:e.target.value  }); }
  onChangeTitle(e)      { this.setState({ title:e.target.value  }); }
  onChangeGender(e)     { this.setState({ gender:e.target.value  }); }
  onChangeDob(e)          { this.setState({ dob:e.target.value  }); }
  onChangeNationality(e)  { this.setState({ nationality:e.target.value  }); }
  onChangeCountryOfResidence(e)     { this.setState({ country_of_residence:e.target.value  }); }
  onChangeDistrictProvinceState(e)  { this.setState({ district_province_state:e.target.value  }); }
  onChangeContactAddress(e)     { this.setState({ contact_address:e.target.value  }); }
  // //////////////////////// DISABILITY /////////////////////////////////////////////////////////////
  onChangeDisabilityNone (e)    { this.setState({ disability_none: !this.state.disability_none }); }
  onChangeDisabilityHearing(e)  { this.setState({ disability_hearing: !this.state.disability_hearing });}
  onChangeDisabilityMobility(e) { this.setState({ disability_mobility: !this.state.disability_mobility });}
  onChangeDisabilitySight(e)    { this.setState({ disability_sight: !this.state.disability_sight });}
  onChangeDisabilityLearning(e) { this.setState({ disability_learning: !this.state.disability_learning });}
  onChangeDisabilityOthers(e)   { this.setState({ disability_others: !this.state.disability_others });}
  
  
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  onChangeParentGuardianName(e) { this.setState({ parent_guardian_name:e.target.value  }); }
  onChangeParentGuardianRelationship(e) { this.setState({ parent_guardian_relationship:e.target.value  }); }
  onChangeparentGuardianOccupation(e)   { this.setState({ parent_guardian_occupation:e.target.value  }); }
  onChangeParentGuardianPhone(e)        { this.setState({ parent_guardian_phone:e.target.value  }); }
  onChangePassportPhotograph(e)         { this.setState({ passport_photograph:e.target.value  }); }
  onChangeTypeOfIdentification(e)   { this.setState({ type_of_identification:e.target.value  }); }
  onChangeIdPassportNumber(e)       { this.setState({ id_passport_number:e.target.value  }); }
  onChangeIdPassportUpload(e)       { this.setState({ id_passport_upload:e.target.value  }); }
  onChangeProgrammeFirstChoice(e)   { this.setState({ programme_first_choice:e.target.value  }); }
  onChangeProgrammeSecondChoice(e)  { this.setState({ programme_second_choice:e.target.value  }); }
  onChangeProgrammeThirdChoice(e)   { this.setState({ programme_third_choice:e.target.value  }); }
  onChangeAcademicSession(e)  { this.setState({ academic_session:e.target.value  }); }
  onChangeAdmissionIntake(e)  { this.setState({ admission_intake:e.target.value  }); }
  onChangeStudyMode(e)        { this.setState({ study_mode:e.target.value  }); }
  onChangePreviousResultTranscript(e) { this.setState({ previous_result_transcript:e.target.value  }); }
  onChangeStatus(e) { this.setState({ status:e.target.value  }); }
  
  onSubmit(e)
  {
      e.preventDefault();
      const application_data ={
        first_name : this.state.first_name, last_name : this.state.last_name, middle_name : this.state.middle_name, email : this.state.email, zip_code : this.state.zip_code, telephone : this.state.telephone, title : this.state.title, gender : this.state.gender, dob : this.state.dob, nationality : this.state.nationality, country_of_residence : this.state.country_of_residence, district_province_state : this.state.district_province_state, contact_address : this.state.contact_address, disability_none : this.state.disability_none, 
        parent_guardian_name : this.state.parent_guardian_name, parent_guardian_relationship : this.state.parent_guardian_relationship, parent_guardian_occupation : this.state.parent_guardian_occupation, parent_guardian_phone : this.state.parent_guardian_phone, passport_photograph : this.state.passport_photograph, type_of_identification : this.state.type_of_identification, id_passport_number : this.state.id_passport_number, id_passport_upload : this.state.id_passport_upload, programme_first_choice : this.state.programme_first_choice, programme_second_choice : this.state.programme_second_choice, programme_third_choice : this.state.programme_third_choice, academic_session : this.state.academic_session, admission_intake : this.state.admission_intake, study_mode : this.state.study_mode, previous_result_transcript : this.state.previous_result_transcript
      }
      // axios.put(`http://localhost:8000/api/user/update/?token=${this.state.token}`+this.state.id, application_data)
      axios.put(`http://localhost:8000/api/user/update/`+this.state.id+`?token=${this.state.token}`, application_data)
      // axios.put(`http://localhost:8000/api/user/update/`+this.state.id, application_data)
      .then(response => {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          this.setState({ 
            // applications_list: json.data.data.data,
            // itemsCountPerPage: json.data.data.per_page,
            // totalItemsCount: json.data.data.total,
            // activePage: json.data.data.current_page
          });
        } else alert("Login Failed!");
      })
      .catch(error => {
        // redirect user to previous page if user does not have autorization to the page
        hashHistory.push('/premontessori');
        console.error(`An Error Occuredd! ${error}`);
        
      });
  }

  render() {
    return (
      <div className="animated fadeIn"> 
        <Row> 
          <Col xs="12" sm="3">
            <h3>Application Form</h3>  
          </Col>
        </Row><br></br> 
        
        <Row>
            <Col xs="12" sm="3">
              <Card>
              <CardHeader className="border-bottom text-center">
                <div className="mb-3 mx-auto">
                  <img
                    className="rounded-circle"
                    src={this.state.avatar}
                    alt={this.state.name}
                    width="110"
                  />
                </div>
                <h4 className="mb-0">{this.state.first_name} {this.state.last_name}</h4>
                <span className="text-muted d-block mb-2">{this.state.email}</span>
                <ListGroupItem className="px-4">
                  <Button block outline color="success">Update Passport Photograph</Button> 
                </ListGroupItem>
              </CardHeader>
              <CardBody>
                <strong className="text-muted d-block mb-2">
                  {this.state.metaTitle}
                </strong>
                <span>{this.state.metaValue}</span>
              </CardBody>
            </Card>
            </Col>
            
            <Col xs="12" sm="9">
              {/* ////////////////////// APPLICATION INSTRUCTIONS ////////////////////////////////////// */}
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i><strong>Application Instructions</strong>
                  <div className="card-header-actions">
                    <a href="https://reactstrap.github.io/components/collapse/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    </a>
                    <Button color="primary" onClick={this.toggle_app_instructions} className={'mb-1'} id="" size="sm">Toggle</Button>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse_app_instructions}>
                  <CardBody>
                    <strong>Thank you for choosing KIU!</strong><br></br><br></br>
                    All communications regarding your application and responses to your inquiries will be sent to the email address that you have provided in your account. You are therefore encouraged to check your email regularly.<br></br><br></br>

                    Using this account, you can start a new application or resume an existing application.<br></br><br></br>

                    <strong>The Online application process: Apply in 3 steps.</strong><br></br><br></br>
                    1. Complete the application forms.<br></br>
                    2. Upload the required academic documents and any other relevant documents.<br></br>
                    3. Upload your passport photo or take a webcam photo<br></br><br></br>

                    You are required to scan all the academic documents and any other relevant documents prior to starting the online application process. In addition, you are required to have a passport photograph ready, if you do not wish to take a webcam photo.<br></br><br></br>

                    If you complete and submit your application without academic documents or with partial academic documents, you can still use this account to upload the required documents.<br></br><br></br>

                    Editing Application Information: Before making the final submission of your application, you can edit your application information. However, after making the final submission of the application form, you will not be able to edit it.
                  </CardBody>
                </Collapse>
              </Card>
            
              {/* ////////////////////// PERSONAL DATA ////////////////////////////////////// */}
              <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Personal Data</strong>
                <div className="card-header-actions">
                  <Button color="primary" onClick={this.toggle} className={'mb-1'} id="" size="sm">Toggle</Button>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapse} >
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col xs="12" sm="6">
                        {/* //// TITLE //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Title</InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" id="title" defaultValue={this.state.title} onChange={this.onChangeTitle}>
                              <option value="0"> --- select --- </option>
                              <option value="1">Mr</option>
                              <option value="2">Mrs</option>
                              <option value="3">Ms</option>
                              <option value="3">Miss</option>
                            </Input>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// GENDER //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Gender</InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" id="gender" defaultValue={this.state.gender} onChange={this.onChangeGender}>
                              <option value="0"> --- select --- </option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                            </Input>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// FIRST NAME //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>First Name</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="first_name" defaultValue={this.state.first_name} onChange={this.onChangeFirstName} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// MIDDLE NAME //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Middle Name</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="middle_name" defaultValue={this.state.middle_name} onChange={this.onChangeMiddleName} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// LAST NAME //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Last Name</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="last_name" defaultValue={this.state.last_name} onChange={this.onChangeLastName}/>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// PHONE NUMBER //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Phone Number</InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" id="zip_code" defaultValue={this.state.zip_code} onChange={this.onChangeZipCode}>
                              <option value="0"> Zip Code </option>
                              <option value="NG (+234)">NG (+234)</option>
                              <option value="UG (+256)">UG (+256)</option>
                            </Input>
                            <Input type="text" id="telephone" defaultValue={this.state.telephone} onChange={this.onChangeTelephone} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// DATE OF BIRTH //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Date of Birth</InputGroupText>
                            </InputGroupAddon>
                            <Input type="date" id="dob" defaultValue={this.state.dob} onChange={this.onChangeDob} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// NATIONALITY //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Nationality</InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" id="nationality" defaultValue={this.state.nationality} onChange={this.onChangeNationality}>
                              <option value="0"> --- select --- </option>
                              <option value="1">Ghana</option>
                              <option value="2">Nigeria</option>
                            </Input>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// COUNTRY OF RESIDENCE //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Country of Residence</InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" id="country_of_residence" defaultValue={this.state.country_of_residence} onChange={this.onChangeCountryOfResidence}>
                              <option value="0"> --- select --- </option>
                              <option value="1">Ghana</option>
                              <option value="2">Nigeria</option>
                            </Input>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>                       
                      </Col>
                      <Col xs="12" sm="6">
                        {/* //// DISTRICT/PROVINCE/STATE //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>District/Province/State</InputGroupText>
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
                              <InputGroupText>Contact Address</InputGroupText>
                            </InputGroupAddon>
                            <Input type="textarea" id="contact_address" rows="2" defaultValue={this.state.contact_address} onChange={this.onChangeContactAddress} placeholder="Contact Address" />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// DISABILITY //////// */}
                        <FormGroup>
                            <strong>Disability:</strong>
                        </FormGroup>
                        <Row>
                          <Col xs="12" sm="6">
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="disability_none" checked={this.state.disability_none} onChange={this.onChangeDisabilityNone} />
                              <Label check className="form-check-label" htmlFor="checkbox1">None</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="hearing" checked={this.state.hearing} onChange={this.onChangeHearing} />
                              <Label check className="form-check-label" htmlFor="checkbox2">Hearing</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="mobility" checked={this.state.mobility} onChange={this.onChangeMobility} />
                              <Label check className="form-check-label" htmlFor="checkbox3">Mobility</Label>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6">
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="sight" checked={this.state.sight} onChange={this.onChangeSight} />
                              <Label check className="form-check-label" htmlFor="checkbox1">Sight</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="learning_disability" checked={this.state.learningDisability} onChange={this.onChangeLearningDisability} />
                              <Label check className="form-check-label" htmlFor="checkbox2">Learning Disability
</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="others" checked={this.state.others} onChange={this.onChangeOthers} />
                              <Label check className="form-check-label" htmlFor="checkbox3">others</Label>
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr></hr>
                        {/* //// PARENT/GUARDIAN/NEXT OF KIN INFORMATION //////// */}
                        <FormGroup>
                          <strong>Parent/Guardian/Next of Kin Information</strong>
                        </FormGroup>
                        {/* //// PARENT/GUARDIAN NAME //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Full Name</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="parent_guardian_name" defaultValue={this.state.parent_guardian_name} onChange={this.onChangeParentGuardianName} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// PARENT/GUARDIAN RELATIONSHIP //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Relationship</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="parent_guardian_relationship" defaultValue={this.state.parent_guardian_relationship} onChange={this.onChangeParentGuardianRelationship} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// PARENT/GUARDIAN OCCUPATION //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Occupation</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="parent_guardian_occupation" defaultValue={this.state.parent_guardian_occupation} onChange={this.onChangeparentGuardianOccupation} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        {/* //// PARENT/GUARDIAN PHONE //////// */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Phone</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="parent_guardian_phone" defaultValue={this.state.parent_guardian_phone} onChange={this.onChangeParentGuardianPhone} />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        
                      </Col>
                    </Row>
                    <FormGroup className="form-actions">
                      <Button type="submit" size="sm" color="primary">Update Personal Details</Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Collapse>
            </Card>
              
              {/* ////////////////////// IDENTIFICATION ////////////////////////////////////// */}
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i><strong>Identification</strong>
                  <div className="card-header-actions">
                    <a href="https://reactstrap.github.io/components/collapse/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    </a>
                    <Button color="primary" onClick={this.toggle_identification} className={'mb-1'} id="" size="sm">Toggle</Button>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse_identification}>
                  <CardBody>
                    <Form action="" method="post">
                      <Row>
                        <Col xs="12" sm="6">
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Type of Identification</InputGroupText>
                              </InputGroupAddon>
                              <Input type="select" name="type_of_identification" id="type_of_identification">
                                <option value="0"> --- select --- </option>
                                <option value="1">Passport</option>
                                <option value="2">National ID</option>
                                <option value="3">Driver License</option>
                              </Input>
                              <InputGroupAddon addonType="append">
                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>  
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>ID Passport Number</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" id="id_passport_number" name="id_passport_number" defaultValue={this.state.id_passport_number} />
                              <InputGroupAddon addonType="append">
                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>               
                        </Col>
                        <Col xs="12" sm="6">
                          <Input type="file" id="file-input" name="file-input" />
                        </Col>
                      </Row>
                      <FormGroup className="form-actions">
                        <Button type="submit" size="sm" color="primary">Update Personal Details</Button>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Collapse>
              </Card>
            
            </Col>

            
            
        </Row>
        
        
      </div>
    );
  }
}

export default Application;
