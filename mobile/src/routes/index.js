import React from "react";
import { StatusBar, Text } from "react-native";

//@libraries
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

//@utils
import { colors } from "../styles/theme.json";

//@screens - TabNavigation
import Tour from "../screens/Tour";
import Login from "../screens/Login";
import Timer from "../screens/Timer";
import Payment from "../screens/Payment";

//@screens - StackNavigation
import Home from "../screens/Home";
import Ranking from "../screens/Ranking";
import Balance from "../screens/Balance";

const TabNavigation = createBottomTabNavigator();
const StackNavigation = createNativeStackNavigator();

function HomeTabs() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.dark,
        tabBarActiveTintColor: colors.danger,
        tabBarInactiveTintColor: colors.light,
        tabBarStyle: {
          backgroundColor: colors.dark,
          borderTopWidth: 0,
        },
      }}
    >
      <TabNavigation.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Ranking",
          tabBarLabelStyle: {
            marginBottom: 5,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-group" color={color} size={size} />
          ),
        }}
        name="Ranking"
        component={Ranking}
      />
      <TabNavigation.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabel: "Desafio",
          tabBarLabelStyle: {
            marginBottom: 5,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-check" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <TabNavigation.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Saldo",
          tabBarLabelStyle: {
            marginBottom: 5,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="cash" color={color} size={size} />
          ),
        }}
        name="Balance"
        component={Balance}
      />
    </TabNavigation.Navigator>
  );
}

export default function Routes() {
  return (
    <>
      <StatusBar backgroundColor={colors.dark} />
      <NavigationContainer>
        <StackNavigation.Navigator initialRouteName="Tour">
          <StackNavigation.Screen
            options={{ headerShown: false}}
            name="Home"
            component={HomeTabs}
          />

          <StackNavigation.Screen
            options={{ headerShown: false }}
            name="Tour"
            component={Tour}
          />
          <StackNavigation.Screen
            options={{ headerShown: false  }}
            name="Login"
            component={Login}
          />
          <StackNavigation.Screen
            options={{ headerShown: false }}
            name="Timer"
            component={Timer}
          />
          <StackNavigation.Screen
            options={{ headerShown: false }}
            name="Payment"
            component={Payment}
          />
        </StackNavigation.Navigator>
      </NavigationContainer>
    </>
  );
}
