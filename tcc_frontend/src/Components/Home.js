import React from "react";
import "../Components/css/home.css";
import { Row } from "reactstrap";
import founder from "../Assets/Images/wayang3.jpg";

import Navbar from "./Navbar";

function Home() {
    return (
        <html className="homeHtml">
            <head>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            </head>
            <body className="homePageBody">
             <div className="bottomDiv">
                  <div className="rightDiv">
                        <Navbar />
                        <br />
                        <div className="firstContent">
                            <div className="firstContentText">
                                <h2 className="title1">ALL ABOUT US</h2>
                                <br />
                                <br />
                                <h5 className="homeTitle"> How We Started </h5>
                            </div>
                            <div className="founderPicMobile">
                                <img src={founder} className="homeFounderPic founderImage" />
                            </div>
                            <Row>
                                <div className="col-lg-6 homescroll">
                                <h5 className="homeTitle1"> How We Started </h5>
                                    <p className="homeContent">
                                        Having been influenced by his grandmother who would routinely read him scripts at bedtime,
                                        and his grandfather as a drummer for a Chinese opera troupe, Nick has lived and breathed
                                        Teochew opera since he was a child and started performing at age 13.
                                        <br />
                                        <br/>
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
                                    </p>
                                    <br />
                                    <h5 className="secondHeader"> What We Sell </h5>
                                    <p className="homeContent2">
                                        Keeping the traditions alive, we love seeing elements of Chinese opera
                                        everywhere we go! Ranging from gifts to lifestyle merchandise, we sourced
                                        globally for high quality Chinese Opera-inspired items. You can also find
                                        one-of-a-kind pieces which are handcrafted by our very own veteran artistes
                                        of Lao Sai Tao Yuan Teochew Opera Troupe. From time to time, we may also launched
                                        uniquely designed items. A portion of the sale proceeds will be used to fund
                                        the operations of Lao Sai Tao Yuan Teochew Opera Troupe.
                                    </p>
                                </div>
                                <div className="col-lg-6 founderPicDesktop">
                                    <img src={founder} className="homeFounderPic" />
                                </div>
                            </Row>
                        </div>
                  </div>
                 
             </div>
             <div className="shop-height"></div>
            </body>
        </html>
    );
}

export default Home;