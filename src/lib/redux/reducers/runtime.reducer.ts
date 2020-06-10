import CONSTANTS from "../constants";
import { RuntimeState, ActionTypes } from "../types";

const initialRuntimeState: RuntimeState = {
  session: {
    active: false,
    user: null
  }
}

export function runtime(state: RuntimeState = initialRuntimeState, action: ActionTypes): RuntimeState {
  switch(action.type) {
    case CONSTANTS.SET_SESSION:
      return {
        ...state,
        session: action.payload
      }
    
    default:
      return state;
  }
}
