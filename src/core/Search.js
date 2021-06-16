import React, { useState, useEffect } from "react";
import { getCategorys } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: '',
        result: [],
        searched: false,
    })

    const  {categories, category, search, result, searched} = data;

    //get all categories
    const loadCategory = () => {
        getCategorys().then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                setData({...data, categories: data})
            }
        })
    }

    useEffect( () => {
        loadCategory();
    }, [])

    return (
        <div>
           <div>
               {}
           </div>
        </div>
    )
}

export default Search;
