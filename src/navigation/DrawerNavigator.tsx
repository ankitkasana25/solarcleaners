import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStackNavigator } from './MainStackNavigator';
import { colors } from '../theme/colors';
import { CustomDrawerContent } from './CustomDrawerContent';

import { UserProfileScreen } from '../screens/Profile/UserProfileScreen';

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
                    // backgroundColor removed to let CustomDrawerContent handle it
                },
            }}
        >
            <Drawer.Screen name="MainStack" component={MainStackNavigator} />
            <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
        </Drawer.Navigator>
    );
};
