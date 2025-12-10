import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SectionTitle } from './SectionTitle';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2; // Two items with gap

const tools = [
    {
        id: '1',
        title: 'Solar Health',
        desc: 'System Diagnostics',
        image: { uri: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500&q=80' }, // Clean panel
        colors: ['rgba(17, 153, 142, 0.7)', 'rgba(56, 239, 125, 0.4)'], // Green
        icon: '🛡️',
    },
    {
        id: '2',
        title: 'ROI Calculator',
        desc: 'Investment Return',
        image: { uri: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80' }, // Finance/Calculator
        colors: ['rgba(41, 128, 185, 0.7)', 'rgba(109, 213, 250, 0.4)'], // Blue
        icon: '💰',
    },
    {
        id: '3',
        title: 'Sun Forecast',
        desc: 'Generation Potential',
        image: { uri: 'https://images.unsplash.com/photo-1501630132314-e578fa6aa2f1?w=500&q=80' }, // Cloudy/Sunny Sky
        colors: ['rgba(255, 126, 95, 0.7)', 'rgba(254, 180, 123, 0.4)'], // Orange/Sunset
        icon: '☀️',
    },
    {
        id: '4',
        title: 'AI Support',
        desc: 'Instant Help',
        image: { uri: 'https://images.unsplash.com/photo-1531746790709-3c9c0f158929?w=500&q=80' }, // Tech/AI
        colors: ['rgba(142, 45, 226, 0.7)', 'rgba(74, 0, 224, 0.4)'], // Purple
        icon: '🤖',
    },
];

export const InteractiveTools = () => {
    return (
        <View style={styles.container}>
            <SectionTitle title="Interactive Tools" badgeText="Smart Features" />
            <View style={styles.grid}>
                {tools.map((item) => (
                    <TouchableOpacity key={item.id} activeOpacity={0.9} style={styles.cardWrapper}>
                        <ImageBackground
                            source={item.image}
                            style={styles.imageBackground}
                            imageStyle={styles.imageStyle}
                        >
                            <LinearGradient
                                colors={item.colors}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradientOverlay}
                            >
                                <View style={styles.visibleContent}>
                                    <View style={styles.iconContainer}>
                                        <Text style={styles.icon}>{item.icon}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <Text style={styles.cardDesc}>{item.desc}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        gap: 12,
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: ITEM_WIDTH,
        height: 160,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
        marginBottom: 8,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: 20,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        padding: 16,
        justifyContent: 'space-between',
    },
    visibleContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    icon: {
        fontSize: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    cardDesc: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.95)',
        fontWeight: '500',
    },
});
