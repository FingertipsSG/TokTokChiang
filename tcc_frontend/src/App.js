import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContactUs from "./Components/ContactUs";
import Home from "./Components/Home";
import Ttc from "./Components/Ttc";
import Lsty from "./Components/Lsty";
import Founder from "./Components/Founder";
import Wayang from "./Components/Wayang";
import Warranty from "./Components/Warranty";
import Onlinestore from "./Components/Onlinestore";

import Dolls from "./Components/Dolls";
import Services from "./Components/Services";
import Masks from "./Components/Masks";
import HandPuppets from "./Components/Handpuppets";
import Tshirt from "./Components/Tshirts";
import Framed from "./Components/Framed";

import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import ShopScreen from "./Screens/ShopScreen/ShopScreen";
import UserScreen from "./Screens/UserScreen/UserScreen";
import EmailScreen from "./Screens/ForgetPasswordScreen/EnterEmailScreen";
import DigitPinScreen from "./Screens/ForgetPasswordScreen/EnterDigitPinScreen";
import ResetPasswordScreen from "./Screens/ForgetPasswordScreen/ResetPassword";

import Testing from "./Components/Testing";

function App() {
	return (
		<div className="App">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Wayang Shop</title>
				<link rel="canonical" href="wayangshop.com" />
				<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
			</Helmet>
	
			<Router>
				<Routes>
					<Route path="" element={<Home />} />
					<Route path="laosaitaoyuan" element={<Lsty />} />
					<Route path="toktokchiang" element={<Ttc />} />
					<Route path="founder" element={<Founder />} />
					<Route path="contactus" element={<ContactUs />} />
					<Route path="services" element={<Services />} />
					<Route path="wayang" element={<Wayang />} />

					<Route path="dolls" element={<Dolls />} />
					<Route path="masks" element={<Masks />} />
					<Route path="tshirt" element={<Tshirt />} />
					<Route path="framed" element={<Framed />} />
					<Route path="handpuppets" element={<HandPuppets />} />

					<Route path="login" element={<LoginScreen />} />
					<Route path="admin" element={<HomeScreen />} />
					<Route path="shop" element={<ShopScreen />} />
					<Route path="users" element={<UserScreen />} />
					<Route path="email" element={<EmailScreen />} />
					<Route path="digitPin" element={<DigitPinScreen />} />
					<Route path="reset" element={<ResetPasswordScreen />} />

					<Route path="testing" element={<Testing />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
