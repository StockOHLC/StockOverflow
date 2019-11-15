import React, { useState, useEffect } from "react";

// dotenv.config() for this after finishing functionality
const CLIENT_ID = "86px63z2kbb0hj";

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const state = makeid(10);

const SignupPopup = props => {
  const handleSave = () => {
    props.toggleSignupPopup();
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <form onSubmit={props.handleSubmit}>
          <span className="closeButton" onClick={handleSave}>
            X
          </span>
          <div>
            <label>
              First name:
              <input
                type="text"
                name="firstname"
                onChange={props.firstnameHandler}
              />
            </label>
          </div>

          <div>
            <label>
              Last name:
              <input
                type="text"
                name="lastname"
                onChange={props.lastnameHandler}
              />
            </label>
          </div>

          <div>
            <label>
              Email:
              <input type="text" name="email" onChange={props.emailHandler} />
            </label>
          </div>

          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={props.passwordHandler}
              />
            </label>
          </div>

          <input type="submit" value="Submit" />

          <button>
            <a
              href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&scope=r_basicprofile&state=${state}&redirect_uri=http://localhost:8080/oauth/linkedin/callback`}
            >
              SignUp Through LinkedIn!
            </a>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;
