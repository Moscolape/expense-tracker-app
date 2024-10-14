import React, { createContext, useReducer, useEffect } from 'react';
import { getExpenses } from '../api/requests'; 

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
  fetchExpenses: () => {}
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

  function addExpense(expenseData) {
    // @ts-ignore
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    // @ts-ignore
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    // @ts-ignore
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function setExpenses(expenses) {
    // @ts-ignore
    dispatch({ type: 'SET', payload: expenses });
  }

  async function fetchExpenses() {
    const fetchedExpenses = await getExpenses();
    setExpenses(fetchedExpenses);
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
    fetchExpenses
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;