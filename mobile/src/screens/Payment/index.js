import React from "react";
import { ScrollView } from "react-native";

//@libraries
import { CreditCardInput } from "react-native-credit-card-input";

//@utils
import CreditCardSchema from "../../schemas/credit-card.schema";

//@styles
import { colors } from "../../styles/theme.json";
import { Box, Title, Text, Button, Spacer } from "../../components";

const Payment = () => {
  const dispatch = useDispatch();
  const { form, challenge, payment } = useSelector((state) => state.app);

  const setPayment = ({ number, cvc, expiry, name }) => {
    dispatch(
      setReducer("payment", {
        card_number: number?.split(" ").join(""),
        card_cvv: cvc,
        card_expiration_date: expiry?.replace("/", ""),
        card_holder_name: name,
      })
    );
  };

  const joinChallenge = async () => {
    try {
      await CreditCardSchema.validate(payment);
      dispatch(joinChallengeAction());
    } catch (error) {
      console.tron.log(error);
      //Alert.alert(errors[0], 'Corrija o erro antes de continar.');
    }
  };

  return (
    <Box background="dark" hasPadding>
      <ScrollView>
        <Box spacing="50px 0 0">
          <Title small color="light" bold>
            {challenge?.title}
          </Title>
          <Spacer />
          <Text>{challenge?.description}</Text>
          <Spacer size="50px" />
          <CreditCardInput
            onChange={({ values }) => setPayment(values)}
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

      <Button
        block
        background="success"
        onPress={() => joinChallenge()}
        disabled={form?.saving}
        loading={form?.saving}
      >
        Pagar R$ {challenge?.fee}
      </Button>
    </Box>
  );
};

export default Payment;
