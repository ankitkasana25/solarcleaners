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
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { lightTheme } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'We Provide Professional\nSolar Cleaning at a very\nfriendly price',
        image: require('../../assets/Images/onboarding1.png'),
    },
    {
        id: '2',
        title: 'Expert Solar Panel\nCleaning Services for\nMaximum Efficiency',
        image: require('../../assets/Images/onboarding2.png'),
    },
    {
        id: '3',
        title: 'Book Your Service\nand Enjoy Clean\nSolar Panels',
        image: require('../../assets/Images/onboarding3.png'),
    },
];

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
            navigation.replace('Login');
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
                {/* Circular Image Container */}
                <View style={styles.imageContainer}>
                    <View style={styles.circleBackground}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    };

    return (
        <ScreenContainer style={styles.container}>
            {/* Skip Button */}
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

            {/* Footer with Pagination & Button */}
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

                {/* Next/Get Started Button */}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                    activeOpacity={0.8}
                >
                    <Text style={styles.nextButtonIcon}>›</Text>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    skipButton: {
        position: 'absolute',
        top: 50,
        right: 24,
        zIndex: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#EBF1FF',
        borderRadius: 20,
    },
    skipText: {
        fontSize: 14,
        fontFamily: lightTheme.fontfamily.notoSans_medium,
        color: lightTheme.colors.primaryBlue,
    },
    slide: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingTop: 100,
    },
    imageContainer: {
        width: width * 0.75,
        height: width * 0.75,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
    },
    circleBackground: {
        width: '100%',
        height: '100%',
        borderRadius: width * 0.375,
        backgroundColor: '#EBF1FF',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0D81FC',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.gray1,
        textAlign: 'center',
        lineHeight: 32,
        paddingHorizontal: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
        gap: 32,
    },
    pagination: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        width: 32,
        backgroundColor: lightTheme.colors.primaryBlue,
    },
    inactiveDot: {
        width: 8,
        backgroundColor: '#D1D5DB',
    },
    nextButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: lightTheme.colors.primaryBlue,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    nextButtonIcon: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 4,
    },
});
