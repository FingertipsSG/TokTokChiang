import React from "react";
import "../Components/css/founder.css";
import founderPic from "../Assets/Images/NickShen 1.jpeg";
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
                        <div className="col-lg-7">
                            <div className="firstContentText">
                                <h2 className="title1">OUR FOUNDER</h2>
                                <h2> NICK SHEN </h2>

                                <h2>沈炜竣</h2>
                            </div>

                            <p className="homeContent">
                                Nick Shen Weijun is an accomplished performer – an actor, a bilingual host, singer, radio DJ and more interestingly,
                                a Chinese Opera artiste. He is well-versed in English, Mandarin and Chinese dialects, especially in Teochew.
                                Nick first caught the attention of TV viewers with his resounding Win at the 1999 Asia-wide Star Search Singapore after completing his acting course with MediaCorp,
                                Singapore&apos;s leading broadcasting company. Steadily, Nick gained recognition as the actor with multiple talents.
                            </p>
                            <p className="homeContent">
                                His minor stint in Fashion with his runner-up win at Teenage Magazine Model Search and walking for Vietnam Fashion Week, led up to him becoming an actor and performing artiste.
                                He has since garnered invaluable experiences as a media personality and was once the guest radio DJ for MediaCorp Capital 95.8FM. Today, Nick&apos;s wealth of acting experience has led to him being appointed as a trainer at Mediacorp&apos;s Singapore Media Academy for its Diploma in Acting course since 2014.
                                Whilst establishing his career as a media personality, Nick relentlessly pursued his passion for Chinese opera.
                                His prolific work and his versatility as a media personality and in Chinese opera has earned him numerous accolades.
                            </p>
                            <p className="homeContent">
                                In 2014, Nick was awarded the Honouree Award for the JCI Ten Outstanding Young Persons of the World – Singapore for the cultural achievement category.  He was the only winner selected from a pool of over 200 candidates, to represent Singapore in Germany to compete against other youths from more than 150 countries. In 2015, Nick was invited to be the judge for Singapore Ten Outstanding Young Persons of the World grand finals. He was also elected to be the Vice President of Junior Chamber International, JCI Mandarin Chapter Singapore. He was awarded the Most Outstanding JCI Member that year. He has since been invited every year to be the judge for the nominees of JCI Ten Outstanding Young Person of the World.
                            </p>
                            <p className="homeContent">
                                With his feet firmly planted on the ground, he strives to do better each time.
                                He is the first actor in Singapore to master the unique Chinese art of Mask Changing.
                                Nick was under the tutelage of China’s professional Mask Changing Master Li Shuimin for two years,
                                and started performing Mask Changing since April 2013. He has since added Mask Changing to his hybrid genre of Chinese opera.
                                His work has been featured in local and overseas media, including China Phoenix TV Station in 2015 and Taiwan Da Ai TV Station in 2014 and 2015.
                            </p>
                            <p className="homeContent">

                            </p>
                            <p className="homeContent">
                                In 2020, Nick took on the role of Opera Creative Consultant for Mediacorp’s production, TiTouDao.
                                Being a real life troupe owner, Nick also played a reel life opera troupe owner in the drama series.
                                TiTouDao is aired on Channel 5, Channel 8, meWATCH, HBO Asia and Netflix Singapore & Malaysia.

                            </p>

                        </div>
                      <img src={founderPic} className="col-lg-3 founderPic" width={50} height={650} />
                    </Row>

                </div>
                <div style={{ height: "350px" }}>
                </div>
            </body >
        </html >
    );
}

export default founder;
