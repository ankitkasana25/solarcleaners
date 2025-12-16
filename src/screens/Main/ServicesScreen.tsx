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
import {
  ServiceCategories,
  Category,
} from '../../components/ServiceCategories'; // Updated import
import { ServiceCard } from '../../components/ServiceCard';
import { ServiceSection } from '../../components/ServiceSection';

import { lightTheme } from '../../theme/theme'; // Updated usage
import { FAQSection } from '../../components/FAQSection';

const { width } = Dimensions.get('window');
const GRID_CARD_WIDTH = (width - 48) / 2;

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', icon: '🔍', color: '#78909C' }, // Blue Grey
  { id: 'cleaning', label: 'Cleaning', icon: '✨', color: '#2AB1AD' }, // Teal
  { id: 'maintenance', label: 'Maint.', icon: '🔧', color: '#5C9CE6' }, // Blue
  { id: 'repairing', label: 'Repair', icon: '🛠️', color: '#E85D75' }, // Red/Pink
  { id: 'installation', label: 'Install', icon: '⚡', color: '#8E44AD' }, // Purple
  { id: 'faq', label: 'FAQ', icon: '❓', color: '#F1C40F' }, // Yellow
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
      image:
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
      featured: true,
      category: 'cleaning',
    },
    {
      id: '2',
      title: 'Basic Solar Panel Cleaning',
      description: 'Standard cleaning service',
      price: 525,
      duration: '1-2 hours',
      image:
        'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80',
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
      image:
        'https://images.unsplash.com/photo-1625301840055-7c1b7198cfc0?w=600&q=80',
      popular: true,
      category: 'maintenance',
    },
    {
      id: '4',
      title: 'Comprehensive Maintenance Package',
      description: 'Complete system maintenance',
      price: 850,
      duration: '3-4 hours',
      image:
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
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
      image:
        'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80',
      category: 'repairing',
    },
    {
      id: '6',
      title: 'Panel Replacement',
      description: 'Damaged panel replacement service',
      price: 950,
      duration: '3-4 hours',
      image:
        'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=600&q=80',
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
      image:
        'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?w=600&q=80',
      featured: true,
      category: 'installation',
    },
    {
      id: '8',
      title: 'System Upgrade Installation',
      description: 'Upgrade existing solar system',
      price: 1800,
      duration: '1 day',
      image:
        'https://images.unsplash.com/photo-1548613053-220e89574c8a?w=600&q=80',
      category: 'installation',
    },
  ],
  faq: [],
};

export const ServicesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigation = useNavigation<any>();

  const handleCategoryPress = (id: string) => {
    if (id === 'all') {
      setActiveTab('all');
    } else {
      const category = CATEGORIES.find(c => c.id === id);
      navigation.navigate('ServiceCategory', {
        categoryId: id,
        categoryTitle: category?.label
      });
    }
  };

  const renderContent = () => {
    if (activeTab === 'all') {
      return (
        <>
          <ServiceSection title="Cleaning" services={servicesData.cleaning} />
          <ServiceSection
            title="Maintenance"
            services={servicesData.maintenance}
          />
          <ServiceSection title="Repairing" services={servicesData.repairing} />
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
    <>
      <SearchBar
        placeholder="Search a Service"
        value={searchQuery}
        onChangeText={setSearchQuery}
        showVoiceSearch={true}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ServiceCategories
          categories={CATEGORIES}
          activeCategory={activeTab}
          onCategoryPress={handleCategoryPress}
        />

        {renderContent()}
      </ScrollView>
    </>
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
    paddingTop: 16,
    paddingBottom: 40,
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
