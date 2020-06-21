import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {
  RootState,
  ActionTypes,
  setSession,
  Session,
  config,
  Authentication,
} from "../../lib/";
import * as modules from "./login.module";
import {RouteComponentProps} from "react-router-dom";

type Props = ReduxType & RouteComponentProps<any>;
type State = {
  username: string,
  password: string,
  loading: boolean,
  error: boolean | string,
};
class Login extends React.Component<Props, State> {
  state: State = {
    username: "",
    password: "",
    error: false,
    loading: false,
  };

  onUsernameInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      username: e.currentTarget.value,
    });
  };

  onPasswordInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      password: e.currentTarget.value,
    });
  };

  onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    this.setState({
      loading: true,
      error: false,
    });
    await modules.login(
      e,
      this.state.username,
      this.state.password,
      this.onSuccess,
      this.onError,
    );
  };

  onSuccess = (response: any): void => {
    // TODO:
    // update redux store with session
    console.log(response);
    this.setState({
      loading: false,
    });

    const auth: Authentication = new Authentication();
    auth.login({...response});
    this.props.history.push(config.routes.home);
  };

  onError = (error: string): void => {
    console.log(error);
    this.setState({
      error,
      loading: false,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>loading...</h1>
        </div>
      );
    }

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor={"username"}>Username</label>
            <input
              onChange={this.onUsernameInput}
              name={"username"}
              type={"username"}
            />
          </div>
          <div>
            <label htmlFor={"password"}>Password</label>
            <input
              onChange={this.onPasswordInput}
              name={"password"}
              type={"password"}
            />
          </div>
          <div>
            <input type={"submit"} value={"Submit"} />
          </div>
          {this.state.error && <small>{this.state.error}</small>}
        </form>
      </>
    );
  }
}

const mapStateToProps = (state: RootState): Partial<RootState> => {
  return state;
};

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => {
  return {
    setSession: (session: Session) => {
      dispatch(setSession(session));
    },
  };
};

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
