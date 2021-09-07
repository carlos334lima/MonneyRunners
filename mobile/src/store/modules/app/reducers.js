import types from "./types";
import produce from "immer";

const INITIAL_STATE = {
  user: {},
};

export default function app(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_REDUCER:
      {
        return produce(state, (draft) => {
          draft[action.key] = action.payload;
        });
      }
      break;

    default:
      return state;
      break;
  }
}
