import React from "react";
import CustomNavbar from "../Components/CustomNavbar/CustomNavbar";
import "./HomeScreen.css";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  const location = useLocation();

  return (
    <>
      <CustomNavbar isLoggedIn={location.state.isLoggedIn} />
    </>
  );
}

export default HomeScreen;
