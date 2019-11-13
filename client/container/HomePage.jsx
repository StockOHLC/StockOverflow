import React, { Component } from "react";
import {
  Switch,
  Route,
  Link,
  withRouter
} from 'react-router-dom';

import Header from "../components/header";
import CompanySearch from './CompanySearch.jsx';
import SelectedCompany from './SelectedCompany.jsx';
import NewsChat from "./NewsChat.jsx";


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // login info
      enteredUsername: "",
      enteredPassword: "",

      name: "",
      isPicked: false,
      companyName: "",
      whichTab: "1",
      favorites: [],
      buys: [],
      email: "",
      companySymbol: ""
    };

    // bind functions related to logging in and signing up
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.SignupClick = this.SignupClick.bind(this);
    this.LoginClick = this.LoginClick.bind(this);

    // function 
    this.togglePopup = this.togglePopup.bind(this);

    // functions related to directing user to different pages
    // stocklist uses the stocklist.jsx file
    this.stockListChangeHandler = this.stockListChangeHandler.bind(this);
    // favs and buys list use the renderList.jsx file
    this.favsListChangeHandler = this.favsListChangeHandler.bind(this);
    this.buysListChangeHandler = this.buysListChangeHandler.bind(this);
  }

  // functions controlling login and sign up
  SignupClick() {
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: this.state.enteredUsername,
        password: this.state.enteredPassword
      })
    })
      .then(body => body.json())
      .then(body => {
        if (body.message === "No Such User") {
          fetch("/user/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: {
              email_address: this.state.enteredUsername,
              password: this.state.enteredPassword,
              first_name: "dummy",
              last_name: "dummy"
            }
          })
            .then(data => data.json())
            .then(data => {
              alert("account created!");
            });
        } else {
          alert("account already exist!");
        }
      });
  }
  LoginClick() {
    console.log("inside login click");
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: this.state.enteredUsername,
        password: this.state.enteredPassword
      })
    })
      .then(body => body.json())
      .then(body => {
        if (body.message === "No Such User") {
          alert("Your password does not match with our data!");
        } else if (body.message === "Wrong password") {
          alert("Your password does not match with our data!");
        } else {
          alert("welcome!");
          console.log(body);
          this.setState({
            favorites: body.favorites,
            email: body.email_address,
            buys: body.buys
          });
        }
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
    // console.log(event.target.value);
    this.setState({ enteredUsername: event.target.value });
  }
  nameChangeHandler(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
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
      this.props.history.push('/selectedCompany')
    } else {
      this.setState({ isPicked: false });
      this.props.history.push('/')
    }
  }

  render() {

    return (
      <div>
        <Header 
          SignupClick={this.SignupClick}
          LoginClick={this.LoginClick}
          passwordChangeHandler={this.passwordChangeHandler}
          usernameChangeHandler={this.usernameChangeHandler}
          enteredUsername={this.state.enteredUsername}
          enteredPassword={this.state.enteredPassword}
        />

        <section>
          {/* CompanySearch uses SearchBar.jsx and Stocklist.jsx */}
          <Switch>
            <Route 
            exact path='/'
            render={props => (
              <CompanySearch 
                whichTab={this.state.whichTab}
                buysListChangeHandler={this.buysListChangeHandler}
                stockListChangeHandler={this.stockListChangeHandler}
                favsListChangeHandler={this.favsListChangeHandler}
                name={this.state.name}
                nameChangeHandler={this.nameChangeHandler}
                togglePopup={this.togglePopup}
              />
            )}
            >
            </Route>

            {/* SelectedCompany holds the stockpopup.jsx */}
            <Route
            exact path='/selectedCompany'
            render={props => (
              <SelectedCompany 
              isPicked={this.state.isPicked}
              userName={this.state.email}
              companySymbol={this.state.companySymbol}
              companyName={this.state.companyName}
              togglePopup={this.togglePopup}
              />
            )}
            >
            </Route>
          </Switch>
        </section>

        <section>
          <NewsChat></NewsChat>
        </section>
      </div>
    );
  }
}

export default withRouter(HomePage);
