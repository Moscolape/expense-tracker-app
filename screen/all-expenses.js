import React from "react"
import { View, StyleSheet } from "react-native"
import ExpensesOutput from "../components/expenses-output";

const AllExpenses = () => {
  return (
    <View style={styles.screen}>
      <ExpensesOutput expensesPeriod="Total" expenses={undefined} />
    </View>
  )
}

export default AllExpenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})