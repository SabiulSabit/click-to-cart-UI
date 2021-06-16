import React, { useState, useEffect } from "react";
import { getCategorys } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    result: [],
    searched: false,
  });

  const { categories, category, search, result, searched } = data;

  //get all categories
  const loadCategory = () => {
    getCategorys().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  //get searchData 
  const searchData = () => {
      console.log(search, category)
  }

  //form submit
  const searchSubmit = (e) => {
      e.preventDefault();

      searchData();
        
  };

  //input on chnage
  const handelChnage = (name ) => event => {
      setData({...data, [name]: event.target.value, searched: false})
  };

  //search bar
  const searchForm = () => {
   return <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          
          <div className="input-group-prepend">
                <select className="btn mr-2" onChange={handelChnage('category')}>
                    <option value="All">Pick Category</option>
                    {categories.map((c, i)=> (<option key={i} value={c._id}>{c.name}</option>) )}
                </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handelChnage("search")}
            placeholder="Search Item"
          />
        </div>

        <div className="btn input-group-append" style={{border: 'none'}}>
            <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>;
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <div>
      <div className="mb-3">{searchForm()}</div>
    </div>
  );
};

export default Search;
