(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[125],{

/***/ "./resources/coreui/src/views/PatientCart/PatientCart.js":
/*!***************************************************************!*\
  !*** ./resources/coreui/src/views/PatientCart/PatientCart.js ***!
  \***************************************************************/
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
/* harmony import */ var sweetalert2_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2-react */ "./node_modules/sweetalert2-react/dist/sweetalert-react.min.js");
/* harmony import */ var sweetalert2_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-paypal-button-v2 */ "./node_modules/react-paypal-button-v2/lib/index.js");
/* harmony import */ var react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-spinners/ScaleLoader */ "./node_modules/react-spinners/ScaleLoader.js");
/* harmony import */ var react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_7__);
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



var override = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__["css"])(_templateObject()); // ///////////////////////////////////////////////////


var hashHistory = Object(history__WEBPACK_IMPORTED_MODULE_2__["createHashHistory"])();

var PatientCart = /*#__PURE__*/function (_Component) {
  _inherits(PatientCart, _Component);

  var _super = _createSuper(PatientCart);

  function PatientCart(props) {
    var _this;

    _classCallCheck(this, PatientCart);

    _this = _super.call(this, props); // ////////////////MODAL
    // /////////////////////////////////////////////////////////////////

    _this.onCheckout = _this.onCheckout.bind(_assertThisInitialized(_this));
    _this.onSubmitFlutterPay = _this.onSubmitFlutterPay.bind(_assertThisInitialized(_this));
    _this.state = {
      token: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.auth_token : "",
      id: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.id : "",
      username: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.username : "",
      email: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.email : "",
      telephone: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.telephone : "",
      first_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.first_name : "",
      last_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.last_name : "",
      middle_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.middle_name : "",
      status: "",
      created_at: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.created_at : "",
      user_type: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.user_type : "",
      primaryMakePayment: false,
      // ///////////////////////////////////////////////////////
      // showSuccess:  false,
      // showError:    false,
      successMessage: "Successful",
      errorMessage: "Failed",
      // ///////////////////////////////////////////
      cart_total: "",
      handling_fee: "",
      total_fee: "",
      // ///////////////////////////////////////
      // chatBtn: "",
      // ///////////////////////////////////
      snumber: 1,
      items_list: [],
      pharm_id: "",
      // /////// LOADER ////////////
      showDiv: "none",
      loading: false,
      // //////////////////////////
      login_as: ""
    }; // this.handlePageChange=this.handlePageChange.bind(this);

    return _this;
  } // fetch data from db


  _createClass(PatientCart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.checkIfProfileCompleted();
      this.state.login_as = localStorage.getItem("login_from");

      if (this.state.login_as != "patient") {
        hashHistory.push('/premontessori');
      } else {
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
            axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/flutterwave_checkout_verify", payment_data).then(function (response) {
              // console.log(response);
              return response;
            }).then(function (json) {
              _this2.getCart();

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
          } else if (transaction_status == "Order-failed") {
            this.setState({
              errorMessage: "Transaction error. Order failed",
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
          this.getCart();
        }
      }
    }
  }, {
    key: "checkIfProfileCompleted",
    value: function checkIfProfileCompleted() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/patient/get/" + this.state.id + "?token=".concat(this.state.token)).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          // console.log(json.data.data)
          if (json.data.data.telephone == null || json.data.data.telephone == "") {
            _this3.setState({
              errorMessage: "Please go to profile page and complete your profile update",
              showError: true
            });
          }
        } else {}
      })["catch"](function (error) {});
    }
  }, {
    key: "getCart",
    value: function getCart() {
      var _this4 = this;

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/patient/product_in_cart/get_all/" + this.state.id + "?token=".concat(this.state.token)).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this4.setState({
            items_list: json.data.data,
            pharm_id: json.data.data[0].pharm_id // itemsCountPerPage_appointments: json.data.data.per_page,
            // totalItemsCount_appointments: json.data.data.total,
            // activePage_appointments: json.data.data.current_page

          });
        } else {}
      })["catch"](function (error) {// redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        // console.error(`An Error Occuredd! ${error}`);
      });
    }
  }, {
    key: "itemUpdate",
    value: function itemUpdate(e, item_id) {
      var _this5 = this; // const item_id1 = item_id;
      // const qty   = e.target.value;


      var product_data = {
        item_id1: item_id,
        qty: e.target.value
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/api/patient/product_qty/update/" + this.state.id + "?token=".concat(this.state.token), product_data).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this5.setState({// successMessage: json.data.data,
            // showSuccess: true
          }, _this5.componentDidMount);
        } else {
          _this5.setState({
            successMessage: "Quantity update failed",
            showError: true
          });
        }
      })["catch"](function (error) {
        _this5.setState({
          showError: true
        });
      });
    }
  }, {
    key: "remove",
    value: function remove(item_id) {
      var _this6 = this; // const item_id1 = item_id;
      // const qty   = e.target.value;


      var product_data = {
        item_id1: item_id
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/api/patient/product/delete/" + this.state.id + "?token=".concat(this.state.token), product_data).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          _this6.setState({// successMessage: json.data.data,
            // showSuccess: true
          }, _this6.componentDidMount);
        } else {
          _this6.setState({
            successMessage: "Product removal failed",
            showError: true
          });
        }
      })["catch"](function (error) {
        _this6.setState({
          showError: true
        });
      });
    }
  }, {
    key: "onCheckout",
    value: function onCheckout() {
      var _this7 = this;

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/api/patient/product/checkout1/" + this.state.pharm_id + '/' + this.state.id + "?token=".concat(this.state.token)).then(function (response) {
        return response;
      }).then(function (json) {
        if (json.data.success) {
          // console.log(json.data)
          // const total_fee = parseInt(json.data.port_fee) + parseInt(json.data.country_handling_fee);
          _this7.setState({
            cart_total: json.data.cart_total,
            handling_fee: json.data.handling_fee,
            total_fee: json.data.total_fee
          }, _this7.toggleMakePayment());
        } else {}
      })["catch"](function (error) {// redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        // console.error(`An Error Occuredd! ${error}`);
      });
    }
  }, {
    key: "onSubmitBookAppointment2",
    value: function onSubmitBookAppointment2() {
      var _this8 = this; // ////////////// LOADER ////////////


      this.setState({
        successMessage: "Payment successful",
        showSuccess: true,
        showDiv: "block",
        loading: true
      }); // ////////////////////////////////

      var phurchase_data = {
        // /////////////////////////////////////////////
        billing_create_time: this.state.billing_create_time,
        billing_update_time: this.state.billing_update_time,
        billing_amount_currency: this.state.billing_amount_currency,
        billing_amount_value: this.state.billing_amount_value,
        billing_cart_total: this.state.cart_total,
        billing_handling_fee: this.state.handling_fee,
        billing_email_address: this.state.billing_email_address,
        billing_name: this.state.billing_name,
        billing_orderID: this.state.billing_orderID,
        billing_payerID: this.state.billing_payerID
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/api/patient/product/checkout2/" + this.state.pharm_id + '/' + this.state.id + "?token=".concat(this.state.token), phurchase_data).then(function (response) {
        return response;
      }, this.toggleMakePayment("close", "close")).then(function (json) {
        // ////////// LOADER //////////////
        _this8.setState({
          showDiv: "none",
          loading: false
        }); // ///////////////////////////////


        if (json.data.success) {
          _this8.setState({
            successMessage: json.data.data,
            showSuccess: true
          });
        } else {
          _this8.setState({
            successMessage: json.data.data,
            showError: true
          });
        }
      })["catch"](function (error) {
        _this8.setState({
          showError: true
        });
      });
    }
  }, {
    key: "onSubmitFlutterPay",
    value: function onSubmitFlutterPay(e) {
      var _this9 = this;

      e.preventDefault();
      var payment_data = {
        amount: this.state.total_fee,
        cart_total: this.state.cart_total,
        country_handling_fee: this.state.handling_fee,
        username: this.state.username,
        email: this.state.email,
        name: this.state.first_name + " " + this.state.last_name,
        phone_number: this.state.telephone,
        description: "Product purchase"
      }; // axios.post(`/flutterwave_pay/appointment`, payment_data)

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/patient/product/checkout/flutterwave_pay/" + this.state.pharm_id + '/' + this.state.id + "?token=".concat(this.state.token), payment_data).then(function (response) {
        // console.log(response);
        return response;
      }).then(function (json) {
        // console.log(json.data.success)
        if (json.data.success) {
          // console.log(json.data.data)
          // this.setState({
          //   showSuccess: true
          // });
          // var win = window.open(json.data.data, '_blank');
          var win = window.open(json.data.data);
          win.focus();
        } else {
          _this9.setState({
            errorMessage: json.data.data,
            showError: true
          });
        }
      })["catch"](function (error) {// redirect user to previous page if user does not have autorization to the page
        // hashHistory.push('/premontessori');
        // console.error(`An Error Occuredd! ${error}`);
      });
    } // /////////////// Make payment

  }, {
    key: "toggleMakePayment",
    value: function toggleMakePayment() {
      // console.log(id);
      this.setState({
        primaryMakePayment: !this.state.primaryMakePayment // port_id: id,
        // port_name: name,

      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this; // const { product_image} = this.state


      var snumber = 1;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "animated fadeIn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "12",
        sm: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Cart"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "12",
        lg: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners_ScaleLoader__WEBPACK_IMPORTED_MODULE_7___default.a, {
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
      }, "Loading..."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), " Cart Items"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Table"], {
        responsive: true,
        bordered: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "S/N"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "ITEM"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "CATEGORY"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "QUANTITY"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "UNIT PRICE"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "SUBTOTAL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "ACTION"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, // ////////////////////////////////////////////////////////////
      this.state.items_list.map(function (item) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: item.id
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
          scope: "row"
        }, snumber++), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.category), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Input"], {
          type: "select",
          id: "qty",
          value: item.qty // onChange={this.onChangeQty}
          ,
          onChange: function onChange(e) {
            _this10.itemUpdate(e, item.id);
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "1"
        }, "1"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "2"
        }, "2"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "3"
        }, "3"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "4"
        }, "4"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "5"
        }, "5"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "6"
        }, "6"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "7"
        }, "7"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "8"
        }, "8"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "9"
        }, "9"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "10"
        }, "10"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.sub_total), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
          size: "sm",
          onClick: function onClick() {
            return _this10.remove(item.id);
          },
          className: "cammedics-btn-danger"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fa fa-trash"
        }), " Remove")));
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          "float": "right"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary",
        onClick: function onClick() {
          return _this10.onCheckout();
        }
      }, "PROCEED TO CHECKOUT")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
        isOpen: this.state.primaryMakePayment,
        className: 'modal-primary ' + this.props.className,
        style: {
          maxWidth: "1000px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalHeader"], {
        toggle: function toggle() {
          return _this10.toggleMakePayment("close", "close");
        }
      }, "Make Payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), this.state.patient_name, " Make Payment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "3",
        sm: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Products Cost: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.cart_total)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Handling Fee: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.handling_fee)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "justify-content-between"
      }, "Total: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        style: {
          "float": "right"
        }
      }, "$", this.state.total_fee))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        style: {
          marginBottom: "25px"
        }
      }, "You can pay with your paypal account or with your debit or credit card."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_paypal_button_v2__WEBPACK_IMPORTED_MODULE_5__["PayPalButton"], {
        amount: this.state.total_fee // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        ,
        onSuccess: function onSuccess(details, data) {
          _this10.state.billing_amount_currency = details.purchase_units[0].amount.currency_code;
          _this10.state.billing_amount_value = details.purchase_units[0].amount.value;
          _this10.state.billing_orderID = data.orderID;
          _this10.state.billing_payerID = data.payerID;
          _this10.state.billing_email_address = details.payer.email_address;
          _this10.state.billing_name = details.payer.name.given_name + " " + details.payer.name.surname;
          _this10.state.billing_create_time = details.create_time;
          _this10.state.billing_update_time = details.update_time; // console.log(details);
          // console.log(data);
          // console.log(details.purchase_units[0].amount.currency_code)
          // console.log(details.purchase_units[0].amount.value)

          return _this10.onSubmitBookAppointment2();
        },
        onError: function onError(err) {
          alert(err);
          window.location.reload();
        },
        options: {
          clientId: "AVx-UESGmRd47pO8XzTG7_vMWsTHaAybTQIhdOHz2vxId7vHZxtzQL07KKs0JN7Z2pECJw4Jk-0KGszf" // disableFunding: "card"

        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        type: "submit",
        className: "btn-lg",
        color: "primary",
        onClick: this.onSubmitFlutterPay,
        style: {
          width: "100%",
          backgroundColor: "#c88009"
        }
      }, "Flutterwave")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        xs: "3",
        sm: "3"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        color: "secondary",
        onClick: function onClick() {
          return _this10.toggleMakePayment("close", "close");
        }
      }, "Cancel"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert1",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this10.setState({
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
          return _this10.setState({
            showSuccess: false
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert2",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this10.setState({
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
          return _this10.setState({
            showError: false
          });
        }
      }));
    }
  }]);

  return PatientCart;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (PatientCart);

/***/ })

}]);