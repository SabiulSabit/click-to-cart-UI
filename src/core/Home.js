import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'

const Home = () => {
    
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArival, setProductsByArival] = useState([]);
    const [error, setError] = useState(false);
   
    //get the products by sell
    const loadProductsBySell = ( ) => {
            
        getProducts("sold").then(data => {
            if(data.error){
                setError(data.error);
            }
            else{
                setProductsBySell(data);
            }
        })
    }

    return (
        <Layout title="Home" description="E-Commerce Website">
            ...
        </Layout>
    )
}

export default Home; 