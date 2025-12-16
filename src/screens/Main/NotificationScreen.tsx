import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { ImageIcon } from '../../components/ImageIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';
import { lightTheme } from '../../theme/theme';

// Dummy Notifications
const dummyNotifications = [
    {
        id: '1',
        title: 'Order Confirmed',
        message: 'Your order #ORD-2023-001 has been confirmed.',
        time: '2 hours ago',
        read: false,
    },
    {
        id: '2',
        title: 'Service Completed',
        message: 'Agent Rajesh Kumar has completed the service for #ORD-2023-002.',
        time: '1 day ago',
        read: true,
    },
    {
        id: '3',
        title: 'New Offer',
        message: 'Get 20% off on your next cleaning service! Use code SOLAR20.',
        time: '2 days ago',
        read: true,
    },
];

export const NotificationScreen = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <ScreenContainer style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <ImageIcon name="arrow-left" size={20} color={colors.headerTitle} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <FlatList
                    data={dummyNotifications}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.notificationCard, !item.read && styles.unreadCard]}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer,
                            { backgroundColor: item.title.includes('Offer') ? 'rgba(255, 159, 10, 0.1)' : 'rgba(13, 129, 252, 0.1)' }
                            ]}>
                                <Ionicons
                                    name={item.title.includes('Offer') ? 'pricetag' : 'notifications'}
                                    size={20}
                                    color={item.title.includes('Offer') ? lightTheme.colors.secondaryOrange : lightTheme.colors.primaryBlue}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <View style={styles.titleRow}>
                                    <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
                                    <Text style={styles.time}>{item.time}</Text>
                                </View>
                                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                            </View>
                            {!item.read && <View style={styles.unreadDot} />}
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#FAFAFA',
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: colors.headerTitle,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        padding: 20,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 1,
    },
    unreadCard: {
        backgroundColor: '#F8FBFF',
        borderColor: '#E3F2FD',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        flex: 1,
        marginRight: 8,
    },
    unreadTitle: {
        color: lightTheme.colors.primaryBlue,
    },
    message: {
        fontSize: 13,
        fontFamily: 'NotoSans-Regular',
        color: '#666',
        lineHeight: 18,
    },
    time: {
        fontSize: 10,
        fontFamily: 'NotoSans-Medium',
        color: '#999',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: lightTheme.colors.primaryBlue,
        marginLeft: 8,
        marginTop: 6,
    },
});
