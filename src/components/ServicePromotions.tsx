import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, Image, Pressable } from 'react-native';
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

    const currentPromotion = PROMOTIONS[currentSlide] || PROMOTIONS[0];

    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={220}
                autoPlay={true}
                data={PROMOTIONS}
                scrollAnimationDuration={1000}
                autoPlayInterval={3000}
                onSnapToItem={(index) => setCurrentSlide(index)}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.carouselItem}
                        onPress={() => handleClaim(item)}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.imageStyle}
                            resizeMode="cover"
                        />
                        <View style={styles.overlayContainer} pointerEvents="none">
                            <View style={[styles.infoCard, { backgroundColor: 'rgba(255,255,255,0.9)' }]}>
                                <Text style={[styles.subTitle, { color: item.accentColor }]}>
                                    {item.description}
                                </Text>
                                <Text style={[styles.discount, { color: item.accentColor }]}>
                                    {item.discount}
                                </Text>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.tapToClaim}>Tap image to claim</Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
            {/* Pagination Dots */}
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
    },
    imageStyle: {
        borderRadius: 20,
        width: width - 40,
        height: 200,
    },
    overlayContainer: {
        position: 'absolute',
        top: 25,
        left: 45,
        zIndex: 10,
        width: '60%',
        height: 150,
        justifyContent: 'center',
    },
    infoCard: {
        padding: 16,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginTop: 2,
    },
    discount: {
        fontSize: 24,
        fontFamily: 'NotoSans-Black',
        lineHeight: 30,
    },
    subTitle: {
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    tapToClaim: {
        fontSize: 9,
        fontFamily: 'NotoSans-Medium',
        color: '#8E8E93',
        marginTop: 4,
        fontStyle: 'italic',
    },
    pagination: {
        flexDirection: 'row',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: lightTheme.colors.primaryBlue,
        width: 20,
    }
});

export default ServicePromotions;


