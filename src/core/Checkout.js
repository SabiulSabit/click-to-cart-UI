import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getBraintreeClientToken, processPayment } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
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

  //confirm pay
  const buy = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((respone) => {
            setData({ ...data, success: respone.success });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            {" "}
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

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showError(data.error)}
      {showSucess(data.success)}
      {showCheckout()}
      {}
    </div>
  );
};

export default Checkout;
