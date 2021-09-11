import types from "./types";
import produce from "immer";

const INITIAL_STATE = {
  user: {},
  userForm: {},
  form: {
    loading: false,
    disabled: false,
    saving: false,
  },
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

    case types.SET_USERS:
      console.tron.log(action.payload)
      {
        return produce(state, (draft) => {
          draft.userForm = { ...state.userForm, ...action.payload };
        });
      }
      break;

    case types.RESET:
      {
        return produce(state, (draft) => {
          draft[action.key] = INITIAL_STATE[action.key];
        });
      }
      break;

    default:
      return state;
      break;
  }
}
