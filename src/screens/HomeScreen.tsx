import CartIcon from "@/assets/icons/basket.svg";
import BottomTabBar from "@/components/BottomTabBar";
import Header from "@/components/Header";
import CategoryCard from "@/components/Home/Categorycardpill";
import KitchenCard from "@/components/KitchenCard";
import MealCard from "@/components/MealCard";
import SectionHeader from "@/components/SectionHeader";
import { kitchensData, readyNowMeals } from "@/utils/types";
import { BlurView } from "expo-blur";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "./constants/colors";

const categories = [
  { id: "1", title: "Soups", icon: require("@/assets/categories/soups.png") },
  {
    id: "2",
    title: "Rice & Pasta",
    icon: require("@/assets/categories/proteins.png"),
  },
  {
    id: "3",
    title: "Stew & Sauce",
    icon: require("@/assets/categories/rice.png"),
  },
];

export default function HomeScreen() {
  const cartCount = 4;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header
        userName="Kingsley"
        location="Chevron, Lagos"
        cartCount={4}
        userImage={require("@/assets/home/user-avatar.png")}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              onPress={() => {}}
            />
          ))}
        </ScrollView>

        {/* Ready Now Section */}
        <SectionHeader title="Recently Viewed" onSeeAllPress={() => {}} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mealsContainer}
        >
          {readyNowMeals.map((meal) => (
            <MealCard key={meal.id + "_ready"} {...meal} />
          ))}
        </ScrollView>

        {/* Kitchen Cards */}
        {kitchensData.map((kitchen) => (
          <KitchenCard key={kitchen.id} {...kitchen} />
        ))}
      </ScrollView>
      {/* Floating Cart Button */}
      <TouchableOpacity style={styles.floatingCartButton} activeOpacity={0.8}>
        <BlurView intensity={10} tint="dark" style={styles.blurContainer}>
          <View style={styles.cartIconContainer}>
            <CartIcon width={25} height={25} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </BlurView>
      </TouchableOpacity>
      <BottomTabBar
        activeTab={0}
        onTabPress={(index) => console.log("Tab pressed:", index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 100,
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 20,
    marginBottom: 15,
  },
  mealsContainer: {
    paddingLeft: 16,
    paddingRight: 4,
    marginBottom: 10,
    marginTop: 5,
  },
  floatingCartButton: {
    position: "absolute",
    right: 8,
    bottom: 110,
    width: 68,
    height: 68,
    backgroundColor: "rgba(255, 255, 255, 0.88)", // Semi-transparent white
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)", // Subtle white border
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
    zIndex: 999,
    overflow: "hidden", // Important for blur effect
  },
  blurContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  cartIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: Colors.errorText,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  cartBadgeText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: "700",
  },
});
