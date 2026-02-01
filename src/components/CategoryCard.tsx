import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
// Calculate card width: (screen width - padding) / 3.5 cards
const CARD_WIDTH = (width - 32) / 3.5; // 32 = 16px padding on each side

type CategoryCardProps = {
  title: string;
  image: any;
  onPress?: () => void;
};

export default function CategoryCard({ title, image, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: CARD_WIDTH,
    marginRight: 12,
  },
  imageContainer: {
    width: CARD_WIDTH - 8, // Slightly smaller than container for better spacing
    height: CARD_WIDTH - 8,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
    // Background color needed for shadow to show on iOS
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});