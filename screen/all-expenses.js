import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/expenses-output';

const AllExpenses = ({navigation}) => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
