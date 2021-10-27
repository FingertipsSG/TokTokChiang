import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import AdminProducts from "./Components/AdminProducts";
import AdminLogin from "./Components/AdminLogin";

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
			.catch(() => {
				// Do something for an error here
			});
	}

	useEffect(() => {
		fetchApi(fetchUrl);
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<div className="main-container">
					<Switch>
						<Route exact path="/(home)?">
							<Navbar />
							<Home />
							<Footer />
						</Route>
					</Switch>
				</div>
				<Switch>
					<Route path="/(product)([0-9])+">
						<Navbar />
						<Products />
						<Footer />
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
			</BrowserRouter>
		</div>
	);
}

export default App;
