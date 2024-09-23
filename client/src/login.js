import React, { useState } from "react";
import {  Link } from "react-router-dom";
import axios from 'axios';
const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

   async function login(isGuest = false) {
    // Set guest credentials if this is a guest login
    if (isGuest) {
        setEmail("admin@gmail.com");
        setPassword("admin@1234");
    }

    // Delay the rest of the login logic until state updates complete
    setTimeout(async () => {
        // Set initial error values to empty
        setEmailError("");
        setPasswordError("");

        // Check if the user has entered both fields correctly
        if (email === "") {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if (password === "") {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }

        const user = { email, password };
        try {
            const result = await axios.post('/api/users/login', user);
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/mainpage';
        } catch (error) {
            // Handle errors from the server
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);

                if (error.response.status === 400) {
                    alert("Invalid credentials. Please check your email and password.");
                } else {
                    alert("An error occurred. Please try again later.");
                }
            } else if (error.request) {
                console.error(error.request);
                alert("Error: No response from the server");
            } else {
                console.error("Error", error.message);
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    }, 0);
}



    


  

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={login}
                value={"Log in"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <div><b>Not a User ?<Link to='/register'> Register</Link></b></div>
        </div>
        
        <br />
        <div >
            <p>OR</p>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
            className={"inputButton"}
            type="button"
            onClick={() => login(true)}  // Pass true to indicate guest login
            value={"Log in as a Guest"} />

        </div>
                    
    </div>
}

export default Login
