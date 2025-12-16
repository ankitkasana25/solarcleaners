import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native'; // Consolidated import
import { useNavigation } from '@react-navigation/native';

import { SearchBar } from '../../components/SearchBar';
import { lightTheme } from '../../theme/theme';
import { observer } from 'mobx-react-lite';
import { SectionTitle } from '../../components/SectionTitle';
import { PremiumServiceCard } from '../../components/PremiumServiceCard';
import { ServicePromotions } from '../../components/ServicePromotions'; // Added import
// Removed duplicate ScrollView import

const premiumServices = [
  {
    id: '1',
    title: 'Cleaning',
    description: 'Deep cleaning for max efficiency',
    image: {
      uri: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80',
    },
  },
  {
    id: '2',
    title: 'Maintenance',
    description: 'Regular checkups & tuning',
    image: {
      uri: 'https://images.unsplash.com/photo-1625301840055-7c1b7198cfc0?w=800&q=80',
    },
  },
  {
    id: '3',
    title: 'Repairing',
    description: 'Expert diagnostics & fixes',
    image: {
      uri: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    },
  },
  {
    id: '4',
    title: 'Installation',
    description: 'Seamless setup by pros',
    image: {
      uri: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
    },
  },
];

const trendingServices = [
  {
    id: 'trend_1',
    title: 'Advance Solar Shielding',
    image: {
      uri: 'https://images.unsplash.com/photo-1596464875704-20b17173e659?w=800&q=80',
    },
    discount: '15% OFF',
  },
  {
    id: 'trend_2',
    title: 'Thermal Drone Inspection',
    image: {
      uri: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    },
    discount: 'HOT',
  },
  {
    id: 'trend_3',
    title: 'Anti-Bird & Pest Netting',
    image: {
      uri: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800&q=80',
    },
    discount: '20% OFF',
  },
  {
    id: 'trend_4',
    title: 'Nanotech Coating',
    image: {
      uri: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80',
    },
    discount: 'NEW',
  },
];

import { TrendingServiceCard } from '../../components/TrendingServiceCard';
import { SolCareShorts } from '../../components/SolCareShorts';
import { InteractiveTools } from '../../components/InteractiveTools';
import { SeasonalOffers } from '../../components/SeasonalOffers';
import { SubscriptionPlans } from '../../components/SubscriptionPlans';
import { FreeConsultation } from '../../components/FreeConsultation';

export const HomeScreen = observer(() => {
  const navigation = useNavigation();
  // const { authStore } = useRootStore(); // user data available if needed
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <SearchBar
        placeholder="Search for services..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        showVoiceSearch
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      >
        <ServicePromotions />
        <SectionTitle
          title="Our Premium Services"
          tagline="Comprehensive Solar solutions tailored to your needs"
          badgeText="Certified & Trusted"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
          decelerationRate="fast"
          snapToAlignment="center" // enhances 'smooth' feel for horizontal lists
        >
          {premiumServices.map(service => (
            <PremiumServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              onPress={() =>
                (navigation as any).navigate('ServiceDetail', { service })
              }
            />
          ))}
        </ScrollView>

        <SectionTitle title="Trending Services" badgeText="Hot Picks" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
          decelerationRate="fast"
          snapToAlignment="center"
        >
          {trendingServices.map(service => (
            <TrendingServiceCard
              key={service.id}
              title={service.title}
              image={service.image}
              discount={service.discount}
              onPress={() =>
                (navigation as any).navigate('ServiceDetail', {
                  service: {
                    ...service,
                    price: 500,
                    description: 'Best trending service',
                  },
                })
              }
            />
          ))}
        </ScrollView>

        <SolCareShorts />
        <InteractiveTools />
        <SeasonalOffers />
        <SubscriptionPlans />
        <FreeConsultation />
        {/* Bottom spacer */}
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.coolMist, // Premium background color
  },
  content: {
    flex: 1,
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingBottom: 16, // Added more breathing room for shadows
  },
});
