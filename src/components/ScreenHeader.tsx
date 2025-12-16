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
                        <ImageIcon name="menu" size={24} color="#2E3A59" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>

                {/* Right: Actions */}
                <View style={styles.rightSection}>
                    {showNotification && (
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('MainStack' as never, { screen: 'Notifications' } as never)}
                        >
                            <ImageIcon name="bell" size={24} color="#2E3A59" />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    )}
                    {showProfile && (
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={() => navigation.navigate('UserProfile' as never)}
                        >
                            <View style={styles.profilePlaceholder}>
                                <ImageIcon name="profile" size={20} color="#FFFFFF" />
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
        borderBottomColor: '#F2F2F7',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    contentContainer: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
        gap: 16,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuButton: {
        padding: 8,
    },
    title: {
        fontFamily: 'NotoSans-Medium',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18.2, // 130% of 14px
        letterSpacing: 0,
        color: '#2E3A59',
        textAlignVertical: 'center',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
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
        marginLeft: 8,
        padding: 4,
    },
    profilePlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
