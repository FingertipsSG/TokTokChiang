import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Card from 'react-bootstrap/Card'
import Logo from "./Assets/Images/toktoklogo.webp";
import Footer from "./Components/Footer";

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
            <Home />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
