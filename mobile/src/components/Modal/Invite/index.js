import React, { createRef } from "react";

//@libraries
import { Modalize } from "react-native-modalize";

//@styles
import { Box, Title, Spacer, Button, TextInput } from "../../index";

export const ModalRef = createRef();

const ModalInvite = () => {
  return (
    <Modalize ref={ModalRef} adjustToContentHeight>
      <Box background="dark" hasPadding>
        <Title color="light">Peça seu convite</Title>

        <Spacer />
        <TextInput label="Nome" placeholder="Digite seu nome" />

        <Spacer />
        <TextInput label="E-mail" placeholder="Digite seu e-mail" />

        <Spacer />
        <TextInput
          label="Data de nascimento"
          placeholder="Digite sua data de nascimento"
        />

        <Spacer />
        <TextInput label="Telefone" placeholder="Digite seu telefone" />

        <Spacer />
        <TextInput label="CPF" placeholder="Digite seu CPF" />

        <Spacer />
        <TextInput
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <Spacer />
        <TextInput
          label="Confirme a senha"
          placeholder="Confirme sua senha"
          secureTextEntry
        />

        <Spacer size="20px" />
        <Button block background="success">
          Enviar dados
        </Button>
      </Box>
    </Modalize>
  );
};

export default ModalInvite;
