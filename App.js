import React from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableNativeFeedback, View, StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import ManageExpense from "./screen/manage-expenses";
import AllExpenses from "./screen/all-expenses";
import RecentExpenses from "./screen/recent-expenses";

import AntDesign from "@expo/vector-icons/AntDesign";

import { GlobalColors } from "./constants/colors";
import IconButton from "./components/ui/icon-button";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const RippleEffectTabButton = (props) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        GlobalColors.colors.primary800,
        true
      )}
      {...props}
    >
      <View style={styles.buttonContainer}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};

const ExpensesNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
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
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("ManageExpense")}
            />
          );
        },
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color }) => {
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
          tabBarIcon: ({ color }) => {
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
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalColors.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{ presentation: "modal" }}
          />
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
