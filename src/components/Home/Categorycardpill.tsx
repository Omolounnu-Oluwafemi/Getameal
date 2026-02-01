import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '@/screens/constants/colors';

type CategoryCardProps = {
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
};

export default function CategoryCard({ title, icon, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
        <Image source={icon} style={styles.icon} resizeMode='cover'/>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.backgroundBorder,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: 10
  },
  icon: {
    width: 24,
    height: 26,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});