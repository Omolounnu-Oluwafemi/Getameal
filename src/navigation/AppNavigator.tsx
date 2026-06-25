import MainTabNavigator from "@/navigation/MainTabNavigator";
import ConfirmEmailScreen from "@/screens/auth/ConfirmEmailScreen";
import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import WelcomeBack from "@/screens/auth/WelcomeBack";
import CookingExperience from "@/screens/onboarding/CookingExperience";
import Cover from "@/screens/onboarding/Cover";
import CreateStore from "@/screens/onboarding/CreateStore";
import EnterName from "@/screens/onboarding/EnterName";
import FoodSafetyAgreement from "@/screens/onboarding/FoodSafetyAgreement";
import GetNotified from "@/screens/onboarding/GetNotified";
import SetLocation from "@/screens/onboarding/SetLocation";
import StoreAddress from "@/screens/onboarding/StoreAddress";
import StorePhotos from "@/screens/onboarding/StorePhotos";
import LogoScreen from "@/screens/welcomeviews/Logo";
import SplashOne from "@/screens/welcomeviews/SplashOne";
import SplashTwo from "@/screens/welcomeviews/SplashTwo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export type RootStackParamList = {
  Logo: undefined;
  SplashOne: undefined;
  SplashTwo: undefined;
  Register: undefined;
  ConfirmEmail: { email: string; isLogin: Boolean };
  Cover: undefined;
  CreateStore: undefined;
  StoreAddress: undefined;
  CookingExperience: undefined;
  StorePhotos: undefined;
  FoodSafetyAgreement: undefined;
  EnterName: undefined;
  SetLocation: undefined;
  GetNotified: undefined;
  Login: undefined;
  WelcomeBack: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="Logo"
    >
      <Stack.Screen name="Logo" component={LogoScreen} />
      <Stack.Screen name="SplashOne" component={SplashOne} />
      <Stack.Screen name="SplashTwo" component={SplashTwo} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="Cover" component={Cover} />
      <Stack.Screen name="CreateStore" component={CreateStore} />
      <Stack.Screen name="StoreAddress" component={StoreAddress} />
      <Stack.Screen name="CookingExperience" component={CookingExperience} />
      <Stack.Screen name="StorePhotos" component={StorePhotos} />
      <Stack.Screen
        name="FoodSafetyAgreement"
        component={FoodSafetyAgreement}
      />
      <Stack.Screen name="EnterName" component={EnterName} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="GetNotified" component={GetNotified} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
      <Stack.Screen name="Home" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
