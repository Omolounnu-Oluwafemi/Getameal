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
import { Colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SplashOne'>;
};

export default function SplashTwo({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <ImageBackground
        source={require('@/assets/WithwithGeta.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView edges={['top']} style={styles.imageContent}>
          {/* Logo at top */}
          <View style={styles.logoContainer}>
            <GetaMeal width={120} height={40} />
          </View>

          <View style={styles.spacer} />

          {/* Alpha Logo and text at bottom of image */}
          <LinearGradient
            colors={[Colors.whiteAlpha10, Colors.whiteAlpha90, Colors.background]}
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
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Register')}>
              <EmailIcon width={20} height={20} />
              <Text style={styles.loginText}>Use Email Address</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
              <AppleIcon width={20} height={20} />
              <Text style={styles.registerButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
              <GoogleIcon width={20} height={20} />
              <Text style={styles.registerButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
              
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.AlreadyText}>
            Already have an account? <Text style={styles.loginLink}>Log in</Text>
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
      color: Colors.primary,
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
        backgroundColor: Colors.primary,
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
      color: Colors.primary,
    },
    AlreadyText: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '600',
      color: Colors.primary,
      marginTop: 50,
    },
    loginLink: {
        fontWeight: '700',
        color: Colors.primary,
      },
  });