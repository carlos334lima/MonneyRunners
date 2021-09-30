import React from "react";
import { ScrollView } from "react-native";

//@libraries
import { CreditCardInput } from "react-native-credit-card-input";

//@utils
import { colors } from "../../styles/theme.json";

//@styles
import { Box, Title, Text, Button, Spacer } from "../../components";

const Payment = () => {
  return (
    <Box background="dark" hasPadding>
      <ScrollView>
        <Box spacing="50px 0 0">
          <Title small color="light" bold>
            Correr 2km todos os dias ás 5am durante 30 dias
          </Title>
          <Spacer />
          <Text>
            Matenha a consistência correndo todos os dias para criar hábitos. O
            desafio termina em 30/09/2021
          </Text>
          <Spacer size="50px" />
          <CreditCardInput
            allowScroll
            requiresName
            placeholders={{
              number: "**** **** **** ****",
              cvc: "CVC",
              expiry: "MM/YY",
              name: "NOME COMPLETO",
            }}
            labels={{
              number: "NÚMERO NO CARTÃO",
              cvc: "CVC/CCV",
              expiry: "DATA EXP.",
              name: "NOME NO CARTÃO",
            }}
            inputStyle={{
              color: colors.light,
            }}
          />
        </Box>
      </ScrollView>

      <Button block background="success">
        {" "}
        Pagar R$300,50
      </Button>
    </Box>
  );
};

export default Payment;
