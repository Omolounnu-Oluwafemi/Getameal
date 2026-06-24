import ChefHatIcon from "@/assets/icons/solar_chef-hat-heart-linear.svg";
import ChefGlovesIcon from "@/assets/icons/streamline_chef-gear-gloves.svg";
import Button from "@/components/Button";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Colors } from "@/screens/constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CARD_WIDTH = 268;
const CARD_HEIGHT = 328;
const CARD_GAP = 12;

type CoverProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Cover">;
};

const cookCards = [
  {
    id: "1",
    image: require("@/assets/onboarding/Landing1.png"),
    earnings: "₦340,000",
    frequency: "4 times a week",
    orders: "16+",
    initials: [
      { letter: "L", color: Colors.avatarGreen },
      { letter: "G", color: Colors.avatarBlue },
      { letter: "Y", color: Colors.avatarOrange },
    ],
  },
  {
    id: "2",
    image: require("@/assets/onboarding/cover2.png"),
    earnings: "₦280,000",
    frequency: "3 times a week",
    orders: "20+",
    initials: [
      { letter: "K", color: Colors.avatarPink },
      { letter: "F", color: Colors.avatarPurple },
      { letter: "A", color: Colors.avatarDeepOrange },
    ],
  },
  {
    id: "3",
    image: require("@/assets/onboarding/cover3.png"),
    earnings: "₦290,000",
    frequency: "3 times a week",
    orders: "14+",
    initials: [
      { letter: "Q", color: Colors.avatarCyan },
      { letter: "C", color: Colors.avatarLightGreen },
      { letter: "R", color: Colors.avatarOrange },
    ],
  },
  {
    id: "4",
    image: require("@/assets/onboarding/cover4.png"),
    earnings: "₦645,000",
    frequency: "3 times a week",
    orders: "32+",
    initials: [
      { letter: "V", color: Colors.avatarRed },
      { letter: "E", color: Colors.avatarIndigo },
      { letter: "R", color: Colors.avatarTeal },
    ],
  },
  {
    id: "5",
    image: require("@/assets/onboarding/cover5.png"),
    earnings: "₦450,000",
    frequency: "3 times a week",
    orders: "12+",
    initials: [
      { letter: "C", color: Colors.avatarRed },
      { letter: "E", color: Colors.avatarIndigo },
      { letter: "Y", color: Colors.avatarTeal },
    ],
  },
];

export default function Cover({ navigation }: CoverProps) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const currentIndex = useRef(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isUserScrolling) return;
      const next = (currentIndex.current + 1) % cookCards.length;
      scrollRef.current?.scrollTo({
        x: next * (CARD_WIDTH + CARD_GAP),
        animated: true,
      });
      currentIndex.current = next;
    }, 2500);
    return () => clearInterval(interval);
  }, [isUserScrolling]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(32, insets.bottom + 16),
        }}
      >
        {/* Cook Cards — horizontal strip */}
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.cardsContainer,
            { paddingTop: insets.top + 16 },
          ]}
          snapToInterval={CARD_WIDTH + CARD_GAP}
          decelerationRate="fast"
          onScrollBeginDrag={() => setIsUserScrolling(true)}
          onMomentumScrollEnd={() => setIsUserScrolling(false)}
        >
          {cookCards.map((card) => (
            <View key={card.id} style={styles.card}>
              <Image
                source={card.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardOverlay}>
                {/* Graduated blur: each layer starts lower and stronger,
                    each edge is hidden by the gradient being more opaque at that depth */}
                <BlurView
                  intensity={0}
                  tint="dark"
                  style={[StyleSheet.absoluteFill, { top: 50 }]}
                />
                <BlurView
                  intensity={5}
                  tint="dark"
                  style={[StyleSheet.absoluteFill, { top: 100 }]}
                />
                <BlurView
                  intensity={10}
                  tint="dark"
                  style={[StyleSheet.absoluteFill, { top: 200 }]}
                />
                <LinearGradient
                  colors={[Colors.gradientOverlayStart, Colors.gradientOverlayEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.cardEarnings}>
                  Makes {card.earnings} per week
                </Text>
                <Text style={styles.cardFrequency}>
                  Cooks mostly {card.frequency}
                </Text>
                <View style={styles.cardFooter}>
                  <View style={styles.initialsRow}>
                    {card.initials.map((init, i) => (
                      <View
                        key={i}
                        style={[
                          styles.initialBadge,
                          {
                            backgroundColor: init.color,
                            marginLeft: i > 0 ? -8 : 0,
                            zIndex: card.initials.length - i,
                          },
                        ]}
                      >
                        <Text style={styles.initialText}>{init.letter}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.ordersText}>
                    {card.orders} orders served
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Body content */}
        <View style={styles.body}>
          <Text style={styles.heading}>Free to join. Always.</Text>
          <Text style={styles.subtext}>
            Sell your Cook Day or Bake Day with preorders — only cook when
            customers have paid.
          </Text>

          <View style={styles.featureRow}>
            <View style={styles.featureIconWrap}>
              <ChefHatIcon width={26} height={26} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Why sellers love Getameal</Text>
              <Text style={styles.featureDesc}>
                Create a food drop, share your link, and let customers preorder
                before you cook or bake.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIconWrap}>
              <ChefGlovesIcon width={26} height={26} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>How it works</Text>
              <Text style={styles.featureDesc}>
                Create a Cook Day or Bake Day → add your menu → share your link
                → get preorders → prepare only what was ordered.
              </Text>
            </View>
          </View>

          <Button
            title="Get Started"
            onPress={() => navigation.navigate("CreateStore")}
            variant="primary"
            fullWidth
            style={{
              marginTop: 30,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 10,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 20,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 8,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardEarnings: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "700",
  },
  cardFrequency: {
    color: Colors.background,
    fontSize: 12,
    marginTop: 2,
    opacity: 0.9,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  initialsRow: {
    flexDirection: "row",
  },
  initialBadge: {
    width: 18,
    height: 18,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.background,
  },
  initialText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: "700",
  },
  ordersText: {
    color: Colors.background,
    fontSize: 12,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.gray700,
    lineHeight: 21,
    marginBottom: 28,
  },
  featureRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  featureIconWrap: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 10,
  },
  featureDesc: {
    fontSize: 14,
    color: Colors.gray700,
    lineHeight: 18,
    width: "92%",
  },
});
