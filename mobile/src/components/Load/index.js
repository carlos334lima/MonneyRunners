import React from "react";
import { ActivityIndicator, Box, Spacer, Text, Title } from "..";

const Load = () => {
  return (
    <Box hasPadding background="dark50" radius="30" align="center">
      <ActivityIndicator color="success" size="largue" />
      <Spacer />
      <Title small color="light" bold>
        Buscando Informações
      </Title>
      <Spacer />
      <Text> Aguarde alguns instantes...</Text>
    </Box>
  );
};

export default Load;
