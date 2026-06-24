import Button from "@/components/Button";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
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

type StorePhotosProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "StorePhotos">;
};

export default function StorePhotos({ navigation }: StorePhotosProps) {
  const insets = useSafeAreaInsets();

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  const isComplete = !!profilePhoto && !!coverPhoto;

  const pickPhoto = async (type: "profile" | "cover") => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow photo access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: type === "profile" ? [1, 1] : [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      if (type === "profile") setProfilePhoto(result.assets[0].uri);
      else setCoverPhoto(result.assets[0].uri);
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
            <Text style={styles.stepText}>Step 4 of 5</Text>
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
            <Text style={styles.title}>Add your store photos</Text>

            {/* Profile photo preview */}
            <TouchableOpacity
              style={styles.avatarWrap}
              onPress={() => pickPhoto("profile")}
              activeOpacity={0.8}
            >
              {profilePhoto ? (
                <Image source={{ uri: profilePhoto }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder} />
              )}
            </TouchableOpacity>

            {/* Rows */}
            <View style={styles.rows}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => pickPhoto("profile")}
                activeOpacity={0.7}
              >
                <View style={styles.rowIconWrap}>
                  {profilePhoto ? (
                    <Image
                      source={{ uri: profilePhoto }}
                      style={styles.rowThumb}
                    />
                  ) : (
                    <Ionicons name="add" size={22} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>
                    Add your profile photo/logo
                  </Text>
                  <Text style={styles.rowSubtext}>
                    Use a photo customers can trust.
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#989898" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.row}
                onPress={() => pickPhoto("cover")}
                activeOpacity={0.7}
              >
                <View style={styles.rowIconWrap}>
                  {coverPhoto ? (
                    <Image
                      source={{ uri: coverPhoto }}
                      style={styles.rowThumb}
                    />
                  ) : (
                    <Ionicons name="add" size={22} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Add a cover photo</Text>
                  <Text style={styles.rowSubtext}>
                    Show customers what your food business feels like.
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#989898" />
              </TouchableOpacity>
            </View>

            <Button
              title="Continue"
              onPress={() => {
                if (!isComplete) return;
                navigation.navigate("FoodSafetyAgreement");
              }}
              variant={isComplete ? "primary" : "secondary"}
              fullWidth
            />
          </ScrollView>
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
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
    alignSelf: "stretch",
  },
  avatarWrap: {
    marginVertical: 80,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
  },
  avatarPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#D9D9D9",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
  },
  rows: {
    width: "100%",
    marginBottom: 100,
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
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  rowThumb: {
    width: 56,
    height: 56,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  rowSubtext: {
    fontSize: 13,
    color: "#989898",
    lineHeight: 18,
  },
});
