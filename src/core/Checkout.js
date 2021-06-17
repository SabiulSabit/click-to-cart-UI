import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";

 const Checkout = ({products}) => {

    return (
        <div>
            {JSON.stringify(products)}
        </div>
    )
}

export default Checkout;
