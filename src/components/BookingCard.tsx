import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

interface BookingCardProps {
    id: string;
    items: any[];
    totalPrice: number;
    date: string;
    status: string;
    description?: string; // Optional single line summary
}

export const BookingCard = ({ id, items, totalPrice, date, status, description }: BookingCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return '#4CAF50';
            case 'Confirmed': return '#2196F3';
            case 'Pending': return '#FF9800';
            case 'Cancelled': return '#F44336';
            default: return '#999';
        }
    };

    // Construct a title from items if not provided
    const displayTitle = items.length > 0
        ? `${items[0].title} ${items.length > 1 ? `+ ${items.length - 1} more` : ''}`
        : 'Service Booking';

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.date}>{date}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(status) }]}>{status}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{displayTitle}</Text>
                <Text style={styles.id}>ID: {id}</Text>
                {items.map((item, idx) => (
                    <Text key={idx} style={styles.detailText}>
                        • {item.title} ({item.details || 'Standard'}) - x{item.quantity}
                    </Text>
                ))}
            </View>

            <View style={styles.footer}>
                <Text style={styles.priceLabel}>Total Paid</Text>
                <Text style={styles.price}>₹{totalPrice.toLocaleString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E5EA',
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
    },
    date: {
        fontSize: 14,
        color: '#8E8E93',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    id: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F9',
        paddingTop: 12,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2D44B5',
    },
});
