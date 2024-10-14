import React, { useContext, useEffect } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/expenses-output';
import LoadingOverlay from '../components/ui/loader';
import ErrorOverlay from '../components/ui/error-happened';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    expensesCtx.fetchExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    // @ts-ignore
    return expense.date > date7DaysAgo;
  });

  if (expensesCtx.loading) {
    return <LoadingOverlay />;
  }

  if (expensesCtx.error) {
    return <ErrorOverlay message={expensesCtx.error} />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;