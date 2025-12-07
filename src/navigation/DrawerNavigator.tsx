import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabNavigator } from './TabNavigator';
import { colors } from '../theme/colors';
import { CustomDrawerContent } from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front', // Standard drawer behavior
                drawerStyle: {
                    width: '80%', // Adjust width as needed
                    backgroundColor: '#F2F2F7', // Match the drawer background
                },
            }}
        >
            <Drawer.Screen name="MainTabs" component={TabNavigator} />
        </Drawer.Navigator>
    );
};
