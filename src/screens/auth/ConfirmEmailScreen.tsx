import SendIcon from "@/assets/send.svg";
import Button from "@/components/Button";
import LoadingOverlay from "@/components/LoadingOverlay";
import OTPInput from "@/components/OTPInput";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type ConfirmEmailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ConfirmEmail">;
  route?: {
    params?: {
      email?: string;
      isLogin?: Boolean;
    };
  };
};

export default function ConfirmEmailScreen({
  navigation,
  route,
}: ConfirmEmailScreenProps) {
  const email = route?.params?.email || "kingsley@yahoo.com";
  const islogin = route?.params?.isLogin;
  const [otpError, setOtpError] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const insets = useSafeAreaInsets();

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOTPComplete = (otp: string) => {
    setIsVerifying(true);
    setOtpError("");

    // Simulate API call
    setTimeout(() => {
      if (otp === "123456") {
        // Success - navigate after a short delay
        setTimeout(() => {
          setIsVerifying(false);
          islogin
            ? navigation.navigate("Home")
            : navigation.navigate("Cover");
        }, 500);
      } else {
        // Error
        setIsVerifying(false);
        setOtpError("This code is incorrect..");
      }
    }, 2000);
  };

  const handleResendCode = () => {
    if (!canResend) return;

    setCountdown(30);
    setCanResend(false);
    setOtpError("");

    console.log("Resending code to:", email);
  };

  const handleChangeEmail = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("@/assets/BackgroundImage.png")}
      style={styles.backgroundImage}
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
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Your Email</Text>
          <View style={styles.backButton} />
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            automaticallyAdjustKeyboardInsets={true}
          >
            {/* Gradient at top of white content */}
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0)",
                "rgba(255, 255, 255, 0)",
                "rgba(255, 255, 255, 1)",
              ]}
              style={[styles.gradient, { paddingBottom: Math.max(40, insets.bottom + 24) }]}
              locations={[0, 0.15, 0.3]}
            >
              <View style={styles.content}>
                <Text style={styles.title}>Check your email</Text>

                <Text style={styles.description}>
                  We've sent a 6-digit code to{" "}
                  <Text style={styles.email}>{email}</Text>
                  {"\n"}Enter it below to verify your account.{" "}
                  <Text style={styles.changeEmail} onPress={handleChangeEmail}>
                    Change email
                  </Text>
                </Text>

                {/* OTP Input */}
                <OTPInput
                  length={6}
                  onComplete={handleOTPComplete}
                  error={otpError}
                />

                {/* Resend Section */}
                <View style={styles.resendSection}>
                  {!canResend && (
                    <Text style={styles.resendTimer}>
                      Didn't get the code? Resend code in{" "}
                      <Text style={styles.countdown}>{countdown} seconds</Text>
                    </Text>
                  )}

                  {canResend && (
                    <View style={styles.resendContainer}>
                      <Text style={styles.requestNewCode}>
                        {otpError
                          ? "Request a new code"
                          : "Didn't get the code?"}
                      </Text>
                      <Button
                        title="Resend Code"
                        onPress={handleResendCode}
                        variant="primary"
                        icon={<SendIcon width={15.18} height={15.18} />}
                        iconPosition="left"
                        size="medium"
                        style={{
                          width: 161,
                          height: 48,
                          borderRadius: 12,
                          paddingHorizontal: 18,
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>

              {/* Done Button */}
              {/* <View style={styles.footer}>
                  <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View> */}
            </LinearGradient>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>

      {/* Loading Overlay */}
      <LoadingOverlay visible={isVerifying} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
    marginTop: -80,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  email: {
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  changeEmail: {
    fontWeight: "700",
    color: Colors.textSecondary,
    textDecorationLine: "underline",
  },
  resendSection: {
    marginTop: 50,
    alignItems: "center",
  },
  resendTimer: {
    fontSize: 14,
    color: Colors.gray800,
    textAlign: "center",
  },
  countdown: {
    fontWeight: "600",
    color: Colors.primary,
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  requestNewCode: {
    fontSize: 14,
    color: Colors.primary,
  },
  footer: {
    padding: 16,
    alignItems: "flex-end",
  },
  doneButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  doneButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.secondary,
  },
});
