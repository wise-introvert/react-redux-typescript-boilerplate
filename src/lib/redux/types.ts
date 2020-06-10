import { ActionType } from "typesafe-actions";

import * as actions from "./actions/";
import CONSTANTS from "./constants";

export interface Session {
  active: boolean;
  user: any | null;
}

/************************************************************/
/************************** STATES **************************/
/************************************************************/
export interface RuntimeState {
  session: Session;
}
/************************************************************/

/************************************************************/
/************************** ACTIONS *************************/
/************************************************************/
export interface SetSessionAction {
  type: typeof CONSTANTS.SET_SESSION;
  payload: Session;
}

export type ActionTypes = SetSessionAction;
export type Actions = ActionType<typeof actions>;
/************************************************************/
