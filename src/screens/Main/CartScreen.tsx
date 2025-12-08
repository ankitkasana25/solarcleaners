import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const CartScreen = () => {
    return (
        <ScreenContainer>
            <View style={styles.container}>
                <Text style={styles.title}>Cart</Text>
                <Text style={styles.subtitle}>Your selected services</Text>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        ...typography.header,
        marginBottom: 8,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
    },
});
