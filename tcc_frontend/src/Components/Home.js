import React from "react";
import { Route, Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Login from "./Login";
import { Container, Row, Col } from 'reactstrap';
import { Card } from "react-bootstrap";

const images = [
  "placeholder_reel_1.jpg",
  "placeholder_reel_2.jpg",
  "placeholder_reel_3.jpg",
];
const delay = 4000;

const products = [{ id: 1, name: 'product1', text: "hello1", image: '../Assets/Images/toktoklogo.webp' },
{ id: 2, name: 'product2', text: "hello2" , image: "../Assets/Images/toktoklogo.webp"},
{ id: 3, name: 'product3', text: "hello3" , image: "../Assets/Images/toktoklogo.webp" },
{ id: 4, name: 'product4', text: "hello4", image: "../Assets/Images/toktoklogo.webp" },
{ id: 5, name: 'product5', text: "hello5", image: "../Assets/Images/toktoklogo.webp" }];

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

function Product() {
  return (
    <Container className="Products">
      {/* set md for no of cols */}
      <Row xs={1} md={4} className="g-4">
        {products.map((product) => (
          <Col>
            <Card className="Product">
              <Card.Body>
                <Card.Img variant="top" src={product.image}/>
                <Card.Link href={"/product" + product.id}>{product.name}</Card.Link>
                {/* <Card.Title href={"/product/" + product.id}>{product.name}</Card.Title> */}
                <Card.Text>
                  {product.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function Home(props) {
  return (
    <div className="Home">
      <CarouselFade />
      <Product products={products} />
    </div>
  );
}

export default Home;
