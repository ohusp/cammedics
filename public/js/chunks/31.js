(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/react-external-link/dist/index.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/react-external-link/dist/index.esm.js ***!
  \************************************************************/
/*! exports provided: ExternalLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalLink", function() { return ExternalLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var ExternalLink = function (_a) {
    var href = _a.href, children = _a.children, rest = __rest(_a, ["href", "children"]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", __assign({ target: "_blank", rel: "noopener noreferrer", href: href }, rest), children || href));
};




/***/ }),

/***/ "./resources/coreui/src/views/Admin/Pharms/Pharms.js":
/*!***********************************************************!*\
  !*** ./resources/coreui/src/views/Admin/Pharms/Pharms.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ "./node_modules/react-datepicker/dist/react-datepicker.css");
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_js_pagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-js-pagination */ "./node_modules/react-js-pagination/dist/Pagination.js");
/* harmony import */ var react_js_pagination__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_js_pagination__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_external_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-external-link */ "./node_modules/react-external-link/dist/index.esm.js");
/* harmony import */ var sweetalert2_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2-react */ "./node_modules/sweetalert2-react/dist/sweetalert-react.min.js");
/* harmony import */ var sweetalert2_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2_react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}



 // import axios from 'axios';







var hashHistory = Object(history__WEBPACK_IMPORTED_MODULE_2__["createHashHistory"])();

