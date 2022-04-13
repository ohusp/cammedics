(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[43],{

/***/ "./resources/coreui/src/images/logo/cam-medics-logo.png":
/*!**************************************************************!*\
  !*** ./resources/coreui/src/images/logo/cam-medics-logo.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/images/cam-medics-logo.png?20d7a32b8eafe9ebd1a3a00687b3ed63";

/***/ }),

/***/ "./resources/coreui/src/views/Pages/Concert/Concert.js":
/*!*************************************************************!*\
  !*** ./resources/coreui/src/views/Pages/Concert/Concert.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var aes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aes */ "./node_modules/aes/index.js");
/* harmony import */ var aes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-paypal-button-v2 */ "./node_modules/react-paypal-button-v2/lib/index.js");
/* harmony import */ var react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sweetalert2_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2-react */ "./node_modules/sweetalert2-react/dist/sweetalert-react.min.js");
/* harmony import */ var sweetalert2_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-spinners/ScaleLoader */ "./node_modules/react-spinners/ScaleLoader.js");
/* harmony import */ var react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_6__);
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


 // import {register} from './../../../functions/UserFunctions'



 // ////////// LOADER /////////////////////////////////



var override = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject()); // ///////////////////////////////////////////////////

var validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

var validateForm = function validateForm(errors) {
  var valid = true;
  Object.values(errors).forEach(function (val) {
    return val.length > 0 && (valid = false);
  });
  return valid;
};

