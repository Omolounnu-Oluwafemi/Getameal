import Button from "@/components/Button";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type CookingExperienceProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "CookingExperience"
  >;
};

const MIN_YEARS = 0;
const MAX_YEARS = 50;

export default function CookingExperience({
  navigation,
}: CookingExperienceProps) {
  const [years, setYears] = useState(1);

  return (
    <ImageBackground
      source={require("@/assets/BackgroundImage.png")}
      style={styles.root}
      resizeMode="cover"
    >
      <SafeAreaView edges={["top"]} style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.stepPill}>
            <Text style={styles.stepText}>Step 3 of 5</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "#ffffff"]}
          locations={[0, 0.7]}
          style={styles.gradientBg}
        >
          <Text style={styles.title}>
            How long have you been{"\n"}cooking or baking?
          </Text>

          <View style={styles.content}>
            {/* Counter */}
            <View style={styles.counterWrap}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setYears((y) => Math.max(MIN_YEARS, y - 1))}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="remove"
                  size={20.33333396911621}
                  color={Colors.primary}
                />
              </TouchableOpacity>

              <Text style={styles.counterValue}>{years}</Text>

              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setYears((y) => Math.min(MAX_YEARS, y + 1))}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="add"
                  size={20.33333396911621}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.yearsLabel}>YEARS</Text>
          </View>

          <View style={styles.footer}>
            <Button
              title="Continue"
              onPress={() => navigation.navigate("StorePhotos")}
              variant="primary"
              fullWidth
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.14,
                shadowRadius: 20,
                elevation: 6,
              }}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    width,
    height,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  stepPill: {
    width: 110,
    height: 38,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  gradientBg: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
    lineHeight: 30,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  counterWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },
  counterBtn: {
    width: 50.83333206176758,
    height: 50.83333206176758,
    borderRadius: 24,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
  },
  counterValue: {
    fontSize: 96,
    fontWeight: "600",
    color: Colors.primary,
    minWidth: 120,
    textAlign: "center",
  },
  yearsLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    letterSpacing: 2,
    marginTop: 5,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
});
