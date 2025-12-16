import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const PROMOTIONS = [
    {
        id: '1',
        title: 'Happy Weekend',
        discount: '25% OFF',
        description: 'All Solar Services',
        backgroundColor: '#E8F5E9', // Light green
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
        accentColor: '#2E7D32',
    },
    {
        id: '2',
        title: 'New User Offer',
        discount: 'Flat ₹200',
        description: 'On First Booking',
        backgroundColor: '#E3F2FD', // Light Blue
        image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80',
        accentColor: '#1565C0',
    },
    {
        id: '3',
        title: 'Monsoon Special',
        discount: 'Free Checkup',
        description: 'With Deep Cleaning',
        backgroundColor: '#FFF3E0', // Light Orange
        image: 'https://images.unsplash.com/photo-1625301840055-7c1b7198cfc0?w=600&q=80',
        accentColor: '#EF6C00',
    }
];

import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { Alert } from 'react-native';

export const ServicePromotions = observer(() => {
    const { cartStore } = useRootStore();

    const handleClaim = (item: typeof PROMOTIONS[0]) => {
        const isApplied = cartStore.appliedOffers.some(offer => offer.id === item.id);

        if (isApplied) {
            Alert.alert('Offer Applied', 'This offer is already applied to your cart.');
            return;
        }

        cartStore.applyOffer({
            id: item.id,
            title: item.title,
            discount: item.discount,
            description: item.description
        });

        Alert.alert('Success', 'Offer applied to your cart!');
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + 16}
            >
                {PROMOTIONS.map((item) => {
                    const isApplied = cartStore.appliedOffers.some(offer => offer.id === item.id);

                    return (
                        <View key={item.id} style={[styles.card, { backgroundColor: item.backgroundColor }]}>
                            <View style={styles.textContainer}>
                                <Text style={[styles.subTitle, { color: item.accentColor }]}>{item.description}</Text>
                                <Text style={[styles.discount, { color: item.accentColor }]}>{item.discount}</Text>
                                <Text style={styles.title}>{item.title}</Text>
                                <View
                                    style={[
                                        styles.button,
                                        { backgroundColor: isApplied ? '#4CAF50' : item.accentColor } // Green if applied
                                    ]}
                                    onTouchEnd={() => handleClaim(item)} // Simple touch handling
                                >
                                    <Text style={styles.buttonText}>
                                        {isApplied ? 'Applied ✓' : 'Claim Now'}
                                    </Text>
                                </View>
                            </View>
                            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    contentContainer: {
        paddingHorizontal: 20,
        gap: 16,
    },
    card: {
        width: CARD_WIDTH,
        height: 160,
        borderRadius: 24,
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
    },
    textContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        zIndex: 2,
    },
    title: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginTop: 4,
        marginBottom: 12,
    },
    discount: {
        fontSize: 28,
        fontFamily: 'NotoSans-Black',
        lineHeight: 34,
    },
    subTitle: {
        fontSize: 12,
        fontFamily: 'NotoSans-Medium',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
    },
    image: {
        width: '50%',
        height: '100%',
        position: 'absolute',
        right: -20,
        bottom: -20,
        borderBottomLeftRadius: 100, // Creative shape
        transform: [{ rotate: '-10deg' }, { scale: 1.2 }],
    },
});
