import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { OrderHistoryCard } from '../../components/OrderHistoryCard';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';

export const OrderHistoryScreen = observer(() => {
    const { bookingStore } = useRootStore();
    const bookings = bookingStore.bookings;
    const navigation = useNavigation();

    return (
        <ScreenContainer>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Order History</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.container}>

                {bookings.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#888' }}>No order history yet.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={bookings}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <OrderHistoryCard
                                orderId={item.id}
                                date={item.date}
                                items={item.items.map(i => i.title)} // Extract titles
                                totalPrice={item.totalPrice}
                                status={item.status as any}
                                agentName={item.status === 'Completed' ? 'SolarAgent' : undefined}
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
        backgroundColor: '#fff',
    },
    headerTitle: { // Keeping for reference if needed, but unused now
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1E',
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 20,
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
    headerTitleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
});
