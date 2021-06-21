import { API } from "../config";

//get user info
export const getUserInfo = (userId, token) => {
    
    return fetch(`${API}/user/${userId}`, {
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
  };
  

  //update user info
  export const upadetUserInfo = (userId, token, userData) =>{

    return fetch(`${API}/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //update localstorage User
  export const updateLocalStorageUser = (user, next) =>{
        if(typeof window !== "undefined"){
            if(localStorage.getItem('jwt')){
                let auth =JSON.parse(localStorage.getItem('jwt'));
                auth.user =  user;
                localStorage.setItem('jwt', JSON.stringify(auth));
                next();
            }
        }
  }

  //get user order history
  export const getOrderHistory = (userId, token) => {
    
    return fetch(`${API}/orders/by/user/${userId}`, {
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
  };
