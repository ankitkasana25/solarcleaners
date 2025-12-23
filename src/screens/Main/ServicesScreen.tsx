import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ServiceCategories,
  Category,
} from '../../components/ServiceCategories';
import { ServiceCard } from '../../components/ServiceCard';
import { ServiceSection } from '../../components/ServiceSection';
import { lightTheme } from '../../theme/theme';
import { FAQSection } from '../../components/FAQSection';

const { width } = Dimensions.get('window');

const CATEGORIES: Category[] = [
  { id: 'cleaning', label: 'Panel Deep Cleaning', icon: '✨', color: '#EBF1FF' },
  { id: 'maintenance', label: 'System Health Check', icon: '🛡️', color: '#EBF1FF' },
  { id: 'repairing', label: 'Inverter & Repairs', icon: '🛠️', color: '#EBF1FF' },
  { id: 'installation', label: 'New Installation', icon: '⚡', color: '#EBF1FF' },
  { id: 'water', label: 'Water Solutions', icon: '💧', color: '#EBF1FF' },
  { id: 'consultation', label: 'Expert Consult', icon: '👨‍🔧', color: '#EBF1FF' },
];

export const ServicesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handleCategoryPress = (id: string) => {
    const category = CATEGORIES.find(c => c.id === id);
    navigation.navigate('ServiceCategory', {
      categoryId: id,
      categoryTitle: category?.label,
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7}>
            <View style={styles.locationIconBg}>
              <Ionicons name="location" size={12} color={lightTheme.colors.primaryBlue} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Location</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationValue}>Sector 62, Noida</Text>
                <Ionicons name="chevron-down" size={12} color={lightTheme.colors.slateGray} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn} activeOpacity={0.7}>
            <Ionicons name="cart-outline" size={24} color="#1C1C1E" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={20} color="#8E8E93" style={styles.searchIcon} />
          <Text style={styles.placeholderText}>Search for 'Panel Cleaning'</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        overScrollMode="never"
      >
        <ServiceCategories
          categories={CATEGORIES}
          activeCategory={activeTab}
          onCategoryPress={handleCategoryPress}
        />

        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Solar Plant Health Checkup</Text>
              <Text style={styles.bannerSub}>Get 20% OFF on your first inspection</Text>
              <TouchableOpacity style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>Book now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerImagePlaceholder}>
              <Text style={styles.bannerIcon}>🛡️</Text>
            </View>
          </View>
        </View>

        <ServiceSection title="Best Sellers" services={[]} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
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
    paddingBottom: 40,
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
  }
});
