import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { colors } from '../../theme/colors';
import { useRootStore } from '../../stores/RootStore';
import { CartItemCard } from '../../components/CartItemCard';

export const CartScreen = observer(() => {
    const { cartStore } = useRootStore();
    const navigation = useNavigation<any>();

    const handleRemove = (id: string) => {
        cartStore.removeFromCart(id);
    };

    const handleEdit = (item: any) => {
        // Navigate to ServiceDetail with the item data
        // Note: Ideally we pass the full service object. 
        // If CartItem acts as a subset, we might strictly need to fetch the full service or rely on what we have.
        // For now, passing the item as 'service' works if the shape matches enough for display.
        navigation.navigate('ServiceDetail', { service: item });
    };

    return (
        <ScreenContainer>
            <View style={styles.container}>
                {/* Header Title removed as per user request */}

                {cartStore.items.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Your cart is empty</Text>
                        <TouchableOpacity
                            style={styles.browseButton}
                            onPress={() => navigation.navigate('Services')}
                        >
                            <Text style={styles.browseButtonText}>Browse Services</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={cartStore.items}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <CartItemCard
                                    title={item.title}
                                    price={item.price}
                                    image={toJS(item.image)}
                                    // Use 'systemSize' if available, otherwise fallback or empty. 
                                    // Previously we only had 'details'. Now we have 'systemSize'.
                                    // For older items (added before this session step), systemSize might be undefined if not migrated.
                                    // But user is adding new items.
                                    systemSize={item.systemSize}
                                    details={item.details}
                                    onRemove={() => handleRemove(item.id)}
                                    onEdit={() => handleEdit(toJS(item))} // This is the old edit
                                    onUpdateSize={(newSize) => cartStore.updateItemSize(item.id, newSize)}
                                />
                            )}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                        />

                        <View style={styles.footer}>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>₹{cartStore.totalPrice.toLocaleString()}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.checkoutButton}
                                onPress={() => navigation.navigate('Checkout')}
                            >
                                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
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
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1E',
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 16,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
        paddingTop: 20, // Added top padding since title is removed
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        color: '#8E8E93',
        marginBottom: 20,
    },
    browseButton: {
        backgroundColor: '#2D44B5',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
    },
    browseButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    totalValue: {
        fontSize: 24,
        color: '#2D44B5',
        fontWeight: '700',
    },
    checkoutButton: {
        backgroundColor: '#2D44B5',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
