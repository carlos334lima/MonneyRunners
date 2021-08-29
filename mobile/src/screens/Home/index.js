import React from "react";

import { colors } from '../../styles/theme.json'

import { Box, GradientView, ScrollView } from "../../components";

const Home = () => {
  return (
    <ScrollView  background="dark">
        <GradientView 
          hasPadding
          colors={[colors.primary, colors.secondary]}
          end={{ x: 0, y: 1}}
          >

        </GradientView>
    </ScrollView>
  );
};

export default Home;
