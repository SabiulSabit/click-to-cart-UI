import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { getSingleProdcut, getRelatedProduct } from "../apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";

const Product = (props) => {
  //state
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
 
  //load product data
  const loadSingleProduct = (prodcutId) => {
    getSingleProdcut(prodcutId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        getRelatedProduct(data._id).then((related) => {
          if (related.error) {
            console.log("here");
            setError(related.error);
          } else {
            setRelatedProduct(related);
          }
        });
      }
    });
  };

  //on load
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  //returun the layout
  return (
    <Layout
      title={product.name}
      description={product.description}
      className="container-fluid"
    >
      <Container>
        <Row>
          {product && product.description && (
            <Col md={8} className="mb-3">
              {" "}
              <Card product={product} viewProductButton={false} cssClassName="singleProduct" />{" "}
            </Col>
          )}

          <Col md={4} className="mb-3">
            <h4>Related Products</h4>
            {relatedProduct.map((p, i) => (
              <Card key={i} product={p} />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Product;
