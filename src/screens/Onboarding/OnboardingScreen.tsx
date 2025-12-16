import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { lightTheme } from '../../theme/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Best Helping Hands For You',
        subtitle: 'With Our On-Demand Service App, We Give Better Service To You.',
        image: null,
        badges: [
            { icon: '⭐', text: '2247+ Customer Reviews', color: lightTheme.colors.subscribeGold },
            { icon: '⚙️', text: '40+ Service Categories', color: lightTheme.colors.primaryBlue },
            { icon: '✅', text: '1500+ Expert Workers', color: lightTheme.colors.deepGreen },
        ],
    },
    {
        id: '2',
        title: 'Professional Solar Care',
        subtitle: 'Maximize Energy Efficiency with Our Certified Cleaning Experts.',
        image: null,
        badges: [
            { icon: '⚡', text: 'Boost Efficiency', color: lightTheme.colors.subscribeGold },
            { icon: '🛡️', text: 'Certified Pros', color: lightTheme.colors.primaryBlue },
            { icon: '💧', text: 'Eco-Friendly', color: lightTheme.colors.deepGreen },
        ],
    },
    {
        id: '3',
        title: 'Easy Booking & Tracking',
        subtitle: 'Schedule Services and Track Your Expert in Real-Time.',
        image: null,
        badges: [
            { icon: '📅', text: 'Easy Scheduling', color: lightTheme.colors.subscribeGold },
            { icon: '📍', text: 'Live Tracking', color: lightTheme.colors.primaryBlue },
            { icon: '💳', text: 'Secure Payment', color: lightTheme.colors.deepGreen },
        ],
    },
];

// Fallback image if assets don't exist yet
const PlaceholderImage = () => (
    <View style={styles.placeholderImageContainer}>
        <View style={styles.placeholderCircle} />
        <View style={styles.placeholderPerson} />
    </View>
);

export const OnboardingScreen = () => {
    const navigation = useNavigation<any>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            navigation.replace('Login'); // Or navigate to Auth stack root
        }
    };

    const handleSkip = () => {
        navigation.replace('Login');
    };

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / width);
        setCurrentIndex(newIndex);
    };

    const renderItem = ({ item }: { item: typeof SLIDES[0] }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>

                    {/* Stats Badges */}
                    <View style={styles.badgesRow}>
                        {item.badges.slice(0, 2).map((badge, idx) => (
                            <View key={idx} style={styles.badge}>
                                <Text style={[styles.badgeIcon, { color: badge.color }]}>{badge.icon}</Text>
                                <View>
                                    <Text style={styles.badgeTextCount}>{badge.text.split(' ')[0]}</Text>
                                    <Text style={styles.badgeTextLabel}>{badge.text.split(' ').slice(1).join(' ')}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.badgeCenter}>
                        {item.badges[2] && (
                            <View style={styles.badge}>
                                <Text style={[styles.badgeIcon, { color: item.badges[2].color }]}>{item.badges[2].icon}</Text>
                                <View>
                                    <Text style={styles.badgeTextCount}>{item.badges[2].text.split(' ')[0]}</Text>
                                    <Text style={styles.badgeTextLabel}>{item.badges[2].text.split(' ').slice(1).join(' ')}</Text>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Main Image Area */}
                    <View style={styles.imageWrapper}>
                        {/* Since we don't strictly have the assets, using a placeholder view mimicking the design */}
                        <PlaceholderImage />
                        {/* 
                 <Image source={item.image} style={styles.image} resizeMode="contain" />
                 */}
                    </View>

                </View>
            </View>
        );
    };

    return (
        <ScreenContainer style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
                keyExtractor={(item) => item.id}
                bounces={false}
            />

            {/* Pagination & Footer */}
            <View style={styles.footer}>
                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.activeDot : styles.inactiveDot
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.85}>
                    <Text style={styles.buttonText}>
                        {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    skipButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        padding: 10,
    },
    skipText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.gray3,
    },
    slide: {
        width: width,
        paddingHorizontal: 20,
        paddingTop: 80, // Space for slide content
    },
    contentContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.slateGray,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    badgesRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 16,
        width: '100%',
    },
    badgeCenter: {
        alignItems: 'center',
        marginBottom: 40,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        minWidth: 140,
    },
    badgeIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    badgeTextCount: {
        fontSize: 12,
        fontWeight: 'bold',
        color: lightTheme.colors.headerTitle,
    },
    badgeTextLabel: {
        fontSize: 10,
        color: lightTheme.colors.gray3,
    },
    imageWrapper: {
        width: width * 0.8,
        height: width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    // Placeholder styles
    placeholderImageContainer: {
        width: 280,
        height: 350,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    placeholderCircle: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#EBF1FF',
        bottom: 0,
    },
    placeholderPerson: {
        width: 200,
        height: 320,
        backgroundColor: '#0D81FC',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        width: 24,
        backgroundColor: lightTheme.colors.primaryBlue,
    },
    inactiveDot: {
        width: 8,
        backgroundColor: '#D1D1D6',
    },
    button: {
        backgroundColor: lightTheme.colors.primaryBlue,
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
    },
});
