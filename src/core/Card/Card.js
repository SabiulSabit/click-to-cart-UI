import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "../ShowImage";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEye, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { addItem, updateItem, removeItem } from "../cartHelpers";
import './card.css'

const Card = ({
  product,
  viewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  cssClassName=""
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const handelChnage = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handelChnage(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2 ml-2"
        >
          Remove Product{" "}
        </button>
      )
    );
  };

  return (
     
     <div className="card">
      {shouldRedirect(redirect)}
      <div className="card-header cat-name">{product.category && product.category.name}</div>
      <div className="card-body">
        {product.quantity > 0 ? (
          <span className="badge badge-success badge-pill float-right">
            In Stock
          </span>
        ) : (
          <span className="badge badge-danger badge-pill">Out of Stock</span>
        )}

        <br />
        <ShowImage item={product} url="product" cssClassName={cssClassName} />
          
        
        
        
        <p className="p_name">
          {product.name}
        </p>
        <p className="price"> &#2547; {product.price} </p>
        {
            !viewProductButton &&  (
              <p className="lead mt-2"> {product.description.substring(0, 500)} </p> 
            )
          }
        <hr />
        <p className="black-8">
          Last Update: {moment(product.createdAt).fromNow()}{" "}
        </p>



        {showAddToCartButton && (
          <button
            onClick={addToCart}
            className="btn btn-outline-warning mt-2 mb-2  ml-2"
          >
            Add to Cart <FontAwesomeIcon icon={faCartPlus} />
          </button>
        )}

        <Link to={`/product/${product._id}`}>
          {viewProductButton && (
            <button className="btn btn-outline-info mt-2 mb-2 ml-2">
              View Product <FontAwesomeIcon icon={faEye} />
            </button>
          )}
        </Link>

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div> 
    
  );
};

export default Card;
