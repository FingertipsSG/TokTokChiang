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

import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div className="App">
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
          <Route path="tshirts" element={<Tshirt />} />
          <Route path="frames" element={<Framed />} />
          <Route path="handpuppets" element={<HandPuppets />} />

          <Route path="login" element={<LoginScreen />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="shop"
            element={
              <ProtectedRoute>
                <ShopScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UserScreen />
              </ProtectedRoute>
            }
          />
          <Route path="email" element={<EmailScreen />} />
          <Route path="digitPin" element={<DigitPinScreen />} />
          <Route path="reset" element={<ResetPasswordScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
