import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

//@libraries
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

//@Utils
import { getRanking } from "../../store/modules/app/actions";
import Utils from "../../Utils";

//@styles
import {
  Box,
  Spacer,
  Title,
  Text,
  ProgressBar,
  FlatListData,
  Cover,
} from "../../components";

const Ranking = () => {
  const dispatch = useDispatch();
  const { ranking, form } = useSelector((state) => state.app);
  const [finishedPercentage, setFinishedPercentage] = useState(0);

  useEffect(() => {
    setFinishedPercentage(ranking?.currentPeriod / ranking?.challengePeriod);
  }, [ranking]);

  useEffect(() => {
    dispatch(getRanking());
  }, []);

  return (
    <Box hasPadding background="dark">
      <Spacer size="50px" />
      <Title color="light" big>
        Ranking
      </Title>

      {form?.loading && (
        <Box spacing="20px 0 0 0" hasPadding align="center">
          <ActivityIndicator size="large" />
          <Spacer size="20px" />
          <Title color="light" small>
            Buscando informações
          </Title>
          <Spacer size="10px" />
          <Text>Aguarde alguns instantes...</Text>
        </Box>
      )}

      {!form?.loading && (
        <>
          <Box row height="90px" spacing="40px 0 0">
            <Box hasPadding background="success" width="140px" radius>
              <Text color="dark">Saldo Extra</Text>
              <Spacer />
              <Title small color="light">
                R$ {ranking?.extraBalance?.toFixed(2)}
              </Title>
            </Box>
            <Box hasPadding width="100%" height="200px">
              <Text color="light">
                Status ({ranking?.challengePeriod} dias)
              </Text>
              <Spacer />
              <ProgressBar progress={0.5} width="100%" color="danger" />
            </Box>
          </Box>
          <Spacer size="60px" />

          <FlatList
            style={{
              width: "100%",
              height: 250,
            }}
            data={ranking?.trackingByUser}
            keyExtractor={(item) => item?._id}
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
                  <Text color="light">{index + 1}º</Text>
                  <Cover
                    width="35px"
                    height="35px"
                    rounded="35px"
                    mode="cover"
                    spacing="0 8px"
                    source={`${Utils.AWS.bucketURL}/${item?.photo}`}
                  />
                  <Box>
                    <Text
                      color="light"
                      bold
                      opacity={1}
                      spacing="0px 0px 5px 0"
                    >
                      {item?.name}
                    </Text>
                    <Text small>
                      {(item?.performance / ranking?.currentPeriod) * 100}% (
                      {item?.performance} dias)
                    </Text>
                  </Box>
                </Box>
                <ProgressBar
                  progress={item?.performance / ranking?.currentPeriod}
                  color="danger"
                />
              </Box>
            )}
          />
        </>
      )}
    </Box>
  );
};

export default Ranking;
