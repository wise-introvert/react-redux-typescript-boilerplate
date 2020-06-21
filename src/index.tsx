import * as React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {store, config} from "./lib/";
import {Home, Login} from "./pages";
import "./index.scss";

const Wrapper: React.FC<any> = (): React.ReactElement => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          route={[config.routes.landing, config.routes.home]}
          component={Home}
        />
        <Route exact route={config.routes.login} component={Login} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById("root"),
);
