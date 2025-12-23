import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    withSpring,
    SharedValue,
} from 'react-native-reanimated';
import { ScreenContainer } from '../../components/ScreenContainer';
import { lightTheme } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Professional Solar Cleaning',
        subtitle: 'Eco-friendly solutions for your solar panels at an affordable price point.',
        image: require('../../assets/Images/onboarding1.png'),
    },
    {
        id: '2',
        title: 'Maximum Efficiency',
        subtitle: 'Our expert team ensures your solar panels operate at 100% capacity.',
        image: require('../../assets/Images/onboarding2.png'),
    },
    {
        id: '3',
        title: 'Instant Booking',
        subtitle: 'Schedule a service in seconds and enjoy professional maintenance.',
        image: require('../../assets/Images/onboarding3.png'),
    },
];

const PaginationDot = ({ index, scrollX }: { index: number, scrollX: SharedValue<number> }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const dotWidth = interpolate(
            scrollX.value,
            inputRange,
            [8, 32, 8],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.4, 1, 0.4],
            Extrapolate.CLAMP
        );

        return {
            width: dotWidth,
            opacity,
        };
    });

    return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const OnboardingSlide = ({ item, index, scrollX }: { item: typeof SLIDES[0], index: number, scrollX: SharedValue<number> }) => {
    const slideStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const opacity = interpolate(scrollX.value, inputRange, [0, 1, 0], Extrapolate.CLAMP);
        return { opacity };
    });

    const imageStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const scale = interpolate(scrollX.value, inputRange, [0.4, 1, 0.4], Extrapolate.CLAMP);
        const rotate = `${interpolate(scrollX.value, inputRange, [-20, 0, 20], Extrapolate.CLAMP)}deg`;

        return {
            transform: [{ scale }, { rotate }],
        };
    });

    const textStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const translateY = interpolate(scrollX.value, inputRange, [100, 0, -100], Extrapolate.CLAMP);

        return {
            transform: [{ translateY }],
        };
    });

    return (
        <View style={styles.slide}>
            <Animated.View style={[styles.imageWrapper, imageStyle]}>
                <View style={styles.circleBackground}>
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
            </Animated.View>

            <Animated.View style={[styles.contentBlock, textStyle]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitleText}>{item.subtitle}</Text>
            </Animated.View>
        </View>
    );
};

export const OnboardingScreen = () => {
    const navigation = useNavigation<any>();
    const scrollX = useSharedValue(0);
    const flatListRef = useRef<Animated.FlatList<any>>(null);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const handleNext = () => {
        const nextIndex = Math.round(scrollX.value / width) + 1;
        if (nextIndex < SLIDES.length) {
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
        } else {
            navigation.replace('Login');
        }
    };

    const handleSkip = () => {
        navigation.replace('Login');
    };

    const buttonStyle = useAnimatedStyle(() => {
        const isLastSlide = scrollX.value >= (SLIDES.length - 1.5) * width;
        return {
            width: withSpring(isLastSlide ? 160 : 64, { damping: 15 }),
            borderRadius: withSpring(isLastSlide ? 16 : 32, { damping: 15 }),
        };
    });

    return (
        <ScreenContainer style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <Animated.FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={({ item, index }) => (
                    <OnboardingSlide item={item} index={index} scrollX={scrollX} />
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.id}
                bounces={false}
            />

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {SLIDES.map((_, index) => (
                        <PaginationDot key={index} index={index} scrollX={scrollX} />
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                    activeOpacity={0.9}
                >
                    <Animated.View style={[styles.buttonContent, buttonStyle]}>
                        <View style={styles.buttonTextWrapper}>
                            <Text style={styles.buttonLabel}>
                                {scrollX.value >= (SLIDES.length - 1.2) * width ? 'Get Started' : ''}
                            </Text>
                            <Ionicons
                                name={scrollX.value >= (SLIDES.length - 1.2) * width ? 'rocket-outline' : 'arrow-forward'}
                                size={24}
                                color="#fff"
                            />
                        </View>
                    </Animated.View>
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
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
    },
    skipText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#64748B',
    },
    slide: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        height: height,
        backgroundColor: '#FFFFFF',
    },
    imageWrapper: {
        marginBottom: 50,
    },
    circleBackground: {
        width: width * 0.75,
        height: width * 0.75,
        backgroundColor: '#F1F5F9',
        borderRadius: width * 0.375,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentBlock: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 28,
        fontFamily: 'NotoSans-Bold',
        color: '#1E293B',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitleText: {
        fontSize: 16,
        fontFamily: 'NotoSans-Regular',
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0D81FC',
        marginHorizontal: 4,
    },
    nextButton: {
        marginTop: 20,
    },
    buttonContent: {
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: '#0D81FC',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#0D81FC',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    buttonTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: '#fff',
        fontFamily: 'NotoSans-Bold',
        fontSize: 16,
        marginRight: 8,
    },
});
