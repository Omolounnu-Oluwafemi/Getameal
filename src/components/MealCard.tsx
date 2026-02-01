import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '@/screens/constants/colors';

const { width } = Dimensions.get('window');
// Show 2.2 cards across: (screen width - total horizontal padding) / 2.2
const CARD_WIDTH = (width - 32) / 2.4;

type MealCardProps = {
  title: string;
  image: any;
  cookingTime: string;
  moq: string;
  price: string;
  priceUnit: string;
  portionsLeft?: number;
  onPress?: () => void;
  onAddPress?: () => void;
};

export default function MealCard({
  title,
  image,
  cookingTime,
  moq,
  price,
  portionsLeft = 0, 
  priceUnit,
  onPress,
  onAddPress,
}: MealCardProps) {
    const [quantity, setQuantity] = useState(portionsLeft);
  
    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => {
      if (quantity > 0) setQuantity(quantity - 1);
    };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground 
        source={image} 
        style={styles.imageContainer}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        {portionsLeft > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{portionsLeft} portions left</Text>
          </View>
        )}
        {quantity === 0 ? (
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleIncrement}
          >
            <Entypo name="plus" size={24} color="black"/>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleDecrement}
            >
              <Entypo name="minus" size={20} color="black"/>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleIncrement}
            >
              <Entypo name="plus" size={20} color="black"/>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.details}>{cookingTime}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
            <Text style={styles.priceUnit}>/ {priceUnit}</Text>
          </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 10,
    marginRight: 12,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageStyle: {
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 80,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    backgroundColor: Colors.background,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: '400',
  },
  quantitySelector: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.backgroundBorder,
    borderRadius: 14,
    paddingHorizontal: 2,
    height: 40,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  quantityButton: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginHorizontal: 2,
    minWidth: 20,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: Colors.cookingTime,
    fontWeight: '600',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
});