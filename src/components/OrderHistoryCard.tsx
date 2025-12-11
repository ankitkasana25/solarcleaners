import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

interface OrderHistoryCardProps {
    orderId: string;
    date: string;
    items: string[];
    totalPrice: number;
    status: 'Completed' | 'Pending' | 'Cancelled' | 'In Progress' | 'Confirmed';
    agentName?: string;
}

export const OrderHistoryCard = ({ orderId, date, items, totalPrice, status, agentName }: OrderHistoryCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return '#4CAF50';
            case 'Confirmed': return '#4CAF50'; // Same as completed or maybe separate color
            case 'In Progress': return '#2196F3';
            case 'Pending': return '#FF9800';
            case 'Cancelled': return '#F44336';
            default: return '#999';
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.orderId}>Order #{orderId}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) + '15' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(status) }]}>{status}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.serviceName}>{items.join(', ')}</Text>
                <Text style={styles.date}>{date}</Text>

                {agentName && (
                    <View style={styles.agentContainer}>
                        <Text style={styles.agentLabel}>Service Agent:</Text>
                        <Text style={styles.agentName}>{agentName}</Text>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalPrice}>₹{totalPrice.toLocaleString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F7',
    },
    orderId: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    content: {
        marginBottom: 16,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 12,
    },
    agentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 8,
        borderRadius: 8,
    },
    agentLabel: {
        fontSize: 13,
        color: '#666',
        marginRight: 6,
    },
    agentName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2D44B5',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 14,
        color: '#8E8E93',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2D44B5',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
});
