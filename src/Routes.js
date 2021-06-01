import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import AdminDashboard from "./user/AdminDashboard";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch> dashboard
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path='/user/dashboard' exact  />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/create/category' exact component={AddCategory}  />
        <AdminRoute path='/create/product' exact component={AddProduct}  />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
