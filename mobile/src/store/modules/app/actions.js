import types from "./types";

export function setReducer(payload, key) {
  return {
    type: types.LOGIN_USERS,
    payload,
    key,
  };
}

export function loginUser() {
  return {
    type: types.LOGIN_USERS,
  };
}
