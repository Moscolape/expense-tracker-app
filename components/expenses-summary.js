import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { GlobalColors } from "../constants/colors";

const ExpensesSummary = ({periodName, expenses}) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalColors.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  period: {
    fontSize: 12,
    color: GlobalColors.colors.primary400
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalColors.colors.primary500
  }
})