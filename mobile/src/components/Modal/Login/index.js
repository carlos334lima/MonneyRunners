import React, { createRef } from "react";

//@libraries
import { Modalize } from "react-native-modalize";

//@styles
import { Box, Title, Spacer, Button, TextInput } from "../../index";

export const ModalRef = createRef();

const ModalLogin = () => {
  return (
    <Modalize ref={ModalRef} adjustToContentHeight>
      <Box background="dark" hasPadding>
        <Title color="light">Entre com o seus dados</Title>
        <Spacer />
        <TextInput label="E-mail" placeholder="Digite seu e-mail" />

        <Spacer />
        <TextInput label="Senha" placeholder="Digite sua senha" secureTextEntry/>
        <Spacer size="20px"/>
        <Button block background="success">
          Fazer Login
        </Button>
      </Box>
    </Modalize>
  );
};

export default ModalLogin;
