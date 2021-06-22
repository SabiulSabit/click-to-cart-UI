import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card/Card";
import { isAuthenticate } from "../auth/index";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  //get total price
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
    loading: false,
    address: "",
  });

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        // console.log(data.clientToken);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentvalue, nextValue) => {
      return currentvalue + nextValue.count * nextValue.price;
    }, 0);
  };

  //show the checkout/singin button
  const showCheckout = () => {
    return isAuthenticate() ? (
      <div> {showDropIn()} </div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sing in to Checkout</button>
      </Link>
    );
  };
 
  let delivery = data.address

  //confirm pay
  const buy = () => {
    setData({ loading: true });

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
       // console.log(data);
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((respone) => {
            const orderData = {
              products: products,
              transaction_id: respone.transaction.id,
              amount: respone.transaction.amount,
              address: delivery,
            };
            createOrder(userId, token, orderData)
              .then((ord) => {
          
                emptyCart(() => {
                  setRun(!run);
                  setData({ loading: false,success: true });
                 // console.log("Cart Empty");
                });
              })
              .catch((orderErr) => {
                console.log(orderErr);
              });
          })
          .catch((err) => {
            setData({ loading: false });
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, error: error.message });
      });
  };

  const handelAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label className="text-muted">Delivery Address: </label>
              <textarea
                onChange={handelAddress}
                className="form-control"
                value={data.address}
                placeholder="Enter your delivery address"
              />
            </div>{" "}
            <DropIn
              options={{ authorization: data.clientToken }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={buy} className="btn btn-success btn-block">
              Pay
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSucess = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        {"Thanks! Your Payment was Successful!"}
      </div>
    );
  };

  const showLoading = (loading) => {
    return loading && <h2>Loading ...</h2>;
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showError(data.error)}
      {showSucess(data.success)}
      {showLoading(data.loading)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
