import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Main/HomeScreen';
import { colors } from '../theme/colors';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const getTabIconName = (routeName: string, focused: boolean) => {
    switch (routeName) {
        case 'Home':
            return focused ? 'home' : 'home-outline';
        case 'Requests':
            return focused ? 'list' : 'list-outline';
        case 'Profile':
            return focused ? 'person' : 'person-outline';
        default:
            return 'ellipse';
    }
};

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ color, focused, size }) => {
                    const iconName = getTabIconName(route.name, focused);
                    return <Icon name={iconName} size={size || 24} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Requests" component={HomeScreen} />
            <Tab.Screen name="Profile" component={HomeScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
    },
});
