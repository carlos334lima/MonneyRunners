import types from "./types";

export function setReducer(payload, key) {
  return { type: types.LOGIN_USERS, payload, key };
}

export function setUser(payload) {
  return { type: types.SET_USERS, payload };
}

export function reset(key) {
  return { type: types.SET_USERS, key };
}
