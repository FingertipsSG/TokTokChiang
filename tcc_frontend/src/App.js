import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Login from "./Components/Auth/Login";
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
import Testing from "./Components/Testing";

function App() {
	return (
		<div className="App">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Wayang Shop</title>
				{/* <link rel="canonical" href="wayangshop.com" /> */}
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
			</Helmet>
	  
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
					<Route path="/Testing">
						<Testing />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
