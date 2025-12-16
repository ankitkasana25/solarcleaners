import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../stores/RootStore';
import { ScreenContainer } from '../../components/ScreenContainer';
import { ImageIcon } from '../../components/ImageIcon';
import { colors } from '../../theme/colors';
import { Toast } from '../../components/Toast';

const { width } = Dimensions.get('window');

// Interface for service data passed via navigation
interface ServiceData {
  id: string;
  title: string;
  price: number;
  image: any;
  description?: string;
  category?: string;
  technicalHighlights?: string[];
  benefits?: Array<{ icon: string; title: string; description: string }>;
}

export const ServiceDetailScreen = observer(() => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { service } = (route.params as { service: ServiceData }) || {
    service: {},
  };
  const { cartStore } = useRootStore();
  const [systemSize, setSystemSize] = useState('1.0');

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>(
    'info',
  );

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  if (!service || !service.id) {
    // ...
  }

  // Calculate Price Logic
  const parsedSize = parseFloat(systemSize) || 0;
  const basePrice = service.price && service.price > 0 ? service.price : 500; // Default base price to 500
  const totalPrice = parsedSize * basePrice;

  const handleAddToCart = () => {
    // Check if item already exists in cart
    const existingItem = cartStore.items.find(item => item.id === service.id);

    if (existingItem) {
      showToast('Already in the cart', 'info');
    } else {
      cartStore.addToCart({
        id: service.id,
        title: service.title,
        price: totalPrice,
        basePrice: basePrice,
        systemSize: systemSize,
        image: service.image,
        details: `${systemSize} kW System`,
      });
      showToast('Added to cart', 'success');
    }
  };

  const handleBuyNow = () => {
    // Update cart item price if it exists or add new
    // For simplicity, we just navigate if it exists, but ideally we'd update the price based on new size selection
    // Given the requirement "already in cart" toast, we might not update existing items easily without more complex logic.
    // Let's stick to the add-if-not-exists pattern.
    const existingItem = cartStore.items.find(item => item.id === service.id);
    if (!existingItem) {
      cartStore.addToCart({
        id: service.id,
        title: service.title,
        price: totalPrice,
        basePrice: basePrice,
        systemSize: systemSize,
        image: service.image,
        details: `${systemSize} kW System`,
      });
    }
    navigation.navigate('MainTabs', { screen: 'Cart' });
  };

  return (
    <ScreenContainer style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <ImageIcon name="arrow-left" size={18} color="#2E3A59" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {service.title}
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
          >
            <View>
              <ImageIcon name="cart" size={20} color="#2E3A59" />
              {cartStore.totalCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartStore.totalCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={() => setToastVisible(false)}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Section */}
        <View style={styles.imageContainer}>
          {/* Handle both remote URI and local require/import images */}
          <Image
            source={service.image?.uri ? service.image : { uri: service.image }}
            style={styles.image as any}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{service.title}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {service.category || 'Service'}
              </Text>
            </View>
          </View>

          {/* Size Selector Mockup */}
          <View style={styles.sizeSection}>
            <Text style={styles.sectionLabel}>Solar System Size (kW):</Text>
            <View style={styles.sizeInput}>
              <TextInput
                value={systemSize}
                onChangeText={setSystemSize}
                keyboardType="numeric"
                style={styles.sizeTextInput}
              />
              <Text style={styles.sizeUnit}>kW</Text>
            </View>
          </View>

          <Text style={styles.priceDisplay}>
            Total Price:{' '}
            <Text style={styles.priceValue}>
              ₹{totalPrice.toLocaleString()}
            </Text>
          </Text>

          <Text style={styles.sectionHeader}>About this service</Text>
          <Text style={styles.description}>
            {service.description ||
              'A thorough one-time deep cleaning session tailored for heavily soiled panels.'}
          </Text>

          {/* Technical Highlights */}
          <View style={styles.highlightsContainer}>
            <Text style={styles.sectionHeader}>Technical Highlights</Text>
            {(
              service.technicalHighlights || [
                'Targets heavy grime: moss, sap, lichen, cement dust.',
                'Can recover up to 30-40% of lost output.',
                'Provides early detection of micro-cracks or hotspots.',
              ]
            ).map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                {index + 1}. {item}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionHeader}>Benefits</Text>
          {(
            service.benefits || [
              {
                icon: '⚡',
                title: 'Improved Efficiency',
                description: "Maximize your system's output",
              },
              {
                icon: '💰',
                title: 'Cost Savings',
                description: 'Reduce long-term maintenance costs',
              },
            ]
          ).map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Text style={{ fontSize: 20 }}>{benefit.icon}</Text>
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDesc}>{benefit.description}</Text>
              </View>
            </View>
          ))}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.footerPriceLabel}>Total Price</Text>
          <Text style={styles.footerPrice}>₹{totalPrice.toLocaleString()}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buyNowButton}
            onPress={handleBuyNow}
            activeOpacity={0.9}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

    borderBottomColor: '#F2F2F7',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconButton: {
    padding: 8,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'NotoSans-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18.2, // 130% of 14px
    letterSpacing: 0,
    color: '#2E3A59',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  imageContainer: {
    width: width,
    height: 250,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    padding: 20,
    top: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#1C1C1E',
    marginRight: 10,
  },
  categoryBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#1976D2',
    fontWeight: '700',
    fontSize: 12,
  },
  sizeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  sizeInput: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: 100,
    height: 40,
  },
  sizeTextInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
    padding: 0,
  },
  sizeUnit: {
    color: '#8E8E93',
    fontWeight: '500',
  },
  priceDisplay: {
    fontSize: 18,
    color: '#2D44B5',
    fontWeight: '500',
    marginBottom: 24,
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: 12,
  },
  priceValue: {
    fontWeight: '600',
    fontSize: 22,
    color: '#2D44B5',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
    color: '#1C1C1E',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  highlightsContainer: {
    marginBottom: 20,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  benefitDesc: {
    fontSize: 13,
    color: '#8E8E93',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  priceContainer: {
    flex: 0.4,
  },
  footerPriceLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D44B5',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    flex: 0.6,
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  buyNowButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buyNowText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
