import React, { createRef } from "react";

//@libraries
import { Modalize } from "react-native-modalize";
import { useDispatch, useSelector } from "react-redux";

//@components
import TextInputMaskComponent from "../../TextInputMask";

//@styles
import { Box, Title, Spacer, Button, TextInput } from "../../index";

//@actions
import {
  setUser as setUserAction,
  saveUsers as saveUsersAction,
} from "../../../store/modules/app/actions";
import UploadImage from "../../UploadImage";
import InviteSchema from "../../../schemas/invite.schema";
import { Alert } from "react-native";

export const ModalRef = createRef();

const ModalInvite = () => {
  const dispatch = useDispatch();

  const { useForm, form } = useSelector((state) => state.app);

  const sendInvite = async () => {
    try {
      await InviteScheme.validate(userForm);
      dispatch(saveUser());
    } catch ({ errors }) {
      Alert.alert('Corrija o erro antes de continar.');
    }
  };

  const setUser = (payload) => {
    dispatch(setUserAction(payload));
  };

  return (
    <Modalize ref={ModalRef} adjustToContentHeight>
      <Box background="dark" hasPadding>
        <Title color="light">Peça seu convite</Title>
        <Spacer />

        <UploadImage
          callback={(photo) => {
            setUser({ photo: photo?.uri });
            //console.tron.log(photo);
          }}
        />
        <Spacer />
        <TextInput
          label="Nome"
          placeholder="Digite seu nome"
          disabled={useForm?.saving}
          value={useForm?.name}
          onChangeText={(name) => {
            setUser({ name });
          }}
        />

        <Spacer />
        <TextInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          disabled={useForm?.saving}
          value={useForm?.email}
          onChangeText={(email) => {
            setUser({ email });
          }}
        />

        <Spacer />
        <TextInputMaskComponent
          label="Data de nascimento"
          placeholder="Digite sua data de nascimento"
          type={"datetime"}
          options={{
            format: "DD/MM/YYYY",
          }}
          disabled={useForm?.saving}
          value={useForm?.birthday}
          onChangeText={(birthday) => {
            setUser({ birthday });
          }}
        />

        <Spacer />
        <TextInputMaskComponent
          label="Telefone"
          placeholder="(XX) X XXXX-XXXX"
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          disabled={useForm?.saving}
          value={useForm?.phone}
          onChangeText={(phone) => {
            setUser({ phone });
          }}
        />

        <Spacer />
        <TextInputMaskComponent
          label="CPF"
          placeholder="XXX.XXX.XX.XX"
          type={"cpf"}
          value={useForm?.cpf}
          onChangeText={(cpf) => {
            setUser({ cpf });
          }}
        />

        <Spacer />
        <TextInput
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
          value={useForm?.password}
          onChangeText={(password) => {
            setUser({ password });
          }}
        />

        <Spacer />
        <TextInput
          label="Confirme a senha"
          placeholder="Confirme sua senha"
          secureTextEntry
          value={useForm?.passwordConfirm}
          onChangeText={(passwordConfirm) => {
            setUser({ passwordConfirm });
          }}
        />

        <Spacer size="20px" />
        <Button block background="success" onPress={() => sendInvite()}>
          Enviar dados
        </Button>
      </Box>
    </Modalize>
  );
};

export default ModalInvite;
