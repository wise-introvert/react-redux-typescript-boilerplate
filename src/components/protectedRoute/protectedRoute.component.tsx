import * as React from "react";
import {Route, Redirect} from "react-router-dom";

import {Authentication, config} from "../../lib/";

const ProtectedRoute: React.FC<any> = ({
  component: Component,
  ...rest
}): React.ReactElement => (
  <Route
    {...rest}
    render={props => {
      const auth: Authentication = new Authentication();
      return auth.isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={config.routes.login} />
      );
    }}
  />
);

export default ProtectedRoute;
