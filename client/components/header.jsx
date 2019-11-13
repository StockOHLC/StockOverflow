import React from 'react';

const Header = (props)=>{
return (
  <div className="header">
    <div id="title">Stock Overflow</div>
    <div className="account">
      <input type = "text" placeholder = "username" onChange = {props.usernameChangeHandler} />
      <input type = "password" placeholder = "password" onChange = {props.passwordChangeHandler} />
      <input type = "button" value = "Log in" onClick = {props.LoginClick} />
      <input type="button" value="Sign Up" onClick={()=> props.toggleSignupPopup() }></input>
    </div>
  </div>
);
}
export default Header