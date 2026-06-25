import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/screens/constants/colors";

export default function ProfileScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.background },
  text: { fontSize: 18, fontWeight: "600", color: Colors.dark },
});
