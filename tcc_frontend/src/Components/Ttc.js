import React from "react";
import "../Components/css/Ttc.css";
// import background from "../Assets/Images/AboutUs.png";
import pic1 from "../Assets/Images/NickShen BianLian.JPG";
import pic2 from "../Assets/Images/NickShen Warrior WQY01.jpg";
import Carousel from "react-bootstrap/Carousel";
// import { Container, Row, Col } from "reactstrap";
// import Button from "react-bootstrap/Button";
import { Row } from "reactstrap";
// import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

function Ttc() {
	return (
		<html className="ttcBody">
			<head>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</head>
			<body className="ttcBody">
				<Navbar />
				<br />
				<div className="firstContent">
					<Row>
						<div className="col-lg-6">
							<div className="firstContentText">
								<h2 className="title1">TOK</h2>
								<h2 className="title1">	TOK</h2>
								<h2 className="title2">	CHIANG</h2>
								<br />
								<br />
								<h3> Who Are We </h3>
							</div>
								
							<p className="homeContent">
								Nick Shen Weijun, founder of Tok Tok Chiang Opera, believes that Chinese Opera
								is more than just an art form. Recognising the importance of preserving and keeping
								this traditional performing art alive, Nick hopes to impart traditional values and
								beliefs through the stories portrayed in Chinese opera, to future generations.
							</p>
							<p className="homeContent">
								In 2014, Nick established Tok Tok Chiang Opera, a non-profit entity, as a platform
								to promote cultural appreciation in Singapore. His dedication to Chinese opera has
								earned him the Junior Chamber International (JCI)’s Ten Outstanding Young Persons
								of the World Honouree Award for Cultural Achievement in the same year. Nick made
								further efforts to revive and strengthen this vanishing art form by taking over the
								helm as the troupe owner of Lao Sai Tao Yuan, a 155-year-old Teochew Opera Troupe, in 2017.
							</p>
							<p className="homeContent">
								Tok Tok Chiang Opera is taking the initiative to showcase the history and heritage of
								Singapore&apos;s Chinese street opera, so as to promote this traditional art to the youths
								and the world in a bid to preserve its place in the heritage and culture of the
								ever-changing landscape of Singapore.
							</p>
						</div>
						{/* <div className="col-lg-6">
							<img src={pic1} className="w-75 me-5 sliderPic"/>
						</div> */}

						<div className="col-lg-6">
							<Carousel variant="dark" className="slide" fade>
								<Carousel.Item>
									<img
										className="col-lg-6  col-sm-12"
										id="carouselpic"
										src={pic1}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="col-lg-6  col-sm-12"
										id="carouselpic"
										src={pic2}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="col-lg-6  col-sm-12"
										id="carouselpic"
										src={pic1}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="col-lg-4  col-sm-12"
										id="carouselpic"
										src={pic2}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="col-lg-4  col-sm-12"
										id="carouselpic"
										src={pic1}
									/>
								</Carousel.Item>
							</Carousel>
						</div>
					</Row>
				</div>
			</body>
		</html>
	);
}

export default Ttc;
