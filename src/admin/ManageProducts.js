import React, { useState } from "react";
import { useForm } from "react-hook-form";
import  {Link} from "react-router-dom"
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";



const ManageProducts = () => {
    return (
        <Layout
          title="Manage Products"
          description="E-Commerce Website"
          className="container-fluid"
        >
 
    
          <Container>
          
            <Row>
              {/* {productsBySell.map((product, i) => (
                <Col md={4} className="mb-3">
                  <Card key={i} product={product} /> 
                </Col>
              ))} */}
            </Row>
          </Container>
    
          <hr />
         
        </Layout>
      );
}

export default ManageProducts;
