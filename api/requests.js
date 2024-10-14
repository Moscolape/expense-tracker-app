import axios from "axios";

export const storeExpense = (expenseData) => {
  axios.post(
    "https://expense-tracker-app-e3662-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
};
