import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { ImageIcon } from '../../components/ImageIcon'; // Use ImageIcon for consistency
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';
import { lightTheme } from '../../theme/theme';
import { BookingCalendar } from '../../components/BookingCalendar';

export const CheckoutScreen = observer(() => {
    const { cartStore, bookingStore } = useRootStore();
    const navigation = useNavigation<any>();
    const [paymentMethod, setPaymentMethod] = useState<'Pay on Visit' | 'UPI'>('Pay on Visit');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedTime, setSelectedTime] = useState<string | undefined>();
    const insets = useSafeAreaInsets();

    const handlePlaceOrder = () => {
        if (cartStore.items.length === 0) {
            Alert.alert('Cart is empty');
            return;
        }

        if (!selectedDate || !selectedTime) {
            Alert.alert('Select Date & Time', 'Please select your preferred date and time slot for the service.');
            return;
        }

        // Add to bookings
        bookingStore.addBooking({
            items: [...cartStore.items],
            totalPrice: cartStore.totalPrice,
            paymentMethod: paymentMethod,
            scheduledDate: selectedDate,
            scheduledTime: selectedTime,
        });

        // Clear cart
        cartStore.items = [];

        // Navigate to Success
        navigation.navigate('OrderSuccess');
    };

    return (
        <ScreenContainer style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <ImageIcon name="arrow-left" size={20} color={colors.headerTitle} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}>
                {/* Order Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.card}>
                        {cartStore.items.map((item, index) => (
                            <View key={index} style={styles.itemRowWrapper}>
                                <View style={styles.itemRow}>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemTitle}>{item.title}</Text>
                                        <Text style={styles.itemSubtitle}>
                                            Qty: {item.quantity} {item.systemSize ? `• ${item.systemSize} kW` : ''}
                                        </Text>
                                    </View>
                                    <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</Text>
                                </View>
                                {index < cartStore.items.length - 1 && <View style={styles.divider} />}
                            </View>
                        ))}

                        <View style={styles.totalDivider} />

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>₹{cartStore.totalPrice.toLocaleString()}</Text>
                        </View>
                    </View>
                </View>

                {/* Booking Calendar Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📅 Schedule Your Service</Text>
                    <View style={styles.card}>
                        <BookingCalendar
                            onDateSelect={setSelectedDate}
                            onTimeSelect={setSelectedTime}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                        />
                    </View>
                </View>

                {/* Payment Method Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>

                    <TouchableOpacity
                        style={[styles.methodCard, paymentMethod === 'Pay on Visit' && styles.selectedMethodCard]}
                        onPress={() => setPaymentMethod('Pay on Visit')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.radioContainer}>
                            <View style={[styles.radioOuter, paymentMethod === 'Pay on Visit' && styles.radioOuterSelected]}>
                                {paymentMethod === 'Pay on Visit' && <View style={styles.radioInner} />}
                            </View>
                        </View>
                        <View style={styles.methodContent}>
                            <Text style={styles.methodTitle}>Pay on Visit</Text>
                            <Text style={styles.methodSubtitle}>Cash or Card after service</Text>
                        </View>
                        <Ionicons name="card-outline" size={24} color={paymentMethod === 'Pay on Visit' ? lightTheme.colors.primaryBlue : '#BDBDBD'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.methodCard, paymentMethod === 'UPI' && styles.selectedMethodCard]}
                        onPress={() => setPaymentMethod('UPI')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.radioContainer}>
                            <View style={[styles.radioOuter, paymentMethod === 'UPI' && styles.radioOuterSelected]}>
                                {paymentMethod === 'UPI' && <View style={styles.radioInner} />}
                            </View>
                        </View>
                        <View style={styles.methodContent}>
                            <Text style={styles.methodTitle}>UPI / Netbanking</Text>
                            <Text style={styles.methodSubtitle}>Secure online payment</Text>
                        </View>
                        <Ionicons name="card-outline" size={24} color={paymentMethod === 'UPI' ? lightTheme.colors.primaryBlue : '#BDBDBD'} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
                <View style={styles.footerTotal}>
                    <Text style={styles.footerTotalLabel}>Total to Pay</Text>
                    <Text style={styles.footerTotalValue}>₹{cartStore.totalPrice.toLocaleString()}</Text>
                </View>
                <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder} activeOpacity={0.9}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Premium gray background
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
    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 12,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 1,
    },
    itemRowWrapper: {
        marginBottom: 12,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemInfo: {
        flex: 1,
        paddingRight: 12,
    },
    itemTitle: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    itemSubtitle: {
        fontSize: 12,
        fontFamily: 'NotoSans-Regular',
        color: '#8E8E93',
    },
    itemPrice: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginTop: 12,
    },
    totalDivider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 12,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    totalLabel: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
    },
    totalValue: {
        fontSize: 18,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
    },

    // Payment Methods
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    selectedMethodCard: {
        borderColor: lightTheme.colors.primaryBlue,
        backgroundColor: '#F0F7FF',
    },
    radioContainer: {
        marginRight: 16,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D1D1D6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterSelected: {
        borderColor: lightTheme.colors.primaryBlue,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: lightTheme.colors.primaryBlue,
    },
    methodContent: {
        flex: 1,
    },
    methodTitle: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    methodSubtitle: {
        fontSize: 12,
        fontFamily: 'NotoSans-Regular',
        color: '#8E8E93',
    },

    // Footer
    footer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 10,
    },
    footerTotal: {
        flex: 1,
    },
    footerTotalLabel: {
        fontSize: 12,
        fontFamily: 'NotoSans-Medium',
        color: '#8E8E93',
    },
    footerTotalValue: {
        fontSize: 20,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
    },
    placeOrderButton: {
        backgroundColor: lightTheme.colors.primaryBlue,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    placeOrderText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
    },
});
