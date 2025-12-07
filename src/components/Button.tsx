import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    style,
    textStyle,
    disabled,
}) => {
    const getBackgroundColor = () => {
        if (disabled) return colors.border;
        switch (variant) {
            case 'secondary':
                return colors.secondary;
            case 'outline':
                return 'transparent';
            default:
                return colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return colors.textSecondary;
        switch (variant) {
            case 'outline':
                return colors.primary;
            default:
                return colors.white;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor() },
                variant === 'outline' && styles.outline,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12, // Rounded corners as per design
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    outline: {
        borderWidth: 1,
        borderColor: colors.primary,
    },
    text: {
        ...typography.button,
    },
});
