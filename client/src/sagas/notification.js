import { put, call, spawn } from "redux-saga/effects";
import delay from "@redux-saga/delay-p";
import uuid from "uuid";
import { NOTIFICATION_ADD, NOTIFICATION_DISMISS } from "../ducks/notification";

export function* autoDismissal(id, timeout = 7000) {
  yield delay(timeout);
  yield call(dismissNotification, id);
}

export function* addNotification(message, type = "info") {
  const id = uuid();

  yield put({
    type: NOTIFICATION_ADD,
    payload: {
      id,
      message,
      type
    }
  });

  yield spawn(autoDismissal, id);
}

export function* dismissNotification(id) {
  yield put({
    type: NOTIFICATION_DISMISS,
    payload: id
  });
}
