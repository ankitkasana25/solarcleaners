import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SectionTitle } from './SectionTitle';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2; // Two items with gap

const tools = [
    {
        id: '1',
        title: 'Solar Health',
        desc: 'System Diagnostics',
        image: { uri: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500&q=80' },
        colors: ['rgba(17, 153, 142, 0.7)', 'rgba(56, 239, 125, 0.4)'],
        icon: '🛡️',
        content: [
            {
                title: 'Understanding Solar Health',
                body: 'Solar panel efficiency is critical for maximizing your energy output. Over time, environmental factors like micro-cracks or natural wearing can degrade your system\'s performance.'
            },
            {
                title: 'The Impact of Dust and Debris',
                body: 'Even a thin layer of dust can reduce your solar panel\'s efficiency by up to 25%. Regular inspections are necessary to identify hotspots and potential cell damage early.'
            },
            {
                title: 'When to Call a Professional',
                body: 'If you notice a significant drop in your energy generation history, it might be more than just dust. Loose wiring or inverter issues require professional diagnostics.'
            }
        ]
    },
    {
        id: '2',
        title: 'ROI Calculator',
        desc: 'Investment Return',
        image: { uri: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80' },
        colors: ['rgba(41, 128, 185, 0.7)', 'rgba(109, 213, 250, 0.4)'],
        icon: '💰',
        content: [
            {
                title: 'Maximizing Your Investment',
                body: 'Solar energy is an investment that pays for itself over time. Most systems have a payback period of 5 to 7 years, but this depends heavily on proper maintenance.'
            },
            {
                title: 'Efficiency vs. Return',
                body: 'A dirty panel takes longer to pay for itself. By maintaining peak efficiency through professional cleaning, you accelerate your return on investment significantly.'
            },
            {
                title: 'Factors Affecting ROI',
                body: 'Your geographic location, local electricity rates, and system orientation are key factors. We help you track these metrics to ensure you\'re saving as much as possible.'
            }
        ]
    },
    {
        id: '3',
        title: 'Sun Forecast',
        desc: 'Generation Potential',
        image: { uri: 'https://images.unsplash.com/photo-1501630132314-e578fa6aa2f1?w=500&q=80' },
        colors: ['rgba(255, 126, 95, 0.7)', 'rgba(254, 180, 123, 0.4)'],
        icon: '☀️',
        content: [
            {
                title: 'Seasonal Power Generation',
                body: 'Solar generation varies significantly between seasons. Understanding the sun\'s path across your property helps in predicting monthly power bills more accurately.'
            },
            {
                title: 'Weather and Solar Output',
                body: 'While solar panels still generate power during cloudy days, their efficiency drops. We provide localized forecasts to help you manage your heavy appliance usage.'
            },
            {
                title: 'Preparing for High Heat',
                body: 'Contrary to popular belief, extreme heat can slightly reduce panel efficiency. Proper airflow and specialized mounting are essential for maintaining stable output during peak summer.'
            }
        ]
    },
    {
        id: '4',
        title: 'AI Support',
        desc: 'Instant Help',
        image: { uri: 'https://images.unsplash.com/photo-1531746790709-3c9c0f158929?w=500&q=80' },
        colors: ['rgba(142, 45, 226, 0.7)', 'rgba(74, 0, 224, 0.4)'],
        icon: '🤖',
        content: [
            {
                title: 'Instant Troubleshooting',
                body: 'Our AI-driven support tool can diagnose 80% of common solar maintenance issues through a few simple questions or a photo analysis of your inverter display.'
            },
            {
                title: 'Educational Resources',
                body: 'Ask the AI about best practices for maintenance, how to read your inverter, or what specific error codes on your system mean.'
            },
            {
                title: 'Seamless Service Booking',
                body: 'If the AI detects an issue that requires manual intervention, it can directly connect you with our technical team to schedule an expert site visit.'
            }
        ]
    },
];

export const InteractiveTools = () => {
    const navigation = useNavigation<any>();

    const handlePress = (tool: any) => {
        navigation.navigate('ToolInfo', {
            tool: {
                ...tool,
                image: tool.image.uri,
                description: tool.desc
            }
        });
    };

    return (
        <View style={styles.container}>
            <SectionTitle title="Interactive Tools" badgeText="Smart Features" />
            <View style={styles.grid}>
                {tools.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.9}
                        style={styles.cardWrapper}
                        onPress={() => handlePress(item)}
                    >
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
