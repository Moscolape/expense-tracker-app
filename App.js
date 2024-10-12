import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  TouchableNativeFeedback,
  View,
  StyleSheet,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import ManageExpense from "./screen/manage-expenses";
import AllExpenses from "./screen/all-expenses";
import RecentExpenses from "./screen/recent-expenses";

import AntDesign from "@expo/vector-icons/AntDesign";

import { GlobalColors } from "./constants/colors";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const RippleEffectTabButton = (props) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(GlobalColors.colors.primary700, true)}
      {...props}
    >
      <View style={styles.buttonContainer}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};

const ExpensesNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalColors.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalColors.colors.primary500,
          height: 60,
        },
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => {
            return <AntDesign color={color} size={22} name="hourglass" />;
          },
          tabBarButton: (props) => <RippleEffectTabButton {...props} />,
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => {
            return <AntDesign color={color} size={22} name="calendar" />;
          },
          tabBarButton: (props) => <RippleEffectTabButton {...props} />,
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    borderRadius: 10,
  },
});