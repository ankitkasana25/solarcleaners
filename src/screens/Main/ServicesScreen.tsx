import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchBar } from '../../components/SearchBar';
import { FilterTabs, FilterTab } from '../../components/FilterTabs';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { FAQSection } from '../../components/FAQSection';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const GRID_CARD_WIDTH = (width - 48) / 2;

const filterTabs: FilterTab[] = [
  { id: 'all', label: 'All' },
  { id: 'cleaning', label: 'Cleaning' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'repairing', label: 'Repairing' },
  { id: 'installation', label: 'Installation' },
  { id: 'faq', label: 'FAQ' },
];

// Updated service data with additional details
const servicesData = {
  cleaning: [
    {
      id: '1',
      title: 'Advance Solar Panel Cleaning',
      description: 'Deep cleaning for optimal performance',
      discount: '2% OFF',
      price: 725,
      duration: '2-3 hours',
      image: 'https://via.placeholder.com/300x180',
      featured: true,
      category: 'cleaning',
    },
    {
      id: '2',
      title: 'Basic Solar Panel Cleaning',
      description: 'Standard cleaning service',
      price: 525,
      duration: '1-2 hours',
      image: 'https://via.placeholder.com/300x180',
      category: 'cleaning',
    },
  ],
  maintenance: [
    {
      id: '3',
      title: 'Annual Maintenance Contract (AMC)',
      description: 'Year-round maintenance coverage',
      price: 1200,
      duration: 'Annual',
      image: 'https://via.placeholder.com/300x180',
      popular: true,
      category: 'maintenance',
    },
    {
      id: '4',
      title: 'Comprehensive Maintenance Package',
      description: 'Complete system maintenance',
      price: 850,
      duration: '3-4 hours',
      image: 'https://via.placeholder.com/300x180',
      category: 'maintenance',
    },
  ],
  repairing: [
    {
      id: '5',
      title: 'Inverter Repair',
      description: 'Professional inverter diagnostics & repair',
      price: 650,
      duration: '2-3 hours',
      image: 'https://via.placeholder.com/300x180',
      category: 'repairing',
    },
    {
      id: '6',
      title: 'Panel Replacement',
      description: 'Damaged panel replacement service',
      price: 950,
      duration: '3-4 hours',
      image: 'https://via.placeholder.com/300x180',
      urgent: true,
      category: 'repairing',
    },
  ],
  installation: [
    {
      id: '7',
      title: 'New Solar Panel Installation',
      description: 'Complete new system installation',
      price: 2500,
      duration: '1-2 days',
      image: 'https://via.placeholder.com/300x180',
      featured: true,
      category: 'installation',
    },
    {
      id: '8',
      title: 'System Upgrade Installation',
      description: 'Upgrade existing solar system',
      price: 1800,
      duration: '1 day',
      image: 'https://via.placeholder.com/300x180',
      category: 'installation',
    },
  ],
  faq: [],
};

interface ServiceCardProps {
  title: string;
  description?: string;
  image: string;
  discount?: string;
  price?: number;
  duration?: string;
  featured?: boolean;
  popular?: boolean;
  urgent?: boolean;
  id: string;
  category: string;
  gridView?: boolean;
}

