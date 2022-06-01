import React from "react";
import "../Components/css/services.css";
import { Container, Row, Col } from "reactstrap";
import Navbar from "./Navbar";
import { Table} from "react-bootstrap";

function Services() {
    return (
        <html className="servicesHtml">
			<head>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</head>
            <body className="services-body">
                <Navbar />
                <div className="services-div">
                    <Container>
                        <Row>
                            <Col className="services-row"  xs={11} >
                                <div className="services">
                                    <Table className="services-table" borderless >
                                        <thead>
                                            <tr>
                                                <th>EVENT PLANNING</th>
                                                <th>ENTERTAINMENT</th>
                                                <th>CULTURAL ACTIVITIES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Audiovisual</td>
                                                <td>Emcees</td>
                                                <td>Chinese Opera Performance</td>
                                            </tr>
                                            <tr>
                                                <td>Catering</td>
                                                <td>Entertainers</td>
                                                <td>Chinese Opera Arias</td>
                                            </tr>
                                            <tr>
                                                <td>Creative Consultancy</td>
                                                <td>Cultural Dance</td>
                                                <td>Chinese Opera Puppetry</td>
                                            </tr>
                                            <tr>
                                                <td>Design & Conceptualisation</td>
                                                <td>Musical Acts</td>
                                                <td>Chinese Opera Showcase</td>
                                            </tr>
                                            <tr>
                                                <td>Games & Activities</td>
                                                <td>Stage Performances</td>
                                                <td>Chinese Opera Costumes Rental</td>
                                            </tr>
                                            <tr>
                                                <td>Exhibition Coordination</td>
                                                <td>Stage Production</td>
                                                <td>Chinese Opera Make-up Service</td>
                                            </tr>
                                            <tr>
                                                <td>Film Choreography</td>
                                                <td>Talent Management</td>
                                                <td>Chinese Opera Workshops</td>
                                            </tr>
                                            <tr>
                                                <td>Theatre Performances</td>
                                                <td>Video Production</td>
                                                <td>Multi-cultural Workshops</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>Theatre Performances</td>
                                                <td>Mask Painting Workshops</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </body>
        </html>
    );
}

export default Services;