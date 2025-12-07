import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabNavigator } from './TabNavigator';
import { colors } from '../theme/colors';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: colors.text,
            }}
        >
            <Drawer.Screen name="MainTabs" component={TabNavigator} options={{ title: 'Home' }} />
        </Drawer.Navigator>
    );
};
