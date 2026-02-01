import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/screens/constants/colors';

type SectionHeaderProps = {
  title: string;
  onSeeAllPress?: () => void;
};

export default function SectionHeader({ title, onSeeAllPress }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* {onSeeAllPress && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  seeAll: {
    fontSize: 28,
    color: '#000',
    fontWeight: '300',
  },
});