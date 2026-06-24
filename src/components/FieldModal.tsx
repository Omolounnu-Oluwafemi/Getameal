import Button from "@/components/Button";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export type FieldModalProps = {
  visible: boolean;
  title: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
  onClose: () => void;
  placeholder?: string;
  placeholderStyle?: object;
  inputStyle?: object;
  keyboardType?: "default" | "phone-pad";
  prefix?: string;
  error?: string;
  inputFontSize?: number;
};

export default function FieldModal({
  visible,
  title,
  label,
  value,
  onChangeText,
  onSave,
  onClose,
  placeholder,
  placeholderStyle,
  inputStyle,
  keyboardType = "default",
  prefix,
  error,
  inputFontSize = 28,
}: FieldModalProps) {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onShow={() => inputRef.current?.focus()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.backdrop}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(24, insets.bottom + 16) },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerSpacer} />
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerDivider} />

          <View style={styles.inputWrap}>
            <Text style={styles.label}>{label}</Text>

            {prefix ? (
              <View style={styles.prefixRow}>
                <Text style={styles.prefixText}>{prefix}</Text>
                <View style={styles.prefixInputWrap}>
                  {!value && (
                    <Text style={styles.prefixPlaceholder} pointerEvents="none">
                      {placeholder}
                    </Text>
                  )}
                  <TextInput
                    ref={inputRef}
                    style={styles.prefixInput}
                    value={value}
                    onChangeText={onChangeText}
                    autoCapitalize="none"
                    selectionColor={Colors.primary}
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={onSave}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.plainInputWrap}>
                {!value && (
                  <Text style={[styles.plainPlaceholder, placeholderStyle]} pointerEvents="none">
                    {placeholder}
                  </Text>
                )}
                <TextInput
                  ref={inputRef}
                  style={[styles.input, { fontSize: inputFontSize }, inputStyle]}
                  value={value}
                  onChangeText={onChangeText}
                  keyboardType={keyboardType}
                  textAlign="center"
                  selectionColor={Colors.primary}
                  returnKeyType="done"
                  onSubmitEditing={onSave}
                />
              </View>
            )}
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <Button
            title="Save"
            onPress={onSave}
            variant={value ? "primary" : "secondary"}
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.modalBackdrop,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
    minHeight: height * 0.55,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: -24,
  },
  headerSpacer: {
    width: 36,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: "center",
  },
  inputWrap: {
    flex: 1,
    justifyContent: "center",
  },
  plainInputWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  plainPlaceholder: {
    position: "absolute",
    fontSize: 28,
    fontWeight: "400",
    color: Colors.textPlaceholder,
  },
  input: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    paddingVertical: 8,
    minHeight: 60,
  },
  prefixRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  prefixText: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.primary,
  },
  prefixInputWrap: {
    flex: 1,
    justifyContent: "center",
  },
  prefixPlaceholder: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "600",
    color: "#C3C3C3",
  },
  prefixInput: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.primary,
    flex: 1,
    padding: 0,
  },
  error: {
    fontSize: 13,
    color: Colors.error,
    textAlign: "center",
    marginTop: -8,
  },
});
