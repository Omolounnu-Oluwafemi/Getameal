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
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import LocationImg from '@/assets/EnterLocation.svg';
import LocationSelectInput from '@/components/LocationSelectInput';
import LocationSelectionModal from '@/components/Locationselectionmodal';
import { useDeviceLocation } from '@/utils/hooks/Usedevicelocation';

const { width, height } = Dimensions.get('window');

type SetLocationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SetLocation'>;
};

export default function SetLocation({ navigation }: SetLocationProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [selectedState, setSelectedState] = useState<string>();
  const { getCurrentLocation, locating } = useDeviceLocation();

  const handleLocationPress = () => {
    setShowModal(true);
  };

  const handleSelectLocation = (location: string, state: string) => {
    // Format the full location string
    const fullLocation = location === state 
      ? state 
      : `${location}, ${state}`;
    
    setSelectedLocation(fullLocation);
    setSelectedState(state);
    setShowModal(false);
  };

  const handleLocateMe = async () => {
    const result = await getCurrentLocation();
    
    if (result) {
      setSelectedLocation(result.fullLocation);
      setSelectedState(result.state);
    }
  };

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
            <LocationImg
              style={styles.logo}
            />
            <Text style={styles.title}>Choose your location</Text>
            <Text style={styles.subtitle}>
                So we can show you what’s cooking nearby.
            </Text>
           </View>
                  
                {/* Content Card with inputs */}
            <View style={styles.contentCard}>
                <View style={styles.buttonContainer}>
                <LocationSelectInput
                  location={selectedLocation}
                  onPress={handleLocationPress}
                  placeholder="Select your location"
              />
                    <Button
                        title="Locate me"
                        onPress={handleLocateMe}
                        variant="secondary"
                        size='large'
                        icon={<Ionicons name="location-outline" size={24} color="black" />}
                        style={{ backgroundColor: '#F7F7F7', marginBottom: 10 }}
                    />
                    <Button
                        title="Continue"
                        onPress={() => navigation.navigate('GetNotified')}
                        variant="primary"
                        size='large'
                        style={{ backgroundColor: '#1B8601' }}
                    />
                </View>
            </View>
        </LinearGradient>

        <LocationSelectionModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSelectLocation={handleSelectLocation}
        />
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
    paddingTop: 40,
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