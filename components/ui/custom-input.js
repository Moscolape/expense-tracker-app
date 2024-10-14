import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    // @ts-ignore
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    // @ts-ignore
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 8,
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: GlobalColors.colors.primary100,
    marginBottom: 6,
  },
  input: {
    backgroundColor: GlobalColors.colors.primary100,
    color: GlobalColors.colors.primary700,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderColor: GlobalColors.colors.primary400,
    borderWidth: 1,
  },
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "white",
  },
  invalidInput: {
    backgroundColor: GlobalColors.colors.error50,
    borderColor: GlobalColors.colors.error500,
  },
});