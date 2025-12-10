import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Share,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { ImageIcon } from '../../components/ImageIcon';

const { width } = Dimensions.get('window');

interface ServiceDetailRouteParams {
  service: {
    id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    discount?: string;
    description: string;
    technicalHighlights?: string[];
    benefits?: Array<{ icon: string; title: string; description: string }>;
    addOns?: Array<{
      id: string;
      title: string;
      description: string;
      price: number;
      duration: string;
      popular?: boolean;
    }>;
  };
}

export const ServiceDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = (route.params as ServiceDetailRouteParams) || {};

  const [systemSize, setSystemSize] = useState('5.0');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this service: ${service?.title}\nPrice: ₹${service?.price}\n\nBook now on SolarCleaners app!`,
        title: service?.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAddToCart = () => {
    Alert.alert('Success', 'Service added to cart!', [
      { text: 'Continue Shopping', style: 'cancel' },
      { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  const handleBookNow = () => {
    Alert.alert('Book Service', 'Proceed with booking this service?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Continue', style: 'default' },
    ]);
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId],
    );
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQs(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  };

  const calculateTotal = () => {
    let total = service?.price || 0;
    if (service?.addOns) {
      selectedAddOns.forEach(addOnId => {
        const addOn = service.addOns?.find(a => a.id === addOnId);
        if (addOn) total += addOn.price;
      });
    }
    return total;
  };

  const faqData = [
    {
      question: 'How often should I clean my solar panels?',
      answer:
        'For optimal performance, we recommend cleaning your solar panels every 3-6 months. However, the frequency may vary based on your location and environmental conditions.',
    },
    {
      question: 'What happens during a maintenance service visit?',
      answer:
        'Our technicians conduct a comprehensive inspection, clean all components, check electrical connections, test system performance, and provide a detailed report with recommendations.',
    },
    {
      question: 'How long does the service take?',
      answer:
        'Service duration varies: Basic cleaning takes 2-3 hours, maintenance visits 3-4 hours, and installations 1-2 days. We provide accurate time estimates during booking.',
    },
  ];

  const relatedServices = [
    {
      id: '1',
      title: 'Basic Solar Panel Cleaning',
      price: 525,
      category: 'Cleaning',
    },
    {
      id: '2',
      title: 'Residential Solar Installation',
      price: 2500,
      category: 'Installation',
    },
    {
      id: '3',
      title: 'Annual Maintenance Contract',
      price: 1200,
      category: 'Maintenance',
    },
  ];

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>Service not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <View style={styles.backButtonIcon}>
            <Text style={styles.backButtonText}>←</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {service.category}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <View style={styles.imageGradient}>
                <Text style={styles.imagePlaceholder}>⚡</Text>
              </View>
            </View>
            {service.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{service.discount}</Text>
              </View>
            )}
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{service.category}</Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <Text key={i} style={styles.starIcon}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.ratingText}>4.8 (124 reviews)</Text>
          </View>
        </View>

        {/* Quick Info Cards */}
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <View style={[styles.infoIcon, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[styles.infoIconText, { color: '#4CAF50' }]}>
                ⏱️
              </Text>
            </View>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>2-3 Hours</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={[styles.infoIcon, { backgroundColor: '#E3F2FD' }]}>
              <Text style={[styles.infoIconText, { color: colors.primary }]}>
                🛠️
              </Text>
            </View>
            <Text style={styles.infoLabel}>Experts</Text>
            <Text style={styles.infoValue}>Certified</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={[styles.infoIcon, { backgroundColor: '#F3E5F5' }]}>
              <Text style={[styles.infoIconText, { color: '#9C27B0' }]}>
                📋
              </Text>
            </View>
            <Text style={styles.infoLabel}>Report</Text>
            <Text style={styles.infoValue}>Detailed</Text>
          </View>
        </View>

        {/* Customization Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customize Your Service</Text>
          <View style={styles.customizationCard}>
            <View style={styles.systemSizeSection}>
              <Text style={styles.inputLabel}>Solar System Size (kW)</Text>
              <View style={styles.systemInputContainer}>
                <TextInput
                  style={styles.systemInput}
                  value={systemSize}
                  onChangeText={setSystemSize}
                  keyboardType="decimal-pad"
                  placeholder="Enter system size"
                />
                <Text style={styles.systemUnit}>kW</Text>
              </View>
              <Text style={styles.inputHelper}>
                Enter your current solar system size for accurate pricing
              </Text>
            </View>
          </View>
        </View>

        {/* Price Display */}
        <View style={styles.priceSection}>
          <View style={styles.priceCard}>
            <View style={styles.priceHeader}>
              <Text style={styles.priceLabel}>Estimated Total</Text>
              <View style={styles.priceBadge}>
                <Text style={styles.priceBadgeText}>Flexible</Text>
              </View>
            </View>
            <Text style={styles.priceValue}>₹{calculateTotal()}</Text>
            <Text style={styles.priceNote}>
              Price may vary based on system size and add-ons
            </Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Overview</Text>
          <Text style={styles.description}>{service.description}</Text>

          {service.technicalHighlights &&
            service.technicalHighlights.length > 0 && (
              <View style={styles.highlightsContainer}>
                <Text style={styles.subTitle}>Technical Highlights</Text>
                {service.technicalHighlights.map((highlight, index) => (
                  <View key={index} style={styles.highlightItem}>
                    <View style={styles.highlightBullet}>
                      <Text style={styles.bulletIcon}>✓</Text>
                    </View>
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            )}
        </View>

        {/* Benefits Section */}
        {service.benefits && service.benefits.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Benefits</Text>
            <View style={styles.benefitsGrid}>
              {service.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitCard}>
                  <View style={styles.benefitIconWrapper}>
                    <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                  </View>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>
                    {benefit.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Add-ons Section */}
        {service.addOns && service.addOns.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Add-on Services</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Select All</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionSubtitle}>
              Enhance your service with these optional add-ons
            </Text>
            {service.addOns.map(addOn => (
              <TouchableOpacity
                key={addOn.id}
                style={[
                  styles.addOnCard,
                  selectedAddOns.includes(addOn.id) && styles.addOnCardSelected,
                ]}
                onPress={() => toggleAddOn(addOn.id)}
                activeOpacity={0.8}
              >
                <View style={styles.addOnCheckbox}>
                  {selectedAddOns.includes(addOn.id) ? (
                    <View style={styles.checkboxChecked}>
                      <Text style={styles.checkboxIcon}>✓</Text>
                    </View>
                  ) : (
                    <View style={styles.checkboxUnchecked} />
                  )}
                </View>
                <View style={styles.addOnContent}>
                  <View style={styles.addOnHeader}>
                    <Text style={styles.addOnTitle}>{addOn.title}</Text>
                    {addOn.popular && (
                      <View style={styles.popularTag}>
                        <Text style={styles.popularTagText}>Popular</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.addOnDescription}>
                    {addOn.description}
                  </Text>
                  <View style={styles.addOnFooter}>
                    <View style={styles.addOnPriceContainer}>
                      <Text style={styles.addOnPrice}>₹{addOn.price}</Text>
                      <Text style={styles.addOnDuration}>
                        ⏱ {addOn.duration}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqData.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqCard}
              onPress={() => toggleFAQ(index)}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqIcon}>
                  {expandedFAQs.includes(index) ? '▲' : '▼'}
                </Text>
              </View>
              {expandedFAQs.includes(index) && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Questions</Text>
          </TouchableOpacity>
        </View>

        {/* Related Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>You Might Also Like</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedServicesContent}
          >
            {relatedServices.map(item => (
              <TouchableOpacity key={item.id} style={styles.relatedServiceCard}>
                <View style={styles.relatedServiceImage}>
                  <View style={styles.relatedImagePlaceholder}>
                    <Text style={styles.relatedImageIcon}>⚡</Text>
                  </View>
                </View>
                <View style={styles.relatedServiceInfo}>
                  <Text style={styles.relatedServiceCategory}>
                    {item.category}
                  </Text>
                  <Text style={styles.relatedServiceTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.relatedServicePrice}>₹{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reviews Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewsPreview}>
            <View style={styles.ratingSummary}>
              <Text style={styles.ratingNumber}>4.8</Text>
              <Text style={styles.ratingStarsSmall}>★★★★★</Text>
              <Text style={styles.ratingCount}>124 reviews</Text>
            </View>
            <View style={styles.noReviewsCard}>
              <Text style={styles.noReviewsIcon}>⭐</Text>
              <Text style={styles.noReviewsTitle}>No reviews yet</Text>
              <Text style={styles.noReviewsSubtitle}>
                Be the first to review this service
              </Text>
              <TouchableOpacity style={styles.leaveReviewButton}>
                <Text style={styles.leaveReviewText}>Leave a Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Actions */}
      <View style={styles.bottomActions}>
        <View style={styles.priceSummary}>
          <Text style={styles.priceSummaryLabel}>Total Price</Text>
          <Text style={styles.priceSummaryValue}>₹{calculateTotal()}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleBookNow}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 10,
  },
  backButton: {
    marginRight: 12,
  },
  backButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  headerActions: {
    marginLeft: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F7FF',
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#E8F1FF',
  },
  imageGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 129, 252, 0.1)',
  },
  imagePlaceholder: {
    fontSize: 64,
    color: colors.primary,
    opacity: 0.3,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    lineHeight: 34,
    marginRight: 12,
  },
  categoryTag: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  starIcon: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  infoCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIconText: {
    fontSize: 24,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  customizationCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  systemSizeSection: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  systemInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  systemInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    padding: 8,
  },
  systemUnit: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  inputHelper: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  priceSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  priceCard: {
    backgroundColor: '#F0F7FF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#D4E7FF',
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  priceBadge: {
    backgroundColor: '#4CD964',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  priceValue: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  priceNote: {
    fontSize: 13,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#4A4A4A',
    lineHeight: 24,
    marginBottom: 16,
  },
  highlightsContainer: {
    marginTop: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  highlightBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  bulletIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  highlightText: {
    flex: 1,
    fontSize: 15,
    color: '#4A4A4A',
    lineHeight: 22,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: '1%',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  benefitIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  addOnCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addOnCardSelected: {
    backgroundColor: '#F0F7FF',
    borderColor: colors.primary,
  },
  addOnCheckbox: {
    marginRight: 16,
    justifyContent: 'center',
  },
  checkboxUnchecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  checkboxChecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxIcon: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addOnContent: {
    flex: 1,
  },
  addOnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  addOnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 12,
  },
  popularTag: {
    backgroundColor: '#FFE5CC',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularTagText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
  },
  addOnDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  addOnFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addOnPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOnPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 12,
  },
  addOnDuration: {
    fontSize: 13,
    color: '#999',
  },
  faqCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    marginRight: 12,
  },
  faqIcon: {
    fontSize: 12,
    color: colors.primary,
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  viewAllButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  relatedServicesContent: {
    paddingRight: 20,
  },
  relatedServiceCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  relatedServiceImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F0F7FF',
  },
  relatedImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedImageIcon: {
    fontSize: 48,
    color: colors.primary,
    opacity: 0.3,
  },
  relatedServiceInfo: {
    padding: 16,
  },
  relatedServiceCategory: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  relatedServiceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
    lineHeight: 20,
  },
  relatedServicePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  reviewsPreview: {
    marginTop: 8,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1C1E',
    marginRight: 12,
  },
  ratingStarsSmall: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
  },
  noReviewsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  noReviewsIcon: {
    fontSize: 48,
    color: '#FFD700',
    opacity: 0.5,
    marginBottom: 12,
  },
  noReviewsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  noReviewsSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  leaveReviewButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  leaveReviewText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  priceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceSummaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceSummaryValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
