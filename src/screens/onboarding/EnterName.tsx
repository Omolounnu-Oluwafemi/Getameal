import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  Image,
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
import { Colors } from '@/screens/constants/colors';

const { width, height } = Dimensions.get('window');

type EnterNameProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EnterName'>;
};

export default function Register({ navigation }: EnterNameProps) {
  const [fullname, setFullname] = useState('');
  const [emailError, setEmailError] = useState('');

  return (
    <ImageBackground
      source={require('@/assets/BackgroundImage.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        
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
            >
              {/* Spacer to push content down to 40% */}
              <View style={styles.topSpacer} />

              {/* Gradient container with content */}
              <LinearGradient
                colors={[Colors.whiteSubtle, Colors.background, Colors.background]}
                style={styles.gradient}
                locations={[0, 0.1, 0.4]}
              >
                <View style={styles.contentWrapper}>
                  <Image
                    source={require('@/assets/EnterName.png')}
                    style={[styles.logo, { width: 249, height: 235 }]}
                    resizeMode="contain"
                  />
                  <Text style={styles.title}>Welcome to Getameal</Text>
                  <Text style={styles.subtitle}>
                    Start by telling us your name — it only takes a moment.
                  </Text>
                </View>
                
                {/* Content Card with inputs */}
                <View style={styles.contentCard}>
                  <View style={styles.buttonContainer}>
                    <TextInput
                      label="Full name"
                      placeholder="Enter full name"
                      value={fullname}
                      onChangeText={setFullname}
                      error={emailError}
                      autoCapitalize="words"
                      autoComplete="name"
                    />
                    <Text style={styles.exampleText}>eg Jennifer not Jenny</Text>
                    
                    <Button
                      title="Continue"
                      onPress={() => navigation.navigate('SetLocation')}
                      variant="primary"
                      size='large'
                      style={{ backgroundColor: Colors.brandGreen }}
                    />
                  </View>
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
    paddingBottom: 40,
  },
  contentWrapper: {
    paddingHorizontal: 24,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary, 
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray700,
    lineHeight: 22,
  },
  contentCard: {
    paddingHorizontal: 24,
    paddingTop: 20,
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
});