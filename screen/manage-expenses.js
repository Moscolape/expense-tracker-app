import React, { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import IconButton from "../components/ui/icon-button";
import { GlobalColors } from "../constants/colors";

import ExpenseForm from "../components/expense-form";
import {
  storeExpense,
  updateExpense as updateExpenseApi,
  deleteExpense as deleteExpenseApi,
} from "../api/requests";
import LoadingOverlay from "../components/ui/loader";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    // @ts-ignore
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    await deleteExpenseApi(editedExpenseId);
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function saveHandler(expenseData) {
    setIsSubmitting(true);
    if (isEditing) {
      await updateExpenseApi(editedExpenseId, expenseData);
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id });
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={saveHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalColors.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalColors.colors.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalColors.colors.primary200,
    alignItems: "center",
  },
});
