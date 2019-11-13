import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { STATES } from 'mongoose';

const SignupPopup = props => {
    return (
        <form onSumbit = {props.handleSumbit}>
            <label>
                First name:
                <input
                type = "text"
                name = "firstname"
                value = {props.firstname}
                onChange = {props.handleChange}
            />
            </label>

            <label>
                Last name:
                <input 
                type ="text" 
                name = "lastname"
                value = {props.lastname}
                onChange = {props.handleChange}
            />
            </label>

            <label>
                Email:
                <input 
                type = "text"
                name = "email"
                value = {props.email}
                onChange = {props.handleChange}
            />
            </label>

            <label>
                Password:
                <input 
                    type = "password"
                    name = "password"
                    value = {props.password}
                    onChange = {props.handleChange}
                />
            </label>
            <input type = "sumbit" value = "Sumbit" />
        </form>
    )
}

export default SignupPopup;