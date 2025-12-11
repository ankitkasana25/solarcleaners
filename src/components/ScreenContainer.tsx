import React from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

interface ScreenContainerProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
});
