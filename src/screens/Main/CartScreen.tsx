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
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>
                ₹{cartStore.totalPrice.toLocaleString()}
              </Text>
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
    paddingBottom: 140, // More space for footer
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    color: lightTheme.colors.slateGray,
  },
  totalValue: {
    fontSize: 24,
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
