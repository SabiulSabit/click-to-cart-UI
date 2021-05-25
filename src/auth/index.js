import { API } from "../config";


//user signup
  export const signup = (user) => {
    // console.log(name, email, password)
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };



//user signin
  export const signin = (user) => {
    // console.log(name, email, password)
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };


  //save jwt to local storage
export const authenticate =  (data, next) =>{
       
  if(typeof window !== undefined){
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
}


//signout
export const signout = (next) =>{
  if(typeof window !== undefined){
    localStorage.removeItem('jwt');
    next();
    return fetch( `${API}/signout`, {
      method: "GET"
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }
}