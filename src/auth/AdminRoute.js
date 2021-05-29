import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./index";
import AdminDashboard from "../user/AdminDashboard";

function AdminRoute({ children, ...rest }) {
  if (isAuthenticate() && isAuthenticate().user.role === 1) {
    return <Route path="/admin/dashboard" exact component={AdminDashboard} />;
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
