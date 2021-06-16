import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getSingleProdcut} from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";

const Product = (props) => {
  
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadSingleProduct = (prodcutId) => {
    getSingleProdcut(prodcutId).then(data => {
        if(data.error){
            setError(data.error);
        }else{
            setProduct(data);
        }
    })
  }

  useEffect(()=>{
        const productId = props.match.params.productId;
        //console.log(productId);
        loadSingleProduct(productId);
  },[])

  return (
    <Layout
      title="Home"
      description="E-Commerce Website"
      className="container-fluid"
    >
     <h2 className="mb-4">Single Prodcut</h2>
     <Container>
         <Row>
             {JSON.stringify(product)}
         </Row>
     </Container>
    </Layout>
  );
};

export default Product;
