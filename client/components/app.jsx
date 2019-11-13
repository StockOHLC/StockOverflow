import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import SearchBar from './searchcomp'
import StockList from '../container/StockList.jsx'
import StockPopUp from './StockPopup'
import SignupPopup from './SignupPopup'
import RenderList from './renderList.jsx'

var dataPoints = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      enteredUsername:'',
      enteredPassword:'',
      name:'',
      isPicked: false,
      isSignupPicked: false,
      companyName:'',
      whichTab: '1',
      favorites:[],
      buys:[],
      email:'',
      firstname:'',
      lastname: '',
      password: '',
    }
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    // this.SignupClick = this.SignupClick.bind(this);
    this.LoginClick = this.LoginClick.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.favsListChangeHandler = this.favsListChangeHandler.bind(this);
    this.stockListChangeHandler = this.stockListChangeHandler.bind(this);
    this.buysListChangeHandler = this.buysListChangeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }
  // SignupClick(){
  //   axios.post('/user/signup',{
  //     'username':this.state.enteredUsername,
  //     'password': this.state.enteredPassword
  //   })
  // }

  LoginClick(){
    console.log("inside login click")
    fetch('/user/login',{
      method: 'POST', 
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
      console.log(body);
      this.setState({
        favorites: body.favorites,
        email:body.email_address,
        buys:body.buys
      });
    });
  }
  stockListChangeHandler(){
      this.setState({whichTab: '1'});
  } 
  favsListChangeHandler(){
      this.setState({whichTab: '2'});
  }
  buysListChangeHandler(){
    
      this.setState({whichTab: '3'})
  }
  passwordChangeHandler(event){
      event.preventDefault();
      this.setState({enteredPassword: event.target.value});
  }
  usernameChangeHandler(event){
      event.preventDefault();
      // console.log(event.target.value);
      this.setState({enteredUsername: event.target.value});
  }
  nameChangeHandler(event){
      event.preventDefault();
      this.setState({name: event.target.value});
  }
  togglePopup(newname, newSymbol){
    // console.log('app line 65', newname, newSymbol);
    if(this.state.isPicked == false){
      this.setState({'isPicked':true,'companyName':newname, 'companySymbol': newSymbol});
    }
    else{
      this.setState({'isPicked':false});
    }
  }

  toggleSignupPopup() { 
    if (this.state.isSignupPicked == false) { 
      this.setState({'isSignupPicked': true});
    }
    else { 
      this.setState({'isSignupPicked': false});
    }
  }

  handleChange(e) { 
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name] : value
    })
  }

  handleSumbit(e) { 
    alert('Your account has been created');
    e.preventDefault();

    axios.post('/user/signup',{
      'firstname':this.state.firstname,
      'lastname': this.state.lastname,
      'email': this.state.email,
      'password': this.state.password
      

    })

  }
  
  render(){
    let content;
    if(this.state.whichTab == '1'){
    content =(<StockList name={this.state.name} togglePopup={this.togglePopup}/>)
    }
    else if(this.state.whichTab =='2'){
      content = (<div>
        favorites
        <RenderList list= {this.state.favorites} togglePopup ={this.togglePopup}/>
        </div>
      )
    }
    else if(this.state.whichTab == '3'){
      content =(
        <div>
          buys
          <RenderList list= {this.state.buys} togglePopup ={this.togglePopup}/>
        </div>
      )
    }

    return(
      <div>
        {/* <Header SignupClick = {this.SignupClick} */}
        <Header toggleSignupPopup = {this.toggleSignupPopup} LoginClick ={this.LoginClick} passwordChangeHandler ={this.passwordChangeHandler} usernameChangeHandler ={this.usernameChangeHandler} enteredUsername = {this.state.enteredUsername} enteredPassword={this.state.enteredPassword}/>
        <SearchBar whichTab ={this.state.whichTab} buysListChangeHandler={this.buysListChangeHandler} stockListChangeHandler ={this.stockListChangeHandler} favsListChangeHandler={this.favsListChangeHandler} name={this.state.name} nameChangeHandler={this.nameChangeHandler}/>
        {this.state.isPicked ? <StockPopUp userName= {this.state.email} symbol ={this.state.companySymbol} companyName={this.state.companyName} closePopup ={this.togglePopup}/> : null}
        {this.state.isSignupPicked? <SignupPopup firstname = {this.state.firstname} lastname = {this.state.lastname} email = {this.state.email} password = {this.state.password} handleChange = {this.handleChange} handleSumbit = {this.handleSumbit } closePopup = {this.toggleSignupPopup} /> : null}
        {content}
      </div>
    );
  }
}
export default App;
