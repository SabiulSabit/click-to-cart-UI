import React, { useState, useRef, useEffect } from "react";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getOrderList } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticate();

  const loadOrders = () => {
    console.log(user._id);
    getOrderList(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showTotalOrder = () => {
    if (orders.length) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  return (
    <Layout title="All Orders" description="E-Commerce Website">
      {showTotalOrder()}
      {orders.map((order, orderIndex) => {
        return (
          <Container>
            <Row>
              <Col md={12}>
                <div
                  className="mt-5"
                  key={orderIndex}
                  style={{ borderBottom: "5px solid indigo" }}
                >
                  <h2 className="mb-5">
                    {" "}
                    <span className="bg-primary">
                      Order ID: {order._id}
                    </span>{" "}
                  </h2>
                  <ul className="list-group mb-2">
                    <li className="list-group-item">{order.status}</li>
                    <li className="list-group-item">
                      Transaction ID: {order.transaction_id}
                    </li>
                    <li className="list-group-item">Amount: ${order.amount}</li>
                    <li className="list-group-item">
                      Order By: {order.user.name}
                    </li>
                    <li className="list-group-item">
                      Order Placed: {moment(order.createdAt).fromNow()}
                    </li>
                    <li className="list-group-item">
                      Delivery Address: {order.address}
                    </li>
                  </ul>
                  <h3 className="mt-4 mb-4">
                    Total products in the order : {order.products.length}
                  </h3>
                </div>
              </Col>
            </Row>
          </Container>
        );
      })}
    </Layout>
  );
};

export default Orders;
