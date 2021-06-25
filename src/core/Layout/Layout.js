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
  src="",
  children,
  className,
}) => {
  return (
    <div>
      <Menu />
      <Container fluid>
       <Row>
         <Col md={6} className="mt-5">
         <h2 className="layoutH2 text-center">{title}</h2>
        <p className="descriptionP">{description}</p>
         </Col>
         <Col md={6} className="text-center">
           <img src={src} />
         </Col>
    
       </Row>
    
      </Container>

      <div className={className}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
