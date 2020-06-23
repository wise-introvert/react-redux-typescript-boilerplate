import * as React from "react";

type Props = {
  error: boolean | string,
  message: boolean | string,
  cancel: () => void,
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
    confirmPassword: string,
    name: string,
  ) => void,
};
export const RegisterForm: React.FC<Props> = (
  props: Props,
): React.ReactElement => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit(e, username, password, confirmPassword, name);
        }}>
        <div>
          <label htmlFor={"name"}>Name</label>
          <input
            value={name.length ? name : ""}
            onChange={e => setName(e.currentTarget.value)}
            name={"name"}
            type={"name"}
          />
        </div>
        <div>
          <label htmlFor={"username"}>Username</label>
          <input
            value={username.length ? username : ""}
            onChange={e => setUsername(e.currentTarget.value)}
            name={"username"}
            type={"username"}
          />
        </div>
        <div>
          <label htmlFor={"password"}>Password</label>
          <input
            onChange={e => setPassword(e.currentTarget.value)}
            value={password.length ? password : ""}
            name={"password"}
            type={"password"}
          />
        </div>
        <div>
          <label htmlFor={"cpassword"}>Confirm Password</label>
          <input
            onChange={e => setConfirmPassword(e.currentTarget.value)}
            value={confirmPassword.length ? confirmPassword : ""}
            name={"cpassword"}
            type={"password"}
          />
        </div>
        <div>
          <input
            disabled={!!props.message}
            onClick={props.cancel}
            type={"submit"}
            value={"Cancel"}
          />
          <input disabled={!!props.message} type={"submit"} value={"Submit"} />
        </div>
        <ul>
          {props.error && (
            <li>
              <small>{props.error}</small>
            </li>
          )}
          {props.message && (
            <li>
              <small>{props.message}</small>
            </li>
          )}
        </ul>
      </form>
    </>
  );
};
