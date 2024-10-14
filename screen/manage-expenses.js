import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpensesContext } from '../store/expenses-context';
import IconButton from '../components/ui/icon-button';
import { GlobalColors } from '../constants/colors';

import ExpenseForm from '../components/expense-form';
import LoadingOverlay from '../components/ui/loader';
import ErrorOverlay from '../components/ui/error-happened';
// @ts-ignore


function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    // @ts-ignore
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    setError(null);
    try {
      await expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (err) {
      // @ts-ignore
      setError('Could not delete the expense!');
    }
    setIsSubmitting(false);
  }

  async function saveHandler(expenseData) {
    setIsSubmitting(true);
    setError(null);
    try {
      if (isEditing) {
        await expensesCtx.updateExpense(editedExpenseId, expenseData);
      } else {
        await expensesCtx.addExpense(expenseData);
      }
      navigation.goBack();
    } catch (err) {
      // @ts-ignore
      setError('Could not save the expense!');
    }
    setIsSubmitting(false);
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={saveHandler}
        onCancel={() => navigation.goBack()}
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
    alignItems: 'center',
  },
});