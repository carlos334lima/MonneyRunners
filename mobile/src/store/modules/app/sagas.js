import { all, takeLatest } from "redux-saga/effects";
import types from "./types";

import { reset, setForm } from "../app/actions";
import { Alert } from "react-native";

import moment from "moment";

import api from "../../../services/api";
import { modalRef } from "../../../components/Modal/Invite";

export function* loginUser() {}

export function* saveUsers() {
  const { form } = select((state) => state.app);
  yield put(setForm({ saving: true }));

  try {
    const form = new FormData();

    form.append("name", userForm?.name);
    form.append("email", userForm?.email);
    form.append("cpf", userForm?.cpf.match(/\d+/g).join(""));
    form.append(
      "birthday",
      moment(userForm?.birthday, "DD/MM/YYYY").format("YYYY-MM-DD")
    );
    form.append("phone", userForm?.phone.match(/\d+/g).join(""));
    form.append("password", userForm.password);

    form.append("photo", {
      name: new Date().getTime() + "." + util.getMimeType(userForm?.photo?.uri),
      type: `image/${util.getMimeType(userForm?.photo?.uri)}`,
      uri: userForm?.photo?.uri,
    });

    const { data: res } = yield call(api.post, "/user", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.error) {
      Alert.alert("Ops!", res.message, [
        {
          text: "Tentar novamente",
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield put(reset("useForm"));
    yield call(modalRef.current?.close);

    yield call(Alert.alert, "Solicitação enviada!");
  } catch (error) {
    yield call(Alert.alert, "Erro interno!", error.message);
  } finally {
    yield put(setForm({ saving: false }));
  }
}

export default all([
  takeLatest(types.LOGIN_USERS, loginUser),
  takeLatest(types.SAVE_USERS, saveUsers),
]);
