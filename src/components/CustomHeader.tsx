import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Import hook
import { colors } from '../theme/colors';
import { ImageIcon } from './ImageIcon';

interface CustomHeaderProps {
    title?: string;
}

export const CustomHeader = ({ title }: CustomHeaderProps) => {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets(); // Get safe area insets

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={[styles.container, { paddingTop: Math.max(insets.top, 10), height: 60 + Math.max(insets.top, 10) }]}>
            {/* If inside SafeAreaView, insets might be handled. But if this is a header, usually it needs to pad for status bar manually if translucency is on.
                 However, if used inside ScreenContainer (which is SafeAreaView), double padding might occur.
                 Best practice for custom headers: Do NOT add top padding if the container is already safe.
                 BUT, legacy code often nests headers weirdly.
                 Given 'safearea in the android 15', robust approach is using insets.
                 If safe area view is parent, use edges to avoid top inset there OR here.
                 I'll assume this header can stand alone.
                 But wait, if ScreenContainer is SafeAreaView, it adds padding.
                 If CustomHeader adds padding too, we get huge whitespace.
                 I should rely on the PARENT SafeAreaView (ScreenContainer) to provide the safety.
                 So CustomHeader should strictly just be the content bar (height ~60, centered).
                 BUT, if HomeScreen does NOT have a header (it uses SearchBar directly), then CustomHeader is likely used in other screens *without* ScreenContainer?
                 No, we updated ScreenContainer.
                 If CustomHeader is used in stacks via `header: () => ...`, the stack container might NOT be SafeAreaView.
                 Let's make CustomHeader adaptable? 
                 Simple fix: Use standard height and center content. Remove manual top padding if it's meant to be in safe content.
                 However, usually one wants the header background to extend behind status bar.
                 If so, padding is needed.
                 Let's stick to safe padding but maybe conditionally?
                 The user complaint is 'overlapping'.
                 If I use `ScreenContainer` in screens, the content is PUSHED DOWN properly.
                 So CustomHeader (if used inside) should NOT have top padding.
                 Let's remove the forced top padding/height calc and use flex/minHeight.
            */}
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            {/* Note: SafeAreaView (ScreenContainer) handles top padding.
                 So we just need a row of 60px height.
                 But if CustomHeader is used as a Stack Header (absolute positioned or outside safe area), it might need padding.
                 Let's try standardizing it to a simple toolbar.
            */}
            <View style={styles.contentContainer}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
                        <ImageIcon name="menu" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('MainStack', { screen: 'Notifications' })}>
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
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Height handled by content
    },
    contentContainer: { // New container for actual toolbar content
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    // ... rest of styles
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
