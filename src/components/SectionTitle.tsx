import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme } from '../theme/theme';

interface SectionTitleProps {
    title: string;
    tagline?: string;
    badgeText?: string;
    rightElement?: React.ReactNode;
}

export const SectionTitle = ({
    title,
    tagline,
    badgeText,
    rightElement,
}: SectionTitleProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    {badgeText && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{badgeText}</Text>
                        </View>
                    )}
                </View>
                {rightElement && <View>{rightElement}</View>}
            </View>
            {tagline && <Text style={styles.tagline}>{tagline}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16, // Standard app padding
        marginBottom: 16,
        marginTop: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Takes available space
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginRight: 8,
        flexShrink: 1,
    },
    badge: {
        backgroundColor: lightTheme.colors.miniBlue, // subtle green/blue
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    badgeText: {
        color: lightTheme.colors.deepGreen,
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        fontFamily: 'NotoSans-Bold',
    },
    tagline: {
        fontSize: 13,
        fontFamily: 'NotoSans-Regular',
        color: lightTheme.colors.slateGray,
        lineHeight: 18,
        marginLeft: 14, // Aligned with text
        marginTop: 2,
    },
});
