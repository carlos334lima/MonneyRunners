import React, { createRef } from "react";
import { Alert } from "react-native";

//@libraries
import { Modalize } from "react-native-modalize";
import { useDispatch, useSelector } from "react-redux";

//@styles
import { Box, Title, Spacer, Button, TextInput } from "../../index";

//@utils
import {
  setUser as setUserAction,
  loginUser,
} from "../../../store/modules/app/actions";
import LoginScheme from "../../../schemas/login.schema";

export const modalRef = createRef();

const ModalLogin = () => {
  const dispatch = useDispatch();
  const { userForm, form } = useSelector((state) => state.app);

  const setUser = (payload) => {
    dispatch(setUserAction(payload));
  };

  const sendLogin = async () => {
    try {
      await LoginScheme.validate(userForm);
      dispatch(loginUser());
    } catch ({ errors }) {
      Alert.alert("Corrija o erro antes de continar.");
    }
  };

  return (
    <Modalize ref={modalRef} adjustToContentHeight>
      <Box background="dark" hasPadding>
        <Title color="light">Entre com o seus dados</Title>
        <Spacer />
        <TextInput
          label="E-mail"
          keyboardType="email-address"
          value={userForm?.email}
          disabled={form?.loading}
          onChangeText={(email) => {
            setUser({ email });
          }}
        />
        <Spacer />
        <TextInput
          value={userForm?.password}
          disabled={form?.loading}
          onChangeText={(password) => {
            setUser({ password });
          }}
          label="Senha"
          secureTextEntry
        />
        <Spacer size="10px" />
        <Button
          disabled={form?.loading}
          loading={form?.loading}
          block
          background="success"
          onPress={() => sendLogin()}
        >
          Fazer Login
        </Button>
      </Box>
    </Modalize>
  );
};

export default ModalLogin;
