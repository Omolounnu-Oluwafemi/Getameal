import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import NotifiedIcon from '@/assets/NotifiedIcon.svg';

const { width, height } = Dimensions.get('window');

type GetNotifiedProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GetNotified'>;
};

export default function GetNotified({ navigation }: GetNotifiedProps) {

  return (
    <ImageBackground
      source={require('@/assets/BackgroundImage.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        
        {/* Spacer to push content down to 40% */}
        <View style={styles.topSpacer} />

        {/* Gradient container with content */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.14)', 'rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)']}
          style={styles.gradient}
          locations={[0, 0.1, 0.4]}
        >
          <View style={styles.contentWrapper}>
            <NotifiedIcon
              style={styles.logo}
            />
            <Text style={styles.title}>Stay in the loop</Text>
            <Text style={styles.subtitle}>
            Get notified when meals are cooking near you, before they sell out.
            </Text>
           </View>
                  
                {/* Content Card with inputs */}
            <View style={styles.contentCard}>
                <View style={styles.buttonContainer}>    
                    <Button
                        title="Allow Notifications"
                        onPress={() => navigation.navigate('Home')}
                        variant="primary"
                        size='large'
                        style={{ backgroundColor: '#1B8601', marginBottom: 10 }}
                    />
                    <Button
                        title="Don't Allow"
                        onPress={() => navigation.navigate('Home')}
                        variant="secondary"
                        size='large'
                        style={{ backgroundColor: '#F7F7F7' }}
                    />
                </View>
            </View>
        </LinearGradient>


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
  topSpacer: {
    height: height * 0.12,
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
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000', 
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#5C5C5C',
    lineHeight: 22,
  },
  contentCard: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 100,
  },
  buttonContainer: {
    gap: 4,
  },
  exampleText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '400',
    color: '#989898',
    marginTop: -10,
    marginBottom: 30,
    paddingLeft: 15,
  },
});