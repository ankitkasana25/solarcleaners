import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeHeader } from '../../components/HomeHeader';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';

export const HomeScreen = observer(() => {
    // const { authStore } = useRootStore(); // user data available if needed

    return (
        <View style={styles.container}>
            <HomeHeader />
            <View style={styles.content}>
                {/* Content hidden as per request */}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7', // Standard background color
    },
    content: {
        flex: 1,
    }
});
