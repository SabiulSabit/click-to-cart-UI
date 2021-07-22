import React from "react";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

  //get auth user data
  const {
    user: { name, email, role },
  } = isAuthenticate();

  //admin accessable link
  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-light">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item bg-secondary">
            <Link className="sideBarLink" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item bg-secondary">
            <Link className="sideBarLink" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item bg-secondary">
            <Link className="sideBarLink" to="/admin/orders">
              View Orders
            </Link>
          </li>
          <li className="list-group-item bg-secondary">
            <Link className="sideBarLink" to="/admin/products">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  //admin info
  const adminInfo = () => {
    return (
      <div className="card dashBoardCard mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item"><strong>Name: </strong> {name}</li>
          <li className="list-group-item"><strong>Email: </strong> {email}</li>
          <li className="list-group-item">
          <strong>User Type: </strong> {role === 1 ? "Admin" : "Registred User"}
          </li>
        </ul>
      </div>
    );
  };

  //return layout
  return (
    <Layout title="Admin Dashboard" description="Admin Dashboard" src="/images/dashBoard.png">
      <Container>
            <Row>
                <Col md={3}>
                    {adminLinks()}
                </Col>
                <Col md={9}>
                    {adminInfo()}
                </Col>
            </Row>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
