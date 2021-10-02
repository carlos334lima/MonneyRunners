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
                uri: `${Utils.AWS.bucketURL}/${user?.photo}`,
              }}
            />
          </Box>
          <Spacer size="30px" />
          <Title color="light">{isParticipant ? `${(discipline * 100).toFixed(2)}% de disciplina` : user?.name}</Title>
          <Spacer />
          <Text>{isParticipant ? `${participatedTimes}/${challengePeriod} dias concluídos` : user?.email}</Text>

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
                        width="35px"
                        height="35px"
                        circle
                        spacing="0 7px 0 0"
                        image={`${util.AWS.bucketURL}/${item?.userId?.photo}`}
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
