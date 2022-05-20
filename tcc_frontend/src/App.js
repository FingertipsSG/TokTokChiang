import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
// import Footer from "./Components/Footer";
// import Products from "./Components/Products";
import AdminProducts from "./Components/AdminProducts";
import AdminLogin from "./Components/AdminLogin";
import ContactUs from "./Components/ContactUs";
import Dolls from "./Components/Dolls";
import Services from "./Components/Services";
import Masks from "./Components/Masks";
import Handpuppets from "./Components/Handpuppets";
import Tshirts from "./Components/Tshirts";
import Framed from "./Components/Framed";
import Warranty from "./Components/Warranty";
import Onlinestore from "./Components/Onlinestore";
import Home from "./Components/Home";
import Ttc from "./Components/Ttc";
import Lsty from "./Components/Lsty";
import Founder from "./Components/Founder";
import Wayang from "./Components/Wayang";

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
					<Route exact path="/LaoSaiTaoYuan">
						<Lsty />
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/TokTokChiang">
						<Ttc />
					</Route>
				</Switch>
				<Switch>
					<Route path="/Founder">
						<Founder />
					</Route>
				</Switch>
				<Switch>
					<Route path="/Wayang">
						<Wayang />
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
