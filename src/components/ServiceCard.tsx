import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const GRID_CARD_WIDTH = (width - 48) / 2;

interface ServiceCardProps {
    title: string;
    description?: string;
    image: string;
    discount?: string;
    price?: number;
    duration?: string;
    featured?: boolean;
    popular?: boolean;
    urgent?: boolean;
    id: string;
    category: string;
    gridView?: boolean;
}

export const ServiceCard = ({
    title,
    description,
    image,
    discount,
    price,
    duration,
    featured,
    popular,
    urgent,
    id,
    category,
    gridView = false,
}: ServiceCardProps) => {
    const navigation = useNavigation<any>();

    const handlePress = () => {
        const serviceData = {
            id,
            title,
            category,
            price: price || 725,
            image,
            discount,
            description,
            technicalHighlights: [
                'Targets heavy grime: moss, sap, lichen, cement dust, and oil residues commonly seen in Indian environments.',
                'Can recover up to 30-40% of lost output in severely soiled setups.',
                'Provides early detection of micro-cracks, seal wear, hotspots, or frame issues via detailed inspection.',
            ],
            benefits: [
                {
                    icon: '🔋',
                    title: 'Improved Efficiency',
                    description: "Maximize your system's power output",
                },
                {
                    icon: '💰',
                    title: 'Cost Savings',
                    description: 'Reduce long-term maintenance costs',
                },
                {
                    icon: '⏱️',
                    title: 'Extended Lifespan',
                    description: 'Prolong the life of your solar system',
                },
            ],
            addOns: [
                {
                    id: '1',
                    title: 'Panel Inspection',
                    description: 'Thorough inspection of all panels for damage or wear',
                    price: 500,
                    duration: '30 min',
                    popular: true,
                },
                {
                    id: '2',
                    title: 'Inverter Check',
                    description: 'Complete inverter functionality and efficiency check',
                    price: 300,
                    duration: '20 min',
                },
                {
                    id: '3',
                    title: 'Wiring Inspection',
                    description: 'Inspection of all electrical connections and wiring',
                    price: 400,
                    duration: '25 min',
                },
                {
                    id: '4',
                    title: 'Performance Report',
                    description:
                        'Detailed performance analysis and improvement recommendations',
                    price: 200,
                    duration: '15 min',
                    popular: true,
                },
            ],
        };

        navigation.navigate('ServiceDetail', { service: serviceData });
    };

    const CardContent = () => (
        <>
            <View
                style={
                    gridView ? styles.gridImageContainer : styles.horizontalImageContainer
                }
            >
                <Image
                    source={{ uri: image }}
                    style={
                        gridView
                            ? styles.gridPlaceholderImage
                            : styles.horizontalPlaceholderImage
                    }
                    resizeMode="cover"
                />

                {/* Badges */}
                <View style={styles.badgeContainer}>
                    {featured && (
                        <View style={[styles.badge, styles.featuredBadge]}>
                            <Text style={styles.badgeText}>Featured</Text>
                        </View>
                    )}
                    {popular && (
                        <View style={[styles.badge, styles.popularBadge]}>
                            <Text style={styles.badgeText}>Popular</Text>
                        </View>
                    )}
                    {urgent && (
                        <View style={[styles.badge, styles.urgentBadge]}>
                            <Text style={styles.badgeText}>Urgent</Text>
                        </View>
                    )}
                    {discount && (
                        <View style={[styles.badge, styles.discountBadge]}>
                            <Text style={styles.badgeText}>{discount}</Text>
                        </View>
                    )}
                </View>
            </View>

            <View
                style={gridView ? styles.gridCardContent : styles.horizontalCardContent}
            >
                <View style={styles.titleContainer}>
                    <Text
                        style={gridView ? styles.gridCardTitle : styles.horizontalCardTitle}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>
                    {description && (
                        <Text style={styles.cardDescription} numberOfLines={2}>
                            {description}
                        </Text>
                    )}
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.priceDurationContainer}>
                        {price && (
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceCurrency}>₹</Text>
                                <Text style={styles.priceText}>{price}</Text>
                                <Text style={styles.priceUnit}>/service</Text>
                            </View>
                        )}
                        {duration && (
                            <View style={styles.durationContainer}>
                                <Text style={styles.durationIcon}>⏱️</Text>
                                <Text style={styles.durationText}>{duration}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </>
    );

    if (gridView) {
        return (
            <TouchableOpacity
                style={styles.gridServiceCard}
                activeOpacity={0.9}
                onPress={handlePress}
            >
                <CardContent />
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={styles.horizontalServiceCard}
            activeOpacity={0.9}
            onPress={handlePress}
        >
            <CardContent />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Horizontal Service Card Styles
    horizontalServiceCard: {
        width: CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        marginBottom: 10,
    },
    horizontalImageContainer: {
        position: 'relative',
        height: 180, // Taller images
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    horizontalPlaceholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: lightTheme.colors.antiFlashWhite,
    },

    // Grid Service Card Styles
    gridServiceCard: {
        width: GRID_CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    gridImageContainer: {
        position: 'relative',
        height: 140,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
    },
    gridPlaceholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: lightTheme.colors.antiFlashWhite,
    },

    // Common Card Styles
    badgeContainer: {
        position: 'absolute',
        top: 12,
        left: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    featuredBadge: { backgroundColor: lightTheme.colors.primary },
    popularBadge: { backgroundColor: lightTheme.colors.subscribeGold },
    urgentBadge: { backgroundColor: lightTheme.colors.redOrange },
    discountBadge: { backgroundColor: '#5856D6' },

    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
        textTransform: 'uppercase',
    },

    // Card Content Styles
    horizontalCardContent: {
        padding: 16,
    },
    gridCardContent: {
        padding: 12,
    },
    titleContainer: {
        marginBottom: 12,
    },
    horizontalCardTitle: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    gridCardTitle: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 12,
        color: '#8E8E93',
        fontFamily: 'NotoSans-Medium',
    },

    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceDurationContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    priceCurrency: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primary,
    },
    priceText: {
        fontSize: 18,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primary,
        marginLeft: 2,
    },
    priceUnit: {
        fontSize: 12,
        color: '#8E8E93',
        fontFamily: 'NotoSans-Regular',
        marginLeft: 2,
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: lightTheme.colors.antiFlashWhite,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    durationIcon: {
        fontSize: 10,
        marginRight: 4,
    },
    durationText: {
        fontSize: 10,
        color: '#8E8E93',
        fontFamily: 'NotoSans-Medium',
    },
});
