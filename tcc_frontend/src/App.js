import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import AdminProducts from "./Components/AdminProducts";
import AdminLogin from "./Components/AdminLogin";
import ContactUs from "./Components/ContactUs";
import Services from "./Components/Services";

function App() {
	// let [products, setProducts] = useState([]);
	// let fetchUrl = "/getProducts";
	// function fetchApi(url) {
	// 	fetch(url)
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setProducts(data);
	// 			//console.log(products);
	// 		})
	// 		.catch(() => {
	// 			// Do something for an error here
	// 		});
	// }

	// useEffect(() => {
	// 	fetchApi(fetchUrl);
	// }, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/(home)?">
						<Navbar products={products} />
						<Home />
						{/* <Footer /> */}
					</Route>
				</Switch>
				<Switch>
					<Route path="/(product)([0-9])+">
						<Navbar products={products} />
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
				<Switch>
					<Route path="/products">
						<Products />
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
			</BrowserRouter>
		</div>
	);
}

export default App;
