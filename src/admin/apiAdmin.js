import { API } from "../config";


//create category
export const createCategory = (userId, token, category) => {
      
    return fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };



  
//create product
export const createProduct = (userId, token, product) => {
      
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

  