const ServiceCard = ({
  title,
  description,
  image,
  discount,
  price,
  duration,
  featured,
  popular,
  urgent,
  id,
  category,
  gridView = false,
}: ServiceCardProps) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    const serviceData = {
      id,
      title,
      category,
      price: price || 725,
      image,
      discount,
      description,
      technicalHighlights: [
        'Targets heavy grime: moss, sap, lichen, cement dust, and oil residues commonly seen in Indian environments.',
        'Can recover up to 30-40% of lost output in severely soiled setups.',
        'Provides early detection of micro-cracks, seal wear, hotspots, or frame issues via detailed inspection.',
      ],
      benefits: [
        {
          icon: '🔋',
          title: 'Improved Efficiency',
          description: "Maximize your system's power output",
        },
        {
          icon: '💰',
          title: 'Cost Savings',
          description: 'Reduce long-term maintenance costs',
        },
        {
          icon: '⏱️',
          title: 'Extended Lifespan',
          description: 'Prolong the life of your solar system',
        },
      ],
      addOns: [
        {
          id: '1',
          title: 'Panel Inspection',
          description: 'Thorough inspection of all panels for damage or wear',
          price: 500,
          duration: '30 min',
          popular: true,
        },
        {
          id: '2',
          title: 'Inverter Check',
          description: 'Complete inverter functionality and efficiency check',
          price: 300,
          duration: '20 min',
        },
        {
          id: '3',
          title: 'Wiring Inspection',
          description: 'Inspection of all electrical connections and wiring',
          price: 400,
          duration: '25 min',
        },
        {
          id: '4',
          title: 'Performance Report',
          description:
            'Detailed performance analysis and improvement recommendations',
          price: 200,
          duration: '15 min',
          popular: true,
        },
      ],
    };

    navigation.navigate('ServiceDetail', { service: serviceData });
  };

  const CardContent = () => (
    <>
      <View
        style={
          gridView ? styles.gridImageContainer : styles.horizontalImageContainer
        }
      >
        <View
          style={
            gridView
              ? styles.gridPlaceholderImage
              : styles.horizontalPlaceholderImage
          }
        >
          <View style={styles.imageOverlay}>
            {/* Removed icon circle from here */}
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgeContainer}>
          {featured && (
            <View style={[styles.badge, styles.featuredBadge]}>
              <Text style={styles.badgeText}>Featured</Text>
            </View>
          )}
          {popular && (
            <View style={[styles.badge, styles.popularBadge]}>
              <Text style={styles.badgeText}>Popular</Text>
            </View>
          )}
          {urgent && (
            <View style={[styles.badge, styles.urgentBadge]}>
              <Text style={styles.badgeText}>Urgent</Text>
            </View>
          )}
          {discount && (
            <View style={[styles.badge, styles.discountBadge]}>
              <Text style={styles.badgeText}>{discount}</Text>
            </View>
          )}
        </View>
      </View>

      <View
        style={gridView ? styles.gridCardContent : styles.horizontalCardContent}
      >
        <View style={styles.titleContainer}>
          <Text
            style={gridView ? styles.gridCardTitle : styles.horizontalCardTitle}
            numberOfLines={2}
          >
            {title}
          </Text>
          {description && (
            <Text style={styles.cardDescription} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.priceDurationContainer}>
            {price && (
              <View style={styles.priceContainer}>
                <Text style={styles.priceCurrency}>₹</Text>
                <Text style={styles.priceText}>{price}</Text>
                <Text style={styles.priceUnit}>/service</Text>
              </View>
            )}
            {duration && (
              <View style={styles.durationContainer}>
                <Text style={styles.durationIcon}>⏱️</Text>
                <Text style={styles.durationText}>{duration}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={
              gridView ? styles.gridActionButton : styles.horizontalActionButton
            }
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  if (gridView) {
    return (
      <TouchableOpacity
        style={styles.gridServiceCard}
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.horizontalServiceCard}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <CardContent />
    </TouchableOpacity>
  );
};

interface ServiceSectionProps {
  title: string;
  services: any[];
  icon?: string;
}

// REMOVED the local FAQItem and FAQSection components since we're importing them

const ServiceSection = ({
  title,
  services,
  icon = '🔧',
}: ServiceSectionProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.sectionIcon}>{icon}</Text>
          </View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <Text style={styles.seeAllArrow}>→</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 16}
      >
        {services.map(service => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
            discount={service.discount}
            price={service.price}
            duration={service.duration}
            featured={service.featured}
            popular={service.popular}
            urgent={service.urgent}
            id={service.id}
            category={service.category}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export const ServicesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const getSectionIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      cleaning: '✨',
      maintenance: '🔧',
      repair: '🛠️',
      installation: '⚡',
    };
    return icons[category.toLowerCase()] || '🔧';
  };

  const renderContent = () => {
    if (activeTab === 'all') {
      return (
        <>
          <ServiceSection
            title="Cleaning"
            services={servicesData.cleaning}
            icon="✨"
          />
          <ServiceSection
            title="Maintenance"
            services={servicesData.maintenance}
            icon="🔧"
          />
          <ServiceSection
            title="Repair"
            services={servicesData.repairing}
            icon="🛠️"
          />
          <ServiceSection
            title="Installation"
            services={servicesData.installation}
            icon="⚡"
          />
          <FAQSection /> {/* Using imported FAQSection component */}
        </>
      );
    }

    if (activeTab === 'faq') {
      return <FAQSection />; // Using imported FAQSection component
    }

    const categoryServices =
      servicesData[activeTab as keyof typeof servicesData];
    if (!categoryServices || categoryServices.length === 0) {
      return (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
          </View>
          <Text style={styles.emptyText}>No services found</Text>
          <Text style={styles.emptySubtext}>Check back later for updates</Text>
        </View>
      );
    }

    return (
      <View style={styles.categoryView}>
        <View style={styles.gridContainer}>
          {categoryServices.map(service => (
            <View key={service.id} style={styles.gridItemWrapper}>
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                discount={service.discount}
                price={service.price}
                duration={service.duration}
                featured={service.featured}
                popular={service.popular}
                urgent={service.urgent}
                id={service.id}
                category={service.category}
                gridView={true}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Services" />
      <SearchBar
        placeholder="Search a Service"
        value={searchQuery}
        onChangeText={setSearchQuery}
        showVoiceSearch={true}
      />
      <FilterTabs
        tabs={filterTabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderContent()}
      </ScrollView>

      {/* Floating Cart Button */}
      <TouchableOpacity style={styles.floatingCartButton} activeOpacity={0.9}>
        <View style={styles.cartIconContainer}>
          <Text style={styles.cartIcon}>🛒</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionIcon: {
    fontSize: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  seeAllArrow: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },

  // Horizontal Service Card Styles
  horizontalServiceCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  horizontalImageContainer: {
    position: 'relative',
    height: 160,
  },
  horizontalPlaceholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8F1FF',
  },
  // REMOVED horizontalImageIcon styles

  // Grid Service Card Styles
  gridServiceCard: {
    width: GRID_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  gridImageContainer: {
    position: 'relative',
    height: 120,
  },
  gridPlaceholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F7FF',
  },
  // REMOVED gridImageIcon styles

  // Common Card Styles
  imageOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 129, 252, 0.05)',
  },
  // REMOVED categoryIcon and categoryIconLarge styles

  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredBadge: {
    backgroundColor: '#4CD964',
  },
  popularBadge: {
    backgroundColor: '#FF9500',
  },
  urgentBadge: {
    backgroundColor: '#FF3B30',
  },
  discountBadge: {
    backgroundColor: '#5856D6',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // Card Content Styles
  horizontalCardContent: {
    padding: 20,
  },
  gridCardContent: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  horizontalCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    lineHeight: 24,
    marginBottom: 6,
  },
  gridCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
    lineHeight: 20,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceDurationContainer: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  priceCurrency: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    marginHorizontal: 2,
  },
  priceUnit: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },

  // Action Buttons
  horizontalActionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  gridActionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Grid Container
  categoryView: {
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  gridItemWrapper: {
    width: GRID_CARD_WIDTH,
    marginBottom: 16,
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  emptySubtext: {
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Floating Cart Button
  floatingCartButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  cartIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 28,
  },
});
