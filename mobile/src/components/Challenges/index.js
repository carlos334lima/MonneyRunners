import React from "react";

//@libraries
import YoutubePlayer from "react-native-youtube-iframe";

//@styles
import { Button, Spacer, Text, Title, Box } from "..";

const Challenges = () => {
  return (
    <>
      <Box hasPadding background="dark50" radius="30" align="center">
        <Title small color="light" bold>
          <Spacer size="2px" />
          Correr 2km todos os dias ás 5am durante 30 dias
        </Title>
        <Spacer />
        <Text>
          Matenha a consistência correndo todos os dias para criar hábitos. O
          desafio termina em 30/09/2021
        </Text>
        <Spacer size="20px" />
        <Button block background="success">
          {" "}
          Participar Agora!
        </Button>
      </Box>

      <Spacer size="20px" />

      <Box hasPadding background="dark50" radius="30" align="center">
        <Title small color="light" bold>
          Eai ?! vai encarar o desafio? 😎
        </Title>
        <Spacer />
        <YoutubePlayer height={180} width="100%" videoId="8UaguGuEQWg" />
      </Box>
    </>
  );
};

export default Challenges;
