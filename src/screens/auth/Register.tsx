import GoogleIcon from "@/assets/google.svg";
import StarIcon from "@/assets/icons/ic_round-star.svg";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Circle, Defs, FeGaussianBlur, Filter, Svg } from "react-native-svg";

const { width } = Dimensions.get("window");

const COLLAGE_SPAN = 337;
const collageLeft = (width - COLLAGE_SPAN) / 2;
const COLLAGE_H = 180;

const cookPhotos = [
  {
    source: require("@/assets/onboarding/Landing1.png"),
    w: 103,
    h: 103,
    rotate: "-8.16deg",
    top: 35,
    baseLeft: 0,
    zIndex: 2,
  },
  {
    source: require("@/assets/onboarding/Landing2.png"),
    w: 103,
    h: 117,
    rotate: "11.44deg",
    top: 15,
    baseLeft: 69,
    zIndex: 1,
  },
  {
    source: require("@/assets/onboarding/Landing3.png"),
    w: 103,
    h: 103,
    rotate: "-8.61deg",
    top: 32,
    baseLeft: 155,
    zIndex: 3,
  },
  {
    source: require("@/assets/onboarding/Landing4.png"),
    w: 103,
    h: 110,
    rotate: "12.87deg",
    top: 32,
    baseLeft: 234,
    zIndex: 4,
  },
];

type RegisterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

export default function Register({ navigation }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const insets = useSafeAreaInsets();

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !/\S+@\S+\.\S+/.test(text)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleContinue = () => {
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    navigation.navigate("ConfirmEmail", { email, isLogin: false });
  };

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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >
              <View style={styles.collageContainer}>
                <Svg
                  width={width}
                  height={COLLAGE_H + 100}
                  style={styles.glowSvg}
                  pointerEvents="none"
                >
                  <Defs>
                    <Filter
                      id="glow"
                      x="-300%"
                      y="-300%"
                      width="700%"
                      height="700%"
                    >
                      <FeGaussianBlur stdDeviation="45" />
                    </Filter>
                  </Defs>
                  {/* Red — left side */}
                  <Circle
                    cx={width * 0.25}
                    cy={130}
                    r={35}
                    fill={Colors.glowRed}
                    opacity={0.9}
                    filter="url(#glow)"
                  />
                  {/* Orange — center */}
                  <Circle
                    cx={width * 0.5}
                    cy={110}
                    r={35}
                    fill={Colors.glowOrange}
                    opacity={0.9}
                    filter="url(#glow)"
                  />
                  {/* Green — right side */}
                  <Circle
                    cx={width * 0.7}
                    cy={130}
                    r={35}
                    fill={Colors.glowGreen}
                    opacity={0.9}
                    filter="url(#glow)"
                  />
                </Svg>

                {cookPhotos.map((photo, index) => (
                  <View
                    key={index}
                    style={[
                      styles.photoShadow,
                      {
                        position: "absolute",
                        top: photo.top,
                        left: collageLeft + photo.baseLeft,
                        width: photo.w,
                        height: photo.h,
                        zIndex: photo.zIndex,
                        transform: [{ rotate: photo.rotate }],
                      },
                    ]}
                  >
                    <View style={styles.photoClip}>
                      <Image
                        source={photo.source}
                        style={styles.cookImage}
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                ))}
              </View>

              {/* White backing — fills all remaining space reliably */}
              <View
                style={[
                  styles.contentCard,
                  { paddingBottom: Math.max(40, insets.bottom + 24) },
                ]}
              >
                {/* Fade strip from transparent → white over the collage bottom */}
                <LinearGradient
                  colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
                  style={styles.fadeStrip}
                  locations={[0, 1]}
                  pointerEvents="none"
                />

                {/* Title & Stars */}
                <View style={styles.headerContent}>
                  <Text style={styles.title}>
                    Join Smart Home Cooks{"\n"}Selling With Getameal
                  </Text>
                  <View style={styles.starsRow}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} width={24} height={24} />
                    ))}
                  </View>
                  <Text style={styles.subtitle}>
                    Over 2000 cooks and counting
                  </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                  <TextInput
                    label="Email address"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={validateEmail}
                    error={emailError}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />

                  <Button
                    title="Continue"
                    onPress={handleContinue}
                    variant="primary"
                    fullWidth
                  />

                  {/* OR Divider */}
                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Social Buttons */}
                  <Button
                    title="Continue with Apple"
                    onPress={() => {}}
                    variant="outline"
                    fullWidth
                    icon={
                      <Ionicons
                        name="logo-apple"
                        size={20}
                        color={Colors.primary}
                      />
                    }
                    iconPosition="left"
                  />

                  <Button
                    title="Continue with Google"
                    onPress={() => {}}
                    variant="outline"
                    fullWidth
                    icon={<GoogleIcon width={20} height={20} />}
                    iconPosition="left"
                  />

                  {/* Privacy Policy */}
                  <Text style={styles.privacyText}>
                    By continuing, you agree to our{" "}
                    <Text style={styles.privacyLink}>Terms</Text> &{" "}
                    <Text style={styles.privacyLink}>Privacy Policy.</Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  collageContainer: {
    height: COLLAGE_H,
    width,
    marginTop: 60,
    marginBottom: 8,
  },
  glowSvg: {
    position: "absolute",
    top: -60,
    left: 0,
  },
  photoShadow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3.56 },
    shadowOpacity: 0.3,
    shadowRadius: 13.36,
    elevation: 8,
  },
  photoClip: {
    width: "100%",
    height: "100%",
    borderRadius: 17.81,
    overflow: "hidden",
    borderWidth: 0.89,
    borderColor: Colors.border,
  },
  cookImage: {
    width: "100%",
    height: "100%",
  },
  contentCard: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 40,
  },
  fadeStrip: {
    position: "absolute",
    top: -50,
    left: 0,
    right: 0,
    height: 60,
  },
  headerContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 32,
  },
  starsRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray700,
    textAlign: "center",
  },
  form: {
    paddingHorizontal: 24,
    gap: 12,
    marginTop: 10,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: Colors.primary,
    fontWeight: "600",
  },
  privacyText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.gray500,
    marginTop: 40,
    lineHeight: 18,
  },
  privacyLink: {
    textDecorationLine: "underline",
    color: Colors.gray550,
    fontWeight: "500",
  },
});
