import React from "react";
import Menu from "./Menu/Menu";
import Footer from "./Footer/Footer";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
// import logo from '../assets/images/home-2-3.jpg'



const Layout = ({
  title = "Title",
  description = "Description",
  children,
  className,
}) => {
  return (
    <div>
      <Menu />
      <div className="jumbotron">
        {/* <img src="https://picsum.photos/id/237/320/240" alt="" /> */}
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/home-2-3.jpg"  
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/home-2-4.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/home-banner-1.png"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* <h2>{title}</h2>
        <p className="lead">{description}</p> */}
      </div>

      <div className={className}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
