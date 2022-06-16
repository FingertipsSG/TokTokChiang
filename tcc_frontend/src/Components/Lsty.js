import React from "react";
import "../Components/css/Lsty.css";
import pic1 from "../Assets/Images/lsty1.jpg";
import pic2 from "../Assets/Images/lsty2.jpg";
import pic3 from "../Assets/Images/lsty3.png";
import Carousel from "react-bootstrap/Carousel";
import { Row } from "reactstrap";
import Navbar from "./Navbar";

function Lsty() {
	return (
		<html className="lstyHtml">
			<head>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</head>
			<body className="lstyBody">
				<div className="bottomDiv">
					<div className="rightDiv">
						<Navbar />
						<br />
						<div className="firstContent">
							<div className="firstContentText">
								<h2 className="lstyHeader">LAO SAI TAO YUAN</h2>
								<br/>
								<h2 className="lstyHeader2">TEOCHEW OPERA TROUPES</h2>
								<br />
								<br />
								<h3 className="lstyTitle"> 老赛桃源潮剧团 </h3>
							</div>
							<div className="carouselMobile">
								<Carousel variant="dark" className="slide lstyCarousel" fade>
									<Carousel.Item>
										<img
											className="col-lg-6  col-sm-12"
											id="lstyPic"
											src={pic1}
										/>
									</Carousel.Item>
									<Carousel.Item>
										<img
											className="col-lg-6  col-sm-12"
											id="lstyPic"
											src={pic2}
										/>
									</Carousel.Item>
									<Carousel.Item>
										<img
											className="col-lg-6  col-sm-12"
											id="lstyPic"
											src={pic3}
										/>
									</Carousel.Item>
								</Carousel>
							</div>
							<Row>
								<div className="col-lg-6">
									<p className="lstyContent">
										Founded in 1864, Lao Sai Tao Yuan Teochew Opera Troupe (老赛桃源潮剧团) is among the oldest and one of the few remaining iconic Chinese opera troupes in Singapore with 158 years of history.
										In the 1920s, when there were over a hundred professional troupes in Singapore, Lao Sai Tao Yuan wielded a strong influence among the Chinese community, boasting hundreds of performers and attracting enormous crowds at its street performances.
										It was – and still is - not only a feast to the senses but also an accessible form of entertainment for the migrant community Singapore once was.
										<br />
										<br />
										To this day, Lao Sai Tao Yuan, with its 30 performing artistes and musicians,
										prides itself in keeping this Singaporean cultural heritage alive by preserving the traditions and practice so unique to this art form,
										giving both Singaporeans and non-Singaporeans alike a glimpse into the history of a country so rich in tradition and culture.
										<br />
										<br />
										In 2017, Nick made further efforts to revive and promote this vanishing art form by taking over the helm as the troupe owner of Lao Sai Tao Yuan Teochew Opera Troupe,
										and he also sought out new performing opportunities and presented Chinese opera in Toyama, Japan, as part of a cultural exchange programme.
										<br />
										<br />
										In 2018, Nick has successfully put up two Chinese Opera Exhibitions and have been invited to perform in China and Japan.
										As the next-generation troupe owner of Lao Sai Tao Yuan and an arts advocate, Nick is taking initiative to promote this traditional art to the youths and the world in a bid to preserve its place in the heritage and culture of the ever-changing landscape of Singapore.
									</p>
								</div>

								<div className="col-lg-6 carouselDesktop">
									<Carousel variant="dark" className="slide lstyCarousel" fade>
										<Carousel.Item>
											<img
												className="col-lg-6  col-sm-12"
												id="lstyPic"
												src={pic1}
											/>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="col-lg-6  col-sm-12"
												id="lstyPic"
												src={pic2}
											/>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="col-lg-6  col-sm-12"
												id="lstyPic"
												src={pic3}
											/>
										</Carousel.Item>
									</Carousel>
								</div>
							</Row>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}

export default Lsty;