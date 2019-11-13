import React from 'react'

// const SignupLogButton =(props) => {
//   const handleSave = () => {
//     props.toggleSignupPopup();
//   }

return (
  <div>
    {/* <form >

<label>Email</label>

    <input

        type="text"

        value={props.enteredUsername}
        onChange= {props.usernameChangeHandler}
        required
    ></input>

    <label>Password</label>

<input

  type="password"

  value={props.enteredPassword}

  onChange={props.passwordChangeHandler}
  required  
></input> */}

<input type="button" value="Sign Up" onClick={()=> props.toggleSignupPopup() }></input>
{/* <input type="button" value="Log In" onClick={()=>props.LoginClick()}></input>
</form>  */}

  </div>
)
// }
export default SignupLogButton