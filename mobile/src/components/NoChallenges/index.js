import React from "react";

//@styles
import { Box, Button, Spacer, Text, Title } from "..";

const NoChallenges = () => {
  return (
    <Box hasPadding background="dark50" radius="30" align="center">
      <Title small color="light" bold>
        <Spacer size="2px" />
        ops 🙁
      </Title>
      <Spacer />
      <Text> No momento, não há desafios a fazer</Text>
      <Spacer size="20px" />
      <Button block background="success">
        {" "}
        Recarregar
      </Button>
    </Box>
  );
};

export default NoChallenges;
