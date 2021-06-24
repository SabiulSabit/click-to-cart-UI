import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateItem, removeItem } from "../cartHelpers";
import "./CartCard.css";

const CartCard = ({
  product,
  viewProductButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

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
              id="adjust"
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
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )
    );
  };

  return (
    <div className="card">
      {shouldRedirect(redirect)}
      <div className="card-header cat-name">
        {product.category && product.category.name}
      </div>
      <div className="card-body">
        <span className="p_cart">{product.name}</span>
        <span className="float-right price_cart priceValue">
          {" "}
          &#2547; {product.price}{" "}
        </span>
        {!viewProductButton && (
          <p className="lead mt-2"> {product.description.substring(0, 50)} </p>
        )}
        <hr />

        <div className="float-right">
          <Link to={`/product/${product._id}`}>
            {viewProductButton && (
              <button className="btn btn-outline-info mt-2 mb-2 ml-2">
                View Product <FontAwesomeIcon icon={faEye} />
              </button>
            )}
          </Link>

          {showRemoveButton(showRemoveProductButton)}
        </div>

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default CartCard;
