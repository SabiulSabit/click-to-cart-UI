import React  from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./index";
import UserDashboard from "../user/UserDashboard";

function PrivateRoute({component,children, ...rest }) {
  if (isAuthenticate()) {
    return <Route path="/user/dashboard" exact component={component} />;
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
