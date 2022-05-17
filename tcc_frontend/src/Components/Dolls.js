import React from "react";
import "../Components/css/shop.css";
import { Container, Row, Col } from "react-grid-system";
import Navbar from "./Navbar";
import doll1 from "../Assets/Images/doll1.jpg";
import doll2 from "../Assets/Images/doll2.jpg";
import doll3 from "../Assets/Images/doll3.jpg";
import back1 from "../Assets/Images/Back 1.jpg";
import side1 from "../Assets/Images/Side1.jpg";
import side2 from "../Assets/Images/Other side 1.jpg";

function Dolls() {
    return (
        <html>
			<head>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</head>
            <body className="dolls-body">
                <Navbar />
                <div className="dolls">
                    <Container className="dolls-container">
                        <Row>
                            <Col sm={6} md={3} >
                                <div className='imagePlaceHolder'>
                                    <a id="close-image" data-toggle="modal" data-target="#myModal"><img className="dolls-image" src={doll1} /></a>
                                    <p className='title'>Chinese Opera Doll - Emperor</p>
                                    <p className="price">$32.80 Incl. GST</p>
                                </div>
                                <div id="myModal" className="modal fade" role="dialog">
                                    <div className="modal-dialog modal-xl">
                                        <div className="modal-content">
                                            <button className="close-button" type="button" data-dismiss="modal">X</button>
                                            <div className="modal-body">
                                                <Row>
                                                    <Col>
                                                        <img className="popup-image" src={doll1} />
                                                        <Row>
                                                            <Col>
                                                                <img className="small-image" src={side1} />
                                                            </Col>
                                                            <Col>
                                                                <img className="small-image" src={back1} />
                                                            </Col>
                                                            <Col>
                                                                <img className="small-image" src={side2} />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col>
                                                        <p className="pop-title">Chinese Opera Doll - Xiang Yu</p>
                                                        <p className="pop-price">$32.80 Incl. GST</p>
                                                        <p>Xu Xian is a mythological figure in Chinese folklore.
                                                            <br />
                                                            He is one of the main characters in the Legend of the White Snake, one of China`s four greatest folk tales.
                                                            <br />
                                                            Size: 15cm
                                                            <br />
                                                            Weight: 130g
                                                            <br />
                                                            Material: Resin
                                                        </p>
                                                        <button type="button" className="shop-here" >Shop Here</button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} md={3} >
                                <img className="dolls-image" src={doll2} />
                                <p className='title'>Chinese Opera Doll - Xiang Yu</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                            <Col sm={6} md={3} >
                                <img className="dolls-image" src={doll3} />
                                <p className='title'>Chinese Opera Doll - Emperor</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll1} />
                                <p className='title'>Chinese Opera Doll - Xu Xian</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll2} />
                                <p className='title'>Chinese Opera Doll - Xiang Yu</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll3} />
                                <p className='title'>Chinese Opera Doll - Emperor</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll1} />
                                <p className='title'>Chinese Opera Doll - Xu Xian</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll2} />
                                <p className='title'>Chinese Opera Doll - Xiang Yu</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>

                        </Row>
                        <Row>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll3} />
                                <p className='title'>Chinese Opera Doll - Emperor</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll1} />
                                <p className='title'>Chinese Opera Doll - Xu Xian</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll2} />
                                <p className='title'>Chinese Opera Doll - Xiang Yu</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                            <Col sm={6} md={3}>
                                <img className="dolls-image" src={doll3} />
                                <p className='title'>Chinese Opera Doll - Emperor</p>
                                <p className="price">$32.80 Incl. GST</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </body>

        </html >

    );
}

export default Dolls;