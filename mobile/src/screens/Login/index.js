import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";

//@assets
import logo from "../../assets/logo.png";

//@libraries
import AsyncStorage from "@react-native-async-storage/async-storage";

//@components
import ModalLogin, {
  modalRef as ModalLoginRef,
} from "../../components/Modal/Login";
import ModalInvite, {
  modalRef as ModalInviteRef,
} from "../../components/Modal/Invite";

//@styles
import {
  ActivityIndicator,
  Box,
  Button,
  Cover,
  Spacer,
  Text,
} from "../../components/";

//@Utils
import { navigate, replace } from "../../Utils/navigation";
import { useDispatch } from "react-redux";
import { setReducer } from "../../store/modules/app/actions";

const Login = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoggedState();
  }, []);

  async function getLoggedState() {
    //AsyncStorage.clear();
    const user = await AsyncStorage.getItem("@user");
    const tour = await AsyncStorage.getItem("@tour");

    if (!tour) {
      replace("Tour");
      return false;
    }

    if (!user) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      dispatch(setReducer(JSON.parse(user), "user"));
      replace("Home");
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <>
      <ModalLogin />
      <ModalInvite />

      <Box background="dark" hasPadding align="center" justify="center">
        <Cover source={logo} width="65%" height="65%" />

        <Spacer size="40px" />

        {loading ? (
          <ActivityIndicator color="danger" />
        ) : (
          <>
            <Button block onPress={() => ModalLoginRef.current?.open()}>
              Entrar na minha conta
            </Button>
            <Spacer />
            <Button
              block
              mode="text"
              onPress={() => ModalInviteRef.current?.open()}
            >
              {" "}
              Pedir convite
            </Button>

            <Text small hasPadding align="center">
              Ao fazer login voc?? concorda com {"\n"} nossos{" "}
              <Text underline small color="info">
                TERMOS & CONDI????ES
              </Text>
            </Text>
          </>
        )}
      </Box>
    </>
  );
};

export default Login;
