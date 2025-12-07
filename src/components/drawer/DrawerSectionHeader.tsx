import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface DrawerSectionHeaderProps {
    title: string;
}

export const DrawerSectionHeader = ({ title }: DrawerSectionHeaderProps) => {
    return <Text style={styles.sectionHeader}>{title}</Text>;
};

const styles = StyleSheet.create({
    sectionHeader: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 8,
    },
});
