import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, style, ...props }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error ? styles.errorBorder : null, style]}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <TextInput
                    placeholderTextColor={colors.textSecondary}
                    style={styles.input}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        ...typography.caption,
        fontWeight: '600',
        marginBottom: 8,
        color: colors.text,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: 12,
        height: 50,
    },
    input: {
        flex: 1,
        color: colors.text,
        fontSize: 16,
        height: '100%',
    },
    iconContainer: {
        marginRight: 10,
    },
    errorBorder: {
        borderColor: colors.error,
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginTop: 4,
    },
});
