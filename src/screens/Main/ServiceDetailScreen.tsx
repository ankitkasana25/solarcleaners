import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Share,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { ImageIcon } from '../../components/ImageIcon';

interface ServiceDetailRouteParams {
    service: {
        id: string;
        title: string;
        category: string;
        price: number;
        image: string;
        discount?: string;
        description: string;
        technicalHighlights?: string[];
        benefits?: Array<{ icon: string; title: string; description: string }>;
        addOns?: Array<{ id: string; title: string; description: string; price: number; duration: string; popular?: boolean }>;
    };
}

export const ServiceDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { service } = (route.params as ServiceDetailRouteParams) || {};

    const [systemSize, setSystemSize] = useState('5.0');
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this service: ${service?.title}\nPrice: ₹${service?.price}\n\nBook now on SolarCleaners app!`,
                title: service?.title,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleAddToCart = () => {
        // TODO: Implement cart functionality with MobX store
        Alert.alert('Success', 'Added to cart!');
    };

    const handleBookNow = () => {
        // TODO: Navigate to booking screen
        Alert.alert('Booking', 'Proceeding to booking...');
    };

    const toggleAddOn = (addOnId: string) => {
        setSelectedAddOns(prev =>
            prev.includes(addOnId)
                ? prev.filter(id => id !== addOnId)
                : [...prev, addOnId]
        );
    };

    const calculateTotal = () => {
        let total = service?.price || 0;
        if (service?.addOns) {
            selectedAddOns.forEach(addOnId => {
                const addOn = service.addOns?.find(a => a.id === addOnId);
                if (addOn) total += addOn.price;
            });
        }
        return total;
    };

    if (!service) {
        return (
            <View style={styles.container}>
                <Text>Service not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.headerButtonText}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>↻</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
                    <ImageIcon name="bell" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Service Image */}
                <View style={styles.imageContainer}>
                    <View style={styles.placeholderImage}>
                        <Text style={styles.imagePlaceholderText}>📸</Text>
                    </View>
                </View>

                {/* Service Title & Category */}
                <View style={styles.titleSection}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{service.category}</Text>
                    </View>
                </View>

                {/* System Size Input */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Solar System Size (kW):</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={systemSize}
                            onChangeText={setSystemSize}
                            keyboardType="decimal-pad"
                        />
                        <Text style={styles.inputUnit}>kW</Text>
                    </View>
                </View>

                {/* Price */}
                <View style={styles.priceSection}>
                    <Text style={styles.priceLabel}>Total Price:</Text>
                    <Text style={styles.priceValue}>₹{calculateTotal()}</Text>
                </View>

                {/* Reviews */}
                <Text style={styles.reviewsText}>No reviews yet</Text>

                {/* About Service */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About this service</Text>
                    <Text style={styles.description}>{service.description}</Text>

                    {service.technicalHighlights && service.technicalHighlights.length > 0 && (
                        <>
                            <Text style={styles.subTitle}>Technical Highlights</Text>
                            {service.technicalHighlights.map((highlight, index) => (
                                <Text key={index} style={styles.listItem}>
                                    {index + 1}. {highlight}
                                </Text>
                            ))}
                        </>
                    )}
                </View>

                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Benefits</Text>
                        {service.benefits.map((benefit, index) => (
                            <View key={index} style={styles.benefitItem}>
                                <View style={styles.benefitIcon}>
                                    <Text style={styles.benefitIconText}>{benefit.icon}</Text>
                                </View>
                                <View style={styles.benefitContent}>
                                    <Text style={styles.benefitTitle}>{benefit.title}</Text>
                                    <Text style={styles.benefitDescription}>{benefit.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Add-ons */}
                {service.addOns && service.addOns.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Add-ons</Text>
                        <Text style={styles.addOnsSubtitle}>
                            Enhance your service with these optional add-ons
                        </Text>
                        {service.addOns.map((addOn) => (
                            <TouchableOpacity
                                key={addOn.id}
                                style={styles.addOnItem}
                                onPress={() => toggleAddOn(addOn.id)}
                            >
                                <View style={styles.addOnCheckbox}>
                                    {selectedAddOns.includes(addOn.id) && (
                                        <View style={styles.addOnCheckboxChecked} />
                                    )}
                                </View>
                                <View style={styles.addOnContent}>
                                    <View style={styles.addOnHeader}>
                                        <Text style={styles.addOnTitle}>{addOn.title}</Text>
                                        {addOn.popular && (
                                            <View style={styles.popularBadge}>
                                                <Text style={styles.popularText}>Popular</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.addOnDescription}>{addOn.description}</Text>
                                    <View style={styles.addOnFooter}>
                                        <Text style={styles.addOnPrice}>₹{addOn.price}</Text>
                                        <Text style={styles.addOnDuration}>⏱ {addOn.duration}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* You May Also Like */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>You May Also Like</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedServices}>
                        {/* Placeholder for related services */}
                        <View style={styles.relatedServiceCard}>
                            <View style={styles.relatedServiceImage}>
                                <Text>📸</Text>
                            </View>
                            <Text style={styles.relatedServiceTitle}>Basic Solar Panel Cleaning</Text>
                        </View>
                        <View style={styles.relatedServiceCard}>
                            <View style={styles.relatedServiceImage}>
                                <Text>📸</Text>
                            </View>
                            <Text style={styles.relatedServiceTitle}>Residential Solar Panel Installation</Text>
                        </View>
                    </ScrollView>
                </View>

                {/* FAQ Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>How often should I clean my solar panels?</Text>
                        <Text style={styles.faqArrow}>▼</Text>
                    </View>
                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>What happens during a maintenance service visit?</Text>
                        <Text style={styles.faqArrow}>▼</Text>
                    </View>
                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>How long does the service take?</Text>
                        <Text style={styles.faqArrow}>▼</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.viewAllFAQs}>View All FAQs</Text>
                    </TouchableOpacity>
                </View>

                {/* Customer Reviews */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customer Reviews</Text>
                    <View style={styles.noReviews}>
                        <Text style={styles.noReviewsIcon}>⭐</Text>
                        <Text style={styles.noReviewsTitle}>No reviews yet</Text>
                        <Text style={styles.noReviewsSubtitle}>Be the first to review this service</Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.priceContainer}>
                    <Text style={styles.bottomPriceLabel}>Price</Text>
                    <Text style={styles.bottomPriceValue}>₹{calculateTotal()}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
                    <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 300,
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E8F1FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        fontSize: 64,
        opacity: 0.3,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    serviceTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1E',
        flex: 1,
        marginRight: 12,
    },
    categoryBadge: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    categoryText: {
        color: '#FF9800',
        fontSize: 14,
        fontWeight: '600',
    },
    inputSection: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1C1C1E',
    },
    inputUnit: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
    },
    priceSection: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    priceLabel: {
        fontSize: 14,
        color: '#999',
        marginBottom: 4,
    },
    priceValue: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.primary,
    },
    reviewsText: {
        paddingHorizontal: 20,
        fontSize: 14,
        color: '#999',
        marginBottom: 24,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
        marginBottom: 16,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginTop: 16,
        marginBottom: 12,
    },
    listItem: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        marginBottom: 8,
    },
    benefitItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    benefitIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E8F1FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    benefitIconText: {
        fontSize: 24,
    },
    benefitContent: {
        flex: 1,
    },
    benefitTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    benefitDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    addOnsSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    addOnItem: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    addOnCheckbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.primary,
        marginRight: 12,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addOnCheckboxChecked: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: colors.primary,
    },
    addOnContent: {
        flex: 1,
    },
    addOnHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    addOnTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        flex: 1,
    },
    popularBadge: {
        backgroundColor: '#FFE5CC',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    popularText: {
        fontSize: 12,
        color: '#FF9800',
        fontWeight: '600',
    },
    addOnDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    addOnFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addOnPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary,
        marginRight: 16,
    },
    addOnDuration: {
        fontSize: 13,
        color: '#999',
    },
    relatedServices: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    relatedServiceCard: {
        width: 180,
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        marginRight: 12,
        overflow: 'hidden',
    },
    relatedServiceImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    relatedServiceTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
        padding: 12,
    },
    faqItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    faqQuestion: {
        fontSize: 15,
        color: '#1C1C1E',
        flex: 1,
        fontWeight: '500',
    },
    faqArrow: {
        fontSize: 12,
        color: '#999',
    },
    viewAllFAQs: {
        fontSize: 15,
        color: colors.primary,
        fontWeight: '600',
        marginTop: 12,
    },
    noReviews: {
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
    },
    noReviewsIcon: {
        fontSize: 48,
        marginBottom: 12,
        opacity: 0.3,
    },
    noReviewsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    noReviewsSubtitle: {
        fontSize: 14,
        color: '#999',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    priceContainer: {
        marginRight: 16,
    },
    bottomPriceLabel: {
        fontSize: 12,
        color: '#999',
    },
    bottomPriceValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 14,
        marginRight: 12,
        alignItems: 'center',
    },
    addToCartText: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.primary,
    },
    bookNowButton: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    bookNowText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
