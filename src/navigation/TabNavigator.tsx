import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Main/HomeScreen';
import { ServicesScreen } from '../screens/Main/ServicesScreen';
import { BookingsScreen } from '../screens/Main/BookingsScreen';
import { CartScreen } from '../screens/Main/CartScreen';
import { colors } from '../theme/colors';
import { ImageIcon } from '../components/ImageIcon';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ImageIcon name="home" size={size || 24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ImageIcon name="services" size={size || 24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Bookings"
                component={BookingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ImageIcon name="bookings" size={size || 24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ImageIcon name="cart" size={size || 24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
    },
    tabBarLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
});
