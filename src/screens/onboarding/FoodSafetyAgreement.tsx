import SafetyCertIcon from "@/assets/onboarding/mingcute_safety-certificate-fill.svg";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  PanResponder,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle, Defs, FeGaussianBlur, Filter, Svg } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const SLIDER_PADDING = 16;
const KNOB_SIZE = 80;
const TRACK_WIDTH = width - SLIDER_PADDING * 2;
const KNOB_INSET = 4;
const MAX_SLIDE = TRACK_WIDTH - KNOB_SIZE - KNOB_INSET * 2;

const COLLAGE_SPAN = 337;
const collageLeft = (width - COLLAGE_SPAN) / 2;
const COLLAGE_H = 180;

type FoodSafetyAgreementProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "FoodSafetyAgreement"
  >;
};

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
    source: require("@/assets/onboarding/collage3.png"),
    w: 103,
    h: 103,
    rotate: "-8.61deg",
    top: 32,
    baseLeft: 155,
    zIndex: 3,
  },
  {
    source: require("@/assets/onboarding/collage4.png"),
    w: 103,
    h: 110,
    rotate: "12.87deg",
    top: 32,
    baseLeft: 234,
    zIndex: 4,
  },
];

export default function FoodSafetyAgreement({
  navigation,
}: FoodSafetyAgreementProps) {
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gs) => {
        const x = Math.max(0, Math.min(gs.dx, MAX_SLIDE));
        pan.setValue(x);
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dx >= MAX_SLIDE * 0.85) {
          Animated.spring(pan, {
            toValue: MAX_SLIDE,
            useNativeDriver: false,
          }).start(() => navigation.navigate("Home"));
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

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
            <Text style={styles.stepText}>Step 5 of 5</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Before you start selling</Text>

        {/* Collage */}
        <View style={styles.collageWrap}>
          <Svg
            width={width}
            height={COLLAGE_H + 120}
            style={{ position: "absolute", top: -60, left: 0 }}
            pointerEvents="none"
          >
            <Defs>
              <Filter id="glow2" x="-500%" y="-300%" width="700%" height="700%">
                <FeGaussianBlur stdDeviation="35 55" />
              </Filter>
            </Defs>
            <Circle
              cx={width * 0.25}
              cy={COLLAGE_H / 2 + 60}
              r={50}
              fill={Colors.glowRed}
              opacity={0.9}
              filter="url(#glow2)"
            />
            <Circle
              cx={width * 0.5}
              cy={COLLAGE_H / 2 + 60}
              r={50}
              fill={Colors.glowOrange}
              opacity={0.9}
              filter="url(#glow2)"
            />
            <Circle
              cx={width * 0.7}
              cy={COLLAGE_H / 2 + 60}
              r={50}
              fill={Colors.glowGreen}
              opacity={0.9}
              filter="url(#glow2)"
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

        {/* Gradient — card + slider only */}
        <LinearGradient
          colors={[Colors.whiteTransparent, Colors.background]}
          locations={[0, 0.3]}
          style={styles.gradientBg}
        >
          {/* Agreement card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.shieldWrap}>
                <SafetyCertIcon width={24} height={24} />
              </View>
              <Text style={styles.cardTitle}>Food Safety Agreement</Text>
            </View>

            <Text style={styles.cardBody}>
              Customers trust Getameal sellers to cook or bake in a clean space,
              use fresh ingredients, package orders properly, and follow our
              food safety rules.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.slideHint}>
              Slide to agree to this Agreement.
            </Text>
          </View>

          {/* Slide to accept */}
          <View style={styles.sliderArea}>
            <View style={styles.sliderTrack}>
              <Text style={styles.sliderLabel}>Slide to accept</Text>
              <Animated.View
                style={[
                  styles.sliderKnob,
                  { transform: [{ translateX: pan }] },
                ]}
                {...panResponder.panHandlers}
              >
                <Ionicons name="chevron-forward" size={22} color={Colors.background} />
                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color={Colors.background}
                  style={{ marginLeft: -10 }}
                />
              </Animated.View>
            </View>
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
    borderColor: Colors.backgroundBorder,
    backgroundColor: Colors.backgroundMuted,
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
    paddingHorizontal: 18,
    paddingTop: 32,
    paddingBottom: 40,
    justifyContent: "space-between",
    marginTop: -(COLLAGE_H / 2 + 32),
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  collageWrap: {
    height: COLLAGE_H,
    width,
    marginTop: 150,
    zIndex: 0,
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
  card: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    height: 279,
    paddingTop: 34,
    paddingRight: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    gap: 30,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  shieldWrap: {
    width: 42,
    height: 42,
    borderRadius: 60,
    backgroundColor: Colors.successBg,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    flex: 1,
  },
  cardBody: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    paddingHorizontal: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.backgroundBorder,
  },
  slideHint: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: "center",
  },
  sliderArea: {
    marginBottom: 40,
    gap: 16,
  },
  sliderTrack: {
    height: 65,
    backgroundColor: Colors.backgroundBorder,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    gap: 10,
  },
  sliderLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.textPlaceholder,
  },
  sliderKnob: {
    position: "absolute",
    left: KNOB_INSET,
    width: KNOB_SIZE,
    height: 57,
    borderRadius: 60,
    backgroundColor: Colors.cookingTime,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 6,
  },
  continueBtn: {
    height: 52,
    borderRadius: 60,
    backgroundColor: Colors.cookingTime,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.background,
  },
});
