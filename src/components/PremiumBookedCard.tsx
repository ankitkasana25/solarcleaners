import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withTiming,
    Easing,
    FadeInUp
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // Wider card for a horizontal list of top items

interface PremiumBookedCardProps {
    rank: number;
    title: string;
    bookings: string;
    rating: string;
    image: any;
    onPress?: () => void;
}

export const PremiumBookedCard = ({ rank, title, bookings, rating, image, onPress }: PremiumBookedCardProps) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View
            entering={FadeInUp.delay(rank * 100).springify()}
            style={[styles.container, animatedStyle]}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => (scale.value = withSpring(0.97))}
                onPressOut={() => (scale.value = withSpring(1))}
                onPress={onPress}
                style={styles.card}
            >
                <View style={styles.imageSection}>
                    <Image source={image} style={styles.image} resizeMode="cover" />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
                        style={styles.imageOverlay}
                    />

                    {/* Rank Badge */}
                    <View style={styles.rankBadge}>
                        <LinearGradient
                            colors={['#FFD700', '#FFA500']}
                            style={styles.rankGradient}
                        >
                            <Text style={styles.rankText}>#{rank}</Text>
                        </LinearGradient>
                    </View>

                    {/* Quick Stats Overlay */}
                    <View style={styles.statsOverlay}>
                        <View style={styles.statBadge}>
                            <Ionicons name="star" size={10} color="#FFD700" />
                            <Text style={styles.statText}>{rating}</Text>
                        </View>
                        <View style={[styles.statBadge, { marginLeft: 8 }]}>
                            <Ionicons name="flash" size={10} color="#0D81FC" />
                            <Text style={styles.statText}>{bookings} Bookings</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.detailsSection}>
                    <View style={styles.textGroup}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.category}>Premium Solar Maintenance</Text>
                    </View>
                    <View style={styles.actionCircle}>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        marginRight: 20,
        marginBottom: 15,
        paddingTop: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#0D81FC',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#F0F5FF',
    },
    imageSection: {
        width: '100%',
        height: 160,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    rankBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        borderBottomRightRadius: 20,
    },
    rankGradient: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    rankText: {
        color: '#fff',
        fontFamily: 'NotoSans-Bold',
        fontSize: 14,
    },
    statsOverlay: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        flexDirection: 'row',
    },
    statBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    statText: {
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
        color: '#2E3A59',
        marginLeft: 4,
    },
    detailsSection: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textGroup: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontFamily: 'NotoSans-Bold',
        color: '#2E3A59',
    },
    category: {
        fontSize: 12,
        fontFamily: 'NotoSans-Medium',
        color: '#8E9AAF',
        marginTop: 2,
    },
    actionCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#0D81FC',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#0D81FC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
});
