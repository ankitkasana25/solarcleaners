import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';

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

    return (
        <ScreenContainer>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.container}>
                <FlatList
                    data={dummyNotifications}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.notificationCard, !item.read && styles.unreadCard]}>
                            <View style={styles.iconContainer}>
                                <Ionicons
                                    name={item.title.includes('Offer') ? 'pricetag' : 'notifications'}
                                    size={24}
                                    color={colors.primary}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.message}>{item.message}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            {!item.read && <View style={styles.unreadDot} />}
                        </View>
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
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    listContent: {
        padding: 16,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        alignItems: 'flex-start',
    },
    unreadCard: {
        backgroundColor: '#F4F9FF',
        borderColor: 'rgba(45, 68, 181, 0.1)',
    },
    iconContainer: {
        marginRight: 16,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
        marginLeft: 8,
        marginTop: 6,
    },
});
