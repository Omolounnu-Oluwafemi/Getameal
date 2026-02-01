import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

interface LocationResult {
  area: string;
  state: string;
  fullLocation: string;
}

export const useDeviceLocation = () => {
  const [locating, setLocating] = useState(false);

  const getCurrentLocation = async (): Promise<LocationResult | null> => {
    try {
      setLocating(true);
      
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please enable location permissions to use this feature.',
          [{ text: 'OK' }]
        );
        return null;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode to get address
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        // Extract state and city/area from address
        const state = address.region || address.subregion || '';
        const area = address.city || address.district || address.subregion || '';
        
        if (state) {
          const fullLocation = area ? `${area}, ${state}` : state;
          return {
            area,
            state,
            fullLocation,
          };
        } else {
          Alert.alert('Location Error', 'Could not determine your location. Please select manually.');
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Location Error',
        'Unable to get your location. Please try again or select manually.',
        [{ text: 'OK' }]
      );
      return null;
    } finally {
      setLocating(false);
    }
  };

  return {
    getCurrentLocation,
    locating,
  };
};