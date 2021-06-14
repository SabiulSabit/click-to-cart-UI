import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";

const Card = ({product}) => {
    return (
         <Container>
             <Row>
                 <Col md={4} mb={3}>
                     <div className="card">
                         <div className="card-header">
                            {product.name}
                         </div>
                         <div className="card-body">
                            <p> {product.description} </p>
                            <p> $ {product.price} </p>
                            <Link to='/'>
                                <button className="btn btn-outline-primary mt-2 mb-2">View Product </button>
                            </Link>
                            <button className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
                         </div>
                     </div>
                 </Col>
             </Row>
         </Container>
    )
}

export default Card;
