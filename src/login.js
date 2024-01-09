import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = (props) => {
    const navigate = useNavigate();
    const {userName , setUserName, setLogin} = props
    const [showAlert, setShowAlert] = useState("");
    const [password, setPassword] = useState("")
    const [userNameError, setUserNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
        
    const onButtonClick = useCallback(() => {

        // Set initial error values to empty
        setUserNameError("")
        setShowAlert("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === userName) {
            setUserNameError("Please enter your username")
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
            password: password
          };

        const fetchData = async () => {
            await axios.post("http://localhost:8080/login", postData)
            .then(response => {
                // Handle the successful response
                if ( response.data.login ) {
                    const getData = async () => {
                        await axios.post("http://localhost:8080/profile" , {accessToken : response.data.accessToken})
                        .then(response => {
                            // Handle the successful response 
                            if (response.data.authenticated) {
                                setLogin(true)
                                navigate('/profile', { state: { userName: userName } });
                            }
                        })
                        .catch(error => {
                            // Handle errors
                            setShowAlert("Failed to login"); 
                            console.error('Error:', error);
                        }); 
                    }
                    getData()
                } 
                if (!response.data.userexits){
                    setShowAlert("User does not exits");  
                }
                else {
                    setShowAlert("Password is incorrect"); 
                }
            })
            .catch(error => {
                // Handle errors
                setShowAlert("Failed to login"); 
                console.error('Error:', error);
            });
        }
        fetchData()
    })

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={userName}
                placeholder="Enter your email here"
                onChange={ev => setUserName(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{userNameError}</label>
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
                value={"Log in"} />
            
            
        </div>
        <label className="error">{showAlert}</label>
    </div>
}

export default Login