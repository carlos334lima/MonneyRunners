import React from "react";
import { FlatList } from "react-native";

import { Box, Title, Spacer, Text, Button, Badge } from "../../components";

const Balance = () => {
  return (
    <Box background="dark" hasPadding>
      <Spacer size="50px" />
      <Text>Seu saldo disponível </Text>
      <Spacer />
      <Title big color="light">
        R$ 50.00
      </Title>
      <Spacer size="50px" />
      <Button block> Sacar saldo </Button>
      <Spacer size="50px" />
      <FlatList
        style={{
          width: "100%",
          height: 300,
        }}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 8]}
        keyExtractor={(item) => item.toString() + new Date().getTime()}
        renderItem={({ item, index }) => (
          <Box
            row
            width="100%"
            height="50px"
            align="center"
            spacing="0 0 5px 0"
            justify="space-between"
          >
            <Box row align="center" width="50%">
              <Box>
                <Text color="light" bold opacity={1} spacing="0px 0px 5px 0">
                  Saque integral
                </Text>
                <Spacer size="3px" />
                <Text small>28/07/2021 ás 22:00</Text>
              </Box>
            </Box>
            <Badge>+ R$ 50</Badge>
          </Box>
        )}
      />
    </Box>
  );
};

export default Balance;
