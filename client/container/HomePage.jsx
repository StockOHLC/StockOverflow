import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import Header from "../components/header";
import CompanySearch from "./CompanySearch.jsx";
import SelectedCompany from "./SelectedCompany.jsx";
import NewsChat from "./NewsChat.jsx";
import SignupPopup from "../components/SignupPopup";

//socket-client connection
import io from "socket.io-client";
// const socket = io("ws://localhost:3000", { transports: ["websocket"] });

let socket;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // login info
      enteredUsername: "",
      enteredPassword: "",

      // signup info
      firstname: "",
      lastname: "",
      password: "",
      // also used for other parts of app
      email: "",

      // default tab showing the stocklist component (rather than favs/buys)
      whichTab: "1",

      name: "", // used for the search bar

      username: "",
      favorites: [],
      buys: [],

      // information grabbed from selecting a company and used to display the selectedCompany page & rendering of popup
      isPicked: false,
      isSignupPicked: false,
      companyName: "",
      companySymbol: "",
      endpoint: "localhost:3000",
      messages: []
    };

    // bind functions related to logging in and signing up
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    // this.SignupClick = this.SignupClick.bind(this);
    this.LoginClick = this.LoginClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
    this.firstnameHandler = this.firstnameHandler.bind(this);
    this.lastnameHandler = this.lastnameHandler.bind(this);

    this.togglePopup = this.togglePopup.bind(this);
    this.toggleSignupPopup = this.toggleSignupPopup.bind(this);

    // functions related to directing user to different pages
    // stocklist uses the stocklist.jsx file
    this.stockListChangeHandler = this.stockListChangeHandler.bind(this);
    // favs and buys list use the renderList.jsx file
    this.favsListChangeHandler = this.favsListChangeHandler.bind(this);
    this.buysListChangeHandler = this.buysListChangeHandler.bind(this);
    this.sendChatAction = this.sendChatAction.bind(this);
  }

  LoginClick() {
    console.log("inside login click");

    axios
      .post("/user/login", {
        email_address: this.state.enteredUsername,
        password: this.state.enteredPassword
      })

      .then(res => {
        console.log("login: ", res);
        console.log("login data: ", res.data);
        console.log("login data email address: ", res.data.email_address);
        this.setState({
          email: res.data.email_address,
          favorites: res.data.favorites,
          username: res.data.email_address
        });
      })
      .finally(() => {
        this.setState({
          enteredUsername: "",
          enteredPassword: ""
        });
      });
  }

  stockListChangeHandler() {
    this.setState({ whichTab: "1" });
  }
  favsListChangeHandler() {
    this.setState({ whichTab: "2" });
  }
  buysListChangeHandler() {
    this.setState({ whichTab: "3" });
  }
  passwordChangeHandler(event) {
    event.preventDefault();
    this.setState({ enteredPassword: event.target.value });
  }
  usernameChangeHandler(event) {
    event.preventDefault();
    this.setState({ enteredUsername: event.target.value });
  }
  nameChangeHandler(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  toggleSignupPopup() {
    if (this.state.isSignupPicked == false) {
      this.setState({ isSignupPicked: true });
    } else {
      this.setState({ isSignupPicked: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    alert("Your account has been created");
    // axios.post("/user/signup", {
    //   first_name: this.state.firstname,
    //   last_name: this.state.lastname,
    //   email_address: this.state.email,
    //   password: this.state.password
    // });

    axios
      .post("/user/signup", {
        email_address: this.state.email,
        password: this.state.password,
        first_name: this.state.firstname,
        last_name: this.state.lastname
      })
      .then(res => {
        console.log("signup: ", res);
        console.log("signup data: ", res.data);
        console.log("signup data email address: ", res.data.email_address);
        this.setState({
          email: res.data.email_address
        });
      })
      .finally(() => {
        this.setState({
          password: ""
        });
      });
  }

  passwordHandler(e) {
    this.setState({
      password: e.target.value
    });
  }

  firstnameHandler(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  lastnameHandler(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  emailHandler(e) {
    this.setState({
      email: e.target.value
    });
  }

  // function controlling togglepopup of simulator
  togglePopup(newname, newSymbol) {
    // state default is false, else statement is a functionality to close the popup
    if (this.state.isPicked == false) {
      this.setState({
        isPicked: true,
        companyName: newname,
        companySymbol: newSymbol
      });
      this.props.history.push("/selectedCompany");
    } else {
      this.setState({ isPicked: false });
      this.props.history.push("/");
    }
  }

  sendChatAction(value) {
    socket.emit("chat message", value);
  }

  render() {
    if (!socket) {
      socket = io(this.state.endpoint);
      socket.on("chat message", message => {
        this.setState(prevState => ({
          messages: [...prevState.messages, message]
        }));
      });
    }

    return (
      <div>
        <Header
          LoginClick={this.LoginClick}
          passwordChangeHandler={this.passwordChangeHandler}
          usernameChangeHandler={this.usernameChangeHandler}
          enteredUsername={this.state.enteredUsername}
          enteredPassword={this.state.enteredPassword}
          toggleSignupPopup={this.toggleSignupPopup}
        />
        {this.state.isSignupPicked ? (
          <SignupPopup
            firstnameHandler={this.firstnameHandler}
            lastnameHandler={this.lastnameHandler}
            emailHandler={this.emailHandler}
            passwordHandler={this.passwordHandler}
            handleSubmit={this.handleSubmit}
            toggleSignupPopup={this.toggleSignupPopup}
          />
        ) : null}

        <section>
          {/* CompanySearch uses SearchBar.jsx and Stocklist.jsx */}
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <CompanySearch
                  whichTab={this.state.whichTab}
                  buysListChangeHandler={this.buysListChangeHandler}
                  stockListChangeHandler={this.stockListChangeHandler}
                  favsListChangeHandler={this.favsListChangeHandler}
                  favorites={this.state.favorites}
                  name={this.state.name}
                  nameChangeHandler={this.nameChangeHandler}
                  togglePopup={this.togglePopup}
                  email={this.state.email}
                />
              )}
            ></Route>

            {/* SelectedCompany holds the stockpopup.jsx */}
            <Route
              exact
              path="/selectedCompany"
              render={props => (
                <SelectedCompany
                  isPicked={this.state.isPicked}
                  userName={this.state.email}
                  favorites={this.state.favorites}
                  companySymbol={this.state.companySymbol}
                  companyName={this.state.companyName}
                  togglePopup={this.togglePopup}
                />
              )}
            ></Route>
          </Switch>
        </section>

        <section>
          <NewsChat
            messages={this.state.messages}
            sendChatAction={this.sendChatAction}
            username={this.state.username}
          ></NewsChat>
        </section>
      </div>
    );
  }
}

export default withRouter(HomePage);
