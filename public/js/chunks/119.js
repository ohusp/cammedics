(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[119],{

/***/ "./resources/coreui/src/views/LiveChat/LiveChat.js":
/*!*********************************************************!*\
  !*** ./resources/coreui/src/views/LiveChat/LiveChat.js ***!
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
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
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




 // import axios from 'axios';





var hashHistory = Object(history__WEBPACK_IMPORTED_MODULE_3__["createHashHistory"])();

var LiveChat = /*#__PURE__*/function (_Component) {
  _inherits(LiveChat, _Component);

  var _super = _createSuper(LiveChat);

  function LiveChat(props) {
    var _this;

    _classCallCheck(this, LiveChat);

    _this = _super.call(this, props); // bind input values on change

    _this.onChangeRoomLink = _this.onChangeRoomLink.bind(_assertThisInitialized(_this));
    _this.onChangePasscode = _this.onChangePasscode.bind(_assertThisInitialized(_this)); // /////////////////////////////////////////////////////////////////

    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.state = {
      token: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.auth_token : "",
      id: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.id : "",
      username: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.username : "",
      first_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.first_name : "",
      last_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.last_name : "",
      middle_name: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.middle_name : "",
      login_as: "",
      name: "",
      roomLink: "",
      passcode: "",
      showChatDiv: "none",
      showDiv: "none",
      successMessage: "Successful",
      errorMessage: "Failed",
      // ////////////////////// SEARCH FOR THIS ///////////////////////////////////////
      // path_link: "http://localhost:3000",
      path_link: "https://live.cammedics.com"
    };
    return _this;
  }

  _createClass(LiveChat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.state.login_as = localStorage.getItem("login_from");
      var login_as = this.state.login_as;
      var username = this.state.username;
      var first_name = this.state.first_name;
      var last_name = this.state.last_name; // click to toggle n expand div

      document.getElementById("navigationToggler").click(); // hide header

      document.getElementById("navigationPanel").style.display = "none";

      if (this.state.login_as == "") {
        // if it is patient display login form
        this.setState({
          showDiv: "block",
          showChatDiv: "none"
        });
      } else if (this.state.login_as == "patient") {
        // if it is patient display login form
        var already_in_a_chat = sessionStorage.getItem('already_in_a_chat');

        if (already_in_a_chat == "" || already_in_a_chat == null) {
          this.setState({
            showDiv: "block",
            showChatDiv: "block"
          });
        } else {
          this.passPatientDataToIframe2();
        } // call reactjs function


        var _ = this;

        var path_link = this.state.path_link; // ////////////////////// GET PARAMETERS SENT TO DASHBOARD /////////////////////////////////////

        window.addEventListener('message', function (event) {
          if (event.origin !== path_link) return;
          var data = event.data.split('|-|');
          var isLogout = data[0];

          if (isLogout != "logout") {
            if (login_as == "patient") {
              var name = data[2]; // call reactjs function

              _.updateInDB(name);
            }
          } else {
            sessionStorage.setItem('already_in_a_chat', "");
            sessionStorage.setItem('roomLink', "");

            _.logout();

            location.reload();
          }
        }, false); // ////////////////////// GET PARAMETERS SENT TO DASHBOARD ////////////////////////////////////
      } // if doctor or port or the others open chat and pass the user data
      else if (this.state.login_as == "doctor" || "hospital" || "laboratory" || "pharm" || "port") {
          // show the chat div
          this.setState({
            showChatDiv: "block"
          });
          var path_link = this.state.path_link; // is user already logged in

          var _already_in_a_chat = sessionStorage.getItem('already_in_a_chat');

          if (_already_in_a_chat == "" || _already_in_a_chat == null) {
            var screen_video = path_link;
          } else {
            var screen_video = sessionStorage.getItem('roomLink');
            var passcode = sessionStorage.getItem('passcode'); // to display at the bottom after reload

            this.setState({
              roomLink: screen_video,
              passcode: passcode
            });
          }

          var iframe = document.createElement("iframe");
          iframe.src = screen_video;
          iframe.id = "live_chat_frame";
          iframe.width = "100%";
          iframe.height = "700px";
          iframe.allow = "camera *;microphone *"; // append the created iframe to the div

          document.getElementById("live_chat_div").appendChild(iframe);
          setTimeout(function () {
            var name = first_name + " " + last_name;
            var messageSent = login_as + "|-|" + username + "|-|" + name;
            document.getElementById('live_chat_frame').contentWindow.postMessage(messageSent, path_link);
          }, 1000);
          var login_as = this.state.login_as;
          var username = this.state.username; // call reactjs function

          var _ = this;

          var path_link = this.state.path_link; // ////////////////////// GET PARAMETERS SENT TO DASHBOARD /////////////////////////////////////

          window.addEventListener('message', function (event) {
            if (event.origin !== path_link) return;
            var data = event.data.split('|-|');
            var isLogout = data[0];

            if (isLogout != "logout") {
              if (login_as == "doctor" || "hospital" || "laboratory" || "pharm" || "port") {
                var name = data[2];
                var roomLink = data[3];
                var passcode = data[4]; // call reactjs function

                _.saveToDB(name, roomLink, passcode);
              }
            } else {
              sessionStorage.setItem('already_in_a_chat', "");
              sessionStorage.setItem('roomLink', "");

              _.logout();

              location.reload();
            }
          }, false); // ////////////////////// GET PARAMETERS SENT TO DASHBOARD /////////////////////////////////////
        }
    } // ON Change of first name input

  }, {
    key: "onChangeRoomLink",
    value: function onChangeRoomLink(e) {
      this.setState({
        roomLink: e.target.value
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
    key: "onSubmit",
    value: function onSubmit(e) {
      var _this2 = this;

      e.preventDefault();

      if (this.state.roomLink == "" || this.state.passcode == "" || this.state.roomLink == null || this.state.passcode == null) {
        this.setState({
          errorMessage: "Please fill all required field",
          showError: true
        });
      } else {
        var appointment_data = {
          roomLink: this.state.roomLink,
          passcode: this.state.passcode
        };
        axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/api/check/appointment_if_exist/" + this.state.id + "?token=".concat(this.state.token), appointment_data).then(function (response) {
          return response;
        }).then(function (json) {
          if (json.data.success) {
            // if successful display successful message, hide login div, call passPatientDataToIframe and pass details
            _this2.setState({
              successMessage: "Correct",
              showSuccess: true,
              showDiv: "none"
            }, _this2.passPatientDataToIframe);
          } else {
            _this2.setState({
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
    key: "saveToDB",
    value: function saveToDB(name, roomLink, passcode) {
      var _this3 = this;

      this.state.name = name;
      this.state.roomLink = roomLink;
      this.state.passcode = passcode; // ///////////////// SAVE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////

      if (this.state.login_as == "" || this.state.username == "" || this.state.name == "" || this.state.roomLink == "" || this.state.passcode == "" || this.state.login_as == null || this.state.username == null || this.state.name == null || this.state.roomLink == null || this.state.passcode == null) {
        this.setState({
          errorMessage: "Please fill all required field",
          showError: true
        });
      } else {
        // ////////////// LOADER ////////////
        this.setState({
          showDiv: "block",
          loading: true
        }); // ////////////////////////////////

        var chat_details = {
          login_as: this.state.login_as,
          username: this.state.username,
          name: this.state.name,
          roomLink: this.state.roomLink,
          passcode: this.state.passcode
        };
        axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/api/save/chat_details/" + this.state.id + "?token=".concat(this.state.token), chat_details).then(function (response) {
          return response;
        }).then(function (json) {
          // ////////// LOADER //////////////
          _this3.setState({
            showDiv: "none",
            loading: false
          }); // ///////////////////////////////


          if (json.data.success) {
            sessionStorage.setItem('already_in_a_chat', "already_in_a_chat");
            var roomLink = _this3.state.roomLink;
            var passcode = _this3.state.passcode;
            sessionStorage.setItem('roomLink', roomLink);
            sessionStorage.setItem('passcode', passcode);

            _this3.setState({
              successMessage: "Successful! Please share link with patient.",
              showSuccess: true
            });
          } else {
            _this3.setState({
              successMessage: json.data.data,
              showError: true
            });
          }
        })["catch"](function (error) {// this.setState({
          //   showError: true
          // });       
        });
      } // ///////////////// SAVE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////

    }
  }, {
    key: "passPatientDataToIframe",
    value: function passPatientDataToIframe() {
      // pass the link the user pasted into the iframe
      var screen_video = this.state.roomLink;
      var iframe = document.createElement("iframe");
      iframe.src = screen_video;
      iframe.id = "live_chat_frame";
      iframe.width = "100%";
      iframe.height = "700px";
      iframe.allow = "camera *;microphone *";
      document.getElementById("live_chat_div").innerHTML = "";
      document.getElementById("live_chat_div").appendChild(iframe);
      var login_as = this.state.login_as;
      var username = this.state.username;
      var first_name = this.state.first_name;
      var last_name = this.state.last_name;
      var path_link = this.state.path_link;
      setTimeout(function () {
        var name = first_name + " " + last_name;
        var messageSent = login_as + "|-|" + username + "|-|" + name;
        document.getElementById('live_chat_frame').contentWindow.postMessage(messageSent, path_link);
      }, 1000);
    } // if already in and reloading page

  }, {
    key: "passPatientDataToIframe2",
    value: function passPatientDataToIframe2() {
      // pass the link the user pasted into the iframe
      var screen_video = sessionStorage.getItem('roomLink');
      var passcode = sessionStorage.getItem('passcode'); // to display at the bottom after reload

      this.setState({
        roomLink: screen_video,
        passcode: passcode
      });
      var iframe = document.createElement("iframe");
      iframe.src = screen_video;
      iframe.id = "live_chat_frame";
      iframe.width = "100%";
      iframe.height = "700px";
      iframe.allow = "camera *;microphone *";
      document.getElementById("live_chat_div").innerHTML = "";
      document.getElementById("live_chat_div").appendChild(iframe);
      this.setState({
        showChatDiv: "block"
      });
    }
  }, {
    key: "updateInDB",
    value: function updateInDB(name) {
      var _this4 = this; // this.state.name = name


      var name = this.state.first_name + " " + this.state.last_name; // ///////////////// UPDATE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////

      if (this.state.login_as == "" || this.state.username == "" || name == "" || this.state.roomLink == "" || this.state.passcode == "" || this.state.login_as == null || this.state.username == null || name == null || this.state.roomLink == null || this.state.passcode == null) {
        this.setState({
          errorMessage: "Please fill all required field",
          showError: true
        });
      } else {
        // ////////////// LOADER ////////////
        this.setState({
          showDiv: "block",
          loading: true
        }); // ////////////////////////////////

        var chat_details = {
          login_as: this.state.login_as,
          username: this.state.username,
          name: name,
          roomLink: this.state.roomLink,
          passcode: this.state.passcode
        };
        axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/api/update/chat_details/" + this.state.id + "?token=".concat(this.state.token), chat_details).then(function (response) {
          return response;
        }).then(function (json) {
          // ////////// LOADER //////////////
          _this4.setState({
            showDiv: "none",
            loading: false
          }); // ///////////////////////////////


          if (json.data.success) {
            sessionStorage.setItem('already_in_a_chat', "already_in_a_chat");
            var roomLink = _this4.state.roomLink;
            var passcode = _this4.state.passcode;
            sessionStorage.setItem('roomLink', roomLink);
            sessionStorage.setItem('passcode', passcode); // this.setState({
            //   successMessage: "Successful! Please share link with patient.",
            //   showSuccess: true
            // });
          } else {// this.setState({
              //   successMessage: json.data.data,
              //   showError: true
              // });
            }
        })["catch"](function (error) {// this.setState({
          //   showError: true
          // });       
        });
      } // ///////////////// UPDATE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////

    }
  }, {
    key: "logout",
    value: function logout() {
      var _this5 = this; // ///////////////// UPDATE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////
      // ////////////// LOADER ////////////


      this.setState({
        showDiv: "block",
        loading: true
      }); // ////////////////////////////////

      var chat_details = {
        roomLink: this.state.roomLink,
        passcode: this.state.passcode
      };
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/api/update/logout/" + this.state.id + "?token=".concat(this.state.token), chat_details).then(function (response) {
        return response;
      }).then(function (json) {
        // ////////// LOADER //////////////
        _this5.setState({
          showDiv: "none",
          loading: false
        }); // ///////////////////////////////


        if (json.data.success) {
          _this5.setState({
            successMessage: "You are logged out",
            showSuccess: true
          });
        } else {// this.setState({
          //   successMessage: json.data.data,
          //   showError: true
          // });
        }
      })["catch"](function (error) {// this.setState({
        //   showError: true
        // });       
      }); // ///////////////// UPDATE VIDEO CHAT DETAILS IN DATABASE ///////////////////////////////////////
    } // ///////////////////////////////////////////////////////////

  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "animated fadeIn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          display: this.state.showChatDiv
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "live_chat_div"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        xs: "12",
        sm: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        xs: "12",
        sm: "7"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Chat link: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          color: "#2167ac"
        }
      }, this.state.roomLink))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        xs: "12",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Passcode: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          color: "#2167ac"
        }
      }, this.state.passcode))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          display: this.state.showDiv,
          marginTop: "200px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        xs: "12",
        sm: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        xs: "12",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["CardHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-align-justify"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Login")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["CardBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Form"], {
        onSubmit: this.onSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        xs: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Link")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Input"], {
        type: "text",
        id: "roomLink",
        defaultValue: this.state.roomLink,
        onChange: this.onChangeRoomLink
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroupAddon"], {
        addonType: "prepend"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "asterisk"
      }, "*"), "Passcode")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Input"], {
        type: "text",
        id: "passcode",
        defaultValue: this.state.passcode,
        onChange: this.onChangePasscode
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroupAddon"], {
        addonType: "append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["InputGroupText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-user"
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["FormGroup"], {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: "submit",
        size: "sm",
        color: "primary"
      }, "Login")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        xs: "12",
        sm: "3"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert1",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this6.setState({
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
          return _this6.setState({
            showSuccess: false
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "sweet_alert2",
        style: {
          display: "none"
        },
        onClick: function onClick() {
          return _this6.setState({
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
          return _this6.setState({
            showError: false
          });
        }
      }));
    }
  }]);

  return LiveChat;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (LiveChat);

/***/ })

}]);