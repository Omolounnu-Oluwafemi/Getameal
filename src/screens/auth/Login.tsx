import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import GetaMeal from '@/assets/GetaMealBlackBg.svg';
import AppleIcon from '@/assets/apple.svg';
import GoogleIcon from '@/assets/google.svg';
import EmailIcon from '@/assets/mail.svg';
import Button from '@/components/Button';
import { Colors } from '@/screens/constants/colors';

const { width, height } = Dimensions.get('window');

type LoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function SplashTwo({ navigation }: LoginProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor={Colors.transparent} />

      <ImageBackground
        source={require('@/assets/WithwithGeta.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView edges={['top']} style={styles.imageContent}>
          <View style={styles.logoContainer}>
            <GetaMeal width={120} height={40} />
          </View>

          <View style={styles.spacer} />

          <LinearGradient
            colors={[Colors.whiteAlpha10, Colors.whiteAlpha90, Colors.background]}
            style={styles.titleContainer}
            locations={[0, 0.5, 1]}
          >
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Your favorite cooks are cooking again. </Text>
          </LinearGradient>
        </SafeAreaView>
      </ImageBackground>

      <View style={styles.contentCard}>
        <View style={styles.buttonContainer}>
          <Button
            title="Use Email Address"
            onPress={() => navigation.navigate('WelcomeBack')}
            variant="secondary"
            icon={<EmailIcon width={20} height={20} />}
            iconPosition="left"
            size='medium'
            style={{ backgroundColor: Colors.backgroundMuted }}
          />
          <Button
            title="Continue with Apple"
            onPress={() => {}}
            variant="primary"
            icon={<AppleIcon width={20} height={20} />}
            iconPosition="left"
            size='medium'
            style={{ backgroundColor: Colors.textPrimary }}
          />
          <Button
            title="Continue with Google"
            onPress={() => {}}
            variant="primary"
            icon={<GoogleIcon width={20} height={20} />}
            iconPosition="left"
            size='medium'
            style={{ backgroundColor: Colors.textPrimary }}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.AlreadyText}>
            Don't have an account? <Text style={styles.loginLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    paddingBottom: 60,
  },
  contentCard: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingBottom: 40,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray700,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 12,
  },
  registerButton: {
    backgroundColor: Colors.textPrimary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  loginButton: {
    backgroundColor: Colors.backgroundMuted,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.backgroundBorder,
    marginBottom: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
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
