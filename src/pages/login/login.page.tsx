import React from "react";
import {connect} from "react-redux";
import {RootState, ActionTypes, setSession, Session} from "../../lib/";
import {Dispatch} from "redux";

type Props = ReduxType;
class Login extends React.Component<Props, any> {
  render() {
    return (
      <div>
        <h1>Login</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
