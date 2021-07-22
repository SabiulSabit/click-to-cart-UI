import React  from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./index";

//normal user and admin can use this routing
function PrivateRoute({component,path,children, ...rest }) {
  if (isAuthenticate()) {
    return <Route path={path} exact component={component} />;
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
