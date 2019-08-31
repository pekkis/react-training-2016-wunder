import { Map } from "immutable";

export const DECREASE_LOADING_COUNTER = "DECREASE_LOADING_COUNTER";
export const INCREASE_LOADING_COUNTER = "INCREASE_LOADING_COUNTER";

const initialState = Map({
  loading: 0
});

export default function uiReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case INCREASE_LOADING_COUNTER:
      return state.update("loading", l => l + 1);

    case DECREASE_LOADING_COUNTER:
      return state.update("loading", l => l - 1);

    default:
      return state;
  }
}
