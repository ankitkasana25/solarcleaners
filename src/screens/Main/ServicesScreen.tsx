import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchBar } from '../../components/SearchBar';
import { FilterTabs, FilterTab } from '../../components/FilterTabs';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const filterTabs: FilterTab[] = [
    { id: 'all', label: 'All' },
    { id: 'cleaning', label: 'Cleaning' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'repairing', label: 'Repairing' },
    { id: 'installation', label: 'Installation' },
    { id: 'faq', label: 'FAQ' },
];

// Mock service data
const servicesData = {
    cleaning: [
        {
            id: '1',
            title: 'Advance Solar Panel Cleaning',
            discount: '2% OFF',
            image: 'https://via.placeholder.com/300x180',
        },
        {
            id: '2',
            title: 'Basic Solar Panel Cleaning',
            image: 'https://via.placeholder.com/300x180',
        },
    ],
    maintenance: [
        {
            id: '3',
            title: 'Annual Maintenance Contract (AMC)',
            image: 'https://via.placeholder.com/300x180',
        },
        {
            id: '4',
            title: 'Comprehensive Maintenance Package',
            image: 'https://via.placeholder.com/300x180',
        },
    ],
    repairing: [
        {
            id: '5',
            title: 'Inverter Repair',
            image: 'https://via.placeholder.com/300x180',
        },
        {
            id: '6',
            title: 'Panel Replacement',
            image: 'https://via.placeholder.com/300x180',
        },
    ],
    installation: [
        {
            id: '7',
            title: 'New Solar Panel Installation',
            image: 'https://via.placeholder.com/300x180',
        },
        {
            id: '8',
            title: 'System Upgrade Installation',
            image: 'https://via.placeholder.com/300x180',
        },
    ],
    faq: [],
};

interface ServiceCardProps {
    title: string;
    image: string;
    discount?: string;
}

const ServiceCard = ({ title, image, discount, id, category }: ServiceCardProps & { id: string; category: string }) => {
    const navigation = useNavigation<any>();

    const handlePress = () => {
        // Mock service data - in real app, fetch from API or store
        const serviceData = {
            id,
            title,
            category,
            price: 725,
            image,
            discount,
            description: 'A thorough one-time deep cleaning session tailored for heavily soiled panels.',
            technicalHighlights: [
                'Targets heavy grime: moss, sap, lichen, cement dust, and oil residues commonly seen in Indian environments.',
                'Can recover up to 30-40% of lost output in severely soiled setups.',
                'Provides early detection of micro-cracks, seal wear, hotspots, or frame issues via detailed inspection.',
            ],
            benefits: [
                { icon: '🔋', title: 'Improved Efficiency', description: 'Maximize your system\'s power output' },
                { icon: '💰', title: 'Cost Savings', description: 'Reduce long-term maintenance costs' },
                { icon: '⏱️', title: 'Extended Lifespan', description: 'Prolong the life of your solar system' },
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
                    description: 'Detailed performance analysis and improvement recommendations',
                    price: 200,
                    duration: '15 min',
                    popular: true,
                },
            ],
        };

        navigation.navigate('ServiceDetail', { service: serviceData });
    };

    return (
        <TouchableOpacity style={styles.serviceCard} activeOpacity={0.9} onPress={handlePress}>
            <View style={styles.imageContainer}>
                {discount && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{discount}</Text>
                    </View>
                )}
                <View style={styles.placeholderImage}>
                    <View style={styles.imageOverlay}>
                        <Text style={styles.placeholderText}>📸</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
                <View style={styles.arrowButton}>
                    <Text style={styles.arrowText}>→</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

interface ServiceSectionProps {
    title: string;
    services: any[];
    icon?: string;
}

const FAQItem = ({ question }: { question: string }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity
            style={styles.faqItem}
            onPress={() => setExpanded(!expanded)}
            activeOpacity={0.7}
        >
            <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{question}</Text>
                <Text style={styles.faqIcon}>{expanded ? '▼' : '▶'}</Text>
            </View>
            {expanded && (
                <Text style={styles.faqAnswer}>
                    This is a placeholder answer. Actual FAQ content will be added here.
                </Text>
            )}
        </TouchableOpacity>
    );
};

