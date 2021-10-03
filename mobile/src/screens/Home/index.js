import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native-gesture-handler";

//@libraries
import moment from "moment";
import "moment/locale/pt-br";
import { useDispatch, useSelector } from "react-redux";
import YoutubePlayer from "../../components/Challenges";

//@styles
import {
  Box,
  GradientView,
  ScrollView,
  Cover,
  Title,
  Text,
  Spacer,
  ProgressCircle,
  Touchable,
  ActivityIndicator,
  Button,
  FlatListData,
  Badge,
} from "../../components";

//@components
import Load from "../../components/Load";
import Challenges from "../../components/Challenges";
import NoChallenges from "../../components/NoChallenges";

//@utils
import { getHome } from "../../store/modules/app/actions";
import Utils from "../../Utils";
import {
  startInterval,
  stopInterval,
  updateTrackingTime,
} from "../../services/tracking/time";

//@styles
import { colors } from "../../styles/theme.json";

const Home = () => {
  moment.locale("pt-br");

  const dispatch = useDispatch();
  const {
    user,
    isParticipant,
    challenge,
    balance,
    form,
    tracking,
    dailyAmount,
    challengePeriod,
    participatedTimes,
    discipline,
    dailyResults,
  } = useSelector((state) => state.app);

  const [timeToChallenge, setTimeToChallenge] = useState("");

  const todayChallengeDateTime = moment(challenge?.time.start, "HH:mm");
  const nextChallengeDate = moment().isAfter(todayChallengeDateTime)
    ? moment().add(1, "day")
    : moment();

  useEffect(() => {
    dispatch(getHome());
  }, []);

  useEffect(() => {
    const intervalId = startInterval(updateTrackingTime, 1 * 1000);
    return () => {
      stopInterval(intervalId);
    };
  }, [challenge, isParticipant]);

  useEffect(() => {
    setTimeToChallenge(
      moment.duration(nextChallengeDate.diff(moment())).humanize()
    );

    // ENVIANDO NO ÚLTIMO SEGUNDO
    if (tracking?.countdown === "00:01" && tracking?.isTime) {
      dispatch(saveTracking("L"));
    }
  }, [tracking?.countdown]);

  return (
    <ScrollView background="dark">
      <GradientView
        hasPadding
        colors={[colors.primary, colors.secondary]}
        end={{ x: 0, y: 1 }}
      >
        <Box justify="center" spacing="20px 0 0" align="center">
          <Box justify="center" spacing="20px 0 0" align="center">
            {isParticipant && <ProgressCircle progress={0.5} />}
            <Cover
              mode="cover"
              rounded="100px"
              source={{
                uri: `${Utils.AWS.bucketURL}/${user?.photo}`,
              }}
            />
          </Box>
          <Spacer size="30px" />
          <Title color="light">
            {isParticipant
              ? `${(discipline * 100).toFixed(2)}% de disciplina`
              : user?.name}
          </Title>
          <Spacer />
          <Text>
            {isParticipant
              ? `${participatedTimes}/${challengePeriod} dias concluídos`
              : user?.email}
          </Text>

          {isParticipant && (
            <Touchable
              radius="3px"
              spacing="20px 0 0"
              hasPadding
              background="success"
            >
              <Text color="primary" bold>
                Saldo conquistado:
              </Text>
              <Spacer size="20px" />
              <Title color="light"> R$ {balance && balance.toFixed(2)}</Title>
            </Touchable>
          )}
        </Box>
        <Spacer size="30px" />
      </GradientView>
      <Box hasPadding spacing="-50px 0 0">
        {/* Loading */}
        {form.loading && <Load />}

        {/* No Challenge */}
        {!form.loading && !challenge && <NoChallenges />}

        {/* Yes Challenge */}
        {!form.loading && !isParticipant && challenge && (
          <Challenges challenge={challenge} />
        )}

        {/* Today's Results */}
        {isParticipant &&
          !form.loading &&
          challenge &&
          !tracking?.isTime(
            <Box hasPadding background="dark50" radius="30" align="center">
              <Text>{moment().format("dddd[, ] DD/MM/YYYY")}</Text>
              <Spacer size="20px" />
              <Title small color="light" bold>
                Resultados de hoje
              </Title>
              <Spacer size="20px" />
              <FlatListData
                data={[1, 2, 3]}
                ListEmptyComponent={() => (
                  <Box align="center" spacing="20px 0 0">
                    <Title small color="light" bold>
                      <Spacer size="2px" />
                      Nenhum resultado
                    </Title>
                    <Spacer />
                    <Text align="center" color="light">
                      O desafio começa em{" "}
                      <Text color="danger" bold>
                        {timeToChallenge}
                      </Text>
                    </Text>
                    <Spacer size="20px" />
                    <Button
                      block
                      background="success"
                      onPress={() => dispatch(getHome())}
                    >
                      {" "}
                      Recarregar
                    </Button>
                  </Box>
                )}
                renderItem={({ item }) => (
                  <Box row height="50px">
                    <Box row align="center" width="70%">
                      <Cover
                        width="35px"
                        height="35px"
                        circle
                        spacing="0 7px 0 0"
                        image={`${util.AWS.bucketURL}/${item?.userId?.photo}`}
                      />
                      <Text color="light" bold>
                        {" "}
                        {item?.userId?.name}
                      </Text>
                    </Box>

                    <Badge>
                      {item?.operation === "L" ? "-" : "+"} R$ {item?.amount}
                    </Badge>
                  </Box>
                )}
              />
            </Box>
          )}

        {/* Time Of Challenge */}
        {isParticipant &&
          !form.loading &&
          challenge &&
          tracking?.isTime(
            <Box hasPadding background="dark50" radius="30" align="center">
              <Badge big color="success" align="center">
                + R$ {dailyAmount?.toFixed(2)}
              </Badge>
              <Spacer size="25px" />
              <Text>{moment().format("dddd[, ] DD/MM/YYYY")}</Text>
              <Spacer size="20px" />
              <Title small color="light" bold>
                Inicie seu compromisso
              </Title>
              <Spacer size="30px" />
              <Title big color="danger" bold scale={1.3}>
                {tracking?.countdown}
              </Title>
              <Spacer size="20px" />
              <Button
                block
                background="danger"
                onPress={() => {
                  navigate("Timer");
                }}
              >
                {" "}
                Iniciar Agora
              </Button>
            </Box>
          )}
      </Box>
    </ScrollView>
  );
};

export default Home;
