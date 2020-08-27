import React from "react";

import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  if (
    localStorage.getItem("x-access-token") &&
    localStorage.getItem("ipf-user")
  ) {
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
        <Redirect to="/" {...props} />
      )
    }
  />
);

export default AuthRoute;
