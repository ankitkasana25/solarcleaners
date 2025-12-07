import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ImageIcon } from '../ImageIcon';
import { IconName } from '../../theme/icons';
import { colors } from '../../theme/colors';

interface DrawerItemProps {
    label: string;
    iconName?: IconName; // Update type to IconName
    isActive?: boolean;
    hasDot?: boolean;
    onPress?: () => void;
}

export const DrawerItem = ({ label, iconName, isActive = false, hasDot = false, onPress }: DrawerItemProps) => {
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            <View style={styles.itemLeft}>
                {iconName ? (
                    <ImageIcon
                        name={iconName}
                        size={22}
                        color={colors.text}
                        style={styles.icon}
                    />
                ) : null}
                <Text style={[styles.itemLabel, isActive && styles.activeItemLabel]}>
                    {label}
                </Text>
            </View>
            {hasDot && <View style={styles.greenDot} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
        width: 24,
    },
    itemLabel: {
        fontSize: 15,
        color: '#1C1C1E',
        fontWeight: '500',
    },
    activeItemLabel: {
        color: colors.primary,
    },
    greenDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.success,
    },
});
