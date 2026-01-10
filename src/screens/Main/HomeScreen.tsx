import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { SearchBar } from '../../components/SearchBar';
import { lightTheme } from '../../theme/theme';
import { SectionTitle } from '../../components/SectionTitle';
import { PremiumServiceCard } from '../../components/PremiumServiceCard';

import { TrendingServiceCard } from '../../components/TrendingServiceCard';
import { SolCareShorts } from '../../components/SolCareShorts';
import { InteractiveTools } from '../../components/InteractiveTools';
import { SeasonalOffers } from '../../components/SeasonalOffers';
import { SubscriptionPlans } from '../../components/SubscriptionPlans';
import { ServiceThumbnail } from '../../components/ServiceThumbnail';
import { FreeConsultation } from '../../components/FreeConsultation';
import { WeatherGreeting } from '../../components/WeatherGreeting';
import { UpcomingServiceCard } from '../../components/UpcomingServiceCard';
import { PremiumBookedCard } from '../../components/PremiumBookedCard';

const premiumServices = [
  {
    id: 'clean_res',
    title: 'Residential Rooftop',
    description: 'Specialized cleaning for home solar panels to maximize yield.',
    image: require('../../assets/Images/ResidentialCleaningService.jpeg'),
  },
  {
    id: 'clean_com',
    title: 'Commercial & Industrial',
    description: 'Professional cleaning for large-scale solar plants and factories.',
    image: { uri: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80' },
  },
  {
    id: 'clean_rob',
    title: 'Robotic Cleaning',
    description: 'Advanced waterless robotic cleaning for large installations.',
    image: { uri: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80' },
  },
  {
    id: 'clean_man',
    title: 'Manual & Mechanized',
    description: 'Thorough manual cleaning with specialized solar brushes.',
    image: { uri: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80' },
  },
];

const upcomingServices = [
  {
    id: 'up_o1',
    title: 'Plant Inspection',
    launchDate: 'COMING SOON',
    image: { uri: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80' },
  },
  {
    id: 'up_o2',
    title: 'Maintenance',
    launchDate: 'COMING SOON',
    image: { uri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80' },
  },
  {
    id: 'up_o3',
    title: 'Inverter Rectification',
    launchDate: 'COMING SOON',
    image: { uri: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80' },
  },
  {
    id: 'up_e1',
    title: 'Equipment Rental',
    launchDate: 'COMING SOON',
    image: { uri: 'https://images.unsplash.com/photo-1572916166111-da6720ab0e3d?w=800&q=80' },
  },
  {
    id: 'up_sr1',
    title: 'Emergency Breakdown',
    launchDate: 'COMING SOON',
    image: { uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' },
  },
  {
    id: 'up_sr2',
    title: 'Inverter Trip Handling',
    launchDate: 'COMING SOON',
    image: { uri: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80' },
  },
];

const mostBookedServices = [
  {
    rank: 1,
    id: 'clean_com',
    title: 'Commercial & Industrial',
    bookings: '1,450+',
    rating: '4.9',
    description: 'Professional cleaning for large-scale solar plants and factories.',
    image: { uri: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80' },
  },
  {
    rank: 2,
    id: 'clean_res',
    title: 'Residential Rooftop',
    bookings: '1,120+',
    rating: '4.8',
    description: 'Specialized cleaning for home solar panels to maximize yield.',
    image: require('../../assets/Images/ResidentialCleaningService.jpeg'),
  },
  {
    rank: 3,
    id: 'clean_man',
    title: 'Manual & Mechanized',
    bookings: '910+',
    rating: '4.7',
    description: 'Thorough manual cleaning with specialized solar brushes.',
    image: { uri: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80' },
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



        <View style={styles.sectionWrapper}>
          <SectionTitle
            title="Solar Panel Cleaning Services"
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
          <SectionTitle title="Upcoming Features" badgeText="Future Tech" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
          >
            {upcomingServices.map(service => (
              <UpcomingServiceCard
                key={service.id}
                title={service.title}
                launchDate={service.launchDate}
                image={service.image}
                onPress={() => (navigation as any).navigate('MainTabs', { screen: 'Services' })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionWrapper}>
          <SectionTitle title="Most Booked Services" badgeText="Top Choice" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToAlignment="start"
          >
            {mostBookedServices.map(service => (
              <PremiumBookedCard
                key={service.rank}
                rank={service.rank}
                title={service.title}
                bookings={service.bookings}
                rating={service.rating}
                image={service.image}
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
