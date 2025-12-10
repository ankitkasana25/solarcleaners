import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface SectionTitleProps {
    title: string;
    tagline?: string;
    badgeText?: string;
}

export const SectionTitle = ({ title, tagline, badgeText }: SectionTitleProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
                {badgeText && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badgeText}</Text>
                    </View>
                )}
            </View>
            {tagline && <Text style={styles.tagline}>{tagline}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 16,
        marginTop: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1E',
        marginRight: 8,
    },
    badge: {
        backgroundColor: 'rgba(76, 217, 100, 0.15)', // Light green bg
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        color: '#34C759', // iOS Green
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    tagline: {
        fontSize: 13,
        color: colors.textSecondary,
        lineHeight: 18,
    },
});
