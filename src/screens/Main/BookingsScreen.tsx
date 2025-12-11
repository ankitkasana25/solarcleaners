import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';
import { BookingCard } from '../../components/BookingCard';
import { colors } from '../../theme/colors';

export const BookingsScreen = observer(() => {
    const { bookingStore } = useRootStore();
    const bookings = bookingStore.bookings;

    return (
        <ScreenContainer>
            <View style={styles.container}>
                {/* Header text removed as per request */}

                {bookings.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No bookings found.</Text>
                        <Text style={styles.subEmptyText}>Your upcoming services will appear here.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={bookings}
                        keyExtractor={(item) => item.id}
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
        </ScreenContainer>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1E',
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 10,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    subEmptyText: {
        fontSize: 14,
        color: '#999',
    },
});