var Pharms = /*#__PURE__*/function (_Component) {
  _inherits(Pharms, _Component);

  var _super = _createSuper(Pharms);

  function Pharms(props) {
    var _this$state;

    var _this;

    _classCallCheck(this, Pharms);

    _this = _super.call(this, props); // ////////////////MODAL    

    _this.togglePharmView = function (pharm_id, name) {
      // togglePatientRec(id, name) {
      console.log(pharm_id);

      _this.setState({
        pharmView: !_this.state.pharmView,
        pharm_id: pharm_id,
        pharm_name: name
      });
    };

    _this.toggleAccountView = function (pharm_id, name) {
      // togglePatientRec(id, name) {
      console.log(pharm_id);

      _this.setState({
        accountView: !_this.state.accountView,
        pharm_id: pharm_id,
        pharm_name: name
      });
    };

    _this.toggleviewPharmOrders = function () {
      _this.setState({
        primaryPharmPatient: !_this.state.primaryPharmPatient
      });
    };

    _this.handleChange = function (date) {
      _this.setState({
        startDate: date
      });
    };

    _this.togglePharmView = _this.togglePharmView.bind(_assertThisInitialized(_this));
    _this.toggleAccountView = _this.toggleAccountView.bind(_assertThisInitialized(_this));
    _this.toggleviewPharmOrders = _this.toggleviewPharmOrders.bind(_assertThisInitialized(_this));
    _this.togglePrimary = _this.togglePrimary.bind(_assertThisInitialized(_this));
    _this.toggleViewOrder = _this.toggleViewOrder.bind(_assertThisInitialized(_this));
    _this.onChangeMedicationsCurrentlyUsingUpdate = _this.onChangeMedicationsCurrentlyUsingUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeAllergiesUpdate = _this.onChangeAllergiesUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeBloodGroupUpdate = _this.onChangeBloodGroupUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeUnderlyingConditionsUpdate = _this.onChangeUnderlyingConditionsUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeFamilyMedicalHistoryUpdate = _this.onChangeFamilyMedicalHistoryUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeHypertensiveUpdate = _this.onChangeHypertensiveUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeDiabeticUpdate = _this.onChangeDiabeticUpdate.bind(_assertThisInitialized(_this));
    _this.onChangePrescriptionUpdate = _this.onChangePrescriptionUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeLabTestUpdate = _this.onChangeLabTestUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeNoteUpdate = _this.onChangeNoteUpdate.bind(_assertThisInitialized(_this));
    _this.onChangeMessageBox = _this.onChangeMessageBox.bind(_assertThisInitialized(_this));
    _this.sendFile = _this.sendFile.bind(_assertThisInitialized(_this));
    _this.submitSendFile = _this.submitSendFile.bind(_assertThisInitialized(_this));
    _this.sendMessage = _this.sendMessage.bind(_assertThisInitialized(_this)); // /////////////////////////////////////////////////////////////////
    // medical record tab toggle

    _this.toggleMedRecTab = _this.toggleMedRecTab.bind(_assertThisInitialized(_this));
    _this.state = (_this$state = {
      token: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.auth_token : "",
      id: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.id : "",
      username: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.username : "",
      first_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.first_name : "",
      last_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.last_name : "",
      middle_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.middle_name : "",
      created_at: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.created_at : "",
      user_type: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.user_type : "",
      // ////////////////////////////////////////////////////
      pharms_list: [],
      number_pharms: 1,
      activePage_pharms: 1,
      itemsCountPerPage_pharms: 1,
      totalItemsCount_pharms: 1,
      pageRangeDisplayed_pharms: 3,
      currentPage2_pharms: '',
      status_pharms: '1',
      // ////////////////////////////////////////////////////
      account_list: [],
      number_account: 1,
      activePage_account: 1,
      itemsCountPerPage_account: 1,
      totalItemsCount_account: 1,
      pageRangeDisplayed_account: 3,
      currentPage2_account: '',
      status_account: '1',
      // ////////////////////////////////////////////////////
      order_list: [],
      number: 1,
      activePage: 1,
      itemsCountPerPage: 1,
      totalItemsCount: 1,
      pageRangeDisplayed: 3,
      currentPage2: '',
      status: '1',
      cart_list: [],
      number_cart: 1,
      activePage_cart: 1,
      itemsCountPerPage_cart: 1,
      totalItemsCount_cart: 1,
      pageRangeDisplayed_cart: 3,
      currentPage2_cart: '',
      status_cart: '1',
      // //////////////////////////////////////////////////
      // store array of data when a patient is clicked 
      medications_currently_using: [],
      allergies: [],
      blood_group: [],
      underlying_conditions: [],
      family_medical_history: [],
      hypertensive: [],
      diabetic: [],
      prescription: [],
      lab_test: [],
      note: [],
      // store new data entered to be stored/submitted
      medications_currently_using_update: "",
      allergies_update: "",
      blood_group_update: "",
      underlying_conditions_update: "",
      family_medical_history_update: "",
      hypertensive_update: "",
      diabetic_update: "",
      prescription_update: "",
      lab_test_update: "",
      note_update: "",
      currentTime: new Date().toLocaleString(),
      // for chat
      message_box: "",
      message_list: [],
      message_list_array: [],
      // //////////////////////////////////////////////////
      // patient clicks for message
      patient_id: "",
      patient_name: "",
      pharm_id: "",
      // /////////////////////////////////////////////////
      startDate: new Date(),
      // //////////////////modal
      pharmView: false,
      accountView: false,
      primary: false,
      primaryViewOrder: false,
      primaryPharmPatient: false,
      // ///////////////////////////////////////////////////////
      showSuccess: false,
      showError: false,
      successMessage: "Successful",
      errorMessage: "Failed",
      // //////////////////////////////////
      chat_btn_status: false
    }, _defineProperty(_this$state, "status", ""), _defineProperty(_this$state, "pharm_status", ""), _defineProperty(_this$state, "login_as", ""), _this$state);
    _this.handlePageChangePharms = _this.handlePageChangePharms.bind(_assertThisInitialized(_this));
    _this.handlePageChange = _this.handlePageChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Pharms, [{
    key: "toggleMedRecTab",
    value: function toggleMedRecTab(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
  }, {
    key: "onChangeMedicationsCurrentlyUsingUpdate",
    value: function onChangeMedicationsCurrentlyUsingUpdate(e) {
      this.setState({
        medications_currently_using_update: e.target.value
      });
    }
  }, {
    key: "onChangeAllergiesUpdate",
    value: function onChangeAllergiesUpdate(e) {
      this.setState({
        allergies_update: e.target.value
      });
    }
  }, {
    key: "onChangeBloodGroupUpdate",
    value: function onChangeBloodGroupUpdate(e) {
      this.setState({
        blood_group_update: e.target.value
      });
    }
  }, {
    key: "onChangeUnderlyingConditionsUpdate",
    value: function onChangeUnderlyingConditionsUpdate(e) {
      this.setState({
        underlying_conditions_update: e.target.value
      });
    }
  }, {
    key: "onChangeFamilyMedicalHistoryUpdate",
    value: function onChangeFamilyMedicalHistoryUpdate(e) {
      this.setState({
        family_medical_history_update: e.target.value
      });
    }
  }, {
    key: "onChangeHypertensiveUpdate",
    value: function onChangeHypertensiveUpdate(e) {
      this.setState({
        hypertensive_update: e.target.value
      });
    }
  }, {
    key: "onChangeDiabeticUpdate",
    value: function onChangeDiabeticUpdate(e) {
      this.setState({
        diabetic_update: e.target.value
      });
    }
  }, {
    key: "onChangePrescriptionUpdate",
    value: function onChangePrescriptionUpdate(e) {
      this.setState({
        prescription_update: e.target.value
      });
    }
  }, {
    key: "onChangeLabTestUpdate",
    value: function onChangeLabTestUpdate(e) {
      this.setState({
        lab_test_update: e.target.value
      });
    }
  }, {
    key: "onChangeNoteUpdate",
    value: function onChangeNoteUpdate(e) {
      this.setState({
        note_update: e.target.value
      });
    } // fetch data from db

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.state.login_as = localStorage.getItem("login_from");

      if (this.state.login_as != "admin_user") {
        hashHistory.push('/premontessori');
      } else {
        axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/admin/list_pharms?token=".concat(this.state.token)).then(function (response) {
          console.log("ROI Cartoon");
          console.log(response);
          return response;
        }).then(function (json) {
          if (json.data.success) {
            console.log(_typeof(json.data.data.data));
            console.log(json.data.data.data);

            _this2.setState({
              pharms_list: json.data.data.data,
              itemsCountPerPage_pharms: json.data.data.per_page,
              totalItemsCount_pharms: json.data.data.total,
              activePage_pharms: json.data.data.current_page
            });
          } else {}
        })["catch"](function (error) {
          // redirect user to previous page if user does not have autorization to the page
          // hashHistory.push('/premontessori');
          console.error("An Error Occuredd! ".concat(error));
        });
      }
    } // Pagination handler

  }, {
    key: "handlePageChangePharms",
    value: function handlePageChangePharms(pageNumber) {
      var _this3 = this;

      console.log("active page is ".concat(pageNumber)); // this.setState({activePage: pageNumber});

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/admin/list_pharms?token=".concat(this.state.token, "&page=") + pageNumber).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this3.setState({
            pharms_list: json.data.data.data,
            itemsCountPerPage_pharms: json.data.data.per_page,
            totalItemsCount_pharms: json.data.data.total,
            activePage_pharms: json.data.data.current_page
          });
        } else {}
      });
    } // //////////////////// VIEW PHARM ///////////////////////////////////////////////////////////

  }, {
    key: "viewPharm",
    value: function viewPharm(pharm_id, name) {
      var _this4 = this;

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/admin/pharm/get/" + pharm_id + "?token=".concat(this.state.token)).then(function (response) {
        console.log("It came back");
        console.log(response);
        return response;
      }).then(function (json) {
        if (json.data.success) {
          console.log(json.data.med_currently_using);
          console.log(json.status);

          _this4.setState({
            // //////////////////////////////////////////////////////
            username: json.data.data.username,
            name: json.data.data.name,
            email: json.data.data.email,
            zip_code: json.data.data.zip_code,
            telephone: json.data.data.telephone,
            country: json.data.data.pharm_country,
            district_province_state: json.data.data.pharm_district_province_state,
            address: json.data.data.pharm_address,
            bank_name: json.data.data.bank_name,
            bank_account_name: json.data.data.bank_account_name,
            bank_account_number: json.data.data.bank_account_number,
            logo: json.data.data.pharm_logo,
            medical_license: json.data.data.medical_license,
            status_pharm: json.data.data.status,
            created_at: json.data.data.created_at
          }, _this4.togglePharmView(pharm_id, name));
        } else {
          _this4.setState({
            errorMessage: json.data.data,
            showError: true
          });
        }
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    } // //////////////////// VIEW ACCOUNT ///////////////////////////////////////////////////////////

  }, {
    key: "viewAccount",
    value: function viewAccount(pharm_id, name) {
      var _this5 = this;

      this.setState({
        pharm_id: pharm_id,
        pharm_name: name
      });
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/admin/pharm/account/" + pharm_id + "?token=".concat(this.state.token)).then(function (response) {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this5.setState({
            account_list: json.data.data.data,
            itemsCountPerPage_account: json.data.data.per_page,
            totalItemsCount_account: json.data.data.total,
            activePage_account: json.data.data.current_page
          }, _this5.toggleAccountView(pharm_id, name));
        } else {}
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    }
  }, {
    key: "handlePageChangeAccount",
    value: function handlePageChangeAccount(pageNumber) {
      var _this6 = this;

      console.log("active page is ".concat(pageNumber)); // this.setState({activePage: pageNumber});

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/admin/pharm/account/" + this.state.pharm_id + "?token=".concat(this.state.token, "&page=") + pageNumber).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this6.setState({
            account_list: json.data.data.data,
            itemsCountPerPage_account: json.data.data.per_page,
            totalItemsCount_account: json.data.data.total,
            activePage_account: json.data.data.current_page
          });
        } else {}
      });
    }
  }, {
    key: "viewPharmOrders",
    value: function viewPharmOrders(pharm_id) {
      var _this7 = this;

      this.setState({
        pharm_id: pharm_id
      });
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/pharm/order_list/" + pharm_id + "?token=".concat(this.state.token)).then(function (response) {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      }).then(function (json) {
        if (json.data.success) {
          console.log("order_list");
          console.log(json.data.data.data);

          _this7.setState({
            order_list: json.data.data.data,
            itemsCountPerPage: json.data.data.per_page,
            totalItemsCount: json.data.data.total,
            activePage: json.data.data.current_page
          });
        } else {}
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    }
  }, {
    key: "handlePageChange",
    value: function handlePageChange(pageNumber) {
      var _this8 = this;

      console.log("active page is ".concat(pageNumber)); // this.setState({activePage: pageNumber});

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/pharm/order_list/" + this.state.pharm_id + "?token=".concat(this.state.token, "&page=") + pageNumber).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this8.setState({
            order_list: json.data.data.data,
            itemsCountPerPage: json.data.data.per_page,
            totalItemsCount: json.data.data.total,
            activePage: json.data.data.current_page
          });
        } else {}
      });
    }
  }, {
    key: "togglePrimary",
    // //////////////////////////////////////////////////////////////////////
    // /////////////// Patient chat
    value: function togglePrimary(close) {
      // console.log(id);
      // if the variable passed is closed do not call axios
      // if(id == "close"){
      //   this.setState({
      //     primary: !this.state.primary,
      //   });
      // }else{
      if (close == "close") {
        clearInterval(this.interval);
        this.setState({
          primary: !this.state.primary
        });
      } else {
        this.setState({
          primary: !this.state.primary,
          patient_id: this.state.patient_id,
          patient_name: this.state.patient_name
        }, this.getMessages1());
      }
    }
  }, {
    key: "getMessages1",
    value: function getMessages1() {
      var _this9 = this;

      this.getMessages2();
      this.interval = setInterval(function () {
        return _this9.getMessages2();
      }, 5000);
    } // get messages

  }, {
    key: "getMessages2",
    value: function getMessages2() {
      var _this10 = this; // alert("Paulo");


      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/pharm/patient/chat/message/get/" + this.state.patient_id + '/' + this.state.pharm_id + "?token=".concat(this.state.token)).then(function (response) {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      }).then(function (json) {
        console.log("json.data.messages.message");
        console.log(_typeof(json.data.messages.message));
        console.log(json.data.messages.message);

        if (json.data.success) {
          //   console.log("order_list");
          //   console.log(json.data.data.data);
          _this10.setState({
            message_list: json.data.messages.message
          }, _this10.loadMessages(json.data.messages.message));
        } else {}
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    } // get messages from db, do a foreach on the array of messages

  }, {
    key: "loadMessages",
    value: function loadMessages(passMessageArray) {
      // empty message area before adding new message
      jquery__WEBPACK_IMPORTED_MODULE_4___default()('#message_area').empty();
      passMessageArray.forEach(this.splitMessage);
    } // split the messages to know that of pharm and patient

  }, {
    key: "splitMessage",
    value: function splitMessage(item) {
      var item_split = item.split("|-|");
      var from = item_split[0].slice(1);
      var id = item_split[1];
      var message = item_split[2];
      var fileName = item_split[3].slice(0, -1);

      if (from == "pharm") {
        jquery__WEBPACK_IMPORTED_MODULE_4___default()("#message_area").append("<li style='background-color: rgb(33, 103, 172); color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>" + message + "</li>");
      } else if (from == "patient") {
        jquery__WEBPACK_IMPORTED_MODULE_4___default()("#message_area").append("<li style='background-color: #ca333a; color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>" + message + "</li>");
      } else if (from == "pharm_file") {
        jquery__WEBPACK_IMPORTED_MODULE_4___default()("#message_area").append("<a href='" + message + "' target='_blank'><li style='background-color: rgb(33, 103, 172); color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>" + fileName + "<i class='fa fa-paperclip' style='font-size: 1.5em; float: right'></i></li></a>");
      } else if (from == "patient_file") {
        jquery__WEBPACK_IMPORTED_MODULE_4___default()("#message_area").append("<a href='" + message + "' target='_blank'><li style='background-color: #ca333a; color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>" + fileName + "<i class='fa fa-paperclip' style='font-size: 1.5em; float: right'></i></li></a>");
      }
    }
  }, {
    key: "onChangeMessageBox",
    value: function onChangeMessageBox(e) {
      this.setState({
        message_box: e.target.value
      });
    } // send chat message

  }, {
    key: "sendMessage",
    value: function sendMessage() {
      // const message ={ message_box : this.state.message_box }
      var message = this.state.message_box;
      jquery__WEBPACK_IMPORTED_MODULE_4___default()("#message_area").append("<li style='background-color: rgb(33, 103, 172); color: rgb(255, 255, 255); padding: 5px 10px; margin: 5px; border-radius: 10px;'>" + message + "</li>"); // auto scroll to bottom of page

      jquery__WEBPACK_IMPORTED_MODULE_4___default()('#message_area').animate({
        scrollTop: jquery__WEBPACK_IMPORTED_MODULE_4___default()('#message_area')[0].scrollHeight
      }, 2000);
      console.log(message); // console.log(testmessage);

      var send_message = {
        message: message
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/api/pharm/patient/chat/message/send/" + this.state.patient_id + '/' + this.state.pharm_id + "?token=".concat(this.state.token), send_message).then(function (response) {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      }).then(function (json) {
        if (json.status == 200) {
          jquery__WEBPACK_IMPORTED_MODULE_4___default()("#message_box").val("");
        } else {}
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    }
  }, {
    key: "sendFile",
    value: function sendFile(e) {
      this.setState({
        send_file: e.target.files[0]
      }, this.submitSendFile);
    }
  }, {
    key: "trigerSendFile",
    value: function trigerSendFile() {
      jquery__WEBPACK_IMPORTED_MODULE_4___default()('#send_file').trigger('click');
    }
  }, {
    key: "submitSendFile",
    value: function submitSendFile(e) {
      var _this11 = this; // e.preventDefault() // Stop form submit


      this.uploadSendFile().then(function (response) {
        // console.log(response.data);
        if (response.data.success) {// this.setState({
          //   successMessage: "Profile picture uploaded successfully",
          //   showSuccess: true
          // });
        } else {// this.setState({
            //   errorMessage: response.data.data.profile_picture,
            //   showError: true
            // });
          }
      })["catch"](function (error) {
        _this11.setState({
          showError: true
        });
      });
    }
  }, {
    key: "uploadSendFile",
    value: function uploadSendFile() {
      var url = '/api/pharm/patient/chat/file/send/' + this.state.patient_id + '/' + this.state.pharm_id + "?token=".concat(this.state.token);
      var formData = new FormData();
      formData.append('send_file', this.state.send_file);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      return Object(axios__WEBPACK_IMPORTED_MODULE_3__["post"])(url, formData, config);
    } // //////////////////////////////////////////////////////////////////////////
    // /////////////// Pharm orders

  }, {
    key: "toggleViewOrder",
    value: function toggleViewOrder() {
      // console.log(id);
      this.setState({
        primaryViewOrder: !this.state.primaryViewOrder // pharm_id: pharm_id,
        // pharm_name: pharm_name,

      }, this.pharmProducts);
    }
  }, {
    key: "viewOrder",
    value: function viewOrder(order_id, total_cart) {
      var _this12 = this;

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/pharm/order/get/" + order_id + "?token=".concat(this.state.token)).then(function (response) {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this12.setState({
            cart_list: json.data.data,
            total_cart: total_cart // pharm_id: json.data.data[0].pharm_id,

          }, _this12.toggleViewOrder);
        } else {}
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    } // //////////////////////////////////////////////////////////

  }, {
    key: "changePharmStatus",
    value: function changePharmStatus(pharm_id) {
      var _this13 = this;

      this.setState({
        pharm_id: pharm_id
      });
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/admin/pharm/change_status/" + pharm_id + "?token=".concat(this.state.token)).then(function (response) {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      }).then(function (json) {
        console.log(json.data);

        if (json.data.success) {
          _this13.setState({}, _this13.componentDidMount);
        } else {}
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    }
  }, {
    key: "changeAccountStatus",
    value: function changeAccountStatus(account_id) {
      var _this14 = this;

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/admin/pharm/change_account_status/" + account_id + "?token=".concat(this.state.token)).then(function (response) {
        console.log("ROI Cartoon");
        console.log(response);
        return response;
      }).then(function (json) {
        console.log(json.data);

        if (json.data.success) {
          _this14.setState({
            successMessage: "Updated successfully",
            showSuccess: true
          }, _this14.componentDidMount());
        } else {
          _this14.setState({
            errorMessage: "Updated failed",
            showError: true
          });
        }
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this15 = this;

      if (this.state.status_pharm == "0") {
        this.state.status_pharm = "Not activated";
      }

      if (this.state.status_pharm == "1") {
        this.state.status_pharm = "Activated";
      } // const { product_image} = this.state


      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "animated fadeIn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "12",
        sm: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Pharmacies"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "12",
        lg: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), " List of Pharmacies"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Table"], {
        responsive: true,
        bordered: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "USERNAME"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "NAME"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "TELEPHONE"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "EMAIL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "COUNTRY"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "District/Province/State"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        style: {
          paddingRight: "55px"
        }
      }, "ACTION"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "STATUS"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, ( // Calculation for the page S/N
      this.state.currentPage = this.state.activePage * 10 - (10 - 1), // ////////////////////////////////////////////////////////////
      this.state.pharms_list.map(function (pharm) {
        if (pharm.status == 1) {
          _this15.state.pharm_status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
            size: "sm",
            onClick: function onClick() {
              return _this15.changePharmStatus(pharm.id);
            },
            active: true,
            color: "danger",
            title: "deactivate account",
            "aria-pressed": "true"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "fa fa-close"
          }));
        } else {
          _this15.state.pharm_status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
            size: "sm",
            onClick: function onClick() {
              return _this15.changePharmStatus(pharm.id);
            },
            active: true,
            color: "success",
            title: "activate account",
            "aria-pressed": "true"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "fa fa-check"
          }));
        }

        var pharm_id = pharm.id; // const name     = pharm.first_name +" "+pharm.last_name+" "+pharm.middle_name;

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: pharm.id
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
          scope: "row"
        }, _this15.state.currentPage++), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, pharm.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, pharm.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, pharm.zip_code, " ", pharm.telephone), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, pharm.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, pharm.pharm_country), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, pharm.pharm_district_province_state), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
          size: "sm",
          onClick: function onClick() {
            return _this15.viewPharm(pharm_id, name);
          },
          className: "btn-facebook btn-brand icon mr-1 mb-1",
          title: "View pharm"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fa fa-user"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
          size: "sm",
          onClick: function onClick() {
            return _this15.viewAccount(pharm_id, name);
          },
          className: "btn-vine btn-brand icon mr-1 mb-1",
          title: "View pharm's account"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fa fa-money"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
          size: "sm",
          onClick: function onClick() {
            return _this15.viewPharmOrders(pharm.id);
          },
          className: "btn-flickr btn-brand icon mr-1 mb-1",
          title: "View pharm's patient"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fa fa-stethoscope"
        }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _this15.state.pharm_status));
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex justify-content-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_js_pagination__WEBPACK_IMPORTED_MODULE_5___default.a, {
        activePage: this.state.activePage_pharms,
        itemsCountPerPage: this.state.itemsCountPerPage_pharms,
        totalItemsCount: this.state.totalItemsCount_pharms,
        pageRangeDisplayed: this.state.pageRangeDisplayed_pharms,
        onChange: this.handlePageChangePharms,
        itemClass: "page-item",
        linkClass: "page-link"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
        isOpen: this.state.pharmView,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalHeader"], {
        toggle: function toggle() {
          return _this15.togglePharmView("close", "close");
        }
      }, "View Pharm"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Pharm's Data"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "3",
        lg: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        // className="rounded-circle"
        src: this.state.logo,
        alt: this.state.name,
        width: "150"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "9",
        lg: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Table"], {
        responsive: true,
        striped: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Username"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.email)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Table"], {
        responsive: true,
        striped: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Zip code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.zip_code)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Telephone"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.telephone)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Country"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.country)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "District/Province/State"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.district_province_state)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.address)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Medical license"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        target: "_blank",
        href: this.state.medical_license
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        size: "sm",
        active: true,
        color: "success",
        title: "View Medical License",
        "aria-pressed": "true"
      }, "View medical license")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Bank name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.bank_name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Bank account name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.bank_account_name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Bank account number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.bank_account_number)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Bank account number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.status_hospital)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.status_pharm)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Registration Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.state.created_at))))))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this15.togglePharmView("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
        isOpen: this.state.accountView,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalHeader"], {
        toggle: function toggle() {
          return _this15.toggleAccountView("close", "close");
        }
      }, "View Account"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Pharm's Account"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Table"], {
        responsive: true,
        bordered: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Username"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Currency"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Order No"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Action"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, ( // Calculation for the page S/N
      this.state.currentPage = this.state.activePage_account * 10 - (10 - 1), // ////////////////////////////////////////////////////////////
      this.state.account_list.map(function (account) {
        if (account.status == 1) {
          _this15.state.status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Badge"], {
            color: "danger"
          }, "Order open");
          _this15.state.payment_status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
            size: "sm",
            onClick: function onClick() {
              return _this15.changeAccountStatus(account.id);
            },
            active: true,
            color: "success",
            title: "pay",
            "aria-pressed": "true"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "fa fa-check"
          }));
        } else if (account.status == 2) {
          _this15.state.status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Badge"], {
            color: "primary"
          }, "Delivered");
          _this15.state.payment_status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
            size: "sm",
            onClick: function onClick() {
              return _this15.changeAccountStatus(account.id);
            },
            active: true,
            color: "success",
            title: "pay",
            "aria-pressed": "true"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "fa fa-check"
          }));
        } else if (account.status == 3) {
          _this15.state.status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Badge"], {
            color: "success"
          }, "Paid");
          _this15.state.payment_status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
            size: "sm",
            onClick: function onClick() {
              return _this15.changeAccountStatus(account.id);
            },
            active: true,
            color: "danger",
            title: "unpay",
            "aria-pressed": "true"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "fa fa-close"
          }));
        }

        var patient_id = account.patient_id;
        var name = account.patient_first_name + " " + account.patient_last_name + " " + account.patient_middle_name;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: account.id
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
          scope: "row"
        }, _this15.state.currentPage++), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, account.patient_username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, account.billing_pharm_fee), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, account.billing_amount_currency), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, account.billing_orderID), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, account.created_at), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _this15.state.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _this15.state.payment_status));
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex justify-content-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_js_pagination__WEBPACK_IMPORTED_MODULE_5___default.a, {
        activePage: this.state.activePage_account,
        itemsCountPerPage: this.state.itemsCountPerPage_account,
        totalItemsCount: this.state.totalItemsCount_account,
        pageRangeDisplayed: this.state.pageRangeDisplayed_account,
        onChange: this.handlePageChangeAccount,
        itemClass: "page-item",
        linkClass: "page-link"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this15.toggleAccountView("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
        isOpen: this.state.primaryPharmPatient,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1200px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalHeader"], {
        toggle: function toggle() {
          return _this15.toggleviewPharmOrders("close", "close");
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), " Orders"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], {
        style: {
          "float": "right"
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " List of Orders"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Table"], {
        responsive: true,
        bordered: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "S/N"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "NAME"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "EMAIL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "ORDER NO"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "PAYER ID"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "AMOUNT"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "CURRENCY"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "DATE"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Action"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, ( // Calculation for the page S/N
      this.state.currentPage = this.state.activePage * 10 - (10 - 1), // ////////////////////////////////////////////////////////////
      this.state.order_list.map(function (order) {
        if (order.status == 1) {
          _this15.state.status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Badge"], {
            color: "danger"
          }, "Not Delivered");
        } else {
          _this15.state.status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Badge"], {
            color: "success"
          }, "Delivered");
        }

        var order_id = order.id;
        var patient_id = order.patient_id;
        var patient_username = order.patient_username;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: order.id
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
          scope: "row"
        }, _this15.state.currentPage++), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, order.billing_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, order.billing_email_address), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, order.billing_orderID), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, order.billing_payerID), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, order.billing_cart_total), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, order.billing_amount_currency), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, order.billing_create_time), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _this15.state.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
          size: "sm",
          onClick: function onClick() {
            return _this15.viewOrder(order_id, order.billing_cart_total);
          },
          className: "btn-facebook btn-brand icon mr-1 mb-1",
          style: {
            marginRight: "15px"
          }
        }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fa fa-eye"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
          size: "sm",
          onClick: function onClick() {
            return _this15.togglePrimary(patient_id, patient_username);
          },
          className: "btn-facebook btn-brand icon mr-1 mb-1"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fa fa-comments"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
          size: "sm",
          onClick: function onClick() {
            return _this15.delivered(order_id, order.patient_id);
          },
          className: "btn-facebook btn-brand icon mr-1 mb-1"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fa fa-check"
        }))));
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex justify-content-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_js_pagination__WEBPACK_IMPORTED_MODULE_5___default.a, {
        activePage: this.state.activePage,
        itemsCountPerPage: this.state.itemsCountPerPage,
        totalItemsCount: this.state.totalItemsCount,
        pageRangeDisplayed: this.state.pageRangeDisplayed,
        onChange: this.handlePageChange,
        itemClass: "page-item",
        linkClass: "page-link"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this15.toggleviewPharmOrders("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
        isOpen: this.state.primary,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalHeader"], {
        toggle: function toggle() {
          return _this15.togglePrimary("close", "close");
        }
      }, "Messages"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Messages"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, this.state.message_list_array), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        id: "message_area",
        style: {
          maxHeight: "300px",
          overflowX: "auto"
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Input"], {
        type: "textarea",
        id: "message_box",
        rows: "2",
        onChange: this.onChangeMessageBox,
        placeholder: "type ..."
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-telegram fa-lg cammedics-color",
        style: {
          cursor: "pointer",
          fontSize: "2em"
        },
        onClick: this.sendMessage
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-paperclip fa-lg cammedics-color",
        style: {
          cursor: "pointer",
          fontSize: "2em",
          "float": "right"
        },
        onClick: this.trigerSendFile
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Input"], {
        type: "file",
        color: "primary",
        id: "send_file",
        style: {
          display: "none"
        } // onChange={this.onChangeProfilePicture}
        ,
        onChange: function onChange(e) {
          _this15.sendFile(e);
        }
      })))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this15.togglePrimary("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
        isOpen: this.state.primaryViewOrder,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1200px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalHeader"], {
        toggle: function toggle() {
          return _this15.toggleViewOrder("close", "close");
        }
      }, "View Order"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Product"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Form"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Product Details")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Table"], {
        responsive: true,
        bordered: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "S/N"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "ITEM"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "CATEGORY"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "QUANTITY"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "UNIT PRICE"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "SUBTOTAL"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, ( // Calculation for the page S/N
      this.state.currentPage = this.state.activePage * 10 - (10 - 1), // ////////////////////////////////////////////////////////////
      this.state.cart_list.map(function (item) {
        if (item.status == 1) {
          _this15.state.status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Badge"], {
            color: "success"
          }, "Completed");
        } else {
          _this15.state.status = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Badge"], {
            color: "danger"
          }, "Not Complete");
        }

        var item_id = item.id; // const item_name  = item.name;

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: item.id
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
          scope: "row"
        }, _this15.state.currentPage++), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.category), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.qty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.sub_total));
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          "float": "right",
          fontSize: "16px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          color: "#ca333a"
        }
      }, "TOTAL: $ ", this.state.total_cart, "(USD)")))))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this15.toggleViewOrder("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert1",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this15.setState({
            showSuccess: true
          });
        }
      }, "Alert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(sweetalert2_react__WEBPACK_IMPORTED_MODULE_7___default.a, {
        show: this.state.showSuccess // title="Demo"
        ,
        type: "success",
        confirmButtonColor: "#2167ac",
        animation: "true",
        text: this.state.successMessage,
        onConfirm: function onConfirm() {
          return _this15.setState({
            showSuccess: false
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert2",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this15.setState({
            showError: true
          });
        }
      }, "Alert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(sweetalert2_react__WEBPACK_IMPORTED_MODULE_7___default.a, {
        show: this.state.showError // title="Demo"
        ,
        type: "warning",
        confirmButtonColor: "#2167ac",
        animation: "true",
        text: this.state.errorMessage,
        onConfirm: function onConfirm() {
          return _this15.setState({
            showError: false
          });
        }
      }));
    }
  }]);

  return Pharms;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Pharms);

/***/ })

}]);