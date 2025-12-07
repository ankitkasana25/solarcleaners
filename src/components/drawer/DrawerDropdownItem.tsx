import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ImageIcon } from '../ImageIcon';
import { colors } from '../../theme/colors';

interface DrawerDropdownItemProps {
    label: string;
    onPress?: () => void;
}

export const DrawerDropdownItem = ({ label, onPress }: DrawerDropdownItemProps) => {
    return (
        <TouchableOpacity style={styles.dropdownItemContainer} onPress={onPress}>
            <Text style={styles.dropdownLabel}>{label}</Text>
            <ImageIcon name="dropdown" size={20} color={colors.text} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dropdownItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    dropdownLabel: {
        fontSize: 15,
        color: colors.primary,
        fontWeight: '500',
    },
});
