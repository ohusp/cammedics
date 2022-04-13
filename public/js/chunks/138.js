(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[138],{

/***/ "./resources/coreui/src/views/TestPage/TestPage.js":
/*!*********************************************************!*\
  !*** ./resources/coreui/src/views/TestPage/TestPage.js ***!
  \*********************************************************/
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

var TestPage = /*#__PURE__*/function (_Component) {
  _inherits(TestPage, _Component);

  var _super = _createSuper(TestPage);

  function TestPage(props) {
    var _this;

    _classCallCheck(this, TestPage);

    _this = _super.call(this, props);
    _this.toggleMakePayment = _this.toggleMakePayment.bind(_assertThisInitialized(_this));
    _this.onSubmitFlutterPay = _this.onSubmitFlutterPay.bind(_assertThisInitialized(_this));
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
      primaryJoinConcert: false,
      concert_fee: 25,
      getDetails: "",
      firstname: "",
      lastname: "",
      name: "",
      email: "",
      telephone: "",
      // ////////////////////////
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////
      successMessage: "Successful",
      errorMessage: "Failed",
      // /////////////////////////////////////////////////////////////
      reg_join_concert: ""
    };
    return _this;
  }

  _createClass(TestPage, [{
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
          var payment_data = {
            transaction_id: transaction_ref,
            email: this.state.email
          };
          axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/flutterwave_verify", payment_data).then(function (response) {
            console.log(response);
            return response;
          }).then(function (json) {
            if (json.data.success) {
              // console.log(json.data.data)
              _this2.setState({
                successMessage: "Payment successful",
                showSuccess: true
              });
            } else {
              _this2.setState({
                errorMessage: json.data.data,
                showError: true
              });
            }
          })["catch"](function (error) {// console.error(`An Error Occuredd! ${error}`);
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
          console.log(json.data.data);
          var login_from = localStorage.getItem("login_from");

          if (login_from == "patient") {
            _this3.setState({
              email: json.data.data.email,
              name: json.data.data.first_name + " " + json.data.data.last_name,
              username: json.data.data.username,
              telephone: json.data.data.zip_code + json.data.data.telephone
            }, _this3.checkConcertBookings);
          }

          if (login_from == "doctor") {
            _this3.setState({
              email: json.data.data.email,
              name: json.data.data.first_name + " " + json.data.data.last_name,
              username: json.data.data.username,
              telephone: json.data.data.zip_code + json.data.data.telephone
            }, _this3.checkConcertBookings);
          }

          if (login_from == "pharm" || "hospital" || "port" || "laboratory") {
            _this3.setState({
              email: json.data.data.email,
              name: json.data.data.name,
              username: json.data.data.username,
              telephone: json.data.data.zip_code + json.data.data.telephone
            }, _this3.checkConcertBookings);
          }
        } else {}
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
      });
    }
  }, {
    key: "checkConcertBookings",
    value: function checkConcertBookings() {
      var _this4 = this; // alert(this.state.username)


      var concert_data = {
        username: this.state.username
      };
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/check/concert/" + this.state.id + "?token=".concat(this.state.token), concert_data).then(function (response) {
        return response;
      }).then(function (json) {
        console.log(json.data);

        if (json.data.success) {
          _this4.setState({
            reg_join_concert: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
              type: "submit",
              size: "sm",
              color: "primary",
              onClick: function onClick() {
                return _this4.toggleJoinConcert();
              },
              style: {
                "float": "right",
                marginRight: "10px"
              }
            }, "Join Concert Now") // reg_join_concert: <Button type="submit" size="sm" color="primary" onClick={() => this.toggleMakePayment()} style={{float: "right"}}>Register Now</Button>,

          });
        } else {
          _this4.setState({
            reg_join_concert: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
              type: "submit",
              size: "sm",
              color: "primary",
              onClick: function onClick() {
                return _this4.toggleMakePayment();
              },
              style: {
                "float": "right"
              }
            }, "Register Now")
          });
        }
      })["catch"](function (error) {
        // redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        console.error("An Error Occuredd! ".concat(error));
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
          primaryMakePayment: !this.state.primaryMakePayment
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
    key: "onSubmitFlutterPay",
    value: function onSubmitFlutterPay(e) {
      var _this5 = this;

      e.preventDefault();
      var payment_data = {
        // amount : this.state.amount, 
        username: this.state.username,
        email: this.state.email,
        name: this.state.name,
        phone_number: this.state.telephone
      };
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/flutterwave_pay", payment_data).then(function (response) {
        console.log(response);
        return response;
      }).then(function (json) {
        if (json.data.success) {
          console.log(json.data.data); // this.setState({
          //   showSuccess: true
          // });
          // var win = window.open(json.data.data, '_blank');

          var win = window.open(json.data.data);
          win.focus();
        } else {
          _this5.setState({
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
    key: "onSubmitPayPal",
    value: function onSubmitPayPal() {
      var _this6 = this; // ////////////// LOADER ////////////


      this.setState({
        showDiv: "block",
        loading: true
      }); // ////////////////////////////////

      var payment_data = {
        username: this.state.username,
        billing_email_address: this.state.billing_email_address,
        billing_name: this.state.billing_name,
        billing_amount_currency: this.state.billing_amount_currency,
        billing_amount_value: this.state.billing_amount_value,
        billing_orderID: this.state.billing_orderID,
        billing_payerID: this.state.billing_payerID
      };
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/paypal_pay", payment_data).then(function (response) {
        console.log(response);
        return response;
      }).then(function (json) {
        // ////////// LOADER //////////////
        _this6.setState({
          showDiv: "none",
          loading: false
        }); // ///////////////////////////////


        if (json.data.success) {
          console.log(json.data.data);

          _this6.setState({
            successMessage: "Payment successful",
            showSuccess: true
          });
        } else {
          _this6.setState({
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
    key: "onChangePasscode",
    value: function onChangePasscode(e) {
      this.setState({
        passcode: e.target.value
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
            // if successful display successful message, hide login div, call passPatientDataToIframe and pass details
            _this7.setState({
              successMessage: "Correct",
              showSuccess: true,
              showDiv: "none"
            }, _this7.passPatientDataToIframe);
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
    key: "render",
    value: function render() {
      var _this8 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "animated fadeIn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Spread the Love Concert"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
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
      }, "Loading..."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "THIS YEAR, THERE WILL BE NO CHRISTMAS FOR 58,000 POOR NIGERIAN WOMEN"), this.state.reg_join_concert, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "It is indeed a season to be jolly, but for thousands of families in Nigeria, there will be an empty seat at the Christmas dinner table because according to verified records and confirmed by a study carried out by Health Watch, a health advocacy publication headed by Dr Ifeanyi Nsofor affirms that in our country, 58,000 women die every year due to pregnancy and child-birth related complications. Most of these women die simply because they are too poor to afford basic antenatal, birth and post-natal care.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "All around us, as we celebrate, there are vulnerable Nigerians who are very sick, but will stay at home to face certain death because no hospital will treat them without payment. Some cannot even afford to pay 500 Naira to open a hospital card. Others have been given the estimated medical bill for surgery, dialysis, transplants and other life-saving medical procedures. They have sold all they have and still they will be unable to pay. They can only resort to begging for contributions from public spirited individuals but unfortunately in most cases,  such donations will be too little, too late.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "In a country with over 80 million of her citizens living below the poverty line, even feeding is a problem and so the most basic medical care has become a luxury most cannot afford.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "We can continue to pass the bulk on who is to blame. But the truth is that our brilliant intellectual debates will be more useful to the vulnerable, if we tailor it to ask the question; What can be done?", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "That is why at the International Medical Law Centre, St. Kitts, W.I., we are happy to announce today, the signing of the MOU with FCT HEALTH INSURANCE SCHEME to organize the first ever; SPREAD THE LOVE , TO SAVE A LIFE CONCERT. This initiative is programmed to feature a virtual concert with performances from the best Nigerian musicians, comedians, artistes, poets, Nollywood actors and actresses, including special appearances by a galaxy of both Nigerian and International stars.  This 12-hour rivetingly,  captivating event will be streamed live on cammedics.com, on the 14th of February 2021. We have reached out to the most entertaining artistes in the industry to package a sensational show.  The goal is to have subscribers purchase a $25 USD ticket to enjoy the concert, and that will be used to provide the annual  medical insurance premium for vulnerable Nigerians. So for each ticket purchased, one Nigerian's medical bills will be fully paid for one year.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "That is how we can reduce the number of empty chairs at the Christmas dinner table of Nigerian families next year.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "That is how we can save lives.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Please support this initiative.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Get a ticket for the, SPREAD THE LOVE, TO SAVE A LOVE CONCERT.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary",
        onClick: function onClick() {
          return _this8.toggleMakePayment();
        },
        style: {
          width: "100%"
        }
      }, "Register Now"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "live_chat_div"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Modal"], {
        isOpen: this.state.primaryMakePayment,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalHeader"], {
        toggle: function toggle() {
          return _this8.toggleMakePayment("close", "close");
        }
      }, "Make Payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Make Payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "3",
        sm: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Concert Fee: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.concert_fee))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        style: {
          marginBottom: "25px"
        }
      }, "You can pay with your paypal account or with your debit or credit card."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_7__["PayPalButton"], {
        amount: this.state.concert_fee // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        ,
        onSuccess: function onSuccess(details, data) {
          _this8.state.billing_amount_currency = details.purchase_units[0].amount.currency_code;
          _this8.state.billing_amount_value = details.purchase_units[0].amount.value;
          _this8.state.billing_orderID = data.orderID;
          _this8.state.billing_payerID = data.payerID;
          _this8.state.billing_email_address = details.payer.email_address;
          _this8.state.billing_name = details.payer.name.given_name + " " + details.payer.name.surname;
          console.log(details);
          console.log(data);
          console.log(details.purchase_units[0].amount.currency_code);
          console.log(details.purchase_units[0].amount.value);
          alert(_this8.state.billing_name);
          alert("Successful");
          return _this8.onSubmitPayPal();
        },
        onError: function onError(err) {
          alert(err);
          window.location.reload();
        },
        options: {
          clientId: "AQ40k3d3ewjABnwQAzBPYcnR-IyQSCKtTR2RpfYmJUZctaSWtaJMiUYZGxzSEPSkoGHWWHDCtHfuUgZx",
          disableFunding: "card"
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        type: "submit",
        className: "btn-lg",
        color: "primary",
        onClick: this.onSubmitFlutterPay,
        style: {
          width: "100%"
        }
      }, "Debit or Credit Card")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "3",
        sm: "3"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this8.toggleMakePayment("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Modal"], {
        isOpen: this.state.primaryJoinConcert,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalHeader"], {
        toggle: function toggle() {
          return _this8.toggleJoinConcert("close", "close");
        }
      }, "Join Concert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Join Concert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Please paste your concert passcode here. Copy it from the email sent to you after payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "3",
        sm: "2"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        xs: "6",
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
          return _this8.toggleJoinConcert("close", "close");
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
      }, "Alert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(sweetalert2_react__WEBPACK_IMPORTED_MODULE_6___default.a, {
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
      }, "Alert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(sweetalert2_react__WEBPACK_IMPORTED_MODULE_6___default.a, {
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
      }));
    }
  }]);

  return TestPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (TestPage);

/***/ })

}]);