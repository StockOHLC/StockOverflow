import React from 'react';

const Header = (props)=>{
return (
  // <div className="header">
  <div className="header-div">
    <div className="title">Stock Overflow</div>
    <div className="login">
      <input className="username" type = "text" placeholder = "Username" onChange = {props.usernameChangeHandler} />
      <input className="password" type = "password" placeholder = "Password" onChange = {props.passwordChangeHandler} />
      <input type = "button" value = "Log in" className="button-login" onClick = {props.LoginClick} />
      <input type="button" value="Sign Up" className="button-signup" onClick={()=> props.toggleSignupPopup() }></input>
    </div>
  </div>
);
}
export default Header;