import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalColors } from "../constants/colors";

const ExpenseItem = ({ description, amount, date }) => {
  const getFormattedDate = () => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  return (
    <Pressable>
      <View style={styles.expense}>
        <View>
          <Text style={styles.desc}>{description}</Text>
          <Text style={styles.date}>{getFormattedDate()}</Text>
        </View>
        <View>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expense: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalColors.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    borderRadius: 6,
    elevation: 3,
    // iOS shadow
    shadowColor: GlobalColors.colors.gray500,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  desc: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    color: GlobalColors.colors.primary50,
  },
  date: { color: GlobalColors.colors.primary50 },
  amount: {
    color: GlobalColors.colors.primary500,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    fontWeight: "bold",
    backgroundColor: GlobalColors.colors.primary50
  },
});
