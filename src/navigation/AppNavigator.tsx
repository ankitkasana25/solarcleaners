import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { useRootStore } from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../theme/colors';

export const AppNavigator = observer(() => {
    const { authStore } = useRootStore();

    // If loading, show a spinner
    if (authStore.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {authStore.isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
});
