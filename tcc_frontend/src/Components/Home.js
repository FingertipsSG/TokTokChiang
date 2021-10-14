import React from "react";
import { Route, Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Login from "./Login";

const images = [
  "placeholder_reel_1.jpg",
  "placeholder_reel_2.jpg",
  "placeholder_reel_3.jpg",
];

function CarouselFade() {
  return (
    <Carousel fade className="slideshow">
      {images.map((backgroundImage, index) => (
        <Carousel.Item>
          <img className="slide-img" src={`/reel/${backgroundImage}`} />
          <Carousel.Caption>
            <h3>Slide {index} Label</h3>
            <p>
              Lorem ipsum description of item {index} here, rich-text from
              WYSIWYG editor
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function Home(props) {
  return <CarouselFade />;
}

export default Home;
