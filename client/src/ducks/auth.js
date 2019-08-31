import { Map } from "immutable";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

const defaultState = Map({
  initialized: false,
  token: undefined,
  user: undefined
});

export const login = (email, password) => {
  return {
    type: LOGIN,
    payload: {
      email,
      password
    }
  };
};

export default function authReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGOUT:
      return defaultState;
    case LOGIN_SUCCESS:
      return state.merge({
        initialized: true,
        token: payload.token,
        user: payload.user
      });

    default:
      return state;
  }
}
