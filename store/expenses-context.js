import React, { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Groceries",
    amount: 32.50,
    date: new Date("2022-03-10"),
  },
  {
    id: "e7",
    description: "Gasoline",
    amount: 45.00,
    date: new Date("2022-03-15"),
  },
  {
    id: "e8",
    description: "Restaurant dinner",
    amount: 65.75,
    date: new Date("2022-04-08"),
  },
  {
    id: "e9",
    description: "New jacket",
    amount: 120.00,
    date: new Date("2022-05-02"),
  },
  {
    id: "e10",
    description: "Concert tickets",
    amount: 180.00,
    date: new Date("2022-06-20"),
  },
];


export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expenseData) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, expenseData) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case 'UPDATE':
      const expenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatedExpense = { ...state[expenseIndex], ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;