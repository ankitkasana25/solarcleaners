import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { lightTheme } from '../../theme/theme';
import { ScreenHeader } from '../../components/ScreenHeader';
import { ServiceCard } from '../../components/ServiceCard';

const { width } = Dimensions.get('window');

// Extended demo data for categories
const CATEGORY_SERVICES: Record<string, any[]> = {
    cleaning: Array(6).fill(null).map((_, i) => ({
        id: `cleaning-${i}`,
        title: `Premium Solar Cleaning ${i + 1}`,
        description: 'Advanced cleaning with deionized water and soft brushes.',
        price: 500 + (i * 50),
        duration: '1-2 hours',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
        category: 'cleaning',
        featured: i === 0,
        popular: i === 1,
    })),
    maintenance: Array(6).fill(null).map((_, i) => ({
        id: `maintenance-${i}`,
        title: `Monthly Maintenance Plan ${i + 1}`,
        description: 'Comprehensive checkup and cleaning every month.',
        price: 1200 + (i * 100),
        duration: 'Monthly',
        image: 'https://images.unsplash.com/photo-1625301840055-7c1b7198cfc0?w=600&q=80',
        category: 'maintenance',
        popular: i === 0,
    })),
    repairing: Array(6).fill(null).map((_, i) => ({
        id: `repairing-${i}`,
        title: `Inverter & Panel Repair ${i + 1}`,
        description: 'Expert diagnosis and repair for all solar systems.',
        price: 800 + (i * 75),
        duration: '2-4 hours',
        image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80',
        category: 'repairing',
        urgent: i === 0,
    })),
    installation: Array(6).fill(null).map((_, i) => ({
        id: `installation-${i}`,
        title: `New System Installation ${i + 1}`,
        description: 'Full setup including permits and inspection.',
        price: 15000 + (i * 1000),
        duration: '2-3 days',
        image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?w=600&q=80',
        category: 'installation',
        featured: i === 0,
    })),
};

export const ServiceCategoryScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { categoryId, categoryTitle } = route.params || {};

    const services = CATEGORY_SERVICES[categoryId || 'cleaning'] || [];

    return (
        <View style={styles.container}>
            <ScreenHeader title={`${categoryTitle || 'Service'} Services`} showBack={true} />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.headerTitle}>{categoryTitle} Solutions</Text>
                <Text style={styles.headerSubtitle}>
                    Choose from our expertly curated list of {categoryTitle?.toLowerCase()} services.
                </Text>

                <View style={styles.gridContainer}>
                    {services.map((service) => (
                        <View key={service.id} style={styles.gridItemWrapper}>
                            <ServiceCard
                                {...service}
                                gridView={true}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        fontFamily: 'NotoSans-Regular',
        color: lightTheme.colors.gray3,
        marginBottom: 24,
        lineHeight: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'space-between',
    },
    gridItemWrapper: {
        width: (width - 48) / 2,
        marginBottom: 16,
    },
});
