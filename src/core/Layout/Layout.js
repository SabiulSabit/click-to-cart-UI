import React from "react";
import Menu from "../Menu/Menu";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style.css";




const Layout = ({
  title = "Title",
  description = "Description",
  children,
  className,
}) => {
  return (
    <div>
      <Menu />
      <Container fluid>
       <Row>
         <Col md={6} className="text-center">
         <h2 className="layoutH2">{title}</h2>
        <p className="lead">{description}</p>
         </Col>
         <Col md={6} className="text-center">
           <img src="/images/shopping-basket.png" />
         </Col>
    
       </Row>
    
      </Container>

      <div className={className}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
