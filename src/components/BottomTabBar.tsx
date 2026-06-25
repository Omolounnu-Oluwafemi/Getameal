import HomeIcon from "@/assets/icons/home.svg";
import OrderIcon from "@/assets/icons/order.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import { Colors } from "@/screens/constants/colors";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Maps tab index → icon component
const TAB_ICONS = [
  (active: boolean) => <HomeIcon width={24} height={24} color={active ? Colors.activeGreen : Colors.gray400} />,
  (active: boolean) => <OrderIcon width={24} height={24} color={active ? Colors.activeGreen : Colors.gray400} />,
  (active: boolean) => (
    <Ionicons name="people-outline" size={24} color={active ? Colors.activeGreen : Colors.gray400} />
  ),
  (active: boolean) => <ProfileIcon width={24} height={24} color={active ? Colors.activeGreen : Colors.gray400} />,
];

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const renderTab = (routeIndex: number, label: string, insertFabBefore?: boolean) => {
    const isFocused = state.index === routeIndex;
    const route = state.routes[routeIndex];

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <React.Fragment key={route.key}>
        {insertFabBefore && (
          <View style={styles.tab}>
            <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
              <Ionicons name="add" size={30} color={Colors.background} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.7}>
          {TAB_ICONS[routeIndex]?.(isFocused)}
          <Text style={[styles.label, isFocused && styles.labelActive]}>{label}</Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      {renderTab(0, "Home")}
      {renderTab(1, "Order")}
      {/* FAB is inserted before Customers */}
      {renderTab(2, "Customers", true)}
      {renderTab(3, "Profile")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundBorder,
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  label: {
    fontSize: 11,
    color: Colors.gray400,
    fontWeight: "400",
  },
  labelActive: {
    color: Colors.activeGreen,
    fontWeight: "600",
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.activeGreen,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -16,
    shadowColor: Colors.activeGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
});
