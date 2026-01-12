import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../stores/RootStore';

import { Category } from '../../components/ServiceCategories';
import { ServiceCard } from '../../components/ServiceCard';
import { ServiceSection } from '../../components/ServiceSection';
import { lightTheme } from '../../theme/theme';
import { FAQSection } from '../../components/FAQSection';


const { width } = Dimensions.get('window');

const CATEGORIES: Category[] = [
  {
    id: 'cleaning',
    label: 'Solar Panel Cleaning',
    icon: '✨',
    color: '#EBF1FF',
  },
  {
    id: 'om',
    label: 'Solar Operation & Maintenance',
    icon: '🛡️',
    color: '#EBF1FF',
  },
  {
    id: 'equipment',
    label: 'Water & Equipment',
    icon: '💧',
    color: '#EBF1FF',
  },
  {
    id: 'emergency',
    label: 'Emergency Services',
    icon: '🚨',
    color: '#EBF1FF',
  },
];

const SERVICES_DATA: any = {
  cleaning: [
    { id: 'c1', title: 'Residential Rooftop', description: 'Deep cleaning for home solar panels.', price: 150, duration: '1 hr', image: require('../../assets/Images/ResidentialCleaningService.jpeg'), featured: true },
    { id: 'c2', title: 'Commercial & Industrial', description: 'Large scale cleaning for plants.', price: 150, duration: 'Daily', image: require('../../assets/Images/CommercialImg.jpeg') },
    { id: 'c3', title: 'Robotic cleaning', description: 'Precision waterless robotic modules.', price: 200, duration: '45 min', image: require('../../assets/Images/RobiticImg.jpeg') },
    { id: 'c4', title: 'Manual & mechanised', description: 'Thorough cleaning with soft brushes.', price: 125, duration: '1.5 hr', image: require('../../assets/Images/ManualImg.jpeg') },
    { id: 'c5', title: 'AMC Contracts', description: 'Monthly / Quarterly / Annual cleaning.', price: 999, duration: 'Annual', image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&q=80', popular: true },
  ],
  om: [
    { id: 'o1', title: 'Plant Inspection', description: 'Routine checkup for all components.', price: 500, duration: '2 hr', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80' },
    { id: 'o2', title: 'Maintenance', description: 'Preventive & breakdown maintenance.', price: 1200, duration: 'On-Call', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80' },
    { id: 'o3', title: 'Inverter Rectification', description: 'Diagnosing and repairing inverter errors.', price: 800, duration: '1 hr', image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&q=80' },
    { id: 'o4', title: 'Cable Inspection', description: 'DC/AC cable health & insulation check.', price: 300, duration: '30 min', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80' },
    { id: 'o5', title: 'Junction Box Check', description: 'MC4 connector & connection tightening.', price: 250, duration: '20 min', image: 'https://images.unsplash.com/photo-1590209489060-6371c6f9660c?w=400&q=80' },
  ],
  equipment: [
    { id: 'e1', title: 'Equipment Rental', description: 'Rent brushes, pumps, and tools.', price: 250, duration: 'Day', image: 'https://images.unsplash.com/photo-1572916166111-da6720ab0e3d?w=400&q=80' },
    { id: 'e2', title: 'Solar Brushes & Tools', description: 'Specialized cleaning hardware.', price: 1500, duration: 'Life', image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400&q=80' },
    { id: 'e3', title: 'Eco Cleaning Solutions', description: 'Anti-static panel cleaners.', price: 450, duration: 'Unit', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80' },
  ],
  emergency: [
    { id: 'sr1', title: 'Emergency Breakdown', description: 'Immediate response for power failures.', price: 2000, duration: '2 hr', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80', urgent: true },
    { id: 'sr2', title: 'Inverter Trip Handling', description: 'Resolving frequent trips and safety issues.', price: 700, duration: '1 hr', image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&q=80' },
    { id: 'sr3', title: 'Storm Clean-up', description: 'Rapid cleaning after dust storms or heavy rain.', price: 900, duration: '1.5 hr', image: 'https://images.unsplash.com/photo-1516937622178-74558372e3b8?w=400&q=80' },
  ],
};

export const ServicesScreen = observer(() => {
  const navigation = useNavigation<any>();
  const { cartStore } = useRootStore();

  const insets = useSafeAreaInsets();

  const handleAddToCart = (service: any) => {
    cartStore.addToCart({
      id: service.id,
      title: service.title,
      price: service.price,
      basePrice: service.price,
      systemSize: service.duration, // Using duration as size placeholder for simple services
      image: typeof service.image === 'string' ? { uri: service.image } : service.image,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 20 } // Reduced padding to remove excessive gap
        ]}
        overScrollMode="never"
      >
        <View style={{ height: 10 }} />

        {CATEGORIES.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <View style={styles.servicesHeaderRow}>
              <Text style={styles.sectionHeader}>{category.label}</Text>
              <Text style={styles.resultsCount}>
                {SERVICES_DATA[category.id]?.length || 0} services
              </Text>
            </View>

            {SERVICES_DATA[category.id]?.map((service: any) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                price={service.price}
                duration={service.duration}
                featured={service.featured}
                popular={service.popular}
                urgent={service.urgent}
                category={category.id}
                onAddToCart={() => handleAddToCart(service)}
                isComingSoon={category.id !== 'cleaning'}
              />
            ))}
          </View>
        ))}
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
    marginTop: 10,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconBg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EBF1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  locationLabel: {
    fontSize: 10,
    fontFamily: 'NotoSans-Medium',
    color: lightTheme.colors.slateGray,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationValue: {
    fontSize: 13,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    marginRight: 4,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4B4B',
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: 'NotoSans-Bold',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'NotoSans-Medium',
  },
  scrollContent: {
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#F3F6FC',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 12,
    fontFamily: 'NotoSans-Medium',
    color: '#8E8E93',
    marginBottom: 16,
  },
  bannerBtn: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'NotoSans-Bold',
  },
  bannerImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  bannerIcon: {
    fontSize: 40,
  },
  shieldIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EBF1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
  },
  resultsCount: {
    fontSize: 12,
    fontFamily: 'NotoSans-Medium',
    color: '#8E8E93',
  },
  categorySection: {
    marginBottom: 32,
  },
  horizontalServicesScroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  horizontalCardWrapper: {
    marginRight: 16,
  },
});
