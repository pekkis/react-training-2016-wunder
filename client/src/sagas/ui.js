import { put, takeEvery, all } from "redux-saga/effects";
import {
  INCREASE_LOADING_COUNTER,
  DECREASE_LOADING_COUNTER
} from "../ducks/ui";

export default function* uiSagas() {
  yield all([
    takeEvery(a => a.type.endsWith("_PENDING"), function*() {
      yield put({ type: INCREASE_LOADING_COUNTER });
    }),
    takeEvery(
      a => a.type.endsWith("_REJECTED") || a.type.endsWith("_FULFILLED"),
      function*() {
        yield put({ type: DECREASE_LOADING_COUNTER });
      }
    )
  ]);
}
