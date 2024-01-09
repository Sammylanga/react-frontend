import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = (props) => {
    const navigate = useNavigate();
    const {userName , setUserName , setLogin} = props
    const [showAlert , setShowAlert] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [userNameError, setUserNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const onClick = () => {
        navigate('/login')
    }

    const onButtonClick = async () => {
        // Set initial error values to empty
        setShowAlert("")
        setEmailError("")
        setPasswordError("")
        setUserNameError("")

        // Check if the user has entered both fields correctly
        if ("" === userName) {
            setUserNameError("Please enter your username")
            return
        }

        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        const postData = {
            username: userName,
            email: email,
            password: password
          };
        
       await axios.post("http://localhost:8080/signup", postData)
            .then(response => {
                // Handle the successful response
                console.log('Response:', response.data);
                if ( response.data.signup ) {
                    setLogin(true);
                    navigate('/profile');
                }
                else {
                    setShowAlert("Failed to signup"); 
                }
            })
            .catch(error => {
                // Handle errors
                setShowAlert("Failed to signup"); 
                console.error('Error:', error);
            });  
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Sign Up</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={userName}
                placeholder="Enter your username here"
                onChange={ev => setUserName(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{userNameError}</label>
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
                onClick={onButtonClick}
                value={"Sign Up"} />
            
        </div>
        <label className="error">{showAlert}</label>
        <br />
        <div>
            Already have an account ? <button onClick={onClick} >Login</button>
        </div>
    </div>
}

export default SignUp