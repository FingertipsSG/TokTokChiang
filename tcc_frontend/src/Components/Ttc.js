import React from "react";
import "../Components/css/Ttc.css";
import pic1 from "../Assets/Images/NickShen BianLian.JPG";
import pic2 from "../Assets/Images/NickShen Warrior WQY01.jpg";
import Carousel from "react-bootstrap/Carousel";
import { Row } from "reactstrap";
import Navbar from "./Navbar";

function Ttc() {
	return (
		<html className="ttcHtml">
			<head>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</head>
			<body className="ttcBody">
				<Navbar />
                <br />
                <br />
                <br />
                <br />
                <br />
				<div className="firstContent">
					<Row>
						<div className="col-lg-6">
							<div className="firstContentText">
								<h2 className="title1">TOK</h2>
								<h2 className="title1">	TOK</h2>
								<h2 className="title2">	CHIANG OPERA</h2>
								<br />
								<br />
								<h3 className="ttcTitle"> Who Are We </h3>
							</div>
							<p className="ttcContent">
								Tok Tok Chiang Opera Ltd, a non-profit entity established by Nick in 2014 as a platform to promote cultural appreciation in Singapore.
								The company has since been invited to partner with People’s Association to bring awareness of Chinese opera to the Singapore public.
								It also works with several government ministries and statutory boards to plan and conceptualise cultural events and workshops on Chinese opera for schools,
								museums, libraries, and shopping centres.
								<br />
								<br />
								Some of its clients include the Ministry of Education, National Heritage Board and the National Library Board.
								Nick strongly believes that Chinese Opera is more than just an art form.
								Recognising the importance of preserving and keeping this traditional performing art alive,
								<br />
								<br />
								Nick hopes to impart traditional values and beliefs through the stories portrayed in Chinese opera,
								to future generations. In 2017, Nick took over the helm as the troupe owner of Lao Sai Tao Yuan
								Teochew Opera Troupe under the umbrella of this non-profit entity.
							</p>
						</div>
						<div className="col-lg-6">
							<Carousel variant="dark" className="slide ttcCarousel" fade>
								<Carousel.Item>
									<img
										className="col-lg-6  col-sm-12"
										id="carouselPic"
										src={pic1}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="col-lg-6  col-sm-12"
										id="carouselPic"
										src={pic2}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="col-lg-6  col-sm-12"
										id="carouselPic"
										src={pic1}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="col-lg-4  col-sm-12"
										id="carouselPic"
										src={pic2}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="col-lg-4  col-sm-12"
										id="carouselPic"
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