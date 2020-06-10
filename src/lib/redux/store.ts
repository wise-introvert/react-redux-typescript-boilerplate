import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import logger from "redux-logger";

import { runtime } from "./reducers/";
import { RuntimeState } from "./types";

export interface RootState {
  runtime: RuntimeState;
}

let middlewares: any[] = [];

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  middlewares.push(logger);
}

const reducers = combineReducers({
  runtime
});

export const store: Store = createStore<RootState, any, any, any>(
  reducers,
  applyMiddleware(...middlewares)
);
