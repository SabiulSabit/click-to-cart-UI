import { API } from "../config";
import queryString from 'query-string'



//get all category
export const getProducts = (sortBy) => {
    
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
      method: "GET",
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  


//get all category
export const getCategorys = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


//fetch data based on filter
export const getFilteredProducts = (skip, limit, filters = { }) => {

  const data = {
    limit, skip , filters
  }

  return fetch(`${API}/products/by/search/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};



//get serach product
export const getSearchedProducts = (params) => {
  
  const query = queryString.stringify(params);
  
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


// get Single Product 
export const getSingleProdcut = (productId) =>{

  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
}


// get Single Product realader product 
export const getRelatedProduct = (productId) =>{

  return fetch(`${API}/products/related/${productId}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

//generate braintree token
export const getBraintreeClientToken = (userId, token) =>{

  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

//process the payment
export const processPayment = (userId, token, paymentData) =>{

  return fetch(`${API}/braintree/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
}