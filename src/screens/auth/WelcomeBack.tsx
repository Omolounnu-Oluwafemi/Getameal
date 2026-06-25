import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
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
import Button from '@/components/Button';
import AlphaLogo from '@/assets/logoBlack.svg';
import { Colors } from '@/screens/constants/colors';

const { width, height } = Dimensions.get('window');

type WelcomeBackProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WelcomeBack'>;
};

export default function WelcomeBack({ navigation }: WelcomeBackProps) {
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
    <ImageBackground
      source={require('@/assets/BackgroundImage.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <StatusBar barStyle="dark-content" translucent backgroundColor={Colors.transparent} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >
              <View style={styles.topSpacer} />

              <LinearGradient
                colors={[Colors.whiteSubtle, Colors.background, Colors.background]}
                style={styles.gradient}
                locations={[0, 0.1, 0.4]}
              >
                <View style={styles.contentWrapper}>
                  <View style={styles.logo}>
                    <AlphaLogo width={38.8} height={61.5} />
                  </View>

                  <Text style={styles.title}>Welcome Back</Text>
                  <Text style={styles.subtitle}>
                    Your favorite cooks are cooking again.
                  </Text>
                </View>

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

                    <Button
                      title="Continue"
                      onPress={() => navigation.navigate('ConfirmEmail', { email, isLogin: true })}
                      variant="primary"
                      size='large'
                      style={{ backgroundColor: Colors.brandGreen }}
                    />
                  </View>

                  <TouchableOpacity onPress={() => navigation.navigate("SplashTwo")}>
                    <Text style={styles.AlreadyText}>
                      Don't have an account? <Text style={styles.loginLink}>Sign up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSpacer: {
    height: height * 0.18,
  },
  gradient: {
    paddingTop: 40,
    paddingBottom: 100,
  },
  contentWrapper: {
    paddingHorizontal: 24,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 40,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 37.6,
    paddingVertical: 26.25,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.gray700,
    lineHeight: 22,
    textAlign: 'center',
  },
  contentCard: {
    paddingHorizontal: 24,
    marginTop: 70,
    paddingBottom: 100,
  },
  buttonContainer: {
    gap: 4,
  },
  exampleText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textPlaceholder,
    marginTop: -10,
    marginBottom: 30,
    paddingLeft: 15,
  },
  AlreadyText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 50,
  },
  loginLink: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
