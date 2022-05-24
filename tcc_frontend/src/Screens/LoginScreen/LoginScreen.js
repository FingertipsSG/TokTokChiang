import React, { useState, useEffect } from 'react';
import "./LoginScreen.css";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Images/toktoklogo.png';

function LoginScreen() {
    const [details, setDetails] = useState({ username: "", password: "" });
    const [user, setUser] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
  
    const Login = async details => {
      // console.log(details);
  
      await axios.post("http://localhost:5001/login", {
        username: details.username,
        password: details.password,
      }).then((response) => {
        console.log(response);
        setUser(response.data.username);
  
        localStorage.setItem("user", JSON.stringify(response.data.username));
        localStorage.setItem("role", JSON.stringify(response.data.role));
        localStorage.setItem("id", JSON.stringify(response.data.id));

        if (response.status === 200) {
          return navigate("/adminportal");
        }
      }).catch((error) => {
        // console.log(error)
        if (error.response.status === 401) {
          setError(error.response.data.message);
        }
        if (error.response.status === 500) {
          setError(error.response.data.message);
        }
      });
    };

    const submitHandler = e => {
      e.preventDefault();
      Login(details);
    };
    
    return (
      <div className="loginForm">
        <div className="containForm">
        <form onSubmit={submitHandler} className="form-outer">
          <div className='form-inner'>
            <img src={logo} alt="Logo" width={300} height={70}/>
            <h2>Login</h2>
            {(error !== "") ?
              (<Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error} <strong>Try again!</strong>
              </Alert>)
              : ""
            }
            <br />
            <div className='form-group'>
              <label htmlFor='name'> Username:</label>
              <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.name} />
            </div>
            <div className='form-group'>
              <label htmlFor='password'> Password:</label>
              <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
            </div>
            <input type="submit" value="LOGIN" />
            <Link to="/email">Forget Password?</Link>
          </div>
        </form>
        </div>
      </div>
    );
}

export default LoginScreen;