import React, { useState, useRef, useEffect } from "react";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getOrderList } from "./apiAdmin";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const {user, token} = isAuthenticate();
    
    const loadOrders = () =>{
        getOrderList(user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setOrders(data);
            }
        })
    }
    
    useEffect(  ()=>{
           loadOrders()
    }, [] )

    const noOrder = (orders) =>{
      return orders.length < 1  ? <h4> No Orders</h4> : null;
    }

    return (
        <Layout title="All Orders" description="E-Commerce Website">
         {noOrder(orders)}
         {JSON.stringify(orders)}
      </Layout>
    )
}

export default Orders;
