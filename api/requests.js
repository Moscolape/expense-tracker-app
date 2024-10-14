import axios from "axios";
const url = "https://expense-tracker-app-e3662-default-rtdb.firebaseio.com";


export const storeExpense = async (expenseData) => {
  const response = await axios.post(url + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(url + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(`${url}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(`${url}/expenses/${id}.json`);
};