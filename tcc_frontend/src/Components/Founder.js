import React from "react";
import "../Components/css/founder.css";
import founderPic from "../Assets/Images/NickShen 01.jpg";
import { Row } from "reactstrap";
import Navbar from "./Navbar";



function founder() {
    return (
        <html className="founderHtml">
            <head>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            </head>
            <body className="founderBody">
                <Navbar />
                <br />
                <div className="founderDiv">
                    <Row>
                        <div className="col-lg-6">
                            <div className="firstContentText">
                                <h2 className="title1">OUR FOUNDER</h2>				
                                <h2> NICK SHEN </h2>
                                <h2>沈炜竣</h2>
                            </div>

                            <p className="homeContent">
                                Nick Shen Weijun is an accomplished performer – an actor, a bilingual host, singer, radio DJ and more interestingly,
                                a Chinese Opera artiste. He is well-versed in English, Mandarin and Chinese dialects, especially in Teochew.
                            </p>
                            <p className="homeContent">
                                Nick first caught the attention of TV viewers with his resounding Win at the 1999 Asia-wide Star Search Singapore after completing his acting course with MediaCorp,
                                Singapore’s leading broadcasting company. Steadily, Nick gained recognition as the actor with multiple talents.
                                His minor stint in Fashion with his runner-up win at Teenage Magazine Model Search and walking for Vietnam Fashion Week, led up to him becoming an actor and performing artiste.

                            </p>

                            <p className="homeContent">
                                In 2017, Nick made further efforts to revive and promote this vanishing art form by taking over the helm as the troupe owner of Lao Sai Tao Yuan Teochew Opera Troupe,
                                and he also sought out new performing opportunities and presented Chinese opera in Toyama, Japan, as part of a cultural exchange programme.
                            </p>
                            <p className="homeContent">
                                In 2018, Nick has successfully put up two Chinese Opera Exhibitions and have been invited to perform in China and Japan.
                                As the next-generation troupe owner of Lao Sai Tao Yuan and an arts advocate, Nick is taking initiative to promote this traditional art to the youths and the world in a bid to preserve its place in the heritage and culture of the ever-changing landscape of Singapore.
                            </p>
                            <p className="homeContent">
                              
                            </p>
                         
                        </div>
                        <img src={founderPic} className="col-lg-3 founderPic" width={50} height={450} />
                    </Row>
                </div>
            </body >
        </html >
    );
}

export default founder;
