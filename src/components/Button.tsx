import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text` as keyof typeof styles],
    styles[`${size}Text` as keyof typeof styles],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#fff" : "#000"}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    gap: 10,
  },

  // Variants
  primary: {
    backgroundColor: "#209D01",
  },
  secondary: {
    backgroundColor: "#EDEDED",
  },
  outline: {
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  text: {
    backgroundColor: "transparent",
  },

  // Sizes
  small: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  medium: {
    height: 52,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  // Full width
  fullWidth: {
    width: "100%",
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },

  // Text styles - Variants
  primaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
  },
  outlineText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  textText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#228B22",
  },

  // Text styles - Sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 14,
  },

  disabledText: {
    opacity: 0.6,
  },
});
