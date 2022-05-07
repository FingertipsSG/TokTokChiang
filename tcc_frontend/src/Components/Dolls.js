import React from "react";
import "../Components/css/shop.css";
import { Container, Row, Col } from "react-grid-system";
import Navbar from "./Navbar";
import doll1 from "../Assets/Images/doll1.jpg";
import doll2 from "../Assets/Images/doll2.jpg";
import doll3 from "../Assets/Images/doll3.jpg";

function Dolls() {
    return (
        <html>

            <body className="dolls-body">
                    <Navbar />
                <div className="dolls">
                    <Container className="dolls-container">
                        <Row>
                            <Col sm={6} md={3} >
                               <img className="dolls-image" src={doll1} />
                                <p className='title'>Chinese Opera Doll - Xu Xian</p>
                                <p className="price">$32.80 Incl. GST</p>
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

        </html>

    );
}

export default Dolls;