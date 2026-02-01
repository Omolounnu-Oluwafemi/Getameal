import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from "@expo/vector-icons";

interface LocationSelectInputProps {
  location?: string;
  onPress: () => void;
  placeholder?: string;
}

const LocationSelectInput: React.FC<LocationSelectInputProps> = ({
  location,
  onPress,
  placeholder = "Select your location",
}) => {
  return (
    <TouchableOpacity
        style={[
            styles.container,
            location && styles.containerActive,
        ]}
        onPress={onPress}
        >
      {location ? (
        <>
          <View style={styles.iconContainer}>
           <Ionicons name="location-outline" size={18} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>You're here</Text>
            <Text style={styles.location}>{location}</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#989898" />
        </>
      ) : (
        <>
          <Text style={styles.placeholder}>{placeholder}</Text>
          <Entypo name="chevron-right" size={24} color="#989898" />
        </>
      )}
    </TouchableOpacity>
  );
};

export default LocationSelectInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 60,
    marginBottom: 16,
  },
  containerActive: {
    borderColor: "#C3C3C3",
    borderRadius: 16,
  },  
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  locationIcon: {
    fontSize: 18,
  },
  textContainer: {
      flex: 1,
  },
  label: {
    // fontFamily: Fonts.LufgaRegular,
    fontSize: 14,
    color: "#222222",
    marginBottom: 6,
  },
  location: {
    // fontFamily: Fonts.LufgaMedium,
    fontSize: 16,
    color: "#222222",
    fontWeight: "600",
  },
  placeholder: {
    // fontFamily: Fonts.LufgaRegular,
    fontSize: 16,
    color: "#222222",
    flex: 1,
  },
  chevron: {
    fontSize: 24,
    color: "#989898",
    marginLeft: 8,
  },
});