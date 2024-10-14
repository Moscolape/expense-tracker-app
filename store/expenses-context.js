import React, { createContext, useReducer, useEffect, useState } from 'react';
import { getExpenses, updateExpense as updateExpenseApi, deleteExpense as deleteExpenseApi } from '../api/requests';

export const ExpensesContext = createContext({
  expenses: [],
  // @ts-ignore
  addExpense: (expenseData) => {},
  // @ts-ignore
  deleteExpense: (id) => {},
  // @ts-ignore
  updateExpense: (id, expenseData) => {},
  // @ts-ignore
  setExpenses: (expenses) => {},
  fetchExpenses: () => {},
  loading: false,
  error: null
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      const expenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatedExpense = { ...state[expenseIndex], ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload.reverse();
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  function addExpense(expenseData) {
    // @ts-ignore
    dispatch({ type: 'ADD', payload: expenseData });
  }

  async function deleteExpense(id) {
    setLoading(true);
    try {
      await deleteExpenseApi(id);
      // @ts-ignore
      dispatch({ type: 'DELETE', payload: id });
    } catch (err) {
      // @ts-ignore
      setError('Could not delete the expense!');
    }
    setLoading(false);
  }

  async function updateExpense(id, expenseData) {
    setLoading(true);
    try {
      await updateExpenseApi(id, expenseData);
      // @ts-ignore
      dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
    } catch (err) {
      // @ts-ignore
      setError('Could not update the expense!');
    }
    setLoading(false);
  }

  function setExpenses(expenses) {
    // @ts-ignore
    dispatch({ type: 'SET', payload: expenses });
  }

  async function fetchExpenses() {
    setLoading(true);
    setError(null);
    try {
      const fetchedExpenses = await getExpenses();
      setExpenses(fetchedExpenses);
    } catch (err) {
      // @ts-ignore
      setError('Could not fetch expenses!');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
    fetchExpenses,
    loading,
    error
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;