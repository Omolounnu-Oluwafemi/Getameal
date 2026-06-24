import LocationIcon from "@/assets/onboarding/location-icon.svg";
import { Colors } from "@/screens/constants/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FullAddressModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
}

export default function FullAddressModal({
  visible,
  onClose,
  onSelectAddress,
}: FullAddressModalProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [locating, setLocating] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const handleConfirm = () => {
    if (!query.trim()) return;
    onSelectAddress(query.trim());
    setQuery("");
  };

  const handleUseCurrentLocation = async () => {
    try {
      setLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location permissions to use this feature.",
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [address] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      if (address) {
        const parts = [
          address.streetNumber,
          address.street,
          address.district,
          address.city,
          address.region,
        ].filter(Boolean);
        const fullAddress = parts.join(", ");
        onSelectAddress(fullAddress);
        setQuery("");
      } else {
        Alert.alert(
          "Error",
          "Could not determine your address. Please type it manually.",
        );
      }
    } catch {
      Alert.alert("Error", "Unable to get your location. Please try again.");
    } finally {
      setLocating(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
      onShow={() => inputRef.current?.focus()}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.overlay}>
        <View style={styles.offshoot} />
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Ionicons name="chevron-down" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Enter full address</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.content}>
            {/* Search input */}
            <View
              style={[styles.searchBox, isFocused && styles.searchBoxFocused]}
            >
              <Ionicons
                name="search"
                size={20}
                color="#989898"
                style={styles.searchIcon}
              />
              <TextInput
                ref={inputRef}
                style={styles.searchInput}
                placeholder="Search address"
                placeholderTextColor="#989898"
                value={query}
                onChangeText={setQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                returnKeyType="done"
                onSubmitEditing={handleConfirm}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {query.length > 0 && (
                <TouchableOpacity
                  onPress={() => setQuery("")}
                  style={styles.clearBtn}
                >
                  <Feather name="x" size={14} color="black" />
                </TouchableOpacity>
              )}
            </View>

            {/* Use current location */}
            <TouchableOpacity
              style={styles.locationRow}
              onPress={handleUseCurrentLocation}
              activeOpacity={0.7}
              disabled={locating}
            >
              {locating ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.primary}
                  style={styles.locationIcon}
                />
              ) : (
                <LocationIcon
                  width={15.665970802307129}
                  height={15.665970802307129}
                />
              )}
              <Text style={styles.locationText}>Use my current location</Text>
            </TouchableOpacity>

            {/* Results / confirm area */}
            {query.trim().length > 0 && (
              <ScrollView
                style={styles.results}
                keyboardShouldPersistTaps="handled"
              >
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={handleConfirm}
                >
                  <Ionicons name="location-outline" size={18} color="#989898" />
                  <Text style={styles.resultText} numberOfLines={2}>
                    {query.trim()}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#989898" />
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.91)",
  },
  offshoot: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    width: "92%",
    alignSelf: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: -5,
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "91%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: "#E1E1E1",
  },
  closeBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000000",
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#E1E1E1",
  },
  searchBoxFocused: {
    borderColor: "#209D01",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    padding: 0,
  },
  clearBtn: {
    backgroundColor: "#E1E1E1",
    padding: 4,
    borderRadius: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 12,
  },
  locationIcon: {
    width: 20,
  },
  locationText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.primary,
  },
  results: {
    flex: 1,
    marginTop: 8,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#E1E1E1",
  },
  resultText: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },
});
