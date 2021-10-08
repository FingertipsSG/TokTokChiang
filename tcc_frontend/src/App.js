import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Logo from "./Assets/Images/toktoklogo.webp";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";

const Navbar = ({ element }) => {
  return (
    <nav className={"navbar navbar-sticky"}>
      <div className="navbar--logo-holder">
        <Link to="/">
          <img src={Logo} alt="logo" className="navbar--logo" />
        </Link>
      </div>
      <div className={"navbar--tabs"}>
        <Link to="/login" alt="temporary">
          Admin
        </Link>
      </div>
    </nav>
  );
};

function App() {
  let fetchUrl = "/api";
  async function fetchApi(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        // Do something for an error here
      });
  }

  useEffect(() => {
    fetchApi(fetchUrl);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="main-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
