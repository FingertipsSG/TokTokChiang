import React, { useState, useEffect } from "react";
import "./LoginScreen.css";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/toktoklogo.png";
import jwtDecode from "jwt-decode";
import { resolveContent } from "nodemailer/lib/shared";
import { Alert as WarningAlert } from "antd";

var config = require("../../config.js");
var baseUrl =
  config.LOCAL_BACKEND || "https://tok-tok-chiang-nodejs.herokuapp.com";

function LoginScreen() {
  const [details, setDetails] = useState({ username: "", password: "" });
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const Login = async (details) => {
    await axios
      .post(baseUrl + "/login", {
        username: details.username,
        password: details.password,
      })
      .then((response) => {
        // console.log(response);
        setUser(response.data.username);

        localStorage.setItem("user", JSON.stringify(response.data.username));
        localStorage.setItem("role", JSON.stringify(response.data.role));
        localStorage.setItem("id", JSON.stringify(response.data.id));
        localStorage.setItem("token", JSON.stringify(response.data.token));

        // const currentTime = new Date(Date.now()).getTime().toString();
        // const jwtTime = jwtDecode(response.data.token).exp;
        // console.log(
        //   "current time: " + currentTime.substring(0, currentTime.length - 3)
        // );
        // console.log("jwt time: " + jwtTime);

        // LEFTOFFAT Console log token to test
        // console.log(response.data.token);

        if (response.status === 200) {
          navigate("/shop", {
            state: {
              isLoggedIn: true,
              isAuthenticated: true,
              message: "",
            },
            replace: true,
          });

          // CLears JWT details after 1h
          setTimeout(function () {
            if (jwtDecode(response.data.token).exp < Date.now()) {
              // console.log("after 1 hour");

              // Clear localStorage
              localStorage.clear();

              // Navigate to login and set isLoggedIn state to false
              navigate("/login", {
                state: {
                  isLoggedIn: false,
                  isAuthenticated: false,
                  message: "Session timed out. Please log in again.",
                },
                replace: true,
              });
            }
          }, 60 * 60 * 1000);
        }
      })
      .catch((error) => {
        // console.log(error)
        if (error.response.status === 401) {
          setError(error.response.data.message);
        }
        if (error.response.status === 500) {
          setError(error.response.data.message);
        }
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  // Clears states when navigating between pages on refresh
  useEffect(() => {
    window.history.replaceState({}, "");
  }, []);

  return (
    <div>
      {location.state != undefined && !location.state.isAuthenticated && (
        <div className="warning-container">
          <WarningAlert
            className="warning"
            message={"Warning"}
            description={location.state.message}
            type="warning"
            showIcon
            closable={true}
          />
        </div>
      )}
      <div className="loginForm">
        <div className="containForm">
          <form onSubmit={submitHandler} className="form-outer">
            <div className="form-inner">
              <img src={logo} alt="Logo" width={300} height={70} />
              <h2>Login</h2>
              {error !== "" ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error} <strong>Try again!</strong>
                </Alert>
              ) : (
                ""
              )}
              <br />
              <div className="form-group">
                <label htmlFor="name"> Username:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) =>
                    setDetails({ ...details, username: e.target.value })
                  }
                  value={details.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  value={details.password}
                />
              </div>
              <input type="submit" value="LOGIN" />
              <Link to="/email">Forget Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
