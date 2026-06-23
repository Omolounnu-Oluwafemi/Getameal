import ChefsIllustration from "@/assets/onboarding/2Chefs.svg";
import StoreIcon from "@/assets/onboarding/clarity_store-line.svg";
import LinkIcon from "@/assets/onboarding/si_link-duotone.svg";
import PhoneIcon from "@/assets/onboarding/solar_phone-linear.svg";
import Button from "@/components/Button";
import FieldModal from "@/components/FieldModal";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
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

type CreateStoreProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "CreateStore">;
};

type ActiveModal = "storeName" | "storeHandle" | "phoneNumber" | null;

export default function CreateStore({ navigation }: CreateStoreProps) {
  const insets = useSafeAreaInsets();

  const [storeName, setStoreName] = useState("");
  const [storeHandle, setStoreHandle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [tempValue, setTempValue] = useState("");
  const [handleError, setHandleError] = useState("");

  const isComplete = !!storeName && !!storeHandle && !!phoneNumber;

  const openModal = (field: ActiveModal) => {
    setHandleError("");
    if (field === "storeName") setTempValue(storeName);
    else if (field === "storeHandle") setTempValue(storeHandle);
    else if (field === "phoneNumber") setTempValue(phoneNumber);
    setActiveModal(field);
  };

  const closeModal = () => {
    setActiveModal(null);
    setHandleError("");
  };

  const handleSave = () => {
    if (activeModal === "storeName") {
      setStoreName(tempValue.trim());
      closeModal();
    } else if (activeModal === "storeHandle") {
      // Availability check (replace with real API call)
      if (tempValue.toLowerCase() === "kings") {
        setHandleError("Store link is taken");
        return;
      }
      setStoreHandle(tempValue.trim());
      closeModal();
    } else if (activeModal === "phoneNumber") {
      setPhoneNumber(tempValue.trim());
      closeModal();
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/BackgroundImage.png")}
      style={styles.root}
      resizeMode="cover"
    >
      <SafeAreaView edges={["top"]} style={styles.container}>
        <StatusBar
          barStyle={activeModal ? "light-content" : "dark-content"}
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
            <Text style={styles.stepText}>Step 1 of 5</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "#ffffff"]}
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
            <Text style={styles.title}>Create your store.</Text>
            <Text style={styles.subtitle}>Takes less than 2 mins</Text>

            <View style={styles.illustrationWrap}>
              <ChefsIllustration width="100%" height="100%" />
            </View>

            {/* Form rows */}
            <View style={styles.rows}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => openModal("storeName")}
                activeOpacity={0.7}
              >
                <View style={styles.rowIconWrap}>
                  {storeName ? (
                    <StoreIcon width={22} height={22} />
                  ) : (
                    <Ionicons name="add" size={22} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Store name</Text>
                  <Text
                    style={storeName ? styles.rowValue : styles.rowPlaceholder}
                  >
                    {storeName || "Example: Amaka's Kitchen"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#989898" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.row}
                onPress={() => openModal("storeHandle")}
                activeOpacity={0.7}
              >
                <View style={styles.rowIconWrap}>
                  {storeHandle ? (
                    <LinkIcon width={22} height={22} />
                  ) : (
                    <Ionicons name="add" size={22} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Store handle</Text>
                  <Text
                    style={
                      storeHandle ? styles.rowValue : styles.rowPlaceholder
                    }
                  >
                    {storeHandle
                      ? `getameal.com/${storeHandle}`
                      : "Example: getameal.com/amaka-kitchen"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#989898" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.row}
                onPress={() => openModal("phoneNumber")}
                activeOpacity={0.7}
              >
                <View style={styles.rowIconWrap}>
                  {phoneNumber ? (
                    <PhoneIcon width={22} height={22} />
                  ) : (
                    <Ionicons name="add" size={22} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Phone number</Text>
                  <Text
                    style={
                      phoneNumber ? styles.rowValue : styles.rowPlaceholder
                    }
                  >
                    {phoneNumber || "Example: 080123456789"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#989898" />
              </TouchableOpacity>
            </View>

            <Button
              title="Continue"
              onPress={() => {
                if (!isComplete) return;
                // navigation.navigate('Step2') when built
              }}
              variant={isComplete ? "primary" : "secondary"}
              fullWidth
            />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>

      <FieldModal
        visible={activeModal === "storeName"}
        title="Add your store name"
        label="Enter store name"
        placeholder="Enter your store name"
        value={tempValue}
        onChangeText={setTempValue}
        onSave={handleSave}
        onClose={closeModal}
      />

      <FieldModal
        visible={activeModal === "storeHandle"}
        title="Add your store handle"
        label="Enter store handle"
        prefix="Getameal.app/ "
        placeholder="Store handle"
        value={tempValue}
        onChangeText={(t) => {
          setTempValue(t);
          setHandleError("");
        }}
        onSave={handleSave}
        onClose={closeModal}
        error={handleError}
      />

      <FieldModal
        visible={activeModal === "phoneNumber"}
        title="Add your phone number"
        label="Enter phone number"
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        inputFontSize={36}
        value={tempValue}
        onChangeText={setTempValue}
        onSave={handleSave}
        onClose={closeModal}
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
  subtitle: {
    fontSize: 14,
    color: "#797979",
    textAlign: "center",
  },
  illustrationWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 261,
    marginBottom: 32,
    marginTop: 50,
  },
  illustration: {
    width: "100%",
    height: "100%",
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
    backgroundColor: "#F7F7F7",
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
    color: "#989898",
  },
  rowPlaceholder: {
    fontSize: 13,
    color: Colors.textPlaceholder,
  },
});
