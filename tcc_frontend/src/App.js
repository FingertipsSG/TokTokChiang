import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Products from "./Components/Products"

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
            <Route exact path="/(home)?">
              <Home />
            </Route>
          </Switch>
        </div>
        <Switch>
          <Route path="/(product)([0-9])+">
            <Products />
          </Route>
        </Switch>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
