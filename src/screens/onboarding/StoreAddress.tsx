import GuestHouseIcon from "@/assets/onboarding/hugeicons_guest-house.svg";
import DeliveryIcon from "@/assets/onboarding/iconoir_delivery.svg";
import LocationIcon from "@/assets/onboarding/proicons_location.svg";
import Button from "@/components/Button";
import FieldModal from "@/components/FieldModal";
import FullAddressModal from "@/components/FullAddressModal";
import LocationSelectionModal from "@/components/Locationselectionmodal";
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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type StoreAddressProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "StoreAddress">;
};

export default function StoreAddress({ navigation }: StoreAddressProps) {
  const insets = useSafeAreaInsets();

  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [pickupLandmark, setPickupLandmark] = useState("");

  const [showCityModal, setShowCityModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showLandmarkModal, setShowLandmarkModal] = useState(false);
  const [tempLandmark, setTempLandmark] = useState("");

  const isComplete = !!city && !!fullAddress && !!pickupLandmark;
  const anyModalOpen = showCityModal || showAddressModal || showLandmarkModal;

  const handleCitySelect = (location: string, state: string) => {
    setCity(location === state ? state : `${location}, ${state}`);
    setShowCityModal(false);
  };

  return (
    <ImageBackground
      source={require("@/assets/BackgroundImage.png")}
      style={styles.root}
      resizeMode="cover"
    >
      <SafeAreaView edges={["top"]} style={styles.container}>
        <StatusBar
          barStyle={anyModalOpen ? "light-content" : "dark-content"}
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
            <Text style={styles.stepText}>Step 2 of 5</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        <LinearGradient
          colors={[Colors.whiteTransparent, Colors.background]}
          locations={[0, 0.7]}
          style={styles.gradientBg}
        >
          <ScrollView
            contentContainerStyle={[
              styles.scroll,
              { paddingBottom: Math.max(40, insets.bottom + 24) },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Where are you based?</Text>

            <View style={styles.illustrationWrap}>
              <Image
                source={require("@/assets/onboarding/Kitchen.png")}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            {/* Form rows */}
            <View style={styles.rows}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setShowCityModal(true)}
                activeOpacity={0.7}
              >
                <View style={styles.rowIconWrap}>
                  {city ? (
                    <LocationIcon width={22} height={22} />
                  ) : (
                    <Ionicons name="add" size={22} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>City</Text>
                  <Text style={city ? styles.rowValue : styles.rowPlaceholder}>
                    {city || "Example: Lagos"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textPlaceholder} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.row}
                onPress={() => setShowAddressModal(true)}
                activeOpacity={0.7}
              >
                <View style={styles.rowIconWrap}>
                  {fullAddress ? (
                    <GuestHouseIcon width={22} height={22} />
                  ) : (
                    <Ionicons name="add" size={22} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Full address</Text>
                  <Text
                    style={
                      fullAddress ? styles.rowValue : styles.rowPlaceholder
                    }
                  >
                    {fullAddress || "Example: 123 Admiralty way lekki"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textPlaceholder} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  setTempLandmark(pickupLandmark);
                  setShowLandmarkModal(true);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.rowIconWrap}>
                  {pickupLandmark ? (
                    <DeliveryIcon width={22} height={22} />
                  ) : (
                    <Ionicons name="add" size={22} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Pickup landmark</Text>
                  <Text
                    style={
                      pickupLandmark ? styles.rowValue : styles.rowPlaceholder
                    }
                  >
                    {pickupLandmark || "Example: Sabo, Yaba"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textPlaceholder} />
              </TouchableOpacity>
            </View>

            <Button
              title="Continue"
              onPress={() => {
                if (!isComplete) return;
                navigation.navigate("CookingExperience");
              }}
              variant={isComplete ? "primary" : "secondary"}
              fullWidth
            />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>

      <LocationSelectionModal
        visible={showCityModal}
        onClose={() => setShowCityModal(false)}
        onSelectLocation={handleCitySelect}
      />

      <FullAddressModal
        visible={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSelectAddress={(address) => {
          setFullAddress(address);
          setShowAddressModal(false);
        }}
      />

      <FieldModal
        visible={showLandmarkModal}
        title="Pickup landmark"
        label="Pickup landmark"
        placeholder="Example: Mega chicken ikate"
        placeholderStyle={{ fontWeight: "600", fontSize: 20, color: Colors.textVeryLight }}
        inputStyle={{ fontWeight: "600", fontSize: 20, color: Colors.textSecondary }}
        value={tempLandmark}
        onChangeText={setTempLandmark}
        onSave={() => {
          setPickupLandmark(tempLandmark.trim());
          setShowLandmarkModal(false);
        }}
        onClose={() => setShowLandmarkModal(false)}
      />
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
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 6,
    textAlign: "center",
  },
  illustrationWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 261,
    marginBottom: 32,
    marginTop: 50,
  },
  rows: {
    borderRadius: 16,
    marginBottom: 40,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 16,
  },
  rowIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 10,
    padding: 5,
    backgroundColor: Colors.backgroundMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 6,
  },
  rowValue: {
    fontSize: 14,
    color: Colors.textPlaceholder,
  },
  rowPlaceholder: {
    fontSize: 13,
    color: Colors.textPlaceholder,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
});
