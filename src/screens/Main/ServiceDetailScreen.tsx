import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRootStore } from '../../stores/RootStore';

import { ScreenContainer } from '../../components/ScreenContainer';
import { ImageIcon } from '../../components/ImageIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';
import { lightTheme } from '../../theme/theme';
import { Toast } from '../../components/Toast';
import { PACKAGE_INCLUDES } from '../../data/servicePackages';

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
  const insets = useSafeAreaInsets();
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

  // Slot Booking State
  const [selectedDate, setSelectedDate] = useState<number>(0); // 0-6 (next 7 days)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = [
    { id: 'morning', label: 'Morning', time: '09:00 AM - 12:00 PM', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 03:00 PM', icon: '☀️' },
    { id: 'evening', label: 'Evening', time: '03:00 PM - 06:00 PM', icon: '🌇' },
  ];

  // Helper to get dates for next 7 days
  const getDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        fullDate: d.toISOString().split('T')[0],
      });
    }
    return dates;
  };
  const dates = getDates();

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  if (!service || !service.id) {
    // Handle case where service data is missing
  }

  // Calculate Price Logic (@ ₹150 per kW)
  const parsedSize = parseFloat(systemSize) || 0;
  const basePrice = 150; // Fixed rate per kW
  const totalPrice = parsedSize * basePrice;

  const handleAddToCart = () => {
    if (!selectedSlot) {
      showToast('Please select a time slot', 'error');
      return;
    }

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
        slotDate: dates[selectedDate].fullDate,
        slotTime: timeSlots.find(s => s.id === selectedSlot)?.time,
      });
      showToast('Added to cart', 'success');
    }
  };

  const handleBuyNow = () => {
    if (!selectedSlot) {
      showToast('Please select a time slot', 'error');
      return;
    }

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
        slotDate: dates[selectedDate].fullDate,
        slotTime: timeSlots.find(s => s.id === selectedSlot)?.time,
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
          <ImageIcon name="arrow-left" size={20} color={colors.headerTitle} />
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
              <ImageIcon name="cart" size={20} color={colors.headerTitle} />
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
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]} // Extra padding for footer
        showsVerticalScrollIndicator={false}
      >
        {/* Image Section */}
        <View style={styles.imageContainer}>
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

          {/* Configuration Section */}
          <View style={styles.configContainer}>
            <View style={styles.configHeader}>
              <Text style={styles.sectionLabel}>Solar System Size</Text>
              <View style={styles.infoIcon}>
                <Text style={styles.infoText}>i</Text>
              </View>
            </View>

            <View style={styles.sizeSection}>
              <View style={styles.sizeInputWrapper}>
                <TextInput
                  value={systemSize}
                  onChangeText={setSystemSize}
                  keyboardType="numeric"
                  style={styles.sizeTextInput}
                />
                <Text style={styles.sizeUnit}>kW</Text>
              </View>
              <View style={styles.dividerVertical} />
              <View style={styles.estimatedPriceContainer}>
                <Text style={styles.estimatedLabel}>Estimated Price</Text>
                <Text style={styles.priceValue}>₹{totalPrice.toLocaleString()}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionHeader}>About this service</Text>
          <Text style={styles.description}>
            {service.description ||
              'A thorough one-time deep cleaning session tailored for heavily soiled panels.'}
          </Text>

          {/* Slot Booking Section */}
          <View style={styles.slotBookingContainer}>
            <Text style={styles.sectionHeader}>Select Schedule</Text>

            {/* Date Selection */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateList}
            >
              {dates.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    selectedDate === index && styles.dateItemActive
                  ]}
                  onPress={() => setSelectedDate(index)}
                >
                  <Text style={[styles.dayName, selectedDate === index && styles.dateTextActive]}>{item.dayName}</Text>
                  <Text style={[styles.dayNum, selectedDate === index && styles.dateTextActive]}>{item.dayNum}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Time Slot Selection */}
            <View style={styles.timeSlotGrid}>
              {timeSlots.map(slot => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlotItem,
                    selectedSlot === slot.id && styles.timeSlotItemActive
                  ]}
                  onPress={() => setSelectedSlot(slot.id)}
                >
                  <View style={styles.slotHeader}>
                    <Text style={styles.slotIcon}>{slot.icon}</Text>
                    <Text style={[styles.slotLabel, selectedSlot === slot.id && styles.slotTextActive]}>{slot.label}</Text>
                  </View>
                  <Text style={[styles.slotTime, selectedSlot === slot.id && styles.slotTimeTextActive]}>{slot.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Package Inclusions */}
          <View style={styles.highlightsContainer}>
            <Text style={styles.sectionHeader}>What's Included</Text>
            {PACKAGE_INCLUDES.map((item, index) => (
              <View key={index} style={styles.highlightRow}>
                <View style={styles.checkContainer}>
                  <Ionicons name="checkmark-circle" size={18} color={lightTheme.colors.primaryBlue} />
                </View>
                <Text style={styles.bulletPoint}>{item}</Text>
              </View>
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
                <Text style={{ fontSize: 22 }}>{benefit.icon}</Text>
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDesc}>{benefit.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Premium Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <View style={styles.priceContainer}>
          <Text style={styles.footerPriceLabel}>Total Pay</Text>
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
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    zIndex: 10,
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
    flex: 1,
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
    color: colors.headerTitle,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: lightTheme.colors.redOrange,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'NotoSans-Bold',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    width: width,
    height: 260,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    lineHeight: 28,
    marginRight: 10,
  },
  categoryBadge: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: lightTheme.colors.primaryBlue,
    fontFamily: 'NotoSans-Bold',
    fontSize: 11,
    textTransform: 'uppercase',
  },

  // New Config Container
  configContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  configHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
  },
  infoIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 10,
    color: '#BDBDBD',
    fontWeight: 'bold',
  },
  sizeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  sizeInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sizeTextInput: {
    fontSize: 20,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    padding: 0,
    minWidth: 40,
  },
  sizeUnit: {
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    color: '#8E8E93',
    marginLeft: 4,
    marginTop: 2,
  },
  dividerVertical: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  estimatedPriceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  estimatedLabel: {
    fontSize: 10,
    fontFamily: 'NotoSans-Medium',
    color: '#8E8E93',
    marginBottom: 2,
  },
  priceValue: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 18,
    color: lightTheme.colors.primaryBlue,
  },

  // Slot Booking Styles
  slotBookingContainer: {
    marginBottom: 24,
  },
  dateList: {
    paddingVertical: 10,
    gap: 12,
  },
  dateItem: {
    width: 60,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  dateItemActive: {
    backgroundColor: lightTheme.colors.primaryBlue,
    borderColor: lightTheme.colors.primaryBlue,
  },
  dayName: {
    fontSize: 12,
    fontFamily: 'NotoSans-Medium',
    color: '#8E8E93',
  },
  dayNum: {
    fontSize: 18,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    marginTop: 2,
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  timeSlotGrid: {
    marginTop: 16,
    gap: 10,
  },
  timeSlotItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  timeSlotItemActive: {
    backgroundColor: '#F0F7FF',
    borderColor: lightTheme.colors.primaryBlue,
  },
  slotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  slotIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  slotLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
  },
  slotTime: {
    fontSize: 12,
    fontFamily: 'NotoSans-Regular',
    color: '#8E8E93',
  },
  slotTextActive: {
    color: lightTheme.colors.primaryBlue,
  },
  slotTimeTextActive: {
    color: '#5C9CE6',
  },

  sectionHeader: {
    fontSize: 16,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: '#666666',
    lineHeight: 22,
    marginBottom: 24,
  },
  highlightsContainer: {
    marginBottom: 24,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bulletPoint: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    color: '#444444',
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 0.5,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 15,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  benefitDesc: {
    fontSize: 12,
    fontFamily: 'NotoSans-Regular',
    color: '#8E8E93',
  },

  // Premium Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footerPriceLabel: {
    fontSize: 12,
    fontFamily: 'NotoSans-Medium',
    color: '#8E8E93',
    marginBottom: 2,
  },
  footerPrice: {
    fontSize: 22,
    fontFamily: 'NotoSans-Bold',
    color: lightTheme.colors.primaryBlue,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  addToCartButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    height: 44,
  },
  addToCartText: {
    color: '#424242',
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
  },
  buyNowButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: lightTheme.colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
    height: 44,
    shadowColor: lightTheme.colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buyNowText: {
    color: '#fff',
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
  },
});
