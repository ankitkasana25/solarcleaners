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
import { SearchBar } from '../../components/SearchBar';
import { FilterTabs, FilterTab } from '../../components/FilterTabs';
import { SectionTitle } from '../../components/SectionTitle'; // Added
import { ImageIcon } from '../../components/ImageIcon'; // Added

import { lightTheme } from '../../theme/theme'; // Updated usage
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
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
      featured: true,
      category: 'cleaning',
    },
    {
      id: '2',
      title: 'Basic Solar Panel Cleaning',
      description: 'Standard cleaning service',
      price: 525,
      duration: '1-2 hours',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1625301840055-7c1b7198cfc0?w=600&q=80',
      popular: true,
      category: 'maintenance',
    },
    {
      id: '4',
      title: 'Comprehensive Maintenance Package',
      description: 'Complete system maintenance',
      price: 850,
      duration: '3-4 hours',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80',
      category: 'repairing',
    },
    {
      id: '6',
      title: 'Panel Replacement',
      description: 'Damaged panel replacement service',
      price: 950,
      duration: '3-4 hours',
      image: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?w=600&q=80',
      featured: true,
      category: 'installation',
    },
    {
      id: '8',
      title: 'System Upgrade Installation',
      description: 'Upgrade existing solar system',
      price: 1800,
      duration: '1 day',
      image: 'https://images.unsplash.com/photo-1548613053-220e89574c8a?w=600&q=80',
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
        <Image
          source={{ uri: image }}
          style={
            gridView
              ? styles.gridPlaceholderImage
              : styles.horizontalPlaceholderImage
          }
          resizeMode="cover"
        />

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
}: { title: string; services: any[] }) => {
  return (
    <View style={styles.section}>
      <SectionTitle
        title={title}
        tagline={`Explore ${title} Services`}
        rightElement={
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        }
      />
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
          />
          <ServiceSection
            title="Maintenance"
            services={servicesData.maintenance}
          />
          <ServiceSection
            title="Repairing"
            services={servicesData.repairing}
          />
          <ServiceSection
            title="Installation"
            services={servicesData.installation}
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
          {categoryServices.map((service: any) => (
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
    <ScreenContainer style={styles.container}>

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


    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Lighter background
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 16,
    marginBottom: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: lightTheme.colors.primary,
    fontFamily: 'NotoSans-Bold',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },

  // Horizontal Service Card Styles
  horizontalServiceCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 10,
  },
  horizontalImageContainer: {
    position: 'relative',
    height: 180, // Taller images
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  horizontalPlaceholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: lightTheme.colors.antiFlashWhite,
  },

  // Grid Service Card Styles
  gridServiceCard: {
    width: GRID_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  gridImageContainer: {
    position: 'relative',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  gridPlaceholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: lightTheme.colors.antiFlashWhite,
  },

  // Common Card Styles
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  featuredBadge: { backgroundColor: lightTheme.colors.primary },
  popularBadge: { backgroundColor: lightTheme.colors.subscribeGold },
  urgentBadge: { backgroundColor: lightTheme.colors.redOrange },
  discountBadge: { backgroundColor: '#5856D6' },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'NotoSans-Bold',
    textTransform: 'uppercase',
  },

  // Card Content Styles
  horizontalCardContent: {
    padding: 16,
  },
  gridCardContent: {
    padding: 12,
  },
  titleContainer: {
    marginBottom: 12,
  },
  horizontalCardTitle: {
    fontSize: 16,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  gridCardTitle: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'NotoSans-Medium',
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceDurationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceCurrency: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: lightTheme.colors.primary,
  },
  priceText: {
    fontSize: 18,
    fontFamily: 'NotoSans-Bold',
    color: lightTheme.colors.primary,
    marginLeft: 2,
  },
  priceUnit: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'NotoSans-Regular',
    marginLeft: 2,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.antiFlashWhite,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  durationText: {
    fontSize: 10,
    color: '#8E8E93',
    fontFamily: 'NotoSans-Medium',
  },

  // Grid Container
  categoryView: {
    padding: 16,
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
    fontSize: 18,
    fontFamily: 'NotoSans-Bold',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
  },
  // Floating Cart Button
  floatingCartButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: lightTheme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: lightTheme.colors.primaryBlue,
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
