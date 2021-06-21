import { API } from "../config";

//create category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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


//get the order list
export const getOrderList = (userId, token) => {
 // console.log(userId)
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
     // console.log("Order: "+data);
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get status  values
export const getStatusValues = (userId, token) => {
  //console.log(userId)
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
    //  console.log("Order: "+data);
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


//update order status
export const updateOrderStatus = (userId, token, orderId, status) => {
  //console.log(userId)
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({status, orderId})
  })
    .then((data) => {
    //  console.log("Order: "+data);
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get all products
export const getProducts = () => {
  return fetch(`${API}/products?limit=100`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get single products
export const getSingleProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


//delete a product
export const deleteProduct = (proiductId, userId, token) => {
  //console.log(userId)
  return fetch(`${API}/product/${proiductId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
    //  console.log("Order: "+data);
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


//update a product
export const updateProduct = (proiductId, userId, token, product) => {
  //console.log(userId)
  return fetch(`${API}/product/${proiductId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product
  })
    .then((data) => {
    //  console.log("Order: "+data);
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

