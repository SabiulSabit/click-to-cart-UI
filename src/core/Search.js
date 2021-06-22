import React, { useState, useEffect } from "react";
import { getCategorys, getSearchedProducts } from "./apiCore";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Card from "./Card/Card";

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
    if (search) {
      getSearchedProducts({
        search: search || undefined,
        category: category,
      }).then((products) => {
        if (products.error) {
          console.log(products.error);
        } else {
        // console.log(products)
          setData({ ...data, result: products, searched: true });
        }
      });
    }
  };

  //form submit
  const searchSubmit = (e) => {
    e.preventDefault();

    searchData();
  };

  //input on chnage
  const handelChnage = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  //show search message
  const searchMessage = (searched, result) => {
    if (searched && result.length > 0) {
      return `Found ${result.length} Products! `;
    } else if (searched && result.length <= 0) {
      return "No Products Found!";
    }
  };

  // show the searched product
  const showSearchedProduct = (productData = []) => {
    return (
      <Container>
        <h2 className="mt-4 mb-4 ml-4">{searchMessage(searched, result)}</h2>
        <Row>
          {productData.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </Row>
      </Container>
    );
  };

  //search bar
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handelChnage("category")}>
                <option value="All">All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
              
            <input
              type="search"
              className="form-control"
              onChange={handelChnage("search")}
              placeholder="Search Item"
            />
          
          </div>

          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text">Search..  <FontAwesomeIcon icon={faSearch} /></button>
           
          </div>
        </span>
      </form>
    );
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <div>
      <div className="mb-3">{searchForm()}</div>

      {showSearchedProduct(result)}
    </div>
  );
};

export default Search;
