import React from "react";

import logo from "../../assets/logo.png";

//@Styles
import { Box, Button, Cover, Spacer, Text } from "../../components/";

const Login = () => {
  return (
    <Box background="dark" hasPadding align="center" justify="center">
      <Cover source={logo} width="65%" height="65%" />

      <Spacer size="40px" />

      <Button block> Entrar na minha conta</Button>
      <Spacer />
      <Button block mode="text">
        {" "}
        Pedir convite
      </Button>

      <Text small hasPadding align="center" >
        Ao fazer login você concorda com {'\n'} nossos <Text underline small color="primary">TERMOS & CONDIÇÕES</Text>
      </Text>
    </Box>
  );
};

export default Login;
