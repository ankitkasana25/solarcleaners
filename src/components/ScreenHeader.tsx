import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageIcon } from './ImageIcon';

interface ScreenHeaderProps {
    title: string;
    showNotification?: boolean;
    showProfile?: boolean;
}

export const ScreenHeader = ({
    title,
    showNotification = true,
    showProfile = true,
}: ScreenHeaderProps) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.contentContainer}>
                {/* Left: Hamburger and Title */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
                        <ImageIcon name="menu" size={28} color="#000000ff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>

                {/* Right: Actions */}
                <View style={styles.rightSection}>
                    {showNotification && (
                        <TouchableOpacity style={styles.iconButton}>
                            <ImageIcon name="bell" size={24} color="#1C1C1E" />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    )}
                    {showProfile && (
                        <TouchableOpacity style={styles.profileButton}>
                            <View style={styles.profilePlaceholder}>
                                <ImageIcon name="profile" size={20} />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 8,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 50,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 16,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: '#FFF',
    },
    profileButton: {
        marginLeft: 16,
    },
    profilePlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
});
