import React from "react";
import "../Components/css/wayang.css";
import { Row } from "reactstrap";
import Carousel from "react-bootstrap/Carousel";
import wayang1 from "../Assets/Images/wayang1.jpg";
import wayang2 from "../Assets/Images/wayang2.jpg";
import wayang3 from "../Assets/Images/wayang3.jpg";
import Navbar from "./Navbar";

function Wayang() {
    return (
        <html>
            <head>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            </head>
            <body className="wayangBody">
                <Navbar />
                <br />
                <div>
                    <Row>
                    <div className="col-lg-1"></div>
                        <div className="col-lg-5 col-md-12 wayangBulkContent">
                            <div className="wayangContentTitle">
                                <h2 className="wayangTok">TOK</h2>
                                <h2 className="wayangTok">	TOK</h2>
                                <h2 className="wayangTitle">	CHIANG WAYANG</h2>
                                <br />
                                <br />
                                <h3> How We Started? </h3>
                            </div>
                            <div className="wayangContentAll">
                                <p className="wayangContent">
                                    Nick has a deep affinity for Chinese opera and is adamant to keep this traditional art form alive
                                    in Singapore. He believes that Chinese opera is more than just a form of art. The stories portrayed
                                    in Chinese opera are very meaningful and steeped in moral values and life experiences.
                                </p>
                                <p className="wayangContent">
                                    In 2011, Nick founded Tok Tok Chiang Wayang Pte Ltd, an events management company. Together with a team
                                    of young, creative, dynamic & dedicated professionals, Nick takes the lead in pushing all areas of event
                                    management to new frontiers, including but not limited to corporate events, festivals, carnivals, stage
                                    performances, themed-events, educational workshops, cultural activities, and film production. Through
                                    innovative elements, Tok Tok Chiang Wayang aims to create a unique experience for our clients, especially
                                    in inspiring the youths to reconnect with their cultural roots and instil moral values through educational platforms.
                                </p>
                                <p className="wayangContent">
                                    To make Chinese opera enticing to people especially the Singaporean youth, Nick has created a hybrid genre of
                                    traditional Chinese opera dance with western magic techniques. Performances are also conducted on stage in the
                                    respective Chinese dialects with English subtitles in order to overcome the language barrier.
                                </p>
                                <p className="wayangContent">
                                    Nick took on the role of Creative Director for many Chinese opera performances. Tok Tok Chiang Wayang collaborated
                                    with the National Heritage Board’s Wan Qing CultureFest and Night Under The Stars (2011 to 2016) as well as National
                                    Library Board’s Chinese Opera workshops. In 2014, Nick and team conceptualized a multi-racial Chinese Opera performance
                                    – the first in Singapore – with Malay and Indian friends for Shan You Counselling Centre, which garnered positive feedback
                                    from Singapore’s Member of Parliament, Dr Lily Neo, and the audience. Nick was also the producer for three consecutive
                                    years for the Esplanade’s Mid-Autumn Festival from 2014 to 2016.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <Carousel variant="dark" className="slide wayangCarouselSlide" fade>
                                <Carousel.Item>
                                    <img
                                        className="col-lg-9 col-md-10 col-sm-12"
                                        id="wayangCarouselPic"
                                        src={wayang1}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="col-lg-9 col-md-10 col-sm-12"
                                        id="wayangCarouselPic"
                                        src={wayang2}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="col-lg-9 col-md-10 col-sm-12"
                                        id="wayangCarouselPic"
                                        src={wayang3}
                                    />
                                </Carousel.Item>

                            </Carousel>
                        </div>                        
                        <div style={{ height: "150px" }}></div>
                    </Row>
                </div>
            </body>
        </html>
    );
}

export default Wayang;
