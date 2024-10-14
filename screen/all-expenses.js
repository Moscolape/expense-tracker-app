import React, { useContext, useEffect } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/expenses-output';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    expensesCtx.fetchExpenses();
  }, []);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;