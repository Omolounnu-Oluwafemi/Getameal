import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import your SVG icons
import HomeIcon from '@/assets/icons/home.svg';
import OrdersIcon from '@/assets/icons/order.svg';
import SearchIcon from '@/assets/icons/search.svg';
import CooksIcon from '@/assets/icons/cook.svg';
import ProfileIcon from '@/assets/icons/profile.svg';

type TabItem = {
  label: string;
  Icon: React.FC<{ width?: number; height?: number; color?: string }>;
  isActive?: boolean;
};

type BottomTabBarProps = {
  activeTab?: number;
  onTabPress?: (index: number) => void;
};

export default function BottomTabBar({ activeTab = 0, onTabPress }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const tabs: TabItem[] = [
    { label: 'Home', Icon: HomeIcon, isActive: activeTab === 0 },
    { label: 'Orders', Icon: OrdersIcon, isActive: activeTab === 1 },
    { label: 'Search', Icon: SearchIcon, isActive: activeTab === 2 },
    { label: 'Saved', Icon: CooksIcon, isActive: activeTab === 3 },
    { label: 'Profile', Icon: ProfileIcon, isActive: activeTab === 4 },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      <View style={styles.content}>
        {tabs.map((tab, index) => {
          const IconComponent = tab.Icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => onTabPress?.(index)}
              activeOpacity={0.6}
            >
              <IconComponent 
                width={24} 
                height={24} 
                color={tab.isActive ? '#16A34A' : '#000'}
              />
              <Text style={[styles.label, tab.isActive && styles.activeLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
  },
  activeLabel: {
    color: '#209D01',
    fontWeight: '600',
  },
});