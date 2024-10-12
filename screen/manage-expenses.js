import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpensesContext } from '../store/expenses-context';
import IconButton from '../components/ui/icon-button';
import { GlobalColors } from '../constants/colors';
import Button from '../components/ui/button';

function ManageExpense({ route, navigation }) {
  const { addExpense, updateExpense, deleteExpense, expenses } = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  // @ts-ignore
  // const selectedExpense = expenses.find((expense) => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function saveHandler() {
    if (isEditing) {
      updateExpense(editedExpenseId, { description: 'Updated description', amount: 100.00, date: new Date() });
    } else {
      addExpense({ description: 'New expense', amount: 50.00, date: new Date() });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} mode="" onPress={saveHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalColors.colors.primary200,
    alignItems: 'center',
  },
});
