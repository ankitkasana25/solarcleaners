import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenContainer } from '../../components/ScreenContainer';
import { ImageIcon } from '../../components/ImageIcon';
import { lightTheme } from '../../theme/theme';
import { colors } from '../../theme/colors';
import {
    RESIDENTIAL_PACKAGES,
    COMMERCIAL_PACKAGES,
    INDUSTRIAL_PACKAGES,
    PACKAGE_INCLUDES,
    calculatePrice,
    ServicePackage,
} from '../../data/servicePackages';

const { width } = Dimensions.get('window');

type PackageType = 'residential' | 'commercial' | 'industrial' | 'custom';

export const PackageSelectionScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { serviceType } = (route.params as { serviceType?: string }) || {};

    const [selectedType, setSelectedType] = useState<PackageType>('residential');
    const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
    const [customSize, setCustomSize] = useState('');

    const getPackages = (): ServicePackage[] => {
        switch (selectedType) {
            case 'residential':
                return RESIDENTIAL_PACKAGES;
            case 'commercial':
                return COMMERCIAL_PACKAGES;
            case 'industrial':
                return INDUSTRIAL_PACKAGES;
            default:
                return [];
        }
    };

    const handleContinue = () => {
        if (selectedPackage) {
            navigation.navigate('ServiceDetail', {
                service: {
                    id: selectedPackage.id,
                    title: `Solar Panel Cleaning - ${selectedPackage.systemSize} kW`,
                    price: selectedPackage.price,
                    systemSize: selectedPackage.systemSize,
                    category: selectedPackage.category,
                    description: `Professional solar panel cleaning service for ${selectedPackage.systemSize} kW system`,
                    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
                },
            });
        } else if (selectedType === 'custom' && customSize) {
            const size = parseFloat(customSize);
            const price = calculatePrice(size);
            navigation.navigate('ServiceDetail', {
                service: {
                    id: 'custom',
                    title: `Solar Panel Cleaning - ${size} kW`,
                    price: price,
                    systemSize: size,
                    category: 'custom',
                    description: `Professional solar panel cleaning service for ${size} kW system`,
                    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
                },
            });
        }
    };

    const packages = getPackages();

    return (
        <ScreenContainer style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <ImageIcon name="arrow-left" size={20} color={colors.headerTitle} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Package</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Pricing Info Banner */}
                <View style={styles.pricingBanner}>
                    <View style={styles.pricingRow}>
                        <Text style={styles.pricingLabel}>Rate:</Text>
                        <Text style={styles.pricingValue}>₹0.15 per Watt</Text>
                    </View>
                    <View style={styles.pricingDivider} />
                    <View style={styles.pricingRow}>
                        <Text style={styles.pricingLabel}>1 kW =</Text>
                        <Text style={styles.pricingValue}>₹150</Text>
                    </View>
                </View>

                {/* Package Type Selector */}
                <View style={styles.typeSelector}>
                    <TouchableOpacity
                        style={[styles.typeButton, selectedType === 'residential' && styles.typeButtonActive]}
                        onPress={() => {
                            setSelectedType('residential');
                            setSelectedPackage(null);
                        }}
                    >
                        <Text style={styles.typeIcon}>🏠</Text>
                        <Text style={[styles.typeText, selectedType === 'residential' && styles.typeTextActive]}>
                            Residential
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.typeButton, selectedType === 'commercial' && styles.typeButtonActive]}
                        onPress={() => {
                            setSelectedType('commercial');
                            setSelectedPackage(null);
                        }}
                    >
                        <Text style={styles.typeIcon}>🏢</Text>
                        <Text style={[styles.typeText, selectedType === 'commercial' && styles.typeTextActive]}>
                            Commercial
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.typeButton, selectedType === 'industrial' && styles.typeButtonActive]}
                        onPress={() => {
                            setSelectedType('industrial');
                            setSelectedPackage(null);
                        }}
                    >
                        <Text style={styles.typeIcon}>🏭</Text>
                        <Text style={[styles.typeText, selectedType === 'industrial' && styles.typeTextActive]}>
                            Industrial
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Package Cards */}
                <View style={styles.packagesContainer}>
                    <Text style={styles.sectionTitle}>
                        {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Packages
                    </Text>

                    {packages.map((pkg) => {
                        const isSelected = selectedPackage?.id === pkg.id;
                        return (
                            <TouchableOpacity
                                key={pkg.id}
                                style={[styles.packageCard, isSelected && styles.packageCardSelected]}
                                onPress={() => setSelectedPackage(pkg)}
                                activeOpacity={0.7}
                            >
                                {pkg.popular && (
                                    <View style={styles.popularBadge}>
                                        <Text style={styles.popularText}>POPULAR</Text>
                                    </View>
                                )}
                                <View style={styles.packageHeader}>
                                    <View style={styles.packageInfo}>
                                        <Text style={styles.packageSize}>{pkg.systemSize} kW</Text>
                                        <Text style={styles.packageCalc}>
                                            {pkg.systemSize} × ₹150
                                        </Text>
                                    </View>
                                    <View style={styles.packagePriceContainer}>
                                        <Text style={styles.packagePrice}>₹{pkg.price.toLocaleString()}</Text>
                                        <Text style={styles.packagePriceLabel}>per visit</Text>
                                    </View>
                                </View>
                                {isSelected && (
                                    <View style={styles.selectedIndicator}>
                                        <Text style={styles.selectedIcon}>✓</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}

                    {/* Custom Package Option */}
                    {selectedType === 'industrial' && (
                        <View style={styles.customPackageCard}>
                            <Text style={styles.customTitle}>Above 100 kW?</Text>
                            <Text style={styles.customSubtitle}>
                                Custom pricing available @ ₹150 per kW
                            </Text>
                            <TouchableOpacity
                                style={styles.customButton}
                                onPress={() => {
                                    setSelectedType('custom');
                                    setSelectedPackage(null);
                                }}
                            >
                                <Text style={styles.customButtonText}>Get Custom Quote</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Package Includes */}
                <View style={styles.includesSection}>
                    <Text style={styles.sectionTitle}>✅ Package Includes</Text>
                    {PACKAGE_INCLUDES.map((item, index) => (
                        <View key={index} style={styles.includeItem}>
                            <View style={styles.includeBullet} />
                            <Text style={styles.includeText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Notes */}
                <View style={styles.notesSection}>
                    <Text style={styles.notesTitle}>📌 Important Notes</Text>
                    <Text style={styles.noteText}>• Prices per visit</Text>
                    <Text style={styles.noteText}>• GST extra as applicable</Text>
                    <Text style={styles.noteText}>
                        • Height / access / safety charges extra if required
                    </Text>
                </View>
            </ScrollView>

            {/* Footer */}
            {(selectedPackage || (selectedType === 'custom' && customSize)) && (
                <View style={styles.footer}>
                    <View style={styles.footerInfo}>
                        <Text style={styles.footerLabel}>Selected Package</Text>
                        <Text style={styles.footerValue}>
                            {selectedPackage
                                ? `${selectedPackage.systemSize} kW - ₹${selectedPackage.price}`
                                : `${customSize} kW - ₹${calculatePrice(parseFloat(customSize))}`}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueText}>Continue</Text>
                        <Ionicons name="arrow-forward" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#FAFAFA',
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: colors.headerTitle,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 120,
    },
    pricingBanner: {
        backgroundColor: '#EBF5FF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    pricingRow: {
        alignItems: 'center',
    },
    pricingLabel: {
        fontSize: 12,
        fontFamily: lightTheme.fontfamily.notoSans_medium,
        color: lightTheme.colors.gray3,
        marginBottom: 4,
    },
    pricingValue: {
        fontSize: 18,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.primaryBlue,
    },
    pricingDivider: {
        width: 1,
        height: 40,
        backgroundColor: lightTheme.colors.primaryBlue,
        opacity: 0.2,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        alignItems: 'center',
    },
    typeButtonActive: {
        backgroundColor: lightTheme.colors.primaryBlue,
        borderColor: lightTheme.colors.primaryBlue,
    },
    typeIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    typeText: {
        fontSize: 12,
        fontFamily: lightTheme.fontfamily.notoSans_medium,
        color: lightTheme.colors.gray2,
    },
    typeTextActive: {
        color: '#fff',
        fontFamily: lightTheme.fontfamily.notoSans_bold,
    },
    packagesContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.gray1,
        marginBottom: 16,
    },
    packageCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        position: 'relative',
    },
    packageCardSelected: {
        borderColor: lightTheme.colors.primaryBlue,
        backgroundColor: '#F0F7FF',
    },
    popularBadge: {
        position: 'absolute',
        top: -8,
        right: 16,
        backgroundColor: lightTheme.colors.subscribeGold,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    popularText: {
        fontSize: 10,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: '#fff',
    },
    packageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    packageInfo: {
        flex: 1,
    },
    packageSize: {
        fontSize: 24,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.gray1,
        marginBottom: 4,
    },
    packageCalc: {
        fontSize: 12,
        fontFamily: lightTheme.fontfamily.notoSans_regular,
        color: lightTheme.colors.gray3,
    },
    packagePriceContainer: {
        alignItems: 'flex-end',
    },
    packagePrice: {
        fontSize: 28,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.primaryBlue,
    },
    packagePriceLabel: {
        fontSize: 11,
        fontFamily: lightTheme.fontfamily.notoSans_regular,
        color: lightTheme.colors.gray3,
    },
    selectedIndicator: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: lightTheme.colors.primaryBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedIcon: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    customPackageCard: {
        backgroundColor: '#FFF9E6',
        borderRadius: 16,
        padding: 20,
        marginTop: 12,
        borderWidth: 1.5,
        borderColor: '#FFE082',
    },
    customTitle: {
        fontSize: 16,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.gray1,
        marginBottom: 8,
    },
    customSubtitle: {
        fontSize: 13,
        fontFamily: lightTheme.fontfamily.notoSans_regular,
        color: lightTheme.colors.gray3,
        marginBottom: 16,
    },
    customButton: {
        backgroundColor: lightTheme.colors.subscribeGold,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    customButtonText: {
        fontSize: 14,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: '#fff',
    },
    includesSection: {
        marginBottom: 24,
    },
    includeItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    includeBullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: lightTheme.colors.secondaryGreen,
        marginTop: 8,
        marginRight: 12,
    },
    includeText: {
        flex: 1,
        fontSize: 14,
        fontFamily: lightTheme.fontfamily.notoSans_regular,
        color: lightTheme.colors.gray2,
        lineHeight: 22,
    },
    notesSection: {
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: lightTheme.colors.secondaryOrange,
    },
    notesTitle: {
        fontSize: 14,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.gray1,
        marginBottom: 12,
    },
    noteText: {
        fontSize: 13,
        fontFamily: lightTheme.fontfamily.notoSans_regular,
        color: lightTheme.colors.gray2,
        marginBottom: 6,
        lineHeight: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 10,
    },
    footerInfo: {
        flex: 1,
    },
    footerLabel: {
        fontSize: 12,
        fontFamily: lightTheme.fontfamily.notoSans_medium,
        color: lightTheme.colors.gray3,
        marginBottom: 4,
    },
    footerValue: {
        fontSize: 16,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.gray1,
    },
    continueButton: {
        backgroundColor: lightTheme.colors.primaryBlue,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    continueText: {
        fontSize: 14,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: '#fff',
    },
});
