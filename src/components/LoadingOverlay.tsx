import { Colors } from "@/screens/constants/colors";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Modal, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const SIZE = 64;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC = CIRCUMFERENCE * 0.25;

type LoadingOverlayProps = {
  visible: boolean;
};

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotation.setValue(0);
    }
  }, [visible]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Svg width={SIZE} height={SIZE}>
            {/* Gray track */}
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={Colors.border}
              strokeWidth={STROKE}
              fill="none"
            />
            {/* Green arc */}
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={Colors.cookingTime}
              strokeWidth={STROKE}
              fill="none"
              strokeDasharray={`${ARC} ${CIRCUMFERENCE - ARC}`}
              strokeLinecap="round"
              transform={`rotate(-90, ${SIZE / 2}, ${SIZE / 2})`}
            />
          </Svg>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    justifyContent: "center",
    alignItems: "center",
  },
});
