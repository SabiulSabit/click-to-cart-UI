import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import {getCategorys, getFilteredProducts} from './apiCore'
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import {prices} from './fixedPrice';

const Shop = () => {
   
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: {category: [], price: [] }
  });
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [result, setResult] = useState([]);

    //load all categories and use it
    useEffect(() => {
      getCategorys().then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setCategories((categories) => data);
        }
      });

      loadFileterResult(skip, limit, myFilters.filters);

    }, []);


    
    //fetch filtred data
    const loadFileterResult = (newFilters) => {
      //console.log(newFilters)
      getFilteredProducts(skip, limit, newFilters).then(data =>  {
        if(data.error){
            setError(data.error)
        }else{
          setResult(data);
        }
      })
  }
      
    //set the filters value to state
    const handleFilters = (filters, filterBy) => {
         // console.log('Shop' ,filters, filterBy)
          const newFilters =  {...myFilters};
          newFilters.filters[filterBy] = filters;
          if(filterBy === 'price'){
            let priceValue = handelPrice(filters);
            newFilters.filters[filterBy] = priceValue;
          }
          loadFileterResult(myFilters.filters)
          setMyFilters(newFilters)
    }

    //get the selected price range
    const handelPrice = (value) => {
          const data = prices;
          let arr = [];
          for(let  key in data){
            if(data[key]._id === parseInt(value) ){
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
                <Col md={8}>{JSON.stringify(result)}</Col>
            </Row>
       </Container>
    </Layout>
  );
};

export default Shop;
