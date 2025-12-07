import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Main/HomeScreen';
import { colors } from '../theme/colors';

// Placeholder for now, later use SVG icons
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color }: { name: string; color: string }) => {
    // Basic text placeholder for icons
    return <Text style={{ color, fontSize: 16, fontWeight: 'bold' }}>{name[0]}</Text>;
};

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    // borderTopWidth: 0,
                    // elevation: 10,
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarIcon: ({ color }) => <TabIcon name={route.name} color={color} />,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Requests" component={HomeScreen} />
            <Tab.Screen name="Profile" component={HomeScreen} />
        </Tab.Navigator>
    );
};
