import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashOne from '@/screens/welcomeviews/SplashOne';
import LogoScreen from '@/screens/welcomeviews/Logo';
import SplashTwo from '@/screens/welcomeviews/SplashTwo';
import HomeScreen from '@/screens/HomeScreen';
import Register from '@/screens/auth/Register';
import ConfirmEmailScreen from '@/screens/auth/ConfirmEmailScreen';
import Cover from '@/screens/onboarding/Cover';
import CreateStore from '@/screens/onboarding/CreateStore';
import EnterName from '@/screens/onboarding/EnterName';
import SetLocation from '@/screens/onboarding/SetLocation';
import GetNotified from '@/screens/onboarding/GetNotified';
import Login from '@/screens/auth/Login';
import WelcomeBack from '@/screens/auth/WelcomeBack';

export type RootStackParamList = {
  Logo: undefined;
  SplashOne: undefined;
  SplashTwo: undefined;
  Register: undefined;
  ConfirmEmail: { email: string, isLogin: Boolean };
  Cover: undefined;
  CreateStore: undefined;
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
        animation: 'slide_from_right',
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
      <Stack.Screen name="EnterName" component={EnterName} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="GetNotified" component={GetNotified} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}