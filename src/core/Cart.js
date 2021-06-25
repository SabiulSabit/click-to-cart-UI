import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Container, Row, Col } from "react-bootstrap";
import { getCart } from './cartHelpers';
import CartCard from './CartCard/CartCard';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);
    
    //get cart data
    useEffect(() => {
        setItems(getCart());
    }, [run]);
   
    const getTotal = () => {
        return items.reduce((currentvalue, nextValue) => {
          return currentvalue + nextValue.count * nextValue.price;
        }, 0);
      };

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <h2 className="">Total:  <span className="priceValue"> &#2547; {getTotal()} </span></h2>
                {/* <hr /> */}
   
                {items.map((product, i) => (
                    <CartCard
                        key={i}
                        product={product}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2 id="darkBlue">
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Cart"
            description="Manage your cart items."
            src="/images/trolley.png"
            className="container-fluid"
        >  

            <div className="row">
                <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-6">
                    <h2 className="mb-4">Select Your Payment Method</h2>
                    {/* <hr /> */}
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;