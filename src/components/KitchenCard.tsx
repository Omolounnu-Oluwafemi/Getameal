import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import PickUp from '@/assets/icons/pickup.svg';
import Delivery from '@/assets/icons/delivery.svg'

type MealItemProps = {
  id: string;
  title: string;
  image: any;
  price?: string;
  priceUnit: string;
  cookingTime: string;
  portionsLeft?: number;
  badge?: string;
  onPress?: () => void;
};

type KitchenCardProps = {
  kitchenName: string;
  kitchenImage: any;
  rating: number;
  reviewCount: number;
  location: string;
  meals: MealItemProps[];
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  onKitchenPress?: () => void;
};

// Add this new component before the KitchenCard component
type SeeAllCardProps = {
  remainingCount: number;
  onPress?: () => void;
};

export const SeeAllCard = ({ remainingCount, onPress }: SeeAllCardProps) => {
  // Add your 3 static images here
  const stackedImages = [
    require('@/assets/home/seeAll2.png'), // Left image (bottom layer)
    require('@/assets/home/seeAll1.png'), // Center image (middle layer)
    require('@/assets/home/seeAll3.png'), // Right image (top layer)
  ];

  return (
    <TouchableOpacity style={styles.seeAllCard} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.seeAllImageContainer}>
        {/* Left image - tilted left and pushed down */}
        <Image 
          source={stackedImages[0]} 
          style={[
            styles.stackedImage,
            { 
              zIndex: 1,
              transform: [
                { translateX: -35 },
                { translateY: 38 },
                { rotate: '-15deg' }
              ]
            }
          ]} 
          resizeMode="cover"
        />
        
        {/* Center image - middle, on top */}
        <Image 
          source={stackedImages[1]} 
          style={[
            styles.stackedImage,
            { 
              zIndex: 0,
              transform: [
                { translateY: 0 },
              ]
            }
          ]} 
          resizeMode="cover"
        />
        
        {/* Right image - tilted right and pushed down */}
        <Image 
          source={stackedImages[2]} 
          style={[
            styles.stackedImage,
            { 
              zIndex: 2,
              transform: [
                { translateX: 40 },
                { translateY: 42 },
                { rotate: '8deg' }
              ]
            }
          ]} 
          resizeMode="cover"
        />
      </View>
      <Text style={styles.seeAllText}>See all items</Text>
    </TouchableOpacity>
  );
};

