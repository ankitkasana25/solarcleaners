import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { SearchBar } from '../../components/SearchBar';
import { lightTheme } from '../../theme/theme';
import { SectionTitle } from '../../components/SectionTitle';
import { PremiumServiceCard } from '../../components/PremiumServiceCard';
import { ServicePromotions } from '../../components/ServicePromotions';
import { TrendingServiceCard } from '../../components/TrendingServiceCard';
import { SolCareShorts } from '../../components/SolCareShorts';
import { InteractiveTools } from '../../components/InteractiveTools';
import { SeasonalOffers } from '../../components/SeasonalOffers';
import { SubscriptionPlans } from '../../components/SubscriptionPlans';
import { ServiceThumbnail } from '../../components/ServiceThumbnail';
import { FreeConsultation } from '../../components/FreeConsultation';
import { WeatherGreeting } from '../../components/WeatherGreeting';

const premiumServices = [
  {
    id: 'clean_1',
    title: 'Panel Pro Cleaning',
    description: 'Deep modular cleaning for maximum energy efficiency.',
    image: { uri: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80' },
  },
  {
    id: 'maint_1',
    title: 'Health Checkup',
    description: 'Scheduled inspections and performance optimization.',
    image: { uri: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80' },
  },
  {
    id: 'repair_1',
    title: 'Expert Repairing',
    description: 'Fast diagnostics and component-level repairs safely.',
    image: { uri: 'https://images.unsplash.com/photo-1625301840055-7c1b7198cfc0?w=800&q=80' },
  },
  {
    id: 'water_1',
    title: 'Native Water Purifier',
    description: 'Advanced filtration for pure drinking water.',
    image: { uri: 'https://images.unsplash.com/photo-1595467793441-2a13cc7ba96d?w=800&q=80' },
  },
  {
    id: 'roof_1',
    title: 'Roof Maintenance',
    description: 'Protect your roof and ensure solar stability.',
    image: { uri: 'https://images.unsplash.com/photo-1632759162351-39516e499d35?w=800&q=80' },
  },
];

const trendingServices = [
  {
    id: 'trend_1',
    title: 'Full System\nDeep Clean',
    image: { uri: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80' },
    discount: '15% OFF',
  },
  {
    id: 'trend_2',
    title: 'Inverter Performance\nCheck',
    image: { uri: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43759?w=800&q=80' },
    discount: 'HOT',
  },
  {
    id: 'trend_3',
    title: 'Birds & Pest\nProofing',
    image: { uri: 'https://images.unsplash.com/photo-1596464875704-20b17173e659?w=800&q=80' },
    discount: '20% OFF',
  },
  {
    id: 'trend_4',
    title: 'Panel Health\nScan',
    image: { uri: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800&q=80' },
    discount: 'NEW',
  },
  {
    id: 'trend_5',
    title: 'Generation\nOptimization',
    image: { uri: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80' },
    discount: '25% OFF',
  },
];

export const HomeScreen = observer(() => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for services, maintenance, etc..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        showVoiceSearch
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        overScrollMode="never"
      >

        <WeatherGreeting
          userName="Ankit"
          temperature="28"
          city="Noida, India"
        />

        <ServicePromotions />

        <View style={styles.sectionWrapper}>
          <SectionTitle
            title="Premium Cleaning Services"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToAlignment="center"
          >
            {premiumServices.map(service => (
              <PremiumServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                onPress={() => (navigation as any).navigate('ServiceDetail', { service })}
              />
            ))}
          </ScrollView>
        </View>

        <InteractiveTools />

        <View style={styles.sectionWrapper}>
          <SectionTitle title="Trending Services" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
          >
            {premiumServices.slice(0, 4).map(service => (
              <ServiceThumbnail
                key={service.id}
                title={service.title}
                image={service.image}
                onPress={() => (navigation as any).navigate('ServiceDetail', { service })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionWrapper}>
          <SectionTitle title="Most booked services" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToAlignment="start"
          >
            {trendingServices.map(service => (
              <TrendingServiceCard
                key={service.id}
                title={service.title}
                image={service.image}
                discount={service.discount}
                onPress={() => (navigation as any).navigate('ServiceDetail', { service })}
              />
            ))}
          </ScrollView>
        </View>

        <SeasonalOffers />

        <View style={styles.sectionWrapper}>
          <SectionTitle title="Solar Experts Videos" badgeText="Live" />
          <SolCareShorts />
        </View>

        <SubscriptionPlans />
        <FreeConsultation />


      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  sectionWrapper: {
    marginBottom: 10,
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  footerSpacer: {
    height: 40,
  },
});
