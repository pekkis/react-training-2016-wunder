import { call, all, put, fork } from "redux-saga/effects";

import { GET_PERSONS } from "../ducks/person";

import personSagas from "./person";
import uiSagas from "./ui";
import authSagas from "./auth";

import { addNotification } from "./notification";

export default function* rootSaga() {
  yield all([fork(personSagas), fork(uiSagas), fork(authSagas)]);

  /*
  If we always do something in the beginning, I'd maybe put it
  here instead of the useEffect in root component
  */
  yield put({ type: GET_PERSONS });
  yield call(addNotification, "Welcome to Fraktio Space Odyssey 2001");
}
