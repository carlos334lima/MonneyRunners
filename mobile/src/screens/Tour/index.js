import React, { useState } from "react";
import { Platform } from "react-native";

//@assets
import illustration01 from "../../assets/illustration-1.png";
import illustration02 from "../../assets/illustration-2.png";
import illustration03 from "../../assets/illustration-3.png";

//@libraries
import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation();

  const [actualTour, setActualTour] = useState(0);

  return (
    <Box background={tourData[actualTour]?.bg} hasPadding align="center">
      <Box hasPadding>
        <Spacer size="30px" />
        <Title color="light" bold style={{ fontSize: 40, paddingTop: 10 }}>
          {tourData[actualTour]?.title}
        </Title>
        <Spacer size="30px" />
        <Cover
          resizeMode="contain"
          width="100%"
          height="300px"
          source={tourData[actualTour]?.pic}
          transparent
        />

        <Text align="center" color="light">
          {tourData[actualTour]?.desc}
        </Text>
        <Spacer size="20px" />
      </Box>
      <Button
        block
        background={tourData[actualTour]?.button}
        onPress={() => {
          actualTour === 2 && navigation.navigate("Login");
          setActualTour(actualTour + 1);
        }}
      >
        {actualTour === 2 ? "Explorar Desafio" : "Próximo"}
      </Button>
    </Box>
  );
};

export default Tour;
