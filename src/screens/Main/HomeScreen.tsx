import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { useRootStore } from '../../stores/RootStore';
import { typography } from '../../theme/typography';
import { observer } from 'mobx-react-lite';

export const HomeScreen = observer(() => {
    const { authStore } = useRootStore();

    return (
        <ScreenContainer style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.welcome}>Welcome, {authStore.user?.name}</Text>

            <Button
                title="Logout"
                onPress={() => authStore.logout()}
                variant="outline"
                style={styles.button}
            />
        </ScreenContainer>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...typography.header,
        marginBottom: 12,
    },
    welcome: {
        ...typography.subheader,
        marginBottom: 32,
    },
    button: {
        width: '100%',
        maxWidth: 300,
    },
});
