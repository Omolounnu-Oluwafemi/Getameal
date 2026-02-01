import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ImageBackground
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/navigation/AppNavigator';
import GetaMeal from '@/assets/GetaMealWhitebg.svg';
import { VideoView, useVideoPlayer } from 'expo-video';

const { width, height } = Dimensions.get('window');

type SplashOneScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SplashOne'>;
};

export default function SplashOne({ navigation }: SplashOneScreenProps) {
  const videoSource = require('@/assets/MealVideo.mp4');
  
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Video Background */}
      <View style={styles.videoContainer}>

        <VideoView
          style={styles.backgroundVideo}
          player={player}
          contentFit="cover"
          fullscreenOptions={{
            orientation: 'landscape',
            enable: false,
          }}
          allowsPictureInPicture={false}
        />
        
        {/* Content overlay on video */}
        <SafeAreaView edges={['top']} style={styles.imageContent}>
          {/* Logo at top */}
          <View style={styles.logoContainer}>
            <GetaMeal width={120} height={40} />
          </View>

          <View style={styles.spacer} />
        </SafeAreaView>
      </View>

      {/* Content Card with buttons */}
      <View style={styles.contentCard}>
        <Text style={styles.title}>Fresh meals. Cooked in bulk.</Text>
            <Text style={styles.subtitle}>
              Find a cook to prepare fresh meals in bulk, so your meals for the week are sorted.
            </Text>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('SplashTwo')}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: width,
    height: height * 0.65,
    position: 'relative',
    backgroundColor: '#000',
  },
  posterImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
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
  logoWrapper: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    opacity: 1,
    marginBottom: 20,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 35,
  },
  registerButton: {
    backgroundColor: '#1B8601',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});