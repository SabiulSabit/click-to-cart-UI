import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import { getProducts } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card/Card";
import Search from "./Search/Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  //get the products by sell
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  //get the products by arrival
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Welcome to Click to Cart"
      description="Click to Cart is a E-Commerce Website, From Where you can buy any daily life product for your-self."
      src="/images/shopping-basket.png"
      className="container-fluid"
    >
      <Container>
        <Row>
          <Col md={12}>
            <Search />
          </Col>
        </Row>
      </Container>

      <Container>
        <h2 className="mb-4">Best Sellers</h2>
        <Row>
          {productsBySell.map((product, i) => (
            <Col md={4} className="mb-3">
              <Card key={i} product={product} />
            </Col>
          ))}
        </Row>
      </Container>

      <hr />
      <Container>
        <h2 className="mb-4">New Arrivals</h2>
        <Row>
          {productsByArrival.map((product, i) => (
            <Col md={4} className="mb-3">
              <Card key={i} product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
