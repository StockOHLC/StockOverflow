import React from 'react'

const SignupLogButton =(props) => {
 
  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

return (
  <div>
    <input type = "text" placeholder = "username" onChange = {props.usernameChangeHandler} />
    <input type = "password" placeholder = "password" onChange = {props.passwordChangeHandler} />
    <input type = "button" value = "Log in" onClick = {props.LoginClick} />
    <input type="button" value="Sign Up" onClick={()=> props.toggleSignupPopup() }></input>
    
  </div>
)
}
export default SignupLogButton