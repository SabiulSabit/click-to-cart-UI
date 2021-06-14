import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import {getCategorys} from './apiCore'

const Shop = () => {
   
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

    //load all categories and use it
    useEffect(() => {
      getCategorys().then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setCategories((categories) => data);
        }
      });
    }, []);

  return (
    <Layout
      title="Shop"
      description="E-Commerce Website"
      className="container-fluid"
    >
       <Container>
            <Row>
                <Col md={4}>{JSON.stringify(categories)}</Col>
                <Col md={8}>Right</Col>
            </Row>
       </Container>
    </Layout>
  );
};

export default Shop;
