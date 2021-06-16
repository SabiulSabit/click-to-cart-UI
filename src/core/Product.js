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
      title={product.name}
      description={product.description}
      className="container-fluid"
    >
     
     <Container>
         <Row>
            { product && product.description && <Card product={product} viewProductButton={false} /> }
         </Row>
     </Container>
    </Layout>
  );
};

export default Product;
