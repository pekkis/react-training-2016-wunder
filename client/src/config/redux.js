import createSagaMiddleware from "redux-saga";
import * as reducers from "../ducks";

const sagaMiddleware = createSagaMiddleware();

export function getSagaMiddleware() {
  return sagaMiddleware;
}

export function getMiddlewares() {
  let middlewares = [sagaMiddleware];
  return middlewares;
}

export function getReducers() {
  return reducers;
}

export function getEnhancers() {
  return [];
}
