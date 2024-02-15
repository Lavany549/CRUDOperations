import React, { useState } from "react";
import {Link } from "react-router-dom";
import axios from 'axios';
const Register = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [reenterPasswordError, setReenterPasswordError] = useState("");


  async function register(){
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setReenterPasswordError("");

    // Check if the user has entered all fields correctly
    if ("" === name) {
      setNameError("Please enter your name");
      
    }

    if ("" === email) {
      setEmailError("Please enter your email");
     
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
     
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
    
    }

    if ("" === reenterPassword) {
      setReenterPasswordError("Please re-enter your password");
      
    }

    if (reenterPassword !== password) {
      setReenterPasswordError("Passwords do not match");
      
    }

    if(password===reenterPassword)
    {

        try {
           
            const checkUser = await axios.post('/api/users/checkuser', { name, email });
            
            if (checkUser.data.exists) {
                // User with the same roll number or email already exists
                alert('User with the same name or email already exists');
                return;
            }
            else{
                const user={
                    name,
                    email,
                    
                    password,
                    reenterPassword
                }
                try {
                   
                    const response = await axios.post('/api/users/register', user);
                    console.log(response.data); // Assuming the data you want is in the response
    
                    setName('')
                    setEmail('')
                    setPassword('')
                    setReenterPassword('')
                    
                  } catch (error) {
                    console.log(error); // Log the error response    
                  }
            }
        } catch (error) {
            console.log(error); // Log the error response
           
        }
        

    }
    else{
        alert('Passwords didnt match!!')
    }
   
}


  // // Register a new user
  // const registerUser = () => {
  //   fetch("http://localhost:5000/api/users/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email, password }),
  //   })
  //     .then((r) => r.json())
  //     .then((r) => {
  //       if ("success" === r.message) {
  //         localStorage.setItem(
  //           "user",
  //           JSON.stringify({ email, token: r.token })
  //         );
  //         props.setLoggedIn(true);
  //         props.setEmail(email);
  //         navigate("/");
  //       } else {
  //         window.alert("Registration failed. Please try again.");
  //       }
  //     });
  // };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Register</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={name}
          placeholder="Enter your name here"
          onChange={(ev) => setName(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          type="password"
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={reenterPassword}
          type="password"
          placeholder="Re-enter your password"
          onChange={(ev) => setReenterPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{reenterPasswordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={register}
          value={"Register"}
        />
      </div>
      <br />
        <div className={"inputContainer"}>
            <div><b>Already Registered ?<Link to='/login'> Login</Link></b></div>
        </div>
    </div>
  );
};

export default Register;
