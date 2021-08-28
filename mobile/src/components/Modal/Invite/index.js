import React, { createRef } from "react";

//@libraries
import { Modalize } from "react-native-modalize";

//@components
import TextInputMaskComponent from '../../TextInputMask'

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
        <TextInputMaskComponent
          label="Data de nascimento"
          placeholder="Digite sua data de nascimento"
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
        />

        <Spacer />
        <TextInputMaskComponent 
          label="Telefone" 
          placeholder="(XX) X XXXX-XXXX" 
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
       />

        <Spacer />
        <TextInputMaskComponent 
          label="CPF" 
          placeholder="XXX.XXX.XX.XX" 
          type={'cpf'}
        />

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
