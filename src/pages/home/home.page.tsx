import React from "react";
import {connect} from "react-redux";
import {
  RootState,
  ActionTypes,
  setSession,
  Session,
  Authentication,
  config,
} from "../../lib/";
import {Dispatch} from "redux";
import {RouteComponentProps} from "react-router-dom";

type Props = ReduxType & RouteComponentProps<any>;
class Home extends React.Component<Props, any> {
  logout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    const auth: Authentication = new Authentication();
    auth.logout();
    this.props.history.push(config.routes.login);
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
