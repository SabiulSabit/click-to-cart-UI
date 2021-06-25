import React, { useState, useEffect } from "react";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getOrderList, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticate();

  const loadOrders = () => {
    // console.log(user._id);
    getOrderList(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatus = () => {
    //console.log(user._id);
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatus();
  }, []);

  const showTotalOrder = () => {
    if (orders.length) {
      return (
        <h2 className="text-danger">Total orders: {orders.length}</h2>
      );
    } else {
      return <h2 className="text-danger">No orders</h2>;
    }
  };

  const showProductDetails = (key, value) => {
    return (
      <div className="input-group mb-2 mr-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text"> <strong>{key}</strong> </div>
        </div>
        <input type="text" value={value} className="form-control" readOnly />
      </div>
    );
  };
   
  const handleChange= (e, orderId) =>{
    
    updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
      if(data.error) {
        console.log(data.error)
      }
      else{
        loadOrders();
      }
    })
  }

  const showStatus = (order) => {
    return (
      <div className="form-group">
        {" "}
        <h3 className="mark mb-4">Status: {order.status}</h3>{" "}
        <select className="form-control" onChange={ (e)=> handleChange(e,order._id)}>
             <option>Update Status</option>
             {statusValues.map( (status, index) => (<option key={index} value={status}>{status}</option>) )}
        </select>
      </div>
    );
  };

  return (
    <Layout title="All Orders" description="E-Commerce Website" src="/images/checklist.png">
      <Container fluid>
        <Row>
          <Col>
          {showTotalOrder()}
          </Col>
        </Row>
      </Container>
     
      {orders.map((order, orderIndex) => {
       // console.log(order)
        return (
          <Container fluid>
            <Row>
              <Col md={6}>
                <div
                  className="mt-5"
                  key={orderIndex}
                  
                >
                  <h2 className="mb-5">
                    {" "}
                    <span >
                      Order ID:  <span className="orderId">{order._id}</span> 
                    </span>{" "}
                  </h2>
                  <ul className="list-group mb-2">
                    <li className="list-group-item">{showStatus(order)}</li>
                    <li className="list-group-item">
                      <strong>Transaction ID: </strong>  {order.transaction_id}
                    </li>
                    <li className="list-group-item"><strong> Amount: </strong>&#2547; {order.amount}</li>
                    <li className="list-group-item">
                    <strong> Order By:  </strong> {order.user.name}
                    </li>
                    <li className="list-group-item">
                    <strong>Order Placed:  </strong> {moment(order.createdAt).fromNow()}
                    </li>
                    <li className="list-group-item">
                    <strong> Delivery Address:  </strong>{order.address}
                    </li>
                  </ul>
 
                </div>
              </Col>
              <Col md={6} className="mt-5">
              <h3 className="mt-4 mb-4">
                    Total products in the order : {order.products.length}
                  </h3>

                  {order.products.map((product, productIndex) => (
                    <div
                      className="mb-4"
                      key={productIndex}
                      style={{ padding: "20px", border: "1px solid indigo" }}
                    >
                      {showProductDetails("Product Name", product.name)}
                      {showProductDetails("Product Price", product.price)}
                      {showProductDetails("Product Total", product.count)}
                      {showProductDetails("Product ID", product._id)}
                    </div>
                  ))}
              </Col>
            </Row>
          </Container>
        );
      })}
    </Layout>
  );
};

export default Orders;
