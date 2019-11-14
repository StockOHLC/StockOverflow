import React, { useState, useEffect } from 'react';

const SignupPopup = props => {
    
    const handleSave = () => {
        props.toggleSignupPopup();
      };

    return (
        <div className = 'popup'>
            <div className = 'popup_inner'>
        
        <form onSubmit={props.handleSumbit}>
      
        <span className= "closeButton" onClick={handleSave}>X</span>
            <div>
            <label>
                First name:
                <input
                type = "text"
                name = "firstname"
                onChange = {props.firstnameHandler}
            />
            </label>
            </div>

            <div>
            <label>
                Last name:
                <input 
                type ="text" 
                name = "lastname"
                onChange = {props.lastnameHandler}
            />
            </label>
            </div>
            
            <div>
            <label>
                Email:
                <input 
                type = "text"
                name = "email"
                onChange = {props.emailHandler}
            />
            </label>
            </div>

            <div>
            <label>
                Password:
                <input 
                    type = "password"
                    name = "password"
                    onChange = {props.passwordHandler}
                />
            </label>
            </div>
            
            <input type = "submit" value = "Sumbit" />
        </form>
        </div> 
        </div>
    )
}

export default SignupPopup;