var Concert = /*#__PURE__*/function (_Component) {
  _inherits(Concert, _Component);

  var _super = _createSuper(Concert);

  function Concert() {
    var _this;

    _classCallCheck(this, Concert);

    _this = _super.call(this);

    _this.onChange = function (e) {
      _this.onChangeState(e); // this.handleChange(e)

    };

    _this.handleChange = function (event) {
      event.preventDefault();
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;
      var errors = _this.state.errors; // called to empty thec alert on top of the form

      _this.setState({
        alert_message: ""
      });

      switch (name) {
        // case 'fullName': 
        //   errors.fullName = 
        //     value.length < 5
        //       ? 'Full Name must be at least 5 characters long!'
        //       : '';
        //   break;
        case 'username':
          _this.checkUsername(value);

          break;

        case 'email':
          errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';

          _this.checkEmail(value);

          break;

        case 'password':
          errors.password = value.length < 8 ? 'Password must be at least 8 characters long!' : '';
          break;

        case 'confirmPassword':
          if (_this.state.password !== value) {
            errors.confirmPassword = "Password and Confirm Password does not match.";
          } else {
            errors.confirmPassword = "";
          }

          break;

        default:
          break;
      }

      _this.setState(_defineProperty({
        errors: errors
      }, name, value));
    };

    _this.toggleMakePayment = _this.toggleMakePayment.bind(_assertThisInitialized(_this));
    _this.onSubmitFlutterPay = _this.onSubmitFlutterPay.bind(_assertThisInitialized(_this));
    _this.onChangeNumberTicket = _this.onChangeNumberTicket.bind(_assertThisInitialized(_this));
    _this.onChangeTC = _this.onChangeTC.bind(_assertThisInitialized(_this));
    _this.onSubmitNominee = _this.onSubmitNominee.bind(_assertThisInitialized(_this));
    _this.toggleNominate = _this.toggleNominate.bind(_assertThisInitialized(_this));
    _this.onChangeNomineeName = _this.onChangeNomineeName.bind(_assertThisInitialized(_this));
    _this.onChangeNomineeEmail = _this.onChangeNomineeEmail.bind(_assertThisInitialized(_this));
    _this.onChangeNomineeTelephone = _this.onChangeNomineeTelephone.bind(_assertThisInitialized(_this));
    _this.onChangeNomineeAddress = _this.onChangeNomineeAddress.bind(_assertThisInitialized(_this));
    _this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      telephone: '00000000000',
      errorMsg: '',
      errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        t_c: ''
      },
      alert_message: '',
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////
      avatar: __webpack_require__(/*! ./../../../images/logo/cam-medics-logo.png */ "./resources/coreui/src/images/logo/cam-medics-logo.png"),
      Cam_Medics: 'CamMedics Logo',
      // ////////////////////////////////////////////////////////////////////////////
      concert_fee: 27.50,
      naira_concert_fee: 13200,
      concert_fee_display: 25,
      naira_concert_fee_display: 12000,
      handling_fee: 2.50,
      naira_handling_fee: 1200,
      number_ticket: "1",
      T_C: "",
      showNomination: "none",
      nominee_name: "",
      nominee_email: "",
      nominee_telephone: "",
      nominee_address: ""
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Concert, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      try {
        // get the url param
        var url_string = window.location.href;
        var transaction_details = url_string.split('?')[1];
        var transaction_details = transaction_details.split('&');
        var transaction_status = transaction_details[0];
        var transaction_ref = transaction_details[1];
        var email = localStorage.getItem("email"); // if successful, verify again before displaying success message for flutter, else display error message

        if (transaction_status == "success") {
          // ////////////// LOADER ////////////
          this.setState({
            showDiv: "block",
            loading: true
          }); // ////////////////////////////////

          var payment_data = {
            transaction_id: transaction_ref,
            email: email
          };
          axios.post("/flutterwave_quick_verify", payment_data).then(function (response) {
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
      } catch (error) {}
    }
  }, {
    key: "onChangeState",
    // onchange for setting state
    value: function onChangeState(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
      this.handleChange(e);
    } // for handling validation

  }, {
    key: "checkUsername",
    value: function checkUsername(value) {
      var _this3 = this;

      var errors = this.state.errors;
      var user_data = {
        username: value
      };
      axios.post('check/username', user_data).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          errors.username = "The username has already been taken";

          _this3.setState({
            alert_message: "error"
          });

          _this3.setState({
            errorMsg: "The username has already been taken. If you already registered or got a ticket, please login to your dashboard and click of the Spread the Love link on the side menu to get a ticket. Thank you."
          });
        } else {
          errors.username = "";
        }
      })["catch"](function (error) {});
    }
  }, {
    key: "checkEmail",
    value: function checkEmail(value) {
      var _this4 = this;

      var errors = this.state.errors;
      var user_data = {
        email: value
      };
      axios.post('check/email', user_data).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          errors.email = "The email has already been taken";

          _this4.setState({
            alert_message: "error"
          });

          _this4.setState({
            errorMsg: "The email has already been taken. If you already registered or got a ticket, please login to your dashboard and click of the Spread the Love link on the side menu to get a ticket. Thank you."
          });
        } else {
          errors.email = "";
        }
      })["catch"](function (error) {});
    }
  }, {
    key: "onChangeNumberTicket",
    value: function onChangeNumberTicket(e) {
      this.setState({
        number_ticket: e.target.value
      }, this.onChangeFee);
    }
  }, {
    key: "onChangeFee",
    value: function onChangeFee(e) {
      this.setState({
        handling_fee: this.state.number_ticket * 2.50,
        naira_handling_fee: this.state.number_ticket * 1200,
        concert_fee_display: this.state.number_ticket * 25,
        naira_concert_fee_display: this.state.number_ticket * 12000,
        concert_fee: this.state.number_ticket * 27.50,
        naira_concert_fee: this.state.number_ticket * 13200
      });
    }
  }, {
    key: "onChangeTC",
    value: function onChangeTC(e) {
      var errors = this.state.errors;
      this.setState({
        T_C: e.target.checked
      });

      if (e.target.checked) {
        errors.t_c = "", this.setState({
          alert_message: ""
        });
        this.setState({
          errorMsg: ""
        });
      }
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
        if (validateForm(this.state.errors)) {
          if (this.state.username == "" || this.state.first_name == "" || this.state.last_name == "" || this.state.email == "" || this.state.password == "" || this.state.confirmPassword == "" || this.state.number_ticket == "" || this.state.number_ticket == "0" || this.state.T_C == "" || this.state.T_C == false) {
            this.setState({
              alert_message: "error"
            });
            this.setState({
              errorMsg: "Please fill all required fields"
            });
          } else {
            this.setState({
              primaryMakePayment: !this.state.primaryMakePayment
            });
          }
        } else {
          this.setState({
            alert_message: "error"
          });
          this.setState({
            errorMsg: "Please fill form correctly"
          });
        }
      }
    }
  }, {
    key: "onSubmitFlutterPay",
    value: function onSubmitFlutterPay(e) {
      var _this5 = this;

      e.preventDefault();
      localStorage["email"] = this.state.email;
      var payment_data = {
        // amount : this.state.amount, 
        username: this.state.username,
        number_ticket: this.state.number_ticket,
        amount: this.state.concert_fee,
        email: this.state.email,
        name: this.state.first_name + " " + this.state.last_name,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password
      };
      axios.post("/flutterwave_quick_pay", payment_data).then(function (response) {
        // console.log(response);
        return response;
      }).then(function (json) {
        if (json.data.success) {
          // console.log(json.data.data)
          // this.setState({
          //   showSuccess: true
          // });
          var win = window.open(json.data.data, '_self'); // var win = window.open(json.data.data);

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
      var _this6 = this; // e.preventDefault();
      // ////////////// LOADER ////////////


      this.setState({
        showDiv: "block",
        loading: true
      }); // ////////////////////////////////

      localStorage["email"] = this.state.email;
      var payment_data = {
        username: this.state.username,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        number_ticket: this.state.number_ticket,
        billing_email_address: this.state.billing_email_address,
        billing_name: this.state.billing_name,
        billing_amount_currency: this.state.billing_amount_currency,
        billing_amount_value: this.state.billing_amount_value,
        billing_orderID: this.state.billing_orderID,
        billing_payerID: this.state.billing_payerID
      };
      axios.post("/paypal_quick_pay", payment_data).then(function (response) {
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
    } // /////////////// Nominate beneficiary

  }, {
    key: "toggleNominate",
    value: function toggleNominate(data1, data2) {
      // console.log(id);
      this.toggleMakePayment("close", "close");

      if (data1 == "close") {
        this.setState({
          primaryNominate: false
        });
      } else {
        this.setState({
          primaryNominate: !this.state.primaryNominate
        });
      }

      this.props.history.push("/concert");
    }
  }, {
    key: "noNomination",
    value: function noNomination() {
      this.toggleNominate("close", "close");
    }
  }, {
    key: "yesNomination",
    value: function yesNomination() {
      this.setState({
        showNomination: "block"
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
    }
  }, {
    key: "onSubmitNominee",
    value: function onSubmitNominee(e) {
      var _this7 = this;

      e.preventDefault(); // var login_from  = localStorage.getItem("login_from");

      if (this.state.nominee_name == "" || this.state.nominee_email == "" || this.state.nominee_telephone == "" || this.state.nominee_address == "" || this.state.nominee_name == null || this.state.nominee_email == null || this.state.nominee_telephone == null || this.state.nominee_address == null) {
        this.setState({
          errorMessage: "Please fill all required field",
          showError: true
        });
      } else {
        var email = localStorage.getItem("email");
        var nominee_data = {
          username: email,
          nominee_name: this.state.nominee_name,
          nominee_email: this.state.nominee_email,
          nominee_telephone: this.state.nominee_telephone,
          nominee_address: this.state.nominee_address
        };
        axios.post("/nominate/beneficiary/" + this.state.id + "?token=".concat(this.state.token), nominee_data).then(function (response) {
          return response;
        }).then(function (json) {
          if (json.data.success) {
            // if successful display successful message, hide login div, call passPatientDataToIframe and pass details
            _this7.setState({
              successMessage: "Beneficiary nominated",
              showSuccess: true,
              showDiv: "none"
            }, _this7.props.history.push("/concert"));

            _this7.toggleNominate("close", "close");
          } else {
            _this7.setState({
              errorMessage: json.data.data,
              showError: true
            }, _this7.props.history.push("/concert"));
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
      var _this8 = this;

      var errors = this.state.errors;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "app align-items-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
        className: "justify-content-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "12",
        lg: "12",
        xl: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "mb-3 mx-auto text-center",
        style: {
          marginTop: "100px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "https://cammedics.com"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "",
        src: this.state.avatar,
        alt: this.state.Cam_Medics,
        width: "160"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], {
        className: "mx-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], {
        className: "p-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Spread the Love Concert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "text-muted"
      }, "Kindly fill in the following information to enable you join the concert"), this.state.alert_message == "success" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Alert"], {
        color: "success"
      }, "Registration Successful") : null, this.state.alert_message == "error" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Alert"], {
        color: "danger"
      }, this.state.errorMsg) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
        className: "mb-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-user"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        name: "username",
        placeholder: "enter username",
        value: this.state.username,
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
        className: "mb-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, "@", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "email",
        className: "form-control",
        name: "email",
        placeholder: "enter email",
        value: this.state.email,
        onChange: this.onChange // onBlur={this.onChange}
        ,
        noValidate: true
      })), errors.email.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
        style: {
          marginBottom: 25
        },
        className: "mr-1",
        color: "danger"
      }, errors.email)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
        className: "mb-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-user"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        name: "first_name",
        placeholder: "enter first name",
        value: this.state.first_name,
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
        className: "mb-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-user"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        name: "last_name",
        placeholder: "enter last name",
        value: this.state.last_name,
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
        className: "mb-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-lock"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "password",
        className: "form-control",
        name: "password",
        placeholder: "enter password",
        onChange: this.onChange // onBlur={this.onChange}
        ,
        noValidate: true
      })), errors.password.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
        style: {
          marginBottom: 25
        },
        className: "mr-1",
        color: "danger"
      }, errors.password)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
        className: "mb-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-lock"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        type: "password",
        placeholder: "Confirm password",
        name: "confirmPassword",
        value: this.state.confirmPassword,
        onChange: this.onChange // onBlur={this.onChange}
        ,
        noValidate: true
      })), errors.confirmPassword.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
        style: {
          marginBottom: 25
        },
        className: "mr-1",
        color: "danger"
      }, errors.confirmPassword)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
        className: "mb-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-lock"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        type: "number",
        placeholder: "Enter number of ticket you want to buy",
        name: "number_ticket",
        value: this.state.number_ticket,
        onChange: this.onChangeNumberTicket
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], {
        style: {
          marginBottom: "30px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Number of Ticket(s): ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, this.state.number_ticket))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Concert Fee: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee_display, " (\u20A6", this.state.naira_concert_fee_display, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Handling Fee: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.handling_fee, " (\u20A6", this.state.naira_handling_fee, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Total: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee, " (\u20A6", this.state.naira_concert_fee, ")"))))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], {
        className: "mb-4",
        style: {
          marginLeft: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        className: "form-check-input",
        type: "checkbox",
        onChange: this.onChangeTC,
        required: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "I agree to CamMedics", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/#/terms_conditions",
        target: "_blank"
      }, " Terms & Conditions"), " and ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/#/privacy_policy",
        target: "_blank"
      }, "Privacy Policy"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "btn btn-lg kiu-btn btn-block",
        onClick: function onClick() {
          return _this8.toggleMakePayment();
        }
      }, "Buy a Ticket")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        style: {
          marginLeft: "30px",
          fontSize: "12px",
          color: "#ca333a"
        }
      }, "For quick assitance or question, please contact +234 816 525 3939 / +186 9765 1697 / +234 806 894 8689 (WhatsApp)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sweet-loading",
        style: {
          position: "fixed",
          height: "100%",
          width: "100%",
          display: this.state.showDiv
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          backgroundColor: "#ffffffcf",
          width: "100px",
          padding: "15px",
          borderRadius: "20px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_6___default.a, {
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
      }, "Loading...")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
        isOpen: this.state.primaryMakePayment,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalHeader"], {
        toggle: function toggle() {
          return _this8.toggleMakePayment("close", "close");
        }
      }, "Make Payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Make Payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], {
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Number of Ticket(s): ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, this.state.number_ticket))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Concert Fee: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee_display, " (\u20A6", this.state.naira_concert_fee_display, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Handling Fee: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.handling_fee, " (\u20A6", this.state.naira_handling_fee, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Total: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee, " (\u20A6", this.state.naira_concert_fee, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardHeader"], null, "Pay in USD ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_3__["PayPalButton"], {
        amount: this.state.concert_fee // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        ,
        onSuccess: function onSuccess(details, data) {
          _this8.state.billing_amount_currency = details.purchase_units[0].amount.currency_code;
          _this8.state.billing_amount_value = details.purchase_units[0].amount.value;
          _this8.state.billing_orderID = data.orderID;
          _this8.state.billing_payerID = data.payerID;
          _this8.state.billing_email_address = details.payer.email_address;
          _this8.state.billing_name = details.payer.name.given_name + " " + details.payer.name.surname; // console.log(details);
          // console.log(data);
          // console.log(details.purchase_units[0].amount.currency_code)
          // console.log(details.purchase_units[0].amount.value)

          return _this8.onSubmitPayPal();
        },
        onError: function onError(err) {
          alert(err);
          window.location.reload();
        },
        options: {
          clientId: "AVx-UESGmRd47pO8XzTG7_vMWsTHaAybTQIhdOHz2vxId7vHZxtzQL07KKs0JN7Z2pECJw4Jk-0KGszf" // "AQ40k3d3ewjABnwQAzBPYcnR-IyQSCKtTR2RpfYmJUZctaSWtaJMiUYZGxzSEPSkoGHWWHDCtHfuUgZx",
          // disableFunding: "card"

        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardHeader"], null, "Pay in Naira ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "\u20A6", this.state.naira_concert_fee)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        type: "submit",
        className: "btn-lg",
        color: "primary",
        onClick: this.onSubmitFlutterPay,
        style: {
          width: "100%",
          backgroundColor: "#c88009"
        }
      }, "Flutterwave")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "3"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this8.toggleMakePayment("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
        isOpen: this.state.primaryNominate,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalHeader"], {
        toggle: function toggle() {
          return _this8.toggleNominate("close", "close");
        }
      }, "Nominate Beneficiary"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Nominate your preferred beneficiary"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], {
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "12",
        style: {
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "Would you like to Nominate a beneficiary for our health insurance scheme")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        type: "submit",
        color: "primary",
        onClick: function onClick() {
          return _this8.yesNomination();
        },
        style: {
          width: "100%"
        }
      }, "Yes")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        type: "submit",
        onClick: function onClick() {
          return _this8.noNomination();
        },
        style: {
          width: "100%",
          backgroundColor: "#ca333a",
          color: "#ffffff"
        }
      }, "No"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], {
        style: {
          display: this.state.showNomination,
          marginBottom: "25px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "3",
        sm: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "6",
        sm: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], {
        onSubmit: this.onSubmitNominee
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Do you have anyone you would love to nominate as beneficiary for our health insurance, kindly fill in their details below."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        type: "text",
        id: "nominee_name",
        onChange: this.onChangeNomineeName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Email")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        type: "text",
        id: "nominee_email",
        onChange: this.onChangeNomineeEmail
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Telephone Number")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        type: "text",
        id: "nominee_telephone",
        onChange: this.onChangeNomineeTelephone
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Address")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        type: "textarea",
        id: "nominee_address",
        rows: "2",
        onChange: this.onChangeNomineeAddress,
        placeholder: " Address"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-asterisk"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"], {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary"
      }, "Submit")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        xs: "3",
        sm: "1"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this8.toggleNominate("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert1",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this8.setState({
            showSuccess: true
          });
        }
      }, "Alert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(sweetalert2_react__WEBPACK_IMPORTED_MODULE_4___default.a, {
        show: this.state.showSuccess // title="Demo"
        ,
        type: "success",
        confirmButtonColor: "#2167ac",
        animation: "true",
        text: this.state.successMessage,
        onConfirm: function onConfirm() {
          return _this8.setState({
            showSuccess: false
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert2",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this8.setState({
            showError: true
          });
        }
      }, "Alert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(sweetalert2_react__WEBPACK_IMPORTED_MODULE_4___default.a, {
        show: this.state.showError // title="Demo"
        ,
        type: "warning",
        confirmButtonColor: "#2167ac",
        animation: "true",
        text: this.state.errorMessage,
        onConfirm: function onConfirm() {
          return _this8.setState({
            showError: false
          });
        }
      })));
    }
  }]);

  return Concert;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Concert);

/***/ })

}]);