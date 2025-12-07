import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerItem } from '../components/drawer/DrawerItem';
import { DrawerDropdownItem } from '../components/drawer/DrawerDropdownItem';
import { DrawerSectionHeader } from '../components/drawer/DrawerSectionHeader';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Top Logo Area */}
                <View style={styles.logoContainer}>
                    <Icon name="weather-cloudy" size={40} color={colors.gold} />
                </View>

                {/* Main Menu Items */}
                <DrawerItem
                    label="Profile"
                    iconName="account-outline"
                    onPress={() => props.navigation.navigate('MainTabs', { screen: 'Profile' })}
                />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    logoContainer: {
        marginBottom: 20,
        marginTop: 10,
    },
});
