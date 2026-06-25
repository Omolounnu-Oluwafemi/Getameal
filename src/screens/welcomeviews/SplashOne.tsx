import GetaMeal from "@/assets/GetaMealWhitebg.svg";
import { Colors } from "@/screens/constants/colors";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VideoView, useVideoPlayer } from "expo-video";
import React from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type SplashOneScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "SplashOne">;
};

export default function SplashOne({ navigation }: SplashOneScreenProps) {
  // const videoSource = require('@/assets/MealVideo.mp4');
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={Colors.transparent}
      />

      <View style={styles.videoContainer}>
        <VideoView
          style={styles.backgroundVideo}
          player={player}
          contentFit="cover"
          fullscreenOptions={{
            orientation: "landscape",
            enable: false,
          }}
          allowsPictureInPicture={false}
        />

        <SafeAreaView edges={["top"]} style={styles.imageContent}>
          <View style={styles.logoContainer}>
            <GetaMeal width={120} height={40} />
          </View>

          <View style={styles.spacer} />
        </SafeAreaView>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.title}>Fresh meals. Cooked in bulk.</Text>
        <Text style={styles.subtitle}>
          Find a cook to prepare fresh meals in bulk, so your meals for the week
          are sorted.
        </Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("SplashTwo")}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: width,
    height: height * 0.65,
    position: "relative",
    backgroundColor: Colors.textPrimary,
  },
  posterImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  imageContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  spacer: {
    flex: 1,
  },
  logoWrapper: {
    width: 80,
    height: 80,
    overflow: "hidden",
    opacity: 1,
    marginBottom: 20,
  },
  contentCard: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 35,
  },
  registerButton: {
    backgroundColor: Colors.brandGreen,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: Colors.backgroundMuted,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.background,
  },
  loginText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
