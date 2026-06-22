import { Colors } from "@/screens/constants/colors";
import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from "react-native";

type CustomTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function TextInput({
  label,
  error,
  style,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={Colors.textPlaceholder}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.primary,
    marginBottom: 10,
  },
  input: {
    height: 52,
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 16,
    fontSize: 14,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  inputError: {
    borderColor: Colors.errorText,
  },
  errorText: {
    position: "absolute",
    bottom: -18,
    left: 2,
    fontSize: 12,
    color: Colors.errorText,
  },
});
