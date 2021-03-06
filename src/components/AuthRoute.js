import React from "react";

import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("ipf-user"));
  if (user && !user.isAdmin && !["super-admin", "admin"].includes(user.role)) {
    return true;
  }

  return false;
};

const isAdmin = () => {
  const admin = JSON.parse(localStorage.getItem("ipf-user"));
  if (admin && admin.isAdmin) {
    return true;
  }

  return false;
};

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/landing" {...props} />
      )
    }
  />
);

export const AdminRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/landing" {...props} />
      )
    }
  />
);

export default AuthRoute;
