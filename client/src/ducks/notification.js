import { OrderedMap, Map } from "immutable";

export const NOTIFICATION_ADD = "NOTIFICATION_ADD";
export const NOTIFICATION_DISMISS = "NOTIFICATION_DISMISS";

const defaultState = Map({
  notifications: OrderedMap()
});

export default function notificationReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case NOTIFICATION_ADD:
      return state.update("notifications", notifications =>
        notifications.set(payload.id, payload).takeLast(3)
      );

    case NOTIFICATION_DISMISS:
      return state.deleteIn(["notifications", payload]);

    default:
      return state;
  }
}
