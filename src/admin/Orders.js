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

    return (
        <div>
            
        </div>
    )
}

export default Orders;
