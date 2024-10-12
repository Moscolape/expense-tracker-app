import React from "react"
import { View, StyleSheet } from "react-native"
import ExpensesOutput from "../components/expenses-output";

const RecentExpenses = () => {
  return (
    <View style={styles.screen}>
      <ExpensesOutput expensesPeriod="Last 7 days" expenses={undefined}/>
    </View>
  )
}

export default RecentExpenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})