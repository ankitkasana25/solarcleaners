import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import { ServiceDetailScreen } from '../screens/Main/ServiceDetailScreen';

import { ReelsScreen } from '../screens/Main/ReelsScreen'; // Import ReelsScreen

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
            <Stack.Screen name="Reels" component={ReelsScreen} />
        </Stack.Navigator>
    );
};
