import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightTheme } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
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
            ],
        };

        navigation.navigate('ServiceDetail', { service: serviceData });
    };

    if (gridView) {
        return (
            <TouchableOpacity
                style={styles.gridCard}
                onPress={handlePress}
                activeOpacity={0.85}
            >
                <View style={styles.gridImageWrapper}>
                    <Image source={{ uri: image }} style={styles.gridImage} />
                    {discount && (
                        <View style={styles.gridDiscount}>
                            <Text style={styles.discountText}>{discount}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.gridContent}>
                    <Text style={styles.gridTitle} numberOfLines={1}>{title}</Text>
                    <View style={styles.gridFooter}>
                        <Text style={styles.gridPrice}>₹{price}</Text>
                        <Ionicons name="arrow-forward-circle" size={20} color={lightTheme.colors.primaryBlue} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={styles.rowCard}
            onPress={handlePress}
            activeOpacity={0.85}
        >
            <View style={styles.circleWrapper}>
                <View style={styles.circleIcon}>
                    <Image source={{ uri: image }} style={styles.circleImage} />
                </View>
                {featured && (
                    <View style={styles.featuredTag}>
                        <Ionicons name="star" size={10} color="#FFF" />
                    </View>
                )}
            </View>

            <View style={styles.rowContent}>
                <View style={styles.rowHeader}>
                    <Text style={styles.rowTitle} numberOfLines={1}>{title}</Text>
                    <View style={styles.rowPriceContainer}>
                        <Text style={styles.rowPrice}>₹{price}</Text>
                    </View>
                </View>
                <Text style={styles.rowDesc} numberOfLines={2}>{description}</Text>

                <View style={styles.rowFooter}>
                    <View style={styles.durationBox}>
                        <Ionicons name="time-outline" size={12} color={lightTheme.colors.slateGray} />
                        <Text style={styles.durationText}>{duration}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookNowBtn} onPress={handlePress}>
                        <Text style={styles.bookNowText}>Book Now</Text>
                        <Ionicons name="chevron-forward" size={14} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Row Card (Standard View)
    rowCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#0D81FC',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    circleWrapper: {
        position: 'relative',
        marginRight: 16,
    },
    circleIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F3F6FC',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#EBF1FF',
    },
    circleImage: {
        width: '100%',
        height: '100%',
    },
    featuredTag: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: lightTheme.colors.subscribeGold,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    rowContent: {
        flex: 1,
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    rowTitle: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        flex: 1,
    },
    rowPriceContainer: {
        backgroundColor: '#EBF1FF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    rowPrice: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
    },
    rowDesc: {
        fontSize: 12,
        fontFamily: 'NotoSans-Regular',
        color: lightTheme.colors.slateGray,
        lineHeight: 18,
        marginBottom: 10,
    },
    rowFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        fontSize: 11,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.slateGray,
        marginLeft: 4,
    },
    bookNowBtn: {
        backgroundColor: lightTheme.colors.primaryBlue,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    bookNowText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'NotoSans-Bold',
        marginRight: 4,
    },

    // Grid Card Styles
    gridCard: {
        width: GRID_CARD_WIDTH,
        backgroundColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    gridImageWrapper: {
        height: 120,
        position: 'relative',
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    gridDiscount: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FF4B4B',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    discountText: {
        color: '#FFF',
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
    },
    gridContent: {
        padding: 12,
    },
    gridTitle: {
        fontSize: 13,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        marginBottom: 8,
    },
    gridFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gridPrice: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
    },
});
