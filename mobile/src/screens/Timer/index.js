import React, { useEffect, useState, useRef } from "react";
import { Alert } from "react-native";

//@libraries
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useDispatch, useSelector } from "react-redux";

//@utils
import store from "../../store";
import {
  startInterval,
  stopInterval,
  updateTrackingTime,
} from "../../services/tracking/time";
import { navigate } from "../../Utils/navigation";
import { setReducer, saveTracking } from "../../store/modules/app/actions";

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
  const dispatch = useDispatch();
  const intervalId = useRef(null);

  const TASK_NAME = "TRACKING_USER";

  const { tracking, travelledDistance, dayliAmount, user, challenge } =
    useSelector((state) => state.app);

  const remainingDistance =
    (challenge?.distance / 1000).toFixed(2) - travelledDistance / 100;

  const remainingDistancePercent =
    (travelledDistance / challenge?.distance) * 10;

  const exitMonitoring = async () => {
    await TaskManager.unregisterAllTasksAsync();
    stopInterval(intervalId?.current);
  };

  async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos de geolocalização para pode registrar sua meta.",
        [
          {
            text: "Tentar Novamente",
            onPress: () => getLocationAsync(),
          },
          {
            text: "Voltar",
            onPress: () => {
              exitMonitoring();
              navigate("Home");
            },
          },
        ]
      );
      return;
    }

    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 1,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Monitorando sua meta",
        notificationBody: "Se movimente, estamos te observando.",
        notificationColor: "#FFF",
      },
    });
  }

  useEffect(() => {
    intervalId.current = startInterval(updateTrackingTime, 1 * 1000);

    TaskManager.defineTask(TASK_NAME, ({ data: { locations }, error }) => {
      if (error) {
        console.tron.log(TASK_NAME + error.message);
        return;
      }

      store.dispatch(
        setReducer(
          "travelledDistance",
          store.getState().app.travelledDistance + 1
        )
      );
    });
    getLocationAsync();

    return () => {
      exitMonitoring();
    };
  }, []);

  useEffect(() => {
    if (parseFloat(remainingDistance) <= 0.0) {
      Alert.alert(
        "Aeeee! Meta Batida",
        `Você acaba de colocar + R$ ${dayliAmount?.toFixed(2)} no seu bolso.`
      );

      dispatch(saveTracking("G"));
      navigate("Home");
      exitMonitoring();
    }
  }, [remainingDistance]);

  useEffect(() => {
    if (tracking?.countdown === "00:00") {
      dispatch(saveTracking("L"));
      navigate("Home");
      exitMonitoring();
    }
  }, [tracking?.countdown]);

  return (
    <Box hasPadding justify="center" align="center" background="dark">
      <Spacer size="20px" />
      <Text>Tempo Restante</Text>
      <Spacer />
      <Title big color="danger">
        {tracking?.countdown}
      </Title>
      <Spacer size="50px" />
      <Title small color="muted">
        {user?.name?.split(" ")[0]}, faltam
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
          {remainingDistance?.toFixed(2)}
        </Title>
      </Box>
      <Spacer size="30px" />
      <Title small color="muted" spacing="50px">
        Kilômetros para meta
      </Title>

      <Spacer size="20px" />
      <Badge align="center" big color="danger">
        - R$ {dayliAmount?.toFixed(2)}
      </Badge>
      <Spacer size="30px" />
      <Button block background="danger" onPress={() => navigate("Home")}>
        DESISTIR 🥵
      </Button>
      <Spacer size="20px" />
    </Box>
  );
};

export default Timer;
