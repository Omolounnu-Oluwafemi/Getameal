import Button from "@/components/Button";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

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
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.stepPill}>
            <Text style={styles.stepText}>Step 1 of 5</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: Math.max(40, insets.bottom + 24) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Create your store.</Text>
          <Text style={styles.subtitle}>Takes less than 2 mins</Text>

          {/* Chef illustration — replace with image asset when available */}
          <View style={styles.illustrationWrap}>
            <Ionicons name="people-outline" size={100} color={Colors.border} />
          </View>

          {/* Form rows */}
          <View style={styles.rows}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => openModal("storeName")}
              activeOpacity={0.7}
            >
              <View style={styles.rowIconWrap}>
                <Ionicons
                  name={storeName ? "storefront-outline" : "add"}
                  size={22}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Store name</Text>
                <Text style={storeName ? styles.rowValue : styles.rowPlaceholder}>
                  {storeName || "Example: Amaka's Kitchen"}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.border} />
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() => openModal("storeHandle")}
              activeOpacity={0.7}
            >
              <View style={styles.rowIconWrap}>
                <Ionicons
                  name={storeHandle ? "link-outline" : "add"}
                  size={22}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Store handle</Text>
                <Text style={storeHandle ? styles.rowValue : styles.rowPlaceholder}>
                  {storeHandle ? `getameal.com/${storeHandle}` : "Example: getameal.com/amaka-kitchen"}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.border} />
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() => openModal("phoneNumber")}
              activeOpacity={0.7}
            >
              <View style={styles.rowIconWrap}>
                <Ionicons
                  name={phoneNumber ? "call-outline" : "add"}
                  size={22}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Phone number</Text>
                <Text style={phoneNumber ? styles.rowValue : styles.rowPlaceholder}>
                  {phoneNumber || "Example: 080123456789"}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.border} />
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
      </SafeAreaView>

      {/* ── Store Name Modal ── */}
      <Modal visible={activeModal === "storeName"} transparent animationType="slide" statusBarTranslucent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackdrop}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <View style={[styles.sheet, { paddingBottom: Math.max(24, insets.bottom + 16) }]}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Add your store name</Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.sheetLabel}>Enter store name</Text>
                <TextInput
                  style={styles.sheetInput}
                  value={tempValue}
                  onChangeText={setTempValue}
                  autoFocus
                  placeholder="e.g. Amaka's Kitchen"
                  placeholderTextColor={Colors.textPlaceholder}
                  textAlign="center"
                  returnKeyType="done"
                  onSubmitEditing={handleSave}
                />

                <Button
                  title="Save"
                  onPress={handleSave}
                  variant={tempValue ? "primary" : "secondary"}
                  fullWidth
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* ── Store Handle Modal ── */}
      <Modal visible={activeModal === "storeHandle"} transparent animationType="slide" statusBarTranslucent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackdrop}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <View style={[styles.sheet, { paddingBottom: Math.max(24, insets.bottom + 16) }]}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Add your store handle</Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.sheetLabel}>Enter store handle</Text>
                <View style={styles.handlePreviewRow}>
                  <Text style={styles.handlePreviewDomain}>Getameal.app/ </Text>
                  <TextInput
                    style={styles.handlePreviewInput}
                    value={tempValue}
                    onChangeText={(t) => {
                      setTempValue(t);
                      setHandleError("");
                    }}
                    autoFocus
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={handleSave}
                    placeholderTextColor={Colors.textPlaceholder}
                  />
                </View>
                {handleError ? (
                  <Text style={styles.handleError}>{handleError}</Text>
                ) : null}

                <Button
                  title="Save"
                  onPress={handleSave}
                  variant={tempValue ? "primary" : "secondary"}
                  fullWidth
                  style={{ marginTop: handleError ? 12 : 0 }}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* ── Phone Number Modal ── */}
      <Modal visible={activeModal === "phoneNumber"} transparent animationType="slide" statusBarTranslucent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackdrop}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <View style={[styles.sheet, { paddingBottom: Math.max(24, insets.bottom + 16) }]}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Add your phone number</Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.sheetLabel}>Enter phone number</Text>
                <TextInput
                  style={styles.sheetInput}
                  value={tempValue}
                  onChangeText={setTempValue}
                  autoFocus
                  keyboardType="phone-pad"
                  textAlign="center"
                  returnKeyType="done"
                  onSubmitEditing={handleSave}
                  placeholderTextColor={Colors.textPlaceholder}
                />

                <Button
                  title="Save"
                  onPress={handleSave}
                  variant={tempValue ? "primary" : "secondary"}
                  fullWidth
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    backgroundColor: Colors.backgroundMuted,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  stepText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray700,
    marginBottom: 24,
  },
  illustrationWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 180,
    marginBottom: 32,
  },
  rows: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  rowDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  rowIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.backgroundMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 13,
    color: Colors.gray700,
  },
  rowPlaceholder: {
    fontSize: 13,
    color: Colors.textPlaceholder,
  },
  // Modal / bottom sheet
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  sheetLabel: {
    fontSize: 13,
    color: Colors.gray700,
    textAlign: "center",
  },
  sheetInput: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    paddingVertical: 8,
    minHeight: 60,
  },
  handlePreviewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  handlePreviewDomain: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },
  handlePreviewInput: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    flex: 1,
    paddingVertical: 8,
  },
  handleError: {
    fontSize: 13,
    color: Colors.error,
    textAlign: "center",
    marginTop: -8,
  },
});
