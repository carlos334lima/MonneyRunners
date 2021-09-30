import React from "react";

//@libraries
import { TextInputMask } from "react-native-masked-text";

//@styles
import { TextInput } from "../index";


const TextInputMaskComponent = (inputProps) => {
  return (
    <TextInput
      {...inputProps}
      render={(props) => <TextInputMask {...props} />}
    />
  );
};

export default TextInputMaskComponent;
