import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SectionTitle } from './SectionTitle';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

const offers = [
    {
        id: '1',
        title: 'Summer Special',
        desc: 'Keep your panels clean with 20% on all cleaning services',
        code: 'SUMMER20',
        colors: ['#FF9966', '#FF5E62'], // Sunrise Gradient
        icon: '☀️',
        valid: 'Valid till 31st August'
    },
    {
        id: '2',
        title: 'Holi Festival',
        desc: 'Colorful savings on maintenance plans',
        code: 'HOLI25',
        colors: ['#4FACFE', '#00F2FE'], // Blue Lagoon Gradient
        icon: '🎨',
        valid: 'Valid till March'
    },
];

export const SeasonalOffers = () => {
    return (
        <View style={styles.container}>
            <SectionTitle title="Seasonal Offers" badgeText="Save More" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {offers.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.cardWrapper}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={item.colors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.card}
                        >
                            <View>
                                <View style={styles.header}>
                                    <Text style={styles.icon}>{item.icon}</Text>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                </View>
                                <Text style={styles.cardDesc}>{item.desc}</Text>
                            </View>

                            <View style={styles.footer}>
                                <View style={styles.codeContainer}>
                                    <Text style={styles.code}>{item.code}</Text>
                                    <Text style={styles.copyIcon}>❒</Text>
                                </View>
                                <Text style={styles.valid}>{item.valid}</Text>
                            </View>

                            {/* Decorative circles/sun */}
                            <View style={styles.decoration} />
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 16,
    },
    cardWrapper: {
        width: CARD_WIDTH,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    card: {
        padding: 24,
        borderRadius: 20,
        height: 190,
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        fontSize: 20,
        marginRight: 8,
        color: '#FFF',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFF',
    },
    cardDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 20,
        maxWidth: '90%',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    codeContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    code: {
        fontWeight: '700',
        color: '#333',
        marginRight: 8,
    },
    copyIcon: {
        fontSize: 14,
        color: '#666',
    },
    valid: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontWeight: '500',
    },
    decoration: {
        position: 'absolute',
        bottom: -40,
        right: -40,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
});
