import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home";
// import Footer from "./Components/Footer";
// import Products from "./Components/Products";
import AdminProducts from "./Components/AdminProducts";
import AdminLogin from "./Components/AdminLogin";
import ContactUs from "./Components/ContactUs";
import Dolls from "./Components/Dolls";
import Services from "./Components/Services";
import Home2 from "./Components/Home2";
import Masks from "./Components/Masks";
import Handpuppets from "./Components/Handpuppets";
import Tshirts from "./Components/Tshirts";
import Framed from "./Components/Framed";
import Warranty from "./Components/Warranty";
import Onlinestore from "./Components/Onlinestore";


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/(home)?">
						<Home />
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/home2">
						<Home2 />
					</Route>
				</Switch>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
				</Switch>
				<Switch>
					<Route path="/admin-login">
						<AdminLogin />
					</Route>
				</Switch>
				<Switch>
					<Route path="/admin-products">
						<AdminProducts />
					</Route>
				</Switch>
				<Switch>
					<Route path="/Dolls">
						<Dolls />
					</Route>
				</Switch>
				<Switch>
					<Route path="/Masks">
						<Masks />
					</Route>
				</Switch>
				<Switch>
					<Route path="/Tshirts">
						<Tshirts />
					</Route>
				</Switch>
				<Switch>
					<Route path="/Framed">
						<Framed />
					</Route>
				</Switch>
				<Switch>
					<Route path="/Handpuppets">
						<Handpuppets />
					</Route>
				</Switch>
				<Switch>
					<Route path="/ContactUs">
						<ContactUs />
					</Route>
				</Switch>
				<Switch>
					<Route path="/services">
						<Services />
					</Route>
				</Switch>
				<Switch>
					<Route path="/warranty">
						<Warranty />
					</Route>
				</Switch>
				<Switch>
					<Route path="/onlinestores">
						<Onlinestore />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
