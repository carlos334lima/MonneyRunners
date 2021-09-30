import React from "react";

//@styles
import {
  Box,
  Text,
  Title,
  Spacer,
  ProgressCircle,
  Badge,
  Button,
} from "../../components";

const Timer = () => {
  return (
    <Box hasPadding justify="center" align="center" background="dark">
      <Spacer size="20px" />
      <Text>Tempo Restante</Text>
      <Spacer />
      <Title big color="danger">
        30:00
      </Title>
      <Spacer size="50px" />
      <Title small color="muted">
        Carlos, faltam
      </Title>
      <Box spacing="20px" align="center" background="dark" height="250px">
        <ProgressCircle
          size="220px"
          color="danger"
          progress={0.5}
          background="dark"
        />
        <Spacer size="80px" />
        <Title color="light" bold big scale={0.8}>
          {" "}
          25:34
        </Title>
      </Box>
      <Spacer size="30px" />
      <Title small color="muted" spacing="50px">
        Kilômetros para meta
      </Title>

      <Spacer size="20px" />
      <Badge align="center" big color="danger">
        R$ -10,00
      </Badge>
      <Spacer size="30px" />
      <Button block background="danger">
        DESISTIR 🥵
      </Button>
      <Spacer size="20px" />
    </Box>
  );
};

export default Timer;
