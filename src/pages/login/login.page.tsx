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
import {RegisterForm} from "./register.form";

type Props = ReduxType & RouteComponentProps<any>;
type State = {
  username: string,
  password: string,
  loading: boolean,
  error: boolean | string,
  message: boolean | string,
  register: boolean,
};
class Login extends React.Component<Props, State> {
  state: State = {
    username: "",
    password: "",
    error: false,
    message: false,
    loading: false,
    register: false,
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

  validate = (password: string, confirmPassword: string): boolean | void => {
    if (password.length < 8) {
      this.setState({
        error: "Password should have atleast 8 characters",
        loading: false,
      });
    } else if (password !== confirmPassword) {
      this.setState({error: "passwords do not match", loading: false});
    } else {
      return true;
    }
  };

  onRegister = async (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
    confirmPassword: string,
    name: string,
  ): Promise<any> => {
    this.setState({
      loading: true,
      error: false,
    });
    if (this.validate(password, confirmPassword)) {
      await modules.register(
        e,
        name,
        username,
        password,
        this.onRegisterSuccess,
        this.onError,
      );
    }
  };

  onRegisterSuccess = (response: any): void => {
    console.log(response);
    this.setState({
      loading: false,
      message: response.message,
    });

    setTimeout(() => {
      this.setState({
        register: false,
        error: false,
        message: false,
      });
    }, 1000);
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
      ...this.state,
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

    if (this.state.register) {
      return (
        <RegisterForm
          onSubmit={this.onRegister}
          message={this.state.message}
          error={this.state.error}
        />
      );
    }

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor={"username"}>Username</label>
            <input
              value={this.state.username.length ? this.state.username : ""}
              onChange={this.onUsernameInput}
              name={"username"}
              type={"username"}
            />
          </div>
          <div>
            <label htmlFor={"password"}>Password</label>
            <input
              onChange={this.onPasswordInput}
              value={this.state.password.length ? this.state.password : ""}
              name={"password"}
              type={"password"}
            />
          </div>
          <div>
            <input type={"submit"} name={"login"} value={"Submit"} />
            <input
              type={"button"}
              name={"register"}
              onClick={e => {
                console.log("Register clicked");
                this.setState({
                  register: true,
                });
              }}
              value={"Register"}
            />
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
