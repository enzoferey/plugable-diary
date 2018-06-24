import React from "react";
import AuthContext from "@contexts/AuthContext";

const withAuth = Component => props => (
  <AuthContext.Consumer>
    {sessionContext => <Component {...props} {...sessionContext} />}
  </AuthContext.Consumer>
);

export default withAuth;
