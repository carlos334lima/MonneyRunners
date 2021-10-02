import React, { useEffect } from "react";
import { View } from "react-native";

//@libraries
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
import NoChallenges from "../../components/NoChallenges";

//@utils
import { getHome } from "../../store/modules/app/actions";
import { colors } from "../../styles/theme.json";
import Challenges from "../../components/Challenges";
import Utils from "../../Utils";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHome());
  }, []);

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
                uri: "data:image/png;base64,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",
              }}
            />
          </Box>
          <Spacer size="30px" />
          <Title color="light">Carlos Lima</Title>
          <Spacer />
          <Text>carlos334lima@gmail.com</Text>

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
            <Title color="light"> R$ 29,00</Title>
          </Touchable>
        </Box>
        <Spacer size="30px" />
      </GradientView>
      <Box hasPadding spacing="-50px 0 0">
        {/* Loading */}
        {form.loading && <Load />}

        {/* No Challenge */}
        {!form.loading && !challenge && <NoChallenges />}

        {/* Yes Challenge */}
        {!form.loading && !isParticipant && challenge && <Challenges challenge={challenge}/>}

        {/* Today's Results */}
        {isParticipant &&
          !form.loading &&
          challenge &&
          !tracking?.isTime(
            <Box hasPadding background="dark50" radius="30" align="center">
              <Text>Quarta-feira, 28/09/2021</Text>
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
                        algumas horas...
                      </Text>
                    </Text>
                    <Spacer size="20px" />
                    <Button block background="success">
                      {" "}
                      Recarregar
                    </Button>
                  </Box>
                )}
                renderItem={({ item }) => (
                  <Box row height="50px">
                    <Box row align="center" width="70%">
                      <Cover
                        mode="cover"
                        width="35px"
                        height="35px"
                        rounded="35px"
                        source={{
                          uri: `${Utils.AWS.bucketURL}/${user?.photo}`,
                        }}
                        spacing="0 5px 0 0"
                      />
                      <Text color="light" bold>
                        {" "}
                        Carlos Lima
                      </Text>
                    </Box>

                    <Badge>+ R$ 50</Badge>
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
                + R$ 50
              </Badge>
              <Spacer size="25px" />
              <Text>Quarta-feira, 28/09/2021</Text>
              <Spacer size="20px" />
              <Title small color="light" bold>
                Inicie seu compromisso
              </Title>
              <Spacer size="30px" />
              <Title big color="danger" bold scale={1.3}>
                30:00
              </Title>
              <Spacer size="20px" />
              <Button block background="danger">
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
