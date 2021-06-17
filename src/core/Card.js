import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Col } from "react-bootstrap";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem } from "./cartHelpers";

const Card = ({
  product,
  viewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
}) => {
  const [redirect, setRedirect] = useState(false);

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

  const showCartUpdateOptions = cartUpdate =>{
    return cartUpdate && (<div> increment/decrement </div>)
  }

  return (
    <div className="card">
      {shouldRedirect(redirect)}
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {product.quantity > 0 ? (
          <span className="badge badge-primary badge-pill float-right">
            In Stock
          </span>
        ) : (
          <span className="badge badge-danger badge-pill">Out of Stock</span>
        )}

        <br />
        <ShowImage item={product} url="product" />
        <p className="lead mt-2"> {product.description.substring(0, 50)} </p>
        <p className="black-10"> $ {product.price} </p>
        <p className="black-9">
          Category: {product.category && product.category.name}{" "}
        </p>
        <p className="black-8">
          Added on: {moment(product.createdAt).fromNow()}{" "}
        </p>

        <Link to={`/product/${product._id}`}>
          {viewProductButton && (
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              View Product{" "}
            </button>
          )}
        </Link>

        {showAddToCartButton && (
          <button
            onClick={addToCart}
            className="btn btn-outline-warning mt-2 mb-2  "
          >
            Add to Cart
          </button>
        )}


        {showCartUpdateOptions(cartUpdate)}


      </div>
    </div>
  );
};

export default Card;
