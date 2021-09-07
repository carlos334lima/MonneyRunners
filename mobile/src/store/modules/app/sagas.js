import { all, takeLatest } from "redux-saga/effects";
import types from "./types";

export function* loginUser() {}

export default all([takeLatest(types.LOGIN_USERS, loginUser)]);
