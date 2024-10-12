import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/expenses-output';
import { GlobalColors } from '../constants/colors';

const RecentExpenses = ({ navigation }) => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    // @ts-ignore
    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: GlobalColors.colors.primary500,
    fontWeight: '500'
  }
});
