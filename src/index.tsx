import * as React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import {store, config} from "./lib/";
import {Home, Login} from "./pages";
import "./index.scss";
import {ProtectedRoute} from "./components";
import Splash from "./pages/splash/splash.page";

const Wrapper: React.FC<any> = (): React.ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path={config.routes.splash} component={Splash} />
        <ProtectedRoute exact path={config.routes.home} component={Home} />
        <Route exact path={config.routes.login} component={Login} />
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

serviceWorker.register();
