// import { Card, CardGroup } from "react-bootstrap";
// import Logo from "../Assets/Images/toktoklogo.webp";
// import { useState, useEffect } from "react";
import "../Components/css/footer.css";
import Button from "react-bootstrap/Button";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer() {
	return (
		<div style={{ backgroundColor: "#282828"}}>
			<MDBFooter className="font-small pt-4">
				<MDBContainer fluid >
					<MDBRow>
						{/* <MDBCol md="6">
						<h5 className="title" class="text-white">Footer Content</h5>
						<p>
							Here you can use rows and columns here to organize your footer
							content.
						</p>
					</MDBCol> */}
						<MDBCol lg="2" md="4">
							<h5 className="title" style={{ color: "white", marginLeft: "100px", marginTop: "20px" }}>SHOP</h5>
							<ul>
								<li>
									<a style={{ marginLeft: "70px", marginTop: "30px" }} href="#!">Masks</a>
								</li>
								<li>
									<a style={{ marginLeft: "70px", marginTop: "12px" }} href="#!">Dolls</a>
								</li>
								<li>
									<a style={{ marginLeft: "70px", marginTop: "12px" }} href="#!">Hand-puppets</a>
								</li>
								<li>
									<a style={{ marginLeft: "70px", marginTop: "12px" }} href="#!">T-Shirts</a>
								</li>
								<li>
									<a style={{ marginLeft: "70px", marginTop: "12px" }} href="#!">Framed</a>
								</li>
							</ul>
						</MDBCol>
						<MDBCol lg="2" md="4">
							<h5 className="title" style={{ color: "white", marginLeft: "80px", marginTop: "20px" }}>SUPPORT</h5>
							<ul>
								<li>
									<a style={{ marginLeft: "50px", marginTop: "30px" }} href="#!">Service</a>
								</li>
								<li>
									<a style={{ marginLeft: "50px", marginTop: "12px" }} href="#!">Warranty</a>
								</li>
								<li>
									<a style={{ marginLeft: "50px", marginTop: "12px" }} href="#!">Online Store</a>
								</li>
							</ul>
						</MDBCol>
						<MDBCol lg="2" md="4">
							<h5 className="title" style={{ color: "white", marginLeft: "80px", marginTop: "20px" }}>ABOUT US</h5>
							<ul>
								<li>
									<a style={{ marginLeft: "50px", marginTop: "30px" }} href="#!">Tok Tok Chiang</a>
								</li>
								<li>
									<a style={{ marginLeft: "50px", marginTop: "12px" }} href="#!">Lao Sai Tao Yuan</a>
								</li>
							</ul>
						</MDBCol>
						<MDBCol lg="2" md="4">
							<h5 className="title" style={{ color: "white", marginLeft: "80px", marginTop: "20px" }}>CONTACT US</h5>
							<ul>
								<li>
									<a style={{ marginLeft: "50px", marginTop: "30px" }} href="#!">Facebook</a>
								</li>
								<li>
									<a style={{ marginLeft: "50px", marginTop: "12px" }} href="#!">Instagram</a>
								</li>
								<li>
									<a style={{ marginLeft: "50px", marginTop: "12px" }} href="#!">LinkedIn</a>
								</li>
							</ul>
						</MDBCol>
						<MDBCol lg="4" md="4">
							<h3 style={{ color: "white", marginLeft: "180px", marginTop: "40px" }}>8888 8888</h3>
							<ul>
								<li>
									<p style={{ marginLeft: "150px"}}>Monday to Friday 9am-6pm</p>
								</li>
								<li>
									<Button variant="outline-light" style={{ marginLeft: "150px", width: "120px", height: "40px", borderRadius: "0" }}>
										<a style={{ fontSize: "10px" }}>EMAIL SUPPORT</a>
									</Button>
								</li>
							</ul>
						</MDBCol>
						<div style={{ borderTop: "2px solid #fff ", width: "81%", marginLeft: "110px", marginTop: "10px" }}></div>
					</MDBRow>
				</MDBContainer>
				<div className="footer-copyright py-3 text-white" style={{marginLeft: "95px"}}>
					<MDBContainer fluid>
					Copyright &copy; {new Date().getFullYear()} Tok Tok Chiang. All Rights Reserved
					</MDBContainer>
				</div>
			</MDBFooter>
		</div>
	);
}

export default Footer;


// import "./Styles.css";
// import { Card, CardGroup } from "react-bootstrap";
// import Logo from "../Assets/Images/toktoklogo.webp";
// import { useState, useEffect } from "react";

// function Footer() {
// 	function createFooter(productName) {
// 		return (
// 			<Card className="footer__card">
// 				<Card.Img variant="top" src={Logo} />
// 				<Card.Body>
// 					{productName}
// 				</Card.Body>
// 			</Card>
// 		);
// 	}

// 	const [footerArray, setFooterArray] = useState([]);
// 	useEffect(() => {
// 		// This is an array containing the products name
// 		const tempProductArray =
// 			["product1", "product2", "product3", "product4"];
// 		setFooterArray(tempProductArray.map(createFooter));
// 	}, []);

// 	return (
// 		<CardGroup className="footer">
// 			{footerArray}
// 		</CardGroup>
// 	);
// }

// export default Footer; 
