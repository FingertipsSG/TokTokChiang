import React from "react";
import "../Components/css/onlinestore.css";
import Navbar from "../Components/Navbar";

function Onlinestore() {
	return (
		<html>
			<head>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</head>
			<body className="homeBody">
				<Navbar />
				<h1 className="comingsoon">COMING SOON</h1>
			</body>
		</html>
	);
}

export default Onlinestore;
