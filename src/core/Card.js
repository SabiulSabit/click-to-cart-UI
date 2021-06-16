import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({ product, viewProductButton = true }) => {
  return (
  
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
        { product.quantity > 0 ? <span className="badge badge-primary badge-pill float-right">In Stock</span> : <span className="badge badge-danger badge-pill">Out of Stock</span> }
          
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

          <button className="btn btn-outline-warning mt-2 mb-2  ">
            Add to Cart
          </button>
        </div>
      </div>
    
  );
};

export default Card;
