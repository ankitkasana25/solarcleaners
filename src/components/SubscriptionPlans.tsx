import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SectionTitle } from './SectionTitle';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const PLAN_WIDTH = width * 0.85;

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        price: '₹2,999',
        period: '/year',
        desc: 'Essential startup package for small solar setups (up to 5kW).',
        features: [
            '1 Annual Inspection',
            'Basic Cleaning (1 visit)',
            'System Health Check',
            'Email Support'
        ],
        color: '#F5F5F5',
        darkColor: '#757575',
        highlight: false,
    },
    {
        id: 'basic',
        name: 'Basic',
        price: '₹5,999',
        period: '/year',
        desc: 'Regular maintenance for residential homes (up to 10kW).',
        features: [
            '2 Annual Inspections',
            'Deep Cleaning (2 visits)',
            'Performance Report',
            'Phone Support'
        ],
        color: '#E8F5E9', // Light Green
        darkColor: '#4CAF50', // Green button
        highlight: false,
    },
    {
        id: 'standard',
        name: 'Standard',
        price: '₹9,999',
        period: '/year',
        desc: 'Comprehensive care for larger homes (up to 20kW).',
        features: [
            '4 Annual Inspections',
            'Quarterly Cleaning',
            'Priority Support',
            'Discounts on Repairs'
        ],
        color: '#E3F2FD', // Light Blue
        darkColor: '#1976D2', // Blue button
        highlight: true,
        tag: 'Most Popular'
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '₹18,999',
        period: '/year',
        desc: 'Complete peace of mind for premium estates (up to 50kW).',
        features: [
            '6 Annual Inspections',
            'Bi-monthly Cleaning',
            '24/7 Dedicated Support',
            'Free Minor Repairs'
        ],
        color: '#FFF3E0', // Light Orange
        darkColor: '#FB8C00', // Orange button
        highlight: false,
    },
    {
        id: 'commercial',
        name: 'Commercial',
        price: 'Custom',
        period: '/year',
        desc: 'Tailored solutions for commercial solar farms & businesses.',
        features: [
            'Monthly Maintenance',
            'Robotic Cleaning Options',
            'Dedicated Account Manager',
            'Real-time Monitoring'
        ],
        color: '#F3E5F5', // Light Purple
        darkColor: '#8E24AA', // Purple button
        highlight: false,
    },
];

export const SubscriptionPlans = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SectionTitle title="Subscription Plans" badgeText="Annual Plans" />
                <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
            </View>

            {/* Filter Row removed */}

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent} pagingEnabled snapToInterval={PLAN_WIDTH + 16}>
                {plans.map((plan) => (
                    <View key={plan.id} style={[styles.card, { backgroundColor: plan.color }]}>
                        {plan.highlight && (
                            <View style={styles.recommendedBadge}>
                                <Text style={styles.recommendedText}>Recommended</Text>
                            </View>
                        )}

                        <Text style={styles.planName}>{plan.name}</Text>

                        {/* Use flex row for pricing if needed, keeping simple text for now */}
                        <Text style={styles.priceContainer}>
                            <Text style={styles.price}>{plan.price}</Text>
                            <Text style={styles.period}>{plan.period}</Text>
                        </Text>

                        <Text style={styles.description}>{plan.desc}</Text>

                        <View style={styles.featureList}>
                            <Text style={styles.featureTitle}>What's Included:</Text>
                            {plan.features.map((feature, index) => (
                                <View key={index} style={styles.featureItem}>
                                    <View style={[styles.checkCircle, { backgroundColor: plan.darkColor }]}>
                                        <Text style={styles.checkMark}>✓</Text>
                                    </View>
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity style={[styles.button, { backgroundColor: plan.darkColor }]} activeOpacity={0.9}>
                            <Text style={styles.buttonText}>Choose Plan</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
    viewAll: {
        color: '#007AFF',
        fontWeight: '600',
        fontSize: 14,
        marginTop: 10,
    },


    scrollContent: {
        paddingHorizontal: 20,
        gap: 16,
    },
    card: {
        width: PLAN_WIDTH,
        padding: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        position: 'relative',
    },
    recommendedBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#1976D2',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderBottomRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    recommendedText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
    },
    planName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 8,
        marginTop: 10,
    },
    priceContainer: {
        marginBottom: 8,
    },
    price: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1C1C1E', // Or green/blue
    },
    period: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        lineHeight: 20,
    },
    featureList: {
        marginBottom: 24,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkMark: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    featureText: {
        fontSize: 14,
        color: '#444',
    },
    button: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
