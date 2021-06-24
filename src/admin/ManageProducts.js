import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getProducts, deleteProduct } from "./apiAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

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

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>
                      <strong>{p.name}</strong>
                    </td>
                    <td>
                      {" "}
                      <Link to={`/admin/product/update/${p._id}`}>
                        <span className="badge badge-warning badge-pill">
                        <FontAwesomeIcon icon={faEdit} /> Update
                        </span>
                      </Link>
                    </td>
                    <td>
                      {" "}
                      <span
                        onClick={() => removeProduct(p._id)}
                        className="badge badge-danger badge-pill"
                      >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>

    </Layout>
  );
};

export default ManageProducts;
