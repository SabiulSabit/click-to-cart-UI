import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./index";
import UserDashboard from "../user/UserDashboard";

function PrivateRoute({ children, ...rest }) {
  if (isAuthenticate()) {
    return <Route path="/user/dashboard" exact component={UserDashboard} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/signin",
        }}
      />
    );
  }
}

export default PrivateRoute;
