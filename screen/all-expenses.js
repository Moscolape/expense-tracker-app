import React, { useContext, useEffect } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/expenses-output';
import LoadingOverlay from '../components/ui/loader';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    expensesCtx.fetchExpenses();
  }, []);

  if (expensesCtx.loading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;