import {store, config} from "../../";
import {setSession} from "../../redux";
import Cookies from "universal-cookie";

export default class Authentication {
  /*
   * isLoggedIn : check if refreshToken in cookies
   * logout     : remove refreshToken from cookies
   * refresh    : call /refresh route to get new AuthToken,
   * login       : update redux's session state
   */

  isLoggedIn = (): boolean => {
    const cookies: Cookies = new Cookies();
    if (cookies.get(config.constants.rt)) {
      return true;
    }
    return false;
  };

  login = (user: {id: string, loa: number}): void => {
    store.dispatch(setSession({active: true, user}));
  };

  logout = (): void => {
    const cookies: Cookies = new Cookies();
    cookies.remove(config.constants.rt);
    store.dispatch(setSession({active: false, user: null}));
  };
}
