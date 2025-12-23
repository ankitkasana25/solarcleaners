import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');

const PROMOTIONS = [
    {
        id: '1',
        title: 'Happy Weekend',
        discount: '25% OFF',
        description: 'All Solar Services',
        backgroundColor: '#E8F5E9',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
        accentColor: '#2E7D32',
    },
    {
        id: '2',
        title: 'New User Offer',
        discount: 'Flat ₹200',
        description: 'On First Booking',
        backgroundColor: '#E3F2FD',
        image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80',
        accentColor: '#1565C0',
    },
    {
        id: '3',
        title: 'Monsoon Special',
        discount: 'Free Checkup',
        description: 'With Deep Cleaning',
        backgroundColor: '#FFF3E0',
        image: 'https://images.unsplash.com/photo-1625301840055-7c1b7198cfc0?w=800&q=80',
        accentColor: '#EF6C00',
    },
    {
        id: '4',
        title: 'Energy Booster',
        discount: '15% Extra',
        description: 'On Annual Plans',
        backgroundColor: '#F3E5F5',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
        accentColor: '#7B1FA2',
    }
];

export const ServicePromotions = observer(() => {
    const { cartStore } = useRootStore();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleClaim = (item: typeof PROMOTIONS[0]) => {
        if (!cartStore) return;

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

        Alert.alert('Success', `Offer "${item.title}" applied to your cart!`);
    };

    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={220}
                autoPlay={true}
                data={PROMOTIONS}
                scrollAnimationDuration={800}
                autoPlayInterval={3500}
                onSnapToItem={(index) => setCurrentSlide(index)}
                renderItem={({ item }) => (
                    <View style={styles.carouselItem}>
                        <View style={styles.cardWrapper}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.imageStyle}
                                resizeMode="cover"
                            />
                            <View style={styles.contentOverlay}>
                                <View style={styles.textContainer}>
                                    <Text style={[styles.promoLabel, { color: item.accentColor }]}>
                                        {item.description}
                                    </Text>
                                    <Text style={[styles.discountText, { color: item.accentColor }]}>
                                        {item.discount}
                                    </Text>
                                    <View style={styles.titleGap} />
                                    <Text style={styles.promoTitle}>{item.title}</Text>

                                    <TouchableOpacity
                                        style={[styles.claimButton, { backgroundColor: '#1C1C1E' }]}
                                        onPress={() => handleClaim(item)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.claimButtonText}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />

            {/* Pagination */}
            <View style={styles.pagination}>
                {PROMOTIONS.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentSlide === index && styles.activeDot
                        ]}
                    />
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    carouselItem: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    cardWrapper: {
        width: width - 40,
        height: 190,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#F7F9FC',
        position: 'relative',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    contentOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.4)', // Subtle fade to make text pop
        padding: 20,
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: '65%',
    },
    promoLabel: {
        fontSize: 11,
        fontFamily: 'NotoSans-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    discountText: {
        fontSize: 28,
        fontFamily: 'NotoSans-Black',
        lineHeight: 34,
    },
    titleGap: {
        height: 2,
    },
    promoTitle: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    claimButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    claimButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'NotoSans-Bold',
    },
    pagination: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: lightTheme.colors.primaryBlue,
        width: 18,
    }
});

export default ServicePromotions;
