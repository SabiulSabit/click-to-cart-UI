import React from 'react';
import {Link} from 'react-router-dom';
import { Col } from "react-bootstrap";
import ShowImage from './ShowImage'

const Card = ({product}) => {
    return (
        
                 <Col md={4} className="mb-3">
                     <div className="card">
                         <div className="card-header">
                            {product.name}
                         </div>
                         <div className="card-body">
                             <ShowImage item={product} url="product" />
                            <p> {product.description} </p>
                            <p> $ {product.price} </p>
                            <Link to='/'>
                                <button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product </button>
                            </Link>
                            <button className="btn btn-outline-warning mt-2 mb-2  ">Add to Cart</button>
                         </div>
                     </div>
                 </Col>

    )
}

export default Card;
