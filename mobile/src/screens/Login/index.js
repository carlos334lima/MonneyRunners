import React from "react";

//@assets
import logo from "../../assets/logo.png";

//@components
import ModalLogin, {
  ModalRef as ModalLoginRef,
} from "../../components/Modal/Login";

//@styles
import { Box, Button, Cover, Spacer, Text } from "../../components/";

const Login = () => {
  return (
    <>
      <ModalLogin />

      <Box background="dark" hasPadding align="center" justify="center">
        <Cover source={logo} width="65%" height="65%" />

        <Spacer size="40px" />

        <Button block onPress={() => ModalLoginRef.current?.open()}>
          Entrar na minha conta
        </Button>
        <Spacer />
        <Button block mode="text">
          {" "}
          Pedir convite
        </Button>

        <Text small hasPadding align="center">
          Ao fazer login você concorda com {"\n"} nossos{" "}
          <Text underline small color="primary">
            TERMOS & CONDIÇÕES
          </Text>
        </Text>
      </Box>
    </>
  );
};

export default Login;
