import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { ImageIcon } from './ImageIcon';

interface CustomHeaderProps {
    // No props needed if title is removed, or keep for potential future use but don't render
    title?: string;
}

export const CustomHeader = ({ title }: CustomHeaderProps) => {
    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
                    <ImageIcon name="menu" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.notificationWrapper}>
                        <ImageIcon name="bell" size={24} color={colors.text} />
                        <View style={styles.badge} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('UserProfile' as never)}>
                    <Image
                        source={require('../assets/icons/profile.png')}
                        style={styles.profileImage}
                    />
                    {/* If user has an avatar URL, use that instead */}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 100 : 70, // Adjust for status bar
        paddingTop: Platform.OS === 'ios' ? 40 : 10,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginLeft: 8,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationWrapper: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: colors.white,
    },
    profileButton: {
        marginLeft: 8,
        padding: 4,
    },
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E1E1E1', // Fallback color
    },
});
