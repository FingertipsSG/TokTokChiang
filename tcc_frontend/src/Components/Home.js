import React from "react";
import "../Components/css/home.css";
import { Row } from "reactstrap";
import founder from "../Assets/Images/NickShen Scholar.jpg";
import mask from "../Assets/Images/homeMask.jpg";
import doll from "../Assets/Images/doll1.jpg";
import puppet from "../Assets/Images/homePuppets.jpg";
import beard from "../Assets/Images/homeBeard.jpg";


import Navbar from "./Navbar";

function Home() {
    return (
        <html>
            <head>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            </head>
            <body className="homePageBody">
                <Navbar />
                <br />
                <div>
                    <Row>
                        <div className="col-lg-6">
                            <div className="homeContentText">
                                <h2 className="title1">ALL ABOUT US</h2>
                                <br />
                                <br />
                                <h3> How We Started? </h3>
                            </div>

                            <p className="homeContent">
                                Having been influenced by his grandmother who would routinely read him scripts at bedtime,
                                and his grandfather as a drummer for a Chinese opera troupe, Nick has lived and breathed
                                Teochew opera since he was a child and started performing at age 13.
                            </p>
                            <p className="homeContent">
                                In 2011, Nick turned his passion for Chinese opera into a purpose and founded Tok Tok Chiang,
                                a platform where Nick dedicates his efforts in repositioning Chinese opera and culture, changing
                                perspectives and renewing interest in the audience. With his determination in perfecting this
                                traditional art form, Nick followed his passion and made an impact. He bagged the Honouree Award
                                for Cultural Achievement of JCI Ten Outstanding Young Persons of the World Singapore in 2014.
                            </p>
                            <p className="homeContent">
                                In 2017, Nick made further efforts to revive and promote this vanishing art form by taking over the
                                helm as the troupe owner of Lao Sai Tao Yuan, a 158-year-old Teochew Opera Troupe under our non-profit
                                arm, Tok Tok Chiang Opera Ltd.
                            </p>
                        </div>
                        <img src={founder} className="col-lg-6 founderPic" height={350} />
                    </Row>
                    <div className="homeContentText">
                        <br />
                        <br />
                        <h3> What We Sell? </h3>
                    </div>

                    <Row className="products justify-content-center">
                        <div className="col-lg-2">
                            <div className="card">
                                <div className="card-body">
                                    <img src={mask} className="card-img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="card">
                                <div className="card-body">
                                    <img src={doll} className="card-img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="card">
                                <div className="card-body">
                                    <img src={beard} className="card-img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="card">
                                <div className="card-body">
                                    <img src={puppet} className="card-img" />
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Row>
                    <div className="col-lg-2"></div>
                    <div className="homeContent2 col-lg-6">
                        <p>
                            <br />
                            <br />
                            Having been influenced by his grandmother who would routinely read him scripts at bedtime,
                            and his grandfather as a drummer for a Chinese opera troupe, Nick has lived and breathed
                            Teochew opera since he was a child and started performing at age 13.
                            <br />
                            <br />
                            In 2011, Nick turned his passion for Chinese opera into a purpose and founded Tok Tok Chiang,
                            a platform where Nick dedicates his efforts in repositioning Chinese opera and culture, changing
                            perspectives and renewing interest in the audience. With his determination in perfecting this
                            traditional art form, Nick followed his passion and made an impact. He bagged the Honouree Award
                            for Cultural Achievement of JCI Ten Outstanding Young Persons of the World Singapore in 2014.
                            <br />
                            <br />
                            In 2017, Nick made further efforts to revive and promote this vanishing art form by taking over the
                            helm as the troupe owner of Lao Sai Tao Yuan, a 158-year-old Teochew Opera Troupe under our non-profit
                            arm, Tok Tok Chiang Opera Ltd.
                            <br />
                            <div style={{ height: "300px" }}>

                            </div>

                        </p>
                    </div>
                    <div className="col-lg-2"></div>
                    </Row>
                </div>
            </body>
        </html>
    );
}

export default Home;
