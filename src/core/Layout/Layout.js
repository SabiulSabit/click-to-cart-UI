import React from "react";
import Menu from "../Menu/Menu";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style.css";
import "./Layout.css";

const Layout = ({
  title = "Title",
  description = "Description",
  src = "",
  children,
  className,
}) => {

  //show the menu and slider
  return (
    <div>
      <Menu />
      <Container fluid className="mb-5">
        <Row>
          <Col md={12}>
            {/* <img src="/images/banner_01.png" width="100%" height="400px" /> */}
            <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner_02.png"  
              alt="First slide"
              height="400px"
            />
            <Carousel.Caption>
            <h2 className="layoutH2 text-center">{title}</h2>
            <p className="descriptionP">{description}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner_01.png"
              alt="Second slide"
              height="400px"
            />

            <Carousel.Caption>
            <h2 className="layoutH2 text-center">{title}</h2>
            <p className="descriptionP">{description}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner_02.png"
              alt="Third slide"
              height="400px"
            />

            <Carousel.Caption>
            <h2 className="layoutH2 text-center">{title}</h2>
            <p className="descriptionP">{description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
          </Col>
          {/* <Col md={6} className="mt-5">
            <h2 className="layoutH2 text-center">{title}</h2>
            <p className="descriptionP">{description}</p>
          </Col>
          <Col md={6} className="text-center">
            <img src={src} />
          </Col> */}
        </Row>
      </Container>

      <div className={className}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
