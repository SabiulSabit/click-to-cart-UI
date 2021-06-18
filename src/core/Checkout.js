import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getProducts, getBraintreeClientToken } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import { isAuthenticate } from "../auth/index";
import { suppressDeprecationWarnings } from "moment";

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


  const getToken = (userId, token ) =>{
    getBraintreeClientToken(userId, token).then(data => {
      if(data.error){
        setData({...data, error: data.error});
      }else{
       // console.log(data.clientToken);
        setData({...data, clientToken: data.clientToken})
      }
    })
  } 

  useEffect( () =>{
    getToken(userId, token);
  },[] )

  const getTotal = () => {
    return products.reduce((currentvalue, nextValue) => {
      return currentvalue + nextValue.count * nextValue.price;
    }, 0);
  };

  //show the checkout/singin button
  const showCheckout = () => {
    return isAuthenticate() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sing in to Checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
