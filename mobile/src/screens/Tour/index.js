import React, { useState } from "react";
import { Platform } from "react-native";

import illustration01 from "../../assets/illustration-1.png";
import illustration02 from "../../assets/illustration-2.png";
import illustration03 from "../../assets/illustration-3.png";

//@Styles
import { Box, Title, Spacer, Cover, Text, Button } from "../../components";

const Tour = () => {
  const tourData = [
    {
      bg: "dark",
      button: "info",
      title: "Planejamento com motivação.",
      desc: "Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).",
      pic: illustration01,
    },
    {
      bg: "info",
      button: "dark",
      title: "Construa hábitos por bem (ou mal).",
      desc: "Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).",
      pic: illustration02,
    },
    {
      bg: "dark",
      button: "info",
      title: "Ganhe dinheiro com os amigos.",
      desc: "Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).",
      pic: illustration03,
    },
  ];

  const [actualTour, setActualTour] = useState(0);

  function handleActualTour() {
    setActualTour(actualTour + 1);
  }

  return (
    <Box background={tourData[actualTour]?.bg} hasPadding justify="center">
      <Spacer size={Platform.OS === "android" ? "15px" : "30px"} />
      <Title big color="light">
        {tourData[actualTour]?.title}
      </Title>

      <Spacer size={Platform.OS === "android" ? "15px" : "30px"} />

      <Cover
        source={tourData[actualTour]?.pic}
        width="100%"
        height={Platform.OS === "android" ? "200px" : "300px"}
      />

      <Spacer size={Platform.OS === "android" ? "15px" : "30px"} />

      <Text align="center" small hasPadding>
        {tourData[actualTour]?.desc}
      </Text>

      <Button
        block
        background={tourData[actualTour]?.button}
        onPress={handleActualTour}
      >
        {actualTour === 2 ? "Explorar" : "Próximo"}
      </Button>
    </Box>
  );
};

export default Tour;