const MealItem = ({ 
  title, 
  image, 
  price, 
  priceUnit,
  cookingTime, 
  portionsLeft, 
  badge, 
  onPress 
}: MealItemProps) => {
  const [quantity, setQuantity] = useState(portionsLeft || 0);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <TouchableOpacity style={styles.mealItem} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.mealImageContainer}>
        <Image source={image} style={styles.mealImage} resizeMode="cover" />
        {badge && (
          <View style={styles.mealBadge}>
            <Text style={styles.mealBadgeText}>{badge}</Text>
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
      </View>
      <View style={styles.cooking}>
        <Text style={styles.cookingTime}>{cookingTime}</Text>
        <Text style={styles.mealTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.priceUnit}> / {priceUnit}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function KitchenCard({
  kitchenName,
  kitchenImage,
  rating,
  reviewCount,
  location,
  meals,
  pickupAvailable,
  deliveryAvailable,
  onKitchenPress,
}: KitchenCardProps) {
  return (
    <View style={styles.container}>
      {/* Kitchen Header */}
      <TouchableOpacity style={styles.header} onPress={onKitchenPress} activeOpacity={4}>
        <View style={styles.header}>
        {typeof kitchenImage === 'function' || React.isValidElement(kitchenImage) ? (
            // It's an SVG component
            <View style={styles.kitchenImage}>
            {React.isValidElement(kitchenImage) ? kitchenImage : React.createElement(kitchenImage, { width: 56, height: 56 })}
            </View>
            ) : (
                // It's a regular image
                <Image source={kitchenImage} style={styles.kitchenImage} resizeMode="cover" />
            )}
        {/* ... rest of the header */}
        </View>
        <View style={styles.kitchenInfo}>
          <Text style={styles.kitchenName}>{kitchenName}</Text>
          <View style={styles.kitchenMeta}>
            <AntDesign name="star" size={15} color="#FDB100" />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.reviewCount}>({reviewCount})</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#222222" />
              <Text style={styles.location}>{location}</Text>
            </View>
          </View>
        </View>
        <Entypo name="chevron-right" size={18} color="#989898" style={styles.arrow} />
      </TouchableOpacity>

      {/* Meals Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mealsContainer}
      >
      {/* Show first 3 meals */}
        {meals.slice(0, 3).map((meal) => (
          <MealItem key={meal.id} {...meal} />
        ))}

        {/* Show SeeAllCard if there are more than 3 meals */}
        {meals.length > 3 && (
          <SeeAllCard 
            remainingCount={meals.length - 3} 
            onPress={() => {/* navigate to all meals */}}
          />
        )}
      </ScrollView>

      {/* Availability Footer */}
      <View style={styles.footer}>
        <View style={styles.availabilityItem}>
          <PickUp width={18} height={18}style={{ marginRight: 4}}/>
          <Text style={styles.availabilityLabel}>Pick-up</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={[
            styles.availabilityStatus, 
            pickupAvailable && styles.availabilityAvailable
          ]}>
            {pickupAvailable ? 'Available' : 'Not Available'}
          </Text>
        </View>
        <View style={styles.availabilityItem}>
          <Delivery width={18} height={18} style={{ marginHorizontal: 8}} />
          <Text style={styles.availabilityLabel}>Delivery</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={[
            styles.availabilityStatus, 
            deliveryAvailable && styles.availabilityAvailable
          ]}>
            {deliveryAvailable ? 'Available' : 'Not Available'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#EDEDED',
    paddingBottom: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop: 8,
    marginLeft: 10,
  },
  kitchenImage: {
    width: 50,
    height: 50,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  arrow: {
    marginRight: 20
  },
  kitchenInfo: {
    flex: 1,
  },
  kitchenName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  kitchenMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    marginRight: 4,
    marginLeft: 6
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 2,
  },
  location: {
    fontSize: 14,
    color: '#5C5C5C',
    fontWeight: '500',
    marginLeft: 10,
  },
  chevron: {
    fontSize: 28,
    color: '#ccc',
    fontWeight: '300',
  },
  mealsContainer: {
    paddingLeft: 16,
  },
  mealItem: {
    width: 258,
    marginRight: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00000014',
    backgroundColor: '#fff',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    // Android shadow
    elevation: 6,
    marginBottom: 20
  },
  mealImageContainer: {
    width: 258,
    height: 220,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mealImage: {
    width: '100%',
    height: '100%',
  },
  mealBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mealBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  quantitySelector: {
    position: 'absolute',
    bottom: 12,
    left: '80%',
    transform: [{ translateX: -60 }],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 14,
    paddingHorizontal: 5,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 2,
    minWidth: 20,
    textAlign: 'center',
  },
  cooking: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingVertical: 15
  },
  cookingTime: {
    fontSize: 14,
    color: '#1B8601',
    fontWeight: '600',
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 6,
    paddingRight: 30,
    lineHeight: 20,
  },
 priceContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},
price: {
  fontSize: 18,       
  fontWeight: '700', 
  color: '#000',
  letterSpacing: -0.5,
},
priceUnit: {
  fontSize: 12,
  fontWeight: '600',
  color: '#000',
},
  footer: {
    flexDirection: 'row',
    paddingBottom: 14,
    marginHorizontal: 16,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  availabilityLabel: {
    fontSize: 14,
    color: '#222222',
    fontWeight: '500',
  },
  separator: {
    fontSize: 30,
    color: '#C3C3C3',
    marginHorizontal: 4,
  },
  availabilityStatus: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  availabilityAvailable: {
    color: '#000',
    fontWeight: '500',
  },
  seeAllCard: {
    width: 258,
    height: 333,
    marginRight: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00000014',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    // Android shadow
    elevation: 6,
    marginBottom: 20
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  remainingCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginTop: 4,
  },
  seeAllImageContainer: {
    width: 180,
    height: 140,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  stackedImage: {
    width: 78.35,
    height: 78.35,
    borderRadius: 21.09,
    borderWidth: 3.01,
    borderColor: '#fff',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});