import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CheckoutScreen = observer(() => {
    const { cartStore, bookingStore } = useRootStore();
    const navigation = useNavigation<any>();
    const [paymentMethod, setPaymentMethod] = useState<'Pay on Visit' | 'UPI'>('Pay on Visit');

    const handlePlaceOrder = () => {
        if (cartStore.items.length === 0) {
            Alert.alert('Cart is empty');
            return;
        }

        // Add to bookings
        bookingStore.addBooking({
            items: [...cartStore.items],
            totalPrice: cartStore.totalPrice,
            paymentMethod: paymentMethod,
        });

        // Clear cart
        cartStore.items = [];

        // Navigate to Success
        navigation.navigate('OrderSuccess');
    };

    return (
        <ScreenContainer>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#2E3A59" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 40 }} /> {/* Spacer to balance title */}
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    {cartStore.items.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                            <Text style={styles.itemText}>
                                {item.title} x {item.quantity}
                                {item.systemSize ? ` (${item.systemSize} kW)` : ''}
                            </Text>
                            <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalText}>Total Amount</Text>
                        <Text style={styles.totalPrice}>₹{cartStore.totalPrice.toLocaleString()}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>

                    <TouchableOpacity
                        style={[styles.methodCard, paymentMethod === 'Pay on Visit' && styles.selectedMethod]}
                        onPress={() => setPaymentMethod('Pay on Visit')}
                    >
                        <Ionicons name={paymentMethod === 'Pay on Visit' ? "radio-button-on" : "radio-button-off"} size={24} color="#2D44B5" />
                        <Text style={styles.methodText}>Pay on Visit (Cash/Card)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.methodCard, paymentMethod === 'UPI' && styles.selectedMethod]}
                        onPress={() => setPaymentMethod('UPI')}
                    >
                        <Ionicons name={paymentMethod === 'UPI' ? "radio-button-on" : "radio-button-off"} size={24} color="#2D44B5" />
                        <Text style={styles.methodText}>UPI / Netbanking</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.payButton} onPress={handlePlaceOrder}>
                    <Text style={styles.payButtonText}>Place Order</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenContainer>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
        gap: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontFamily: 'NotoSans-Medium',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18.2,
        letterSpacing: 0,
        color: '#2E3A59',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemText: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2D44B5',
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        marginBottom: 12,
    },
    selectedMethod: {
        borderColor: '#2D44B5',
        backgroundColor: 'rgba(45, 68, 181, 0.05)',
    },
    methodText: {
        fontSize: 16,
        color: '#1C1C1E',
        marginLeft: 12,
    },
    payButton: {
        backgroundColor: '#2D44B5',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
