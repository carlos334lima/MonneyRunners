import React from "react";

//@libraries
import LottieView from "lottie-react-native";

//@assets
import AnimationImage from "../../assets/exercises.json";

import { Container } from "./styles";

const LoadAnimation = () => {
  return (
    <Container>
      <LottieView
        source={AnimationImage}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
};

export default LoadAnimation;
