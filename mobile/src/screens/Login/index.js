import React, { useEffect } from "react";
import { BackHandler } from "react-native";

//@assets
import logo from "../../assets/logo.png";

//@components
import ModalLogin, {
  ModalRef as ModalLoginRef,
} from "../../components/Modal/Login";
import ModalInvite, {
  ModalRef as ModalInviteRef,
} from "../../components/Modal/Invite";

//@styles
import { Box, Button, Cover, Spacer, Text } from "../../components/";

const Login = () => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <>
      <ModalLogin />
      <ModalInvite />

      <Box background="dark" hasPadding align="center" justify="center">
        <Cover source={logo} width="65%" height="65%" />

        <Spacer size="40px" />

        <Button block onPress={() => ModalLoginRef.current?.open()}>
          Entrar na minha conta
        </Button>
        <Spacer />
        <Button
          block
          mode="text"
          onPress={() => ModalInviteRef.current?.open()}
        >
          {" "}
          Pedir convite
        </Button>

        <Text small hasPadding align="center">
          Ao fazer login você concorda com {"\n"} nossos{" "}
          <Text underline small color="info">
            TERMOS & CONDIÇÕES
          </Text>
        </Text>
      </Box>
    </>
  );
};

export default Login;
