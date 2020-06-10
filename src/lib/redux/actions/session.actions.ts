import { action } from "typesafe-actions";

import CONSTANTS from "../constants";
import { Session } from "../types";

export function setSession(session: Session) {
  return action(CONSTANTS.SET_SESSION, session);
}