const FAQSection = () => {
    const faqQuestions = [
        'What type of solar services do you offer?',
        'How often should I clean my solar panels?',
        'What is the average service time?',
        'How can I schedule a service?',
        'What happens if my system needs repair?',
    ];

    return (
        <View style={styles.faqSection}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.sectionIcon}>❓</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                </View>
            </View>
            <View style={styles.faqContainer}>
                {faqQuestions.map((question, index) => (
                    <FAQItem key={index} question={question} />
                ))}
            </View>
        </View>
    );
};

const ServiceSection = ({ title, services, icon = '🔧' }: ServiceSectionProps) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.sectionIcon}>{icon}</Text>
                    </View>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Text style={styles.seeAllArrow}>→</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
                decelerationRate="fast"
                snapToInterval={296}
            >
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        title={service.title}
                        image={service.image}
                        discount={service.discount}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export const ServicesScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const getSectionIcon = (category: string) => {
        const icons: { [key: string]: string } = {
            cleaning: '✨',
            maintenance: '🔧',
            repair: '🛠️',
            installation: '⚡',
        };
        return icons[category.toLowerCase()] || '🔧';
    };

    const renderContent = () => {
        if (activeTab === 'all') {
            return (
                <>
                    <ServiceSection title="Cleaning" services={servicesData.cleaning} icon="✨" />
                    <ServiceSection title="Maintenance" services={servicesData.maintenance} icon="🔧" />
                    <ServiceSection title="Repair" services={servicesData.repairing} icon="🛠️" />
                    <ServiceSection title="Installation" services={servicesData.installation} icon="⚡" />
                    <FAQSection />
                </>
            );
        }

        if (activeTab === 'faq') {
            return <FAQSection />;
        }

        const categoryServices = servicesData[activeTab as keyof typeof servicesData];
        if (!categoryServices || categoryServices.length === 0) {
            return (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIconContainer}>
                        <Text style={styles.emptyIcon}>📦</Text>
                    </View>
                    <Text style={styles.emptyText}>No services found</Text>
                    <Text style={styles.emptySubtext}>Check back later for updates</Text>
                </View>
            );
        }

        return (
            <View style={styles.categoryView}>
                <View style={styles.gridContainer}>
                    {categoryServices.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            image={service.image}
                            discount={service.discount}
                        />
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScreenHeader title="Services" />
            <SearchBar
                placeholder="Search a Service"
                value={searchQuery}
                onChangeText={setSearchQuery}
                showVoiceSearch={true}
            />
            <FilterTabs tabs={filterTabs} activeTab={activeTab} onTabPress={setActiveTab} />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {renderContent()}
            </ScrollView>

            {/* Floating Cart Button */}
            <TouchableOpacity style={styles.floatingCartButton} activeOpacity={0.9}>
                <View style={styles.cartIconContainer}>
                    <Text style={styles.cartIcon}>🛒</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    section: {
        marginTop: 24,
        marginBottom: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionIcon: {
        fontSize: 22,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1C1C1E',
        letterSpacing: -0.5,
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#F0F7FF',
    },
    seeAllText: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
        marginRight: 4,
    },
    seeAllArrow: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: 'bold',
    },
    cardsContainer: {
        paddingHorizontal: 20,
        gap: 16,
    },
    serviceCard: {
        width: 280,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    imageContainer: {
        position: 'relative',
    },
    placeholderImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#E8F1FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageOverlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(13, 129, 252, 0.05)',
    },
    placeholderText: {
        fontSize: 48,
        opacity: 0.3,
    },
    discountBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#FF3B30',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        zIndex: 1,
        shadowColor: '#FF3B30',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    discountText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    cardContent: {
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        flex: 1,
        lineHeight: 22,
    },
    arrowButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    arrowText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    categoryView: {
        padding: 20,
    },
    gridContainer: {
        gap: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
        paddingHorizontal: 40,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyIcon: {
        fontSize: 40,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
        color: '#1C1C1E',
    },
    emptySubtext: {
        fontSize: 15,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 22,
    },
    faqSection: {
        marginTop: 24,
        marginBottom: 24,
    },
    faqContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    faqItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1C1E',
        flex: 1,
        marginRight: 12,
        lineHeight: 22,
    },
    faqIcon: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: 'bold',
    },
    faqAnswer: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    floatingCartButton: {
        position: 'absolute',
        bottom: 24,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    cartIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartIcon: {
        fontSize: 28,
    },
});
