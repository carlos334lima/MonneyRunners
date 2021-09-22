import { Alert } from "react-native";
import { takeLatest, all, call, put, select } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import api from "../../../services/api";
import util from "../../../Utils/index";
import types from "./types";
import { replace, navigate } from "../../../Utils/navigation/index";
import { modalRef as modalInviteRef } from "../../../components/Modal/Invite";
import { modalRef as modalLoginRef } from "../../../components/Modal/Login";
import {
  setReducer,
  setForm,
  reset,
  getHome as getHomeAction,
} from "./actions";

export function* loginUser() {
  const { userForm } = yield select((state) => state.app);

  yield put(setForm({ loading: true }));

  try {
    const { data: res } = yield call(api.post, `/user/login`, userForm);

    if (res.error) {
      Alert.alert('Ops!', res.message, [
        {
          text: 'Tentar novamente',
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user));
    yield put(setReducer('user', res.user));
    yield put(reset('userForm'));
    yield call(modalLoginRef?.current?.close);
    yield call(replace, 'Home');
  } catch (err) {
    Alert.alert('Erro interno!', err.message);
  } finally {
    yield put(setForm({ loading: false }));
  }
}

export function* saveUser() {
  const { userForm } = yield select((state) => state.app);

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

    const { data: res } = yield call(api.post, `/user/`, form, {
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

    yield put(reset("userForm"));
    yield call(modalInviteRef?.current?.close);

    Alert.alert(
      "Solicitação enviada!",
      "Seu convite foi recebido com sucesso! Fique atento em seu e-mail ou pelo app, iremos enviar uma notificação caso você seja aprovado.",
      [
        {
          text: "Voltar para Home",
          onPress: async () => {},
        },
      ]
    );
  } catch (err) {
    Alert.alert("Erro interno!", err.message);
  } finally {
    yield put(setForm({ saving: false }));
  }
}

export default all([
  takeLatest(types.SAVE_USERS, saveUser),
  takeLatest(types.LOGIN_USERS, loginUser),
]);
