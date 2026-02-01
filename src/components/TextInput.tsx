import React from 'react';
import { StyleSheet, Text, TextInput as RNTextInput, View, TextInputProps } from 'react-native';
import { Colors } from '@/screens/constants/colors';

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
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={Colors.textPlaceholder}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.backgroundMuted,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputError: {
    borderColor: Colors.errorText,
  },
  errorText: {
    fontSize: 12,
    color: Colors.errorText,
    marginTop: 4,
  },
});