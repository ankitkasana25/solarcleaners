import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';
import { BookingCard } from '../../components/BookingCard';
import { lightTheme } from '../../theme/theme';

export const BookingsScreen = observer(() => {
    const { bookingStore } = useRootStore();
    const bookings = bookingStore.bookings;

    return (
        <View style={styles.container}>
            {bookings.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconWrapper}>
                        <View style={styles.calendarIcon}>
                            <View style={styles.calendarHeader}>
                                <Text style={styles.calendarMonth}>
                                    {new Date().toLocaleString('en-US', { month: 'long' })}
                                </Text>
                            </View>
                            <View style={styles.calendarBody}>
                                <Text style={styles.calendarDay}>
                                    {new Date().getDate()}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.emptyText}>No bookings found</Text>
                    <Text style={styles.subEmptyText}>
                        Your upcoming services will appear here.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <BookingCard
                            id={item.id}
                            items={item.items}
                            totalPrice={item.totalPrice}
                            date={item.date}
                            status={item.status}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: -60,
    },
    emptyIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F5F7FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyIconWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F5F7FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    calendarIcon: {
        width: 60,
        height: 65,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: '#E0E4EB',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    calendarHeader: {
        backgroundColor: '#FF4B4B',
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarMonth: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    calendarBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarDay: {
        fontSize: 24,
        fontFamily: 'NotoSans-Bold',
        color: '#2E3A59',
    },
    emptyText: {
        fontSize: 20,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        marginBottom: 8,
    },
    subEmptyText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Regular',
        color: lightTheme.colors.slateGray,
        textAlign: 'center',
        lineHeight: 22,
    },
});

