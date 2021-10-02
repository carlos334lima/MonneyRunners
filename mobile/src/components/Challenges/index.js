import React from "react";

//@libraries
import YoutubePlayer from "react-native-youtube-iframe";

//@utils
import { navigate } from '../../Utils/navigation'

//@styles
import { Button, Spacer, Text, Title, Box } from "..";

const Challenges = (props) => {
  const { challenge } = props;

  return (
    <>
      <Box hasPadding background="dark50" radius="30" align="center">
        <Title small color="light" bold>
          <Spacer size="2px" />
          {challenge?.title}
        </Title>
        <Spacer />
        <Text>{challenge?.description}</Text>
        <Spacer size="20px" />
        <Button
          block
          background="success"
          onPress={() => {
            navigate("Payment");
          }}
        >
          Participar Agora
        </Button>
      </Box>

      <Spacer size="20px" />

      <Box hasPadding background="dark50" radius="30" align="center">
        <Title small color="light" bold>
          Eai ?! vai encarar o desafio? 😎
        </Title>
        <Spacer />
        <YoutubePlayer
          height={180}
          width="100%"
          videoId={challenge?.ytVideoId}
        />
      </Box>
    </>
  );
};

export default Challenges;
