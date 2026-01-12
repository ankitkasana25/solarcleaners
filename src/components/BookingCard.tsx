import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { lightTheme } from '../theme/theme';

interface BookingCardProps {
    id: string;
    items: any[];
    totalPrice: number;
    date: string;
    status: string;
    description?: string;
}

export const BookingCard = ({ id, items, totalPrice, date, status, description }: BookingCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return lightTheme.colors.deepGreen; // Success
            case 'Confirmed': return lightTheme.colors.primaryBlue; // Primary
            case 'Pending': return lightTheme.colors.subscribeGold; // Warning/Info
            case 'Cancelled': return lightTheme.colors.redOrange; // Error
            default: return lightTheme.colors.slateGray;
        }
    };

    const statusColor = getStatusColor(status);

    // Construct a title from items if not provided
    const displayTitle = items.length > 0
        ? `${items[0].title} ${items.length > 1 ? `+ ${items.length - 1} more` : ''}`
        : 'Service Booking';

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.idContainer}>
                    <Text style={styles.idLabel}>Order ID</Text>
                    <Text style={styles.idText}>#{id.slice(-6).toUpperCase()}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.content}>
                <Text style={styles.title}>{displayTitle}</Text>
                <Text style={styles.date}>Date: {date}</Text>

                <View style={styles.itemsContainer}>
                    {items.map((item, idx) => (
                        <Text key={idx} style={styles.detailText}>
                            • {item.title} {item.systemSize ? `(${item.systemSize} kW)` : ''}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.priceLabel}>Total Paid</Text>
                <Text style={styles.price}>₹{totalPrice.toLocaleString()}</Text>
            </View>

            {/* Support Section */}
            <View style={styles.supportSection}>
                <Text style={styles.supportTitle}>Need Help? Contact Technician</Text>
                <View style={styles.supportActionRow}>
                    <TouchableOpacity
                        style={[styles.supportAction, { backgroundColor: lightTheme.colors.primaryBlue }]}
                        onPress={() => Linking.openURL('tel:9799802000').catch(() => Alert.alert('Error', 'Unable to call'))}
                    >
                        <Ionicons name="call" size={16} color="#FFF" />
                        <Text style={styles.supportActionText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.supportAction, { backgroundColor: '#25D366' }]}
                        onPress={() => Linking.openURL('whatsapp://send?phone=919799802000&text=Help with Booking #' + id.slice(-6).toUpperCase()).catch(() => Alert.alert('Error', 'WhatsApp not found'))}
                    >
                        <Ionicons name="logo-whatsapp" size={16} color="#FFF" />
                        <Text style={styles.supportActionText}>WhatsApp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F2F2F7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    idContainer: {
        flexDirection: 'column',
    },
    idLabel: {
        fontSize: 10,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.slateGray,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    idText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'NotoSans-Bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F7',
        marginBottom: 16,
    },
    content: {
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    date: {
        fontSize: 13,
        fontFamily: 'NotoSans-Regular',
        color: lightTheme.colors.slateGray,
        marginBottom: 12,
    },
    itemsContainer: {
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 12,
    },
    detailText: {
        fontSize: 13,
        fontFamily: 'NotoSans-Medium',
        color: '#444',
        marginBottom: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F7',
        paddingTop: 16,
    },
    priceLabel: {
        fontSize: 13,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.slateGray,
    },
    price: {
        fontSize: 18,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
    },
    supportSection: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F7',
    },
    supportTitle: {
        fontSize: 12,
        fontFamily: 'NotoSans-Bold',
        color: '#4A5568',
        marginBottom: 12,
        textAlign: 'center',
    },
    supportActionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    supportAction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        gap: 8,
    },
    supportActionText: {
        color: '#FFF',
        fontSize: 13,
        fontFamily: 'NotoSans-Bold',
    },
});
