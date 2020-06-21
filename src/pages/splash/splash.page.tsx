import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import {Authentication, config} from "../../lib";

type Props = RouteComponentProps<any>;
type State = {
  loading: boolean,
  error: string | boolean,
};
export default class Splash extends React.Component<Props, State> {
  state: State = {
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const auth: Authentication = new Authentication();
    if (auth.isLoggedIn()) {
      this.setState({
        loading: false,
      });
      this.props.history.push(config.routes.home);
    } else {
      this.setState({
        loading: false,
      });
      this.props.history.push(config.routes.login);
    }
  }

  render() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}
