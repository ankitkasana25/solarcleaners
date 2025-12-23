import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    interpolate
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface WeatherGreetingProps {
    userName: string;
    temperature: string;
    city: string;
}

type WeatherState = 'sunny' | 'cloudy' | 'night';

export const WeatherGreeting = ({ userName, temperature, city }: WeatherGreetingProps) => {
    const [weatherState, setWeatherState] = useState<WeatherState>('sunny');
    const rotation = useSharedValue(0);
    const float = useSharedValue(0);
    const sunScale = useSharedValue(1);
    const starOpacity = useSharedValue(0);

    useEffect(() => {
        // Determine state based on current hour
        const hour = new Date().getHours();
        if (hour >= 18 || hour < 5) {
            setWeatherState('night');
        } else if (hour >= 12 && hour < 18) {
            setWeatherState('cloudy');
        } else {
            setWeatherState('sunny');
        }

        // Continuous rotation for sun/clouds
        rotation.value = withRepeat(
            withTiming(1, { duration: 15000, easing: Easing.linear }),
            -1,
            false
        );

        // Gentle floating for content
        float.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
            -1,
            true
        );

        // Subtle pulsing
        sunScale.value = withRepeat(
            withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
            -1,
            true
        );

        // Twinkling stars
        starOpacity.value = withRepeat(
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
            -1,
            true
        );
    }, []);

    const theme = {
        sunny: {
            colors: ['#00B4DB', '#0083B0'],
            icon: 'sunny',
            iconColor: '#FFD700',
            subText: "It's a perfect day for solar cleaning!",
            greetingColor: '#FFD700'
        },
        cloudy: {
            colors: ['#757F9A', '#D7DDE8'],
            icon: 'cloudy',
            iconColor: '#FFFFFF',
            subText: "Cloudy morning? Perfect for a health check!",
            greetingColor: '#FFFFFF'
        },
        night: {
            colors: ['#0F2027', '#203A43'],
            icon: 'moon',
            iconColor: '#F0E68C',
            subText: "System resting. Ready for tomorrow's sun!",
            greetingColor: '#F0E68C'
        }
    }[weatherState];

    const iconAnimStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: weatherState === 'sunny' ? `${rotation.value * 360}deg` : '0deg' },
                { scale: sunScale.value }
            ]
        };
    });

    const contentStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: interpolate(float.value, [0, 1], [0, -4]) }
            ]
        };
    });

    const starStyle = useAnimatedStyle(() => ({
        opacity: starOpacity.value
    }));

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={theme.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* Background Decorations */}
                {weatherState === 'night' && (
                    <>
                        <Animated.View style={[styles.star, { top: 15, left: '20%' }, starStyle]} />
                        <Animated.View style={[styles.star, { top: 40, left: '60%' }, starStyle]} />
                        <Animated.View style={[styles.star, { top: 70, left: '35%' }, starStyle]} />
                    </>
                )}

                <Animated.View style={[styles.content, contentStyle]}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.greetingText}>
                            Hello, <Text style={{ color: theme.greetingColor }}>{userName}</Text> 👋
                        </Text>
                        <Text style={styles.subText}>{theme.subText}</Text>

                        <View style={styles.infoRow}>
                            <View style={styles.badge}>
                                <Ionicons name="location" size={12} color="#fff" />
                                <Text style={styles.badgeText}>{city}</Text>
                            </View>
                            <View style={[styles.badge, { marginLeft: 8, backgroundColor: 'rgba(255,255,255,0.25)' }]}>
                                <Ionicons name={weatherState === 'sunny' ? "leaf" : "stats-chart"} size={12} color="#fff" />
                                <Text style={styles.badgeText}>{weatherState === 'sunny' ? 'Optimum' : 'Stable'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.weatherInfo}>
                        <Animated.View style={[styles.sunContainer, iconAnimStyle]}>
                            {weatherState === 'sunny' && <View style={styles.sunCore} />}
                            <Ionicons name={theme.icon} size={50} color={theme.iconColor} />
                        </Animated.View>
                        <View style={styles.tempGroup}>
                            <Text style={styles.tempMain}>{temperature}</Text>
                            <Text style={styles.tempUnit}>°C</Text>
                        </View>
                    </View>
                </Animated.View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    gradient: {
        padding: 24,
        paddingTop: 30,
        position: 'relative',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
    },
    greetingText: {
        fontSize: 26,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    subText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: 'rgba(255,255,255,0.9)',
        marginTop: 6,
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 18,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    badgeText: {
        fontSize: 11,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
        marginLeft: 4,
    },
    weatherInfo: {
        alignItems: 'center',
    },
    sunContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sunCore: {
        position: 'absolute',
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#FFD700',
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    tempGroup: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 4,
    },
    tempMain: {
        fontSize: 34,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
        lineHeight: 40,
    },
    tempUnit: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
        marginLeft: 2,
    },
    star: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#FFF',
        borderRadius: 1,
    }
});
