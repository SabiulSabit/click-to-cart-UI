import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./index";

function AdminRoute({ component, path, children, ...rest }) {
  if (isAuthenticate() && isAuthenticate().user.role === 1) {
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

export default AdminRoute;
