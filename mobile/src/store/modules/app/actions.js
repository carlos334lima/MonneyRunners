import types from "./types";

export function setReducer(payload, key) {
  return { type: types.LOGIN_USERS, payload, key };
}

export function saveUsers() {
  return { type: types.SAVE_USERS };
}

export function setUser(payload) {
  return { type: types.SET_USERS, payload };
}

export function setForm(payload) {
  return { type: types.SET_FORM, payload };
}

export function loginUser() {
  return { type: types.LOGIN_USERS };
}

export function reset(key) {
  return { type: types.SET_USERS, key };
}
