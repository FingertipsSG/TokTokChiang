import React from "react";
import "../Components/css/home.css";
// import background from "../Assets/Images/AboutUs.png";
// import Carousel from "react-bootstrap/Carousel";
// import { Container, Row, Col } from "reactstrap";
// import Button from "react-bootstrap/Button";
import { Container, Row } from "reactstrap";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";



function Home() {
	return (
		<html>
			<body className="homeBody">
				<Navbar />
				<div className="firstContent">
					<Helmet>
						<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
						<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
					</Helmet>
					<Container>
						<Row>
							<div className="firstContentText">
								<div className="header">
									<h2 className="title1">TOK</h2>
									<h2 className="title1">	TOK</h2>
									<h2 className="title2">	CHIANG</h2>
								</div>
								<h3> Who Are We </h3>
							</div>
						</Row>
					</Container>
				</div>

					<div className="firstContentText col-lg-3">
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
							when an unknown printer took a galley of type and scrambled it to make a type specimen book.
						</p>
						<p> 
							It was popularised in the 1960s with the release of Letraset
							sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
							Aldus PageMaker including versions of Lorem Ipsum.
						</p>
					</div>
			</body>
		</html>
	);
}

export default Home;
