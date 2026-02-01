import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '@/components/TextInput';

const { width, height } = Dimensions.get('window');

type RegisterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

export default function Register({ navigation }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !/\S+@\S+\.\S+/.test(text)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <ImageBackground
              source={require('@/assets/WithwithGeta.png')}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <SafeAreaView edges={['top']} style={styles.imageContent}>
                <View style={styles.spacer} />

                {/* Alpha Logo and text at bottom of image */}
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 1)']}
                  style={styles.titleContainer}
                  locations={[0, 0.5, 1]}
                >
                  <Text style={styles.title}>Get started on Getameal</Text>
                  <Text style={styles.subtitle}>
                    Pre-order fresh meals from local cooks near you. 
                  </Text>
                </LinearGradient>
              </SafeAreaView>
            </ImageBackground>

            {/* Content Card with buttons */}
            <View style={styles.contentCard}>
              <View style={styles.buttonContainer}>
                <TextInput
                  label="Email address"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={validateEmail}
                  error={emailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />

                <TouchableOpacity 
                  style={styles.registerButton} 
                  onPress={() => navigation.navigate('ConfirmEmail', { email, isLogin: false })}
                >
                  <Text style={styles.registerButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.AlreadyText}>
                  Already have an account? <Text style={styles.loginLink}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    width: width,
    height: height * 0.65,
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  imageContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  spacer: {
    flex: 1,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 15,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    marginTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000', 
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#5C5C5C',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 4,
  },
  registerButton: {
    backgroundColor: '#1B8601',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  AlreadyText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 50,
  },
  loginLink: {
    fontWeight: '700',
    color: '#000',
  },
});