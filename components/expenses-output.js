import React from "react";
import { View, StyleSheet } from "react-native";

import ExpensesSummary from "./expenses-summary";
import ExpensesList from "./expenses-list";
import { GlobalColors } from "../constants/colors";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Groceries",
    amount: 32.50,
    date: new Date("2022-03-10"),
  },
  {
    id: "e7",
    description: "Gasoline",
    amount: 45.00,
    date: new Date("2022-03-15"),
  },
  {
    id: "e8",
    description: "Restaurant dinner",
    amount: 65.75,
    date: new Date("2022-04-08"),
  },
  {
    id: "e9",
    description: "New jacket",
    amount: 120.00,
    date: new Date("2022-05-02"),
  },
  {
    id: "e10",
    description: "Concert tickets",
    amount: 180.00,
    date: new Date("2022-06-20"),
  },
];


const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: GlobalColors.colors.primary400
  },
});
