import { Feather, Ionicons } from "@expo/vector-icons";
import * as nigerianStates from "nigerian-states-and-lgas";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LocationSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (location: string, state: string) => void;
}

const LocationSelectionModal: React.FC<LocationSelectionModalProps> = ({
  visible,
  onClose,
  onSelectLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [stateAreas, setStateAreas] = useState<string[]>([]);

  // Popular locations
  const popularLocations = [
    "Lagos",
    "Federal Capital Territory",
    "Rivers",
    "Enugu",
  ];

  // Get all states from the package
  const allStates = nigerianStates.states();

  // Filter locations based on search
  const getFilteredLocations = () => {
    if (!searchQuery) return allStates;

    return allStates.filter((state) =>
      state.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const handleLocationSelect = (location: string) => {
    setSelectedState(location);

    // Get LGAs for the selected state
    const lgas = nigerianStates.lgas(location);
    setStateAreas(lgas || []);
  };

  const handleAreaSelect = (area: string) => {
    if (selectedState) {
      onSelectLocation(area, selectedState);
      // Reset state
      setSelectedState(null);
      setStateAreas([]);
      setSearchQuery("");
      onClose();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleBack = () => {
    if (selectedState) {
      setSelectedState(null);
      setStateAreas([]);
    } else {
      onClose();
    }
  };

  const filteredLocations = getFilteredLocations();
  const showSearchResults = searchQuery.length > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.modalOverlay}>
        <View style={styles.offshoot}></View>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              {selectedState ? (
                <Text style={styles.backIcon}>‹</Text>
              ) : (
                <Ionicons name="chevron-down" size={24} color="black" />
              )}
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {selectedState || "What's your location"}
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            {/* Search Input */}
            <View
              style={[
                styles.searchContainer,
                isSearchFocused && styles.searchContainerFocused,
              ]}
            >
              <Ionicons
                name="search"
                size={15.972999572753906}
                color="#989898"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search locations"
                placeholderTextColor="#989898"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="words"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={styles.clearIcon}
                >
                  <Feather name="x" size={15} color="black" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.spacer24} />

            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {selectedState ? (
                // Show selected state's LGAs
                <>
                  <Text style={styles.sectionTitle}>{selectedState}</Text>
                  <View style={styles.spacer12} />
                  <View style={styles.sectionContainer}>
                    {stateAreas.map((area, index) => (
                      <TouchableOpacity
                        key={area}
                        style={[
                          styles.locationItem,
                          index === stateAreas.length - 1 &&
                            styles.locationItemLast,
                        ]}
                        onPress={() => handleAreaSelect(area)}
                      >
                        <Text style={styles.locationText}>{area}</Text>
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color="#989898"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              ) : showSearchResults ? (
                // Show search results
                <>
                  <Text style={styles.sectionTitle}>Search result</Text>
                  <View style={styles.spacer12} />
                  {filteredLocations.length > 0 ? (
                    <View style={styles.sectionContainer}>
                      {filteredLocations.map((location, index) => (
                        <TouchableOpacity
                          key={location}
                          style={[
                            styles.locationItem,
                            index === filteredLocations.length - 1 &&
                              styles.locationItemLast,
                          ]}
                          onPress={() => handleLocationSelect(location)}
                        >
                          <Text style={styles.locationText}>{location}</Text>
                          <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#989898"
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.noResults}>No locations found</Text>
                  )}
                </>
              ) : (
                // Show popular and all locations
                <>
                  <Text style={styles.sectionTitle}>Popular location</Text>
                  <View style={styles.spacer20} />
                  <View style={styles.sectionContainer}>
                    {popularLocations.map((location, index) => (
                      <TouchableOpacity
                        key={location}
                        style={[
                          styles.locationItem,
                          index === popularLocations.length - 1 &&
                            styles.locationItemLast,
                        ]}
                        onPress={() => handleLocationSelect(location)}
                      >
                        <Text style={styles.locationText}>{location}</Text>
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color="#989898"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.spacer20} />

                  <Text style={styles.sectionTitle}>All locations</Text>
                  <View style={styles.spacer20} />
                  <View style={styles.sectionContainer}>
                    {allStates.map((state, index) => (
                      <TouchableOpacity
                        key={state}
                        style={[
                          styles.locationItem,
                          index === allStates.length - 1 &&
                            styles.locationItemLast,
                        ]}
                        onPress={() => handleLocationSelect(state)}
                      >
                        <Text style={styles.locationText}>{state}</Text>
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color="#989898"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationSelectionModal;

const styles = StyleSheet.create({
  offshoot: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    width: "92%",
    alignSelf: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: -5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.91)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "91%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backIcon: {
    fontSize: 24,
    color: "#000000",
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000000",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    height: 60,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 5,
    gap: 10,
    borderWidth: 1,
    borderColor: "#EDEDED",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 25,
    elevation: 3,
  },
  searchContainerFocused: {
    borderColor: "#209D01",
  },
  searchIcon: {},
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    padding: 0,
  },
  clearIcon: {
    fontSize: 16,
    backgroundColor: "#E1E1E1",
    padding: 4,
    borderRadius: 12,
  },
  spacer12: {
    height: 12,
  },
  spacer24: {
    height: 24,
  },
  spacer20: {
    height: 20,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000000",
    paddingLeft: 15,
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 25,
    elevation: 2,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  locationItemLast: {
    borderBottomWidth: 0,
  },
  locationText: {
    fontSize: 16,
    color: "#000000",
    flex: 1,
  },
  chevron: {
    fontSize: 20,
    color: "#999",
  },
  noResults: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    paddingVertical: 32,
  },
});
