import React, { createRef } from "react";

//@libraries
import { Modalize } from "react-native-modalize";

//@styles
import { Box, Title, Spacer } from "../../index";

export const ModalRef = createRef();

const ModalLogin = () => {
  return (
    <Modalize ref={ModalRef}>
      <Box background="dark" hasPadding>
        <Title color="light">Entre com o seus dados</Title>
      </Box>
    </Modalize>
  );
};

export default ModalLogin;
