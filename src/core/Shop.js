import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import {getCategorys} from './apiCore'
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import {prices} from './fixedPrice';

const Shop = () => {
   
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: {category: [], price: [] }
  });
  const [error, setError] = useState(false);

    //load all categories and use it
    useEffect(() => {
      getCategorys().then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setCategories((categories) => data);
        }
      });
    }, []);
      
    //set the filters value to state
    const handleFilters = (filters, filterBy) => {
         // console.log('Shop' ,filters, filterBy)
          const newFilters =  {...myFilters};
          newFilters.filters[filterBy] = filters;
          if(filterBy == 'price'){
            let priceValue = handelPrice(filters);
            newFilters.filters[filterBy] = priceValue;
          }
          setMyFilters(newFilters)
    }

    //get the selected price range
    const handelPrice = (value) => {
          const data = prices;
          let arr = [];
          for(let  key in data){
            if(data[key]._id == parseInt(value) ){
              arr = data[key].array;
            }
          }

          return arr;
    } 

  return (
    <Layout
      title="Shop"
      description="E-Commerce Website"
      className="container-fluid"
    >
       <Container>
            <Row>
                <Col md={4}>
                  <h4>Filter by Categories</h4>
                  <ul>
                     <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                  </ul>
                  <h4>Filter by Price</h4>
                  <div>
                     <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                  </div>
                </Col>
                <Col md={8}>{JSON.stringify(myFilters)}</Col>
            </Row>
       </Container>
    </Layout>
  );
};

export default Shop;
