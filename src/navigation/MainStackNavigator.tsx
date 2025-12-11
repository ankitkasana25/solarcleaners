import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import { ServiceDetailScreen } from '../screens/Main/ServiceDetailScreen';
import { ReelsScreen } from '../screens/Main/ReelsScreen';
import { OrderHistoryScreen } from '../screens/Main/OrderHistoryScreen'; // Import

import { CheckoutScreen } from '../screens/Main/CheckoutScreen';
import { OrderSuccessScreen } from '../screens/Main/OrderSuccessScreen';
import { NotificationScreen } from '../screens/Main/NotificationScreen';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
            <Stack.Screen name="Reels" component={ReelsScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
        </Stack.Navigator>
    );
};
