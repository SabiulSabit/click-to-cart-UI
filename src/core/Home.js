import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";

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
    <Layout title="Home" description="E-Commerce Website" className="container-fluid">
      <Container>
      <h2 className="mb-4">Best Sellers</h2>
        <Row>
        
          {productsBySell.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </Row>
      </Container>

      <hr />

      <h2 className="mb-4">New Arrivals</h2>
      {productsByArrival.map((product, i) => (
        <Card key={i} product={product} />
      ))}
    </Layout>
  );
};

export default Home;
