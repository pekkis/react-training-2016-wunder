import { call, putResolve, take, fork, race } from "redux-saga/effects";
import authService from "../services/auth";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN, LOGOUT } from "../ducks/auth";
import { addNotification } from "./notification";

export function* login(email, password) {
  try {
    const [token, user] = yield call(authService.login, email, password);
    yield call([window.localStorage, "setItem"], "token", token);
    yield putResolve({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user
      }
    });
  } catch (e) {
    yield putResolve({
      type: LOGIN_FAILURE,
      error: true,
      payload: e
    });
  }
}

function* logout() {
  yield take(LOGOUT);
  yield call([window.localStorage, "removeItem"], "token");
  yield call(addNotification, "You logged out, dear sir");
}

export default function* loginSagas() {
  const token = yield call([window.localStorage, "getItem"], "token");
  if (token) {
    yield putResolve({
      type: LOGIN_SUCCESS,
      payload: {
        token
      }
    });

    yield* logout();
  }

  do {
    const {
      payload: { email, password }
    } = yield take(LOGIN);

    yield fork(login, email, password);

    const { success } = yield race({
      success: take(LOGIN_SUCCESS),
      failure: take(LOGIN_FAILURE)
    });

    if (success) {
      yield call(addNotification, "Login succeeded!");
      yield* logout();
    } else {
      yield call(addNotification, "Oh noes, login faileds!");
    }
  } while (true);
}
