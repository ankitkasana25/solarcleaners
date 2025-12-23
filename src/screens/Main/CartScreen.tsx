import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useNavigation } from '@react-navigation/native';

import { lightTheme } from '../../theme/theme';
import { useRootStore } from '../../stores/RootStore';
import { CartItemCard } from '../../components/CartItemCard';

export const CartScreen = observer(() => {
  const { cartStore } = useRootStore();
  const navigation = useNavigation<any>();

  const handleRemove = (id: string) => {
    cartStore.removeFromCart(id);
  };

  const handleEdit = (item: any) => {
    navigation.navigate('ServiceDetail', { service: item });
  };

  return (
    <View style={styles.container}>
      {cartStore.items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Text style={{ fontSize: 50 }}>🛒</Text>
          </View>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubText}>
            Looks like you haven't added any services yet.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Services')}
            activeOpacity={0.9}
          >
            <Text style={styles.browseButtonText}>Browse Services</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartStore.items}
            keyExtractor={item => item.id}
            ListFooterComponent={() => (
              <View style={styles.appliedOffersSection}>
                {cartStore.appliedOffers.map(offer => (
                  <View key={offer.id} style={styles.offerCard}>
                    <View style={styles.offerInfo}>
                      <View style={styles.offerBadge}>
                        <Text style={styles.offerBadgeText}>OFFER APPLIED</Text>
                      </View>
                      <Text style={styles.offerTitle}>{offer.title}</Text>
                      <Text style={styles.offerDescription}>{offer.description} • {offer.discount}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => cartStore.removeOffer(offer.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.removeOfferText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            renderItem={({ item }) => (
              <CartItemCard
                title={item.title}
                price={item.price}
                image={toJS(item.image)}
                systemSize={item.systemSize}
                details={item.details}
                onRemove={() => handleRemove(item.id)}
                onEdit={() => handleEdit(toJS(item))}
                onUpdateSize={newSize =>
                  cartStore.updateItemSize(item.id, newSize)
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <View style={styles.priceBreakdown}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Subtotal</Text>
                <Text style={styles.breakdownValue}>₹{cartStore.cartSubTotal.toLocaleString()}</Text>
              </View>
              {cartStore.appliedOffers.length > 0 && (
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Discount</Text>
                  <Text style={[styles.breakdownValue, { color: '#2ED97B' }]}>-₹{cartStore.discountAmount.toLocaleString()}</Text>
                </View>
              )}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>
                  ₹{cartStore.totalPrice.toLocaleString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
              activeOpacity={0.9}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
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
    paddingBottom: 220, // Increased to fit price breakdown
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
  emptySubText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: lightTheme.colors.slateGray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  browseButton: {
    backgroundColor: lightTheme.colors.primaryBlue,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: lightTheme.colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  appliedOffersSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: lightTheme.colors.primaryBlue,
    marginBottom: 12,
  },
  offerInfo: {
    flex: 1,
  },
  offerBadge: {
    backgroundColor: lightTheme.colors.primaryBlue,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  offerBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: 'NotoSans-Bold',
  },
  offerTitle: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
  },
  offerDescription: {
    fontSize: 12,
    fontFamily: 'NotoSans-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  removeOfferText: {
    fontSize: 12,
    fontFamily: 'NotoSans-Bold',
    color: '#FF4B4B',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  priceBreakdown: {
    marginBottom: 20,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: lightTheme.colors.slateGray,
  },
  breakdownValue: {
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    color: '#1C1C1E',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
  },
  totalValue: {
    fontSize: 22,
    fontFamily: 'NotoSans-Bold',
    color: lightTheme.colors.primaryBlue,
  },
  checkoutButton: {
    backgroundColor: lightTheme.colors.primaryBlue,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: lightTheme.colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'NotoSans-Bold',
  },
});

