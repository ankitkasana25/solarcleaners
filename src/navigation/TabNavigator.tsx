import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRootStore } from '../stores/RootStore';
import { HomeScreen } from '../screens/Main/HomeScreen';
import { ServicesScreen } from '../screens/Main/ServicesScreen';
import { BookingsScreen } from '../screens/Main/BookingsScreen';
import { CartScreen } from '../screens/Main/CartScreen';
import { colors } from '../theme/colors';
import { ImageIcon } from '../components/ImageIcon';
import { CustomHeader } from '../components/CustomHeader';

const Tab = createBottomTabNavigator();

export const TabNavigator = observer(() => {
  const { cartStore } = useRootStore();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        header: () => <CustomHeader title={route.name} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          ...styles.tabBar,
          height: 70 + insets.bottom, // Add bottom inset to height
          paddingBottom: insets.bottom + 12, // Add bottom inset to padding
        },
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ImageIcon name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ImageIcon name="services" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ImageIcon name="bookings" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ImageIcon name="cart" size={22} color={color} />
          ),
          tabBarBadge:
            cartStore.totalCount > 0 ? cartStore.totalCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
});

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 10, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: 10, // Balanced premium size
    fontWeight: 400,
  },
});
