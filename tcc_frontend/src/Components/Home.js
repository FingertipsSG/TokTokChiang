import React from "react";
import "../Components/css/home.css";
import Carousel from "react-bootstrap/Carousel";
import { Container, Row, Col } from "reactstrap";
import Button from "react-bootstrap/Button";
//import image from "../Assets/Images/toktoklogo.webp";
import doll from "../Assets/Images/doll.png";

const products = [
	{
		id: 1, name: "Product A",
		image: doll,
		color: "#f1e4e4"
	},
	{
		id: 2, name: "Product B",
		image: doll,
		color: "#e4f1e4"
	},
	{
		id: 3, name: "Product C",
		image: doll,
		color: "#e4e4f1"
	},
];

function goProducts() {
	window.location.href = "/products";

}

function CarouselFade() {
	return (
		<Carousel variant="dark" fade style={{ backgroundColor: "#f7f7f7" }}>
			<Carousel.Item>
				<Carousel.Caption>
					<div className="carouselContent col-lg-7 col-md-12 col-sm-12">
						<p>Product A</p>
						<p style={{ marginBottom: "30px" }}>
							Lorem Ipsum
						</p>
						<p style={{ fontSize: "15px" }}>
							Lorem Ipsum
						</p>
						<Button onClick={goProducts} variant="outline-dark" className="carouselButton">
							<a style={{ fontSize: "15px" }}>Learn More</a>
						</Button>
					</div>
				</Carousel.Caption>
				<img
					className="col-lg-4  col-sm-12"
					id="carouselpic"
					src={doll}
				/>
			</Carousel.Item>
			<Carousel.Item>
				<Carousel.Caption>
					<div className="carouselContent col-lg-7 col-md-12 col-sm-12">
						<p>Product B</p>
						<p style={{ marginBottom: "30px" }}>
							Lorem Ipsum
						</p>
						<p style={{ fontSize: "15px" }}>
							Lorem Ipsum
						</p>
						<Button onClick={goProducts} variant="outline-dark" className="carouselButton">
							<a style={{ fontSize: "15px" }}>Learn More</a>
						</Button>
					</div>
				</Carousel.Caption>
				<img
					className="col-lg-5 col-md-12 col-sm-12"
					id="carouselpic"
					src={doll}
				/>
			</Carousel.Item>
			<Carousel.Item>
				<Carousel.Caption>

					<div className="carouselContent col-lg-7 col-md-12 col-sm-12">

						<p>Product C</p>
						<p style={{ marginBottom: "30px" }}>
							Lorem Ipsum
						</p>
						<p style={{ fontSize: "15px" }}>
							Lorem Ipsum
						</p>
						<Button onClick={goProducts} variant="outline-dark" className="carouselButton">
							<a style={{ fontSize: "15px" }}>Learn More</a>
						</Button>
					</div>
				</Carousel.Caption>
				<img
					className="col-lg-5 col-md-12 col-sm-12"
					id="carouselpic"
					src={doll}
				/>
			</Carousel.Item>

		</Carousel>
	);
}

function Product() {
	return (
		<Container>
			<Row className="displayRow p-4">
				<div className="display col-lg-4" style={{ backgroundColor: "#f1e4e4" }}>
					<a className="displayTitle">Product A</a>
					<img className="displayImg" src={doll} />
				</div>
				<div className="display col-lg-4" style={{ backgroundColor: "#e4f1e4" }}>
					<a className="displayTitle">Product B</a>
					<img className="displayImg" src={doll} />
				</div>
				<div className="display col-lg-4" style={{ backgroundColor: "#e4e4f1" }}>
					<a className="displayTitle">Product C</a>
					<img className="displayImg" src={doll} />
				</div>
			</Row>
		</Container>
	);
}

function TopProducts() {
	return (
		<Container>
			<Row style={{ left: "120px", position: "relative" }}>
				{/* <a href="/#" style={{ display: "block" }}> */}
				<div id="ProdA" className="col-lg-5">
					<a id="ProdTitle">Product A</a>
					<img className="bigDollImg" src={doll} />
				</div>
				{/* </a> */}
				<Col>
					<Row>
						{/* <a href="/#" style={{ display: "block" }}> */}
						<div id="ProdBC" className="col-lg-4" style={{ backgroundColor: "#e4f1e4" }}>
							<a id="ProdTitle">Product B</a>
							<img className="miniDollImg" src={doll} />
						</div>
						{/* </a>
						<a href="/#" style={{ display: "block" }}> */}
						<div id="ProdBC" className="col-lg-4" style={{ backgroundColor: "#e4e4f1" }}>
							<a id="ProdTitle">Product C</a>
							<img className="miniDollImg" src={doll} />
						</div>
						{/* </a> */}
					</Row>
					<Row>
						{/* <a href="/#" style={{ display: "block" }}> */}
						<div id="ProdD" className="col-lg-8">
							<a id="ProdTitle">Product D</a>
							<img className="mediumDollImg" src={doll} />
						</div>
						{/* </a> */}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

function Platforms() {
	return (
		<div className="platform">
			<Container>
				<Row>
					<Col className = "col-lg-3 p-4">
						<a id="displayTitle">Stay In Touch</a>
						<a>Get Updates on special deals & more.</a>
					</Col>
					<form className="col-lg-4 p-4">
						<input type="text" className="emailInput" placeholder="Enter Email Address" />
					</form>
					<Col className = "col-lg-4 p-4">
						<a id="displayTitle">Follow Us</a>
						<a>Follow us for updates!</a>
					</Col>
				</Row>
			</Container>

		</div>
	);
}

function Home() {
	return (
		<div className="homePage">
			<div className="home">
				<CarouselFade />
				<Product products={products} />
			</div>
			<div style={{ display: "flex", flexDirection: "row", marginTop: "60px", marginLeft: "120px" }}>
				<div style={{ borderTop: "2px solid black ", width: "25%", marginLeft: "130px", marginTop: "20px" }}></div>
				<a style={{ fontSize: "26px", marginLeft: "80px", marginBottom: "30px" }}>Top Products</a>
				<div style={{ borderTop: "2px solid black ", width: "25%", marginLeft: "80px", marginTop: "20px" }}></div>
			</div>
			<TopProducts />
			<br />
			<br />
			<br />
			<Platforms />
		</div>
	);
}

export default Home;
