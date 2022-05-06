import React from "react";
import "../Components/css/home.css";
import background from "../Assets/Images/wash-painting.png";
// import Carousel from "react-bootstrap/Carousel";
// import { Container, Row, Col } from "reactstrap";
// import Button from "react-bootstrap/Button";
import { Row } from "reactstrap";


function Home() {
	return (
		<div className="homePage">
			<br />
			<div className="firstContent">
				<Row>
					<div className="verticalText col-lg-3">
						LOREM 告場
					</div>

					<div className="firstContentText col-lg-3">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
							when an unknown printer took a galley of type and scrambled it to make a type specimen book.
						</p>
						<p> It was popularised in the 1960s with the release of Letraset
							sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
							Aldus PageMaker including versions of Lorem Ipsum.
						</p>
					</div>
				</Row>
			</div>
			<img src={background} />
		</div>
	);
}

export default Home;
