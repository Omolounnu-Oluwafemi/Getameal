import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlphaLogo from '@/assets/JustLogo.svg';
import CartIcon from '@/assets/icons/basket.svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type HeaderProps = {
  userName: string;
  location: string;
  cartCount?: number;
  userImage?: any;
};

export default function Header({ userName, location, cartCount = 0, userImage }: HeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.logo}>
            {userImage ? (
              <Image 
                source={userImage} 
                style={styles.userImage} 
                resizeMode="cover"
              />
            ) : (
              <AlphaLogo width={40} height={40} />
            )}
          </View>
          <View>
            <Text style={styles.greeting}>Hi {userName}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.location}>{location}</Text>
              <MaterialCommunityIcons name="menu-down" size={24} color="black" />
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.cartButton}>
          <View style={styles.logo}>
            <CartIcon width={25} height={25} />
          </View>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 3,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#666',
  },
  cartButton: {
    position: 'relative',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});