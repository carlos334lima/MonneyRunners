import React from "react";

//@libraries
import { useDispatch } from "react-redux";

//@utils
import { getHome } from "../../store/modules/app/actions";

//@styles
import { Box, Button, Spacer, Text, Title } from "..";

const NoChallenges = () => {

  const dispatch = useDispatch()

  return (
    <Box hasPadding background="dark50" radius="30" align="center">
      <Title small color="light" bold>
        <Spacer size="2px" />
        ops 🙁
      </Title>
      <Spacer />
      <Text> No momento, não há desafios a fazer</Text>
      <Spacer size="20px" />
      <Button block background="success" onPress={() => dispatch(getHome())}>
        {" "}
        Recarregar
      </Button>
    </Box>
  );
};

export default NoChallenges;
