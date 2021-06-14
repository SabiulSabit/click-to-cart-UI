import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";

const Shop = () => {
  return (
    <Layout
      title="Home"
      description="E-Commerce Website"
      className="container-fluid"
    >
       <Container>
            <Row>
                <Col md={4}>Left SideBar</Col>
                <Col md={8}>Right</Col>
            </Row>
       </Container>
    </Layout>
  );
};

export default Shop;
