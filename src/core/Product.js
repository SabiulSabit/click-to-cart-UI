import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategorys, getSearchedProducts } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";

const Product = () => {
  return (
    <Layout
      title="Home"
      description="E-Commerce Website"
      className="container-fluid"
    >
     <p>Prodcut Page</p>
    </Layout>
  );
};

export default Product;
