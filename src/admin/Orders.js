import React, { useState, useRef, useEffect } from "react";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getOrderList } from "./apiAdmin";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const {user, token} = isAuthenticate();
    
    const loadOrders = () =>{
        console.log(user._id)
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

    const showTotalOrder = () =>{
       if(orders.length){
           return  (<h1 className="text-danger display-2">Total orders: {orders.length}</h1>)
       }
       else{
        return  (<h1 className="text-danger">No orders</h1>)
       }
    }

    return (
        <Layout title="All Orders" description="E-Commerce Website">
         {showTotalOrder()}
         {JSON.stringify(orders)}
      </Layout>
    )
}

export default Orders;
