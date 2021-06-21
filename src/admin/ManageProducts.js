import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticate();

  const loadProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const removeProduct = (prodcutId) => {
    deleteProduct(prodcutId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProduct();
      }
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="E-Commerce Website"
      className="container-fluid"
    >
      <Container>
        <Row>
          <Col md={12} className="mb-3">
            <h2 className="text-center">Total Products: {products.length}</h2>
            <hr />
            <ul className="list-group">
              {products.map((p, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <strong>{p.name}</strong>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="badge badge-warning badge-pill">
                      Update
                    </span>
                  </Link>
                  <span onClick={ () => removeProduct(p._id) } className="badge badge-danger badge-pill">Delete</span>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>

      <hr />
    </Layout>
  );
};

export default ManageProducts;
