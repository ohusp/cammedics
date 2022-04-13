(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[137],{

/***/ "./resources/coreui/src/views/SpreadLove/SpreadLove.js":
/*!*************************************************************!*\
  !*** ./resources/coreui/src/views/SpreadLove/SpreadLove.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/dist/react-datepicker.min.js");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ "./node_modules/react-datepicker/dist/react-datepicker.css");
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var sweetalert2_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2-react */ "./node_modules/sweetalert2-react/dist/sweetalert-react.min.js");
/* harmony import */ var sweetalert2_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-paypal-button-v2 */ "./node_modules/react-paypal-button-v2/lib/index.js");
/* harmony import */ var react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flutterwave_react_v3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flutterwave-react-v3 */ "./node_modules/flutterwave-react-v3/dist/index.es.js");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-spinners/ScaleLoader */ "./node_modules/react-spinners/ScaleLoader.js");
/* harmony import */ var react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
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

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  margin: 0 auto;\n  border-color: red;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}




 // import axios from 'axios';





 // ////////// LOADER /////////////////////////////////



var override = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__["css"])(_templateObject()); // ///////////////////////////////////////////////////


var hashHistory = Object(history__WEBPACK_IMPORTED_MODULE_3__["createHashHistory"])();

var SpreadLove = /*#__PURE__*/function (_Component) {
  _inherits(SpreadLove, _Component);

  var _super = _createSuper(SpreadLove);

  function SpreadLove(props) {
    var _this;

    _classCallCheck(this, SpreadLove);

    _this = _super.call(this, props);
    _this.toggleMakePayment = _this.toggleMakePayment.bind(_assertThisInitialized(_this));
    _this.onSubmitFlutterPay = _this.onSubmitFlutterPay.bind(_assertThisInitialized(_this));
    _this.onSubmitNumberofTicket = _this.onSubmitNumberofTicket.bind(_assertThisInitialized(_this));
    _this.onChangeNumberTicket = _this.onChangeNumberTicket.bind(_assertThisInitialized(_this));
    _this.onSubmitJoinConcert = _this.onSubmitJoinConcert.bind(_assertThisInitialized(_this));
    _this.onSubmitNominee = _this.onSubmitNominee.bind(_assertThisInitialized(_this));
    _this.toggleNominate = _this.toggleNominate.bind(_assertThisInitialized(_this));
    _this.onChangeNomineeName = _this.onChangeNomineeName.bind(_assertThisInitialized(_this));
    _this.onChangeNomineeEmail = _this.onChangeNomineeEmail.bind(_assertThisInitialized(_this));
    _this.onChangeNomineeTelephone = _this.onChangeNomineeTelephone.bind(_assertThisInitialized(_this));
    _this.onChangeNomineeAddress = _this.onChangeNomineeAddress.bind(_assertThisInitialized(_this));
    _this.toggleJoinConcert = _this.toggleJoinConcert.bind(_assertThisInitialized(_this));
    _this.onChangePasscode = _this.onChangePasscode.bind(_assertThisInitialized(_this));
    _this.state = {
      token: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.auth_token : "",
      id: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.id : "",
      username: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.username : "",
      first_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.first_name : "",
      last_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.last_name : "",
      middle_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.middle_name : "",
      primaryMakePayment: false,
      primaryNominate: false,
      primaryJoinConcert: false,
      concert_fee: 27.50,
      naira_concert_fee: 13200,
      concert_fee_display: 25,
      naira_concert_fee_display: 12000,
      handling_fee: 2.50,
      naira_handling_fee: 1200,
      number_ticket: "1",
      showNomination: "none",
      showPayForTicket: "none",
      showInputNumberTicket: "none",
      showNumberTicketButton: "block",
      getDetails: "",
      firstname: "",
      lastname: "",
      name: "",
      email: "",
      telephone: "",
      // ////////////////////////
      passcode: "",
      nominee_name: "",
      nominee_email: "",
      nominee_telephone: "",
      nominee_address: "",
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////
      concertInfoDiv: "block",
      liveConcertDiv: "none",
      successMessage: "Successful",
      errorMessage: "Failed",
      // /////////////////////////////////////////////////////////////
      // ////////////////////// SEARCH FOR THIS ///////////////////////////////////////
      // path_link: "http://localhost:3001",
      path_link: "https://concert.cammedics.com"
    };
    return _this;
  }

  _createClass(SpreadLove, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      try {
        // get the url param
        var url_string = window.location.href;
        var transaction_details = url_string.split('?')[1];
        var transaction_details = transaction_details.split('&');
        var transaction_status = transaction_details[0];
        var transaction_ref = transaction_details[1]; // if successful, verify again before displaying success message for flutter, else display error message

        if (transaction_status == "success") {
          // ////////////// LOADER ////////////
          this.setState({
            showDiv: "block",
            loading: true
          }); // ////////////////////////////////

          var payment_data = {
            transaction_id: transaction_ref,
            email: this.state.email
          };
          axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/flutterwave_verify", payment_data).then(function (response) {
            // console.log(response);
            return response;
          }).then(function (json) {
            // ////////// LOADER //////////////
            _this2.setState({
              showDiv: "none",
              loading: false
            }); // ///////////////////////////////


            if (json.data.success) {
              // console.log(json.data.data)
              _this2.setState({
                successMessage: "Payment successful",
                showSuccess: true
              }, _this2.toggleNominate); // this.props.history.push(`/spread_the_love`)

            } else {
              _this2.setState({
                errorMessage: json.data.data,
                showError: true
              }); // history.push("/spread_the_love");

            }
          })["catch"](function (error) {// console.error(`An Error Occuredd! ${error}`);
          });
        } else if (transaction_status == "tampered") {
          this.setState({
            errorMessage: "Transaction error. Transaction has been tampered with",
            showError: true
          });
        } else if (transaction_status == "Fraud") {
          this.setState({
            errorMessage: "Transaction error. Fraud transaction detected",
            showError: true
          });
        } else if (transaction_status == "No-transaction") {
          this.setState({
            errorMessage: "No transaction was found",
            showError: true
          });
        } else {
          this.setState({
            errorMessage: transaction_status,
            showError: true
          });
        }
      } catch (error) {
        // check category of user then attach the appropriate link to fetch details
        var login_from = localStorage.getItem("login_from");

        if (login_from == "patient") {
          this.setState({
            getDetails: "/api/patient/get/"
          }, this.getDetails);
        } else if (login_from == "doctor") {
          this.setState({
            getDetails: "/api/doc/get/"
          }, this.getDetails);
        } else if (login_from == "pharm") {
          this.setState({
            getDetails: "/api/pharm/get/"
          }, this.getDetails);
        } else if (login_from == "hospital") {
          this.setState({
            getDetails: "/api/hospital/get/"
          }, this.getDetails);
        } else if (login_from == "port") {
          this.setState({
            getDetails: "/api/port/get/"
          }, this.getDetails);
        } else if (login_from == "laboratory") {
          this.setState({
            getDetails: "/api/lab/get/"
          }, this.getDetails);
        }
      }
    }
  }, {
    key: "getDetails",
    value: function getDetails() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_4___default.a.get("".concat(this.state.getDetails) + this.state.id + "?token=".concat(this.state.token)).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          if (json.data.data.telephone == null || json.data.data.telephone == "") {
            _this3.setState({
              errorMessage: "Please go to profile page and complete your profile update",
              showError: true
            });
          } // console.log(json.data.data)


          var login_from = localStorage.getItem("login_from");

          if (login_from == "patient") {
            _this3.setState({
              email: json.data.data.email,
              name: json.data.data.first_name + " " + json.data.data.last_name,
              username: json.data.data.username,
              telephone: json.data.data.zip_code + json.data.data.telephone
            });
          }

          if (login_from == "doctor") {
            _this3.setState({
              email: json.data.data.email,
              name: json.data.data.first_name + " " + json.data.data.last_name,
              username: json.data.data.username,
              telephone: json.data.data.zip_code + json.data.data.telephone
            });
          }

          if (login_from == "pharm" || "hospital" || "port" || "laboratory") {
            _this3.setState({
              email: json.data.data.email,
              name: json.data.data.name,
              username: json.data.data.username,
              telephone: json.data.data.zip_code + json.data.data.telephone
            });
          }
        } else {}
      })["catch"](function (error) {// redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        // console.error(`An Error Occuredd! ${error}`);
      });
    } // checkConcertBookings(){
    //   // alert(this.state.username)
    //   const concert_data ={
    //     username : this.state.username,  
    //   }
    //   axios.post(`/check/concert/`+this.state.id+`?token=${this.state.token}`, concert_data)
    //   .then(response => {
    //     return response;
    //   })
    //   .then(json => {
    //     console.log(json.data)
    //     if (json.data.success) {
    //       this.setState({ 
    //         // reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleJoinConcert()} style={{float: "right", marginRight: "10px"}}>Join Concert Now</Button>,
    //         reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Register Now</Button>,
    //       })
    //     } else {
    //       this.setState({ 
    //         reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Register Now</Button>,
    //       })
    //     }
    //   })
    //   .catch(error => {
    //     // redirect user to previous page if user does not have autorization to the page
    //     // hashHistory.push('/premontessori');
    //     console.error(`An Error Occuredd! ${error}`);
    //   });
    // }

  }, {
    key: "onChangeNumberTicket",
    value: function onChangeNumberTicket(e) {
      this.setState({
        number_ticket: e.target.value
      });
    }
  }, {
    key: "onChangePasscode",
    value: function onChangePasscode(e) {
      this.setState({
        passcode: e.target.value
      });
    }
  }, {
    key: "onChangeNomineeName",
    value: function onChangeNomineeName(e) {
      this.setState({
        nominee_name: e.target.value
      });
    }
  }, {
    key: "onChangeNomineeEmail",
    value: function onChangeNomineeEmail(e) {
      this.setState({
        nominee_email: e.target.value
      });
    }
  }, {
    key: "onChangeNomineeTelephone",
    value: function onChangeNomineeTelephone(e) {
      this.setState({
        nominee_telephone: e.target.value
      });
    }
  }, {
    key: "onChangeNomineeAddress",
    value: function onChangeNomineeAddress(e) {
      this.setState({
        nominee_address: e.target.value
      });
    } // /////////////// Make payment

  }, {
    key: "toggleMakePayment",
    value: function toggleMakePayment(data1, data2) {
      // console.log(id);
      if (data1 == "close") {
        this.setState({
          primaryMakePayment: false
        });
      } else {
        this.setState({
          primaryMakePayment: !this.state.primaryMakePayment,
          showInputNumberTicket: "none",
          showPayForTicket: "none",
          showNumberTicketButton: "block"
        });
      }
    }
  }, {
    key: "buySingleTicket",
    value: function buySingleTicket() {
      this.setState({
        number_ticket: "1",
        showInputNumberTicket: "none",
        showPayForTicket: "block",
        showNumberTicketButton: "none"
      }, this.onSubmitNumberofTicket);
    }
  }, {
    key: "buyMultipleTicket",
    value: function buyMultipleTicket() {
      this.setState({
        showPayForTicket: "none",
        showInputNumberTicket: "block",
        showNumberTicketButton: "none"
      });
    }
  }, {
    key: "noNomination",
    value: function noNomination() {
      this.toggleNominate("close", "close");
      this.props.history.push("/spread_the_love");
    }
  }, {
    key: "yesNomination",
    value: function yesNomination() {
      this.setState({
        showNomination: "block"
      });
    } // /////////////// Nominate beneficiary

  }, {
    key: "toggleNominate",
    value: function toggleNominate(data1, data2) {
      // console.log(id);
      // this.toggleNominate("close", "close");
      if (data1 == "close") {
        this.setState({
          primaryNominate: false
        });
      } else {
        this.setState({
          primaryNominate: !this.state.primaryNominate
        });
      }
    } // /////////////// JOin Concert

  }, {
    key: "toggleJoinConcert",
    value: function toggleJoinConcert(data1, data2) {
      // console.log(id);
      if (data1 == "close") {
        this.setState({
          primaryJoinConcert: false
        });
      } else {
        this.setState({
          primaryJoinConcert: !this.state.primaryJoinConcert
        });
      }
    }
  }, {
    key: "onSubmitNumberofTicket",
    value: function onSubmitNumberofTicket(e) {
      var _this4 = this;

      if (e) {
        e.preventDefault();
      }

      var payment_data = {
        username: this.state.username,
        number_ticket: this.state.number_ticket
      };
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/number/ticket/" + this.state.id + "?token=".concat(this.state.token), payment_data).then(function (response) {
        // console.log(response);
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this4.setState({
            number_ticket: json.data.data.number_ticket,
            concert_fee: json.data.data.total_amount,
            naira_concert_fee: json.data.data.naira_total_amount,
            showInputNumberTicket: "none",
            showPayForTicket: "block",
            handling_fee: _this4.state.number_ticket * 2.50,
            naira_handling_fee: _this4.state.number_ticket * 1200,
            concert_fee_display: _this4.state.number_ticket * 25,
            naira_concert_fee_display: _this4.state.number_ticket * 12000
          });
        } else {
          _this4.setState({
            showError: true
          });
        }
      })["catch"](function (error) {});
    }
  }, {
    key: "onSubmitFlutterPay",
    value: function onSubmitFlutterPay(e) {
      var _this5 = this;

      e.preventDefault();
      var payment_data = {
        // amount : this.state.amount, 
        username: this.state.username,
        number_ticket: this.state.number_ticket,
        amount: this.state.concert_fee,
        email: this.state.email,
        name: this.state.first_name + " " + this.state.last_name,
        phone_number: this.state.telephone
      };
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/flutterwave_pay", payment_data).then(function (response) {
        // console.log(response);
        return response;
      }).then(function (json) {
        if (json.data.success) {
          // console.log(json.data.data)
          // this.setState({
          //   showSuccess: true
          // });
          // var win = window.open(json.data.data, '_blank');
          var win = window.open(json.data.data, '_self');
          win.focus();
        } else {
          _this5.setState({
            showError: true
          });
        }
      })["catch"](function (error) {// redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        // console.error(`An Error Occuredd! ${error}`);
      });
    }
  }, {
    key: "onSubmitPayPal",
    value: function onSubmitPayPal() {
      var _this6 = this; // ////////////// LOADER ////////////


      this.setState({
        showDiv: "block",
        loading: true
      }); // ////////////////////////////////

      var payment_data = {
        username: this.state.username,
        number_ticket: this.state.number_ticket,
        billing_email_address: this.state.billing_email_address,
        billing_name: this.state.billing_name,
        billing_amount_currency: this.state.billing_amount_currency,
        billing_amount_value: this.state.billing_amount_value,
        billing_orderID: this.state.billing_orderID,
        billing_payerID: this.state.billing_payerID
      };
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/paypal_pay", payment_data).then(function (response) {
        // console.log(response);
        return response;
      }).then(function (json) {
        // ////////// LOADER //////////////
        _this6.setState({
          showDiv: "none",
          loading: false
        }); // ///////////////////////////////


        if (json.data.success) {
          // console.log(json.data.data)
          _this6.setState({
            successMessage: "Payment successful",
            showSuccess: true
          }, _this6.toggleNominate);
        } else {
          _this6.setState({
            showError: true
          });
        }
      })["catch"](function (error) {// redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        // console.error(`An Error Occuredd! ${error}`);
      });
    }
  }, {
    key: "onSubmitJoinConcert",
    value: function onSubmitJoinConcert(e) {
      var _this7 = this;

      e.preventDefault();
      var login_from = localStorage.getItem("login_from");

      if (this.state.passcode == "" || this.state.passcode == null) {
        this.setState({
          errorMessage: "Please fill all required field",
          showError: true
        });
      } else {
        var concert_data = {
          user_type: login_from,
          passcode: this.state.passcode
        };
        axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/check/concert/passcode/" + this.state.id + "?token=".concat(this.state.token), concert_data).then(function (response) {
          return response;
        }).then(function (json) {
          if (json.data.success) {
            console.log(json.data.data); // if successful display successful message, hide login div, call passPatientDataToIframe and pass details

            _this7.setState({
              successMessage: "Correct",
              showSuccess: true,
              showDiv: "none",
              concertInfoDiv: "none",
              liveConcertDiv: "block"
            }, _this7.passPatientDataToIframe(json.data.data));
          } else {
            _this7.setState({
              errorMessage: "Link does not exist",
              showError: true
            });
          }
        })["catch"](function (error) {// redirect user to previous page if user does not have autorization to the page
          // hashHistory.push('/premontessori');
          // console.error(`An Error Occuredd! ${error}`);
        });
      }
    }
  }, {
    key: "passPatientDataToIframe",
    value: function passPatientDataToIframe(roomLink) {
      this.toggleJoinConcert("close", "close"); // click to toggle n expand div

      document.getElementById("navigationToggler").click(); // hide header

      document.getElementById("navigationPanel").style.display = "none";
      document.getElementById("footer-bottom").style.display = "none"; // pass the link the user pasted into the iframe

      var screen_video = roomLink;
      var iframe = document.createElement("iframe");
      iframe.src = screen_video;
      iframe.id = "live_chat_frame";
      iframe.width = "100%";
      iframe.height = "700px";
      iframe.allow = "camera *;microphone *";
      document.getElementById("live_concert_div").innerHTML = "";
      document.getElementById("live_concert_div").appendChild(iframe); // var login_as    = this.state.login_as;

      var username = this.state.username; // var first_name  = this.state.first_name;
      // var last_name   = this.state.last_name;

      var path_link = this.state.path_link;
      setTimeout(function () {
        // var name  = first_name+" "+last_name;
        var messageSent = username;
        document.getElementById('live_chat_frame').contentWindow.postMessage(messageSent, path_link);
      }, 1000);
    }
  }, {
    key: "onSubmitNominee",
    value: function onSubmitNominee(e) {
      var _this8 = this;

      e.preventDefault(); // var login_from  = localStorage.getItem("login_from");

      if (this.state.nominee_name == "" || this.state.nominee_email == "" || this.state.nominee_telephone == "" || this.state.nominee_address == "" || this.state.nominee_name == null || this.state.nominee_email == null || this.state.nominee_telephone == null || this.state.nominee_address == null) {
        this.setState({
          errorMessage: "Please fill all required field",
          showError: true
        });
      } else {
        var nominee_data = {
          username: this.state.username,
          nominee_name: this.state.nominee_name,
          nominee_email: this.state.nominee_email,
          nominee_telephone: this.state.nominee_telephone,
          nominee_address: this.state.nominee_address
        };
        axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/nominate/beneficiary/" + this.state.id + "?token=".concat(this.state.token), nominee_data).then(function (response) {
          return response;
        }).then(function (json) {
          if (json.data.success) {
            _this8.setState({
              successMessage: "Beneficiary nominated",
              showSuccess: true,
              showDiv: "none"
            }, _this8.props.history.push("/spread_the_love"));

            _this8.toggleNominate("close", "close");
          } else {
            _this8.setState({
              errorMessage: json.data.data,
              showError: true
            }, _this8.props.history.push("/spread_the_love"));
          }
        })["catch"](function (error) {// redirect user to previous page if user does not have autorization to the page
          // hashHistory.push('/premontessori');
          // console.error(`An Error Occuredd! ${error}`);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "animated fadeIn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          display: this.state.liveConcertDiv
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "live_concert_div"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          display: this.state.concertInfoDiv
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "12",
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-heart",
        style: {
          color: "#ca333a",
          fontSize: "0.93125rem"
        }
      }, " "), " ", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-heart",
        style: {
          color: "#ca333a",
          fontSize: "0.73125rem"
        }
      }, " "), " ", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-heart",
        style: {
          color: "#ca333a",
          fontSize: "0.53125rem"
        }
      }, " "), " ", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          fontWeight: "700"
        }
      }, "Spread the Love Concert ", " ", " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-heart",
        style: {
          color: "#ca333a",
          fontSize: "0.53125rem"
        }
      }, " "), " ", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-heart",
        style: {
          color: "#ca333a",
          fontSize: "0.73125rem"
        }
      }, " "), " ", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-heart",
        style: {
          color: "#ca333a",
          fontSize: "0.93125rem"
        }
      }, " "), " ", " "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sweet-loading",
        style: {
          position: "fixed",
          height: "100%",
          width: "100%",
          display: this.state.showDiv,
          top: "50%",
          left: "50%",
          zIndex: "1500"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          position: "absolute",
          backgroundColor: "#ffffffcf",
          width: "100px",
          padding: "15px",
          borderRadius: "20px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_10___default.a, {
        css: override,
        height: 50,
        width: 3,
        radius: 2,
        margin: 5,
        color: "#2167ac",
        loading: this.state.loading
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
        style: {
          color: "#ca333a"
        }
      }, "Loading..."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "7",
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "ADOPT A POOR NIGERIAN FOR FREE MEDICAL TREATMENT THIS YEAR")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "5",
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary",
        onClick: function onClick() {
          return _this9.toggleMakePayment();
        },
        style: {
          "float": "right"
        }
      }, "Get a Ticket Now"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary",
        onClick: function onClick() {
          return _this9.toggleJoinConcert();
        },
        style: {
          "float": "right",
          marginRight: "10px"
        }
      }, "Join Concert Now")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), "Sickness should not be a death sentence, but for most Nigerians, it is, because they cannot afford to pay for their medical treatment. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "CamMedics is partnering with FCT HEALTH INSURANCE SCHEME to reach such vulnerable people.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "To benefit from the program, they must be;", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "(a) Nigerian citizens or residents. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "(b)  Unable to pay for their medical treatment without external assistance and fall into one or more of the following categories:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "1. Elderly or retirees above the age of 60 years.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "2. Students and unemployed youths under the age of 40 years.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "3.Unemployed pregnant women, widows or single mothers.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "4. Physically challenged persons.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "4. Mentally challenged persons.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "5. Self employed rural dwellers like farmers, artisans, traders etc.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "6. Employees in the informal sector earning the minimum wage or below.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "This valentine you can Spread the love, to save a life  by purchasing a ticket of $25 usd for the  online concert and nominating a vulnerable Nigerian that falls into the above category for free medical treatment throughout the year 2021.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Sending a vulnerable person a gift of free medical treatment can make a difference between life and death.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "We can save a life now and not wait until the person has a medical emergency or they  are in their death bed to appeal for assistance.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "If you qualify to benefit from this program, you are free to appeal for your own sponsor and appeal to the person to nominate you for the free medical treatment. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Please support this initiative.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Get a ticket for the, SPREAD THE LOVE, TO SAVE A LOVE CONCERT.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "#Spreadthelovetosavealife this valentine.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        color: "primary",
        onClick: function onClick() {
          return _this9.toggleMakePayment();
        },
        style: {
          width: "100%"
        }
      }, "Get a Ticket Now")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        style: {
          marginLeft: "30px",
          fontSize: "12px",
          color: "#ca333a"
        }
      }, "For quick assitance or question, please contact +234 816 525 3939 / +186 9765 1697 / +234 806 894 8689 (WhatsApp)"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Modal"], {
        isOpen: this.state.primaryMakePayment,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalHeader"], {
        toggle: function toggle() {
          return _this9.toggleMakePayment("close", "close");
        }
      }, "Make Payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Make Payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], {
        style: {
          display: this.state.showNumberTicketButton,
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "12",
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "text-center"
      }, "How many tickets will you like to buy")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "6",
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        color: "primary",
        onClick: function onClick() {
          return _this9.buySingleTicket();
        },
        style: {
          width: "100%"
        }
      }, "Buy a Single Ticket")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "6",
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        color: "primary",
        onClick: function onClick() {
          return _this9.buyMultipleTicket();
        },
        style: {
          width: "100%"
        }
      }, "Buy Multiple Ticket"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], {
        style: {
          display: this.state.showInputNumberTicket,
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "2"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Form"], {
        onSubmit: this.onSubmitNumberofTicket
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Number of Tickets")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Input"], {
        type: "number",
        onChange: this.onChangeNumberTicket
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-ticket-alt"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary",
        style: {
          width: "25%"
        }
      }, "Submit")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "2"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], {
        style: {
          display: this.state.showPayForTicket,
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Number of Ticket(s): ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, this.state.number_ticket))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Concert Fee: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee_display, " (\u20A6", this.state.naira_concert_fee_display, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Handling Fee: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.handling_fee, " (\u20A6", this.state.naira_handling_fee, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Total: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee, " (\u20A6", this.state.naira_concert_fee, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardHeader"], null, "Pay in USD ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_7__["PayPalButton"], {
        amount: this.state.concert_fee // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        ,
        onSuccess: function onSuccess(details, data) {
          _this9.state.billing_amount_currency = details.purchase_units[0].amount.currency_code;
          _this9.state.billing_amount_value = details.purchase_units[0].amount.value;
          _this9.state.billing_orderID = data.orderID;
          _this9.state.billing_payerID = data.payerID;
          _this9.state.billing_email_address = details.payer.email_address;
          _this9.state.billing_name = details.payer.name.given_name + " " + details.payer.name.surname; // console.log(details);
          // console.log(data);
          // console.log(details.purchase_units[0].amount.currency_code)
          // console.log(details.purchase_units[0].amount.value)

          return _this9.onSubmitPayPal();
        },
        onError: function onError(err) {
          alert(err);
          window.location.reload();
        },
        options: {
          clientId: "AVx-UESGmRd47pO8XzTG7_vMWsTHaAybTQIhdOHz2vxId7vHZxtzQL07KKs0JN7Z2pECJw4Jk-0KGszf" // disableFunding: "card"

        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardHeader"], null, "Pay in Naira ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "\u20A6", this.state.naira_concert_fee)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        className: "btn-lg",
        color: "primary",
        onClick: this.onSubmitFlutterPay,
        style: {
          width: "100%",
          backgroundColor: "#c88009"
        }
      }, "Flutterwave")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "3"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this9.toggleMakePayment("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Modal"], {
        isOpen: this.state.primaryNominate,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalHeader"], {
        toggle: function toggle() {
          return _this9.toggleNominate("close", "close");
        }
      }, "Nominate Beneficiary"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Nominate your preferred beneficiary"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], {
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "12",
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "Would you like to Nominate a beneficiary for our health insurance scheme")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        color: "primary",
        onClick: function onClick() {
          return _this9.yesNomination();
        },
        style: {
          width: "100%"
        }
      }, "Yes")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        onClick: function onClick() {
          return _this9.noNomination();
        },
        style: {
          width: "100%",
          backgroundColor: "#ca333a",
          color: "#ffffff"
        }
      }, "No"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], {
        style: {
          display: this.state.showNomination,
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "3",
        sm: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "6",
        sm: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Form"], {
        onSubmit: this.onSubmitNominee
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Do you have anyone you would love to nominate as beneficiary for our health insurance, kindly fill in their details below."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Input"], {
        type: "text",
        id: "nominee_name",
        onChange: this.onChangeNomineeName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Email")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Input"], {
        type: "text",
        id: "nominee_email",
        onChange: this.onChangeNomineeEmail
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Telephone Number")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Input"], {
        type: "text",
        id: "nominee_telephone",
        onChange: this.onChangeNomineeTelephone
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Address")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Input"], {
        type: "textarea",
        id: "nominee_address",
        rows: "2",
        onChange: this.onChangeNomineeAddress,
        placeholder: " Address"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-asterisk"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary"
      }, "Submit")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "3",
        sm: "1"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this9.toggleNominate("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Modal"], {
        isOpen: this.state.primaryJoinConcert,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalHeader"], {
        toggle: function toggle() {
          return _this9.toggleJoinConcert("close", "close");
        }
      }, "Join Concert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Join Concert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Please paste your concert passcode here. Copy it from the email sent to you after payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "3",
        sm: "2"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Form"], {
        onSubmit: this.onSubmitJoinConcert
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Passcode")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Input"], {
        type: "text",
        id: "passcode",
        defaultValue: this.state.passcode,
        onChange: this.onChangePasscode
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["FormGroup"], {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary"
      }, "Join")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "3",
        sm: "2"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this9.toggleJoinConcert("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert1",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this9.setState({
            showSuccess: true
          });
        }
      }, "Alert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(sweetalert2_react__WEBPACK_IMPORTED_MODULE_6___default.a, {
        show: this.state.showSuccess // title="Demo"
        ,
        type: "success",
        confirmButtonColor: "#2167ac",
        animation: "true",
        text: this.state.successMessage,
        onConfirm: function onConfirm() {
          return _this9.setState({
            showSuccess: false
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert2",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this9.setState({
            showError: true
          });
        }
      }, "Alert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(sweetalert2_react__WEBPACK_IMPORTED_MODULE_6___default.a, {
        show: this.state.showError // title="Demo"
        ,
        type: "warning",
        confirmButtonColor: "#2167ac",
        animation: "true",
        text: this.state.errorMessage,
        onConfirm: function onConfirm() {
          return _this9.setState({
            showError: false
          });
        }
      }));
    }
  }]);

  return SpreadLove;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (SpreadLove);

/***/ })

}]);