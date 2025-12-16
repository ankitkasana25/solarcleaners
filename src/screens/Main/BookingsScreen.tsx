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
                    <View style={styles.emptyIconContainer}>
                        <Text style={{ fontSize: 50 }}>📅</Text>
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

