import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SectionTitle } from './SectionTitle';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.82;

const offers = [
    {
        id: '1',
        title: 'Summer Savings',
        desc: 'Keep your panels shining with 20% OFF on all cleaning services.',
        code: 'SOLAR20',
        colors: ['#0D81FC', '#5C9CE6'],
        icon: '☀️',
        valid: 'Valid till 31 Aug'
    },
    {
        id: '2',
        title: 'Monsoon Care',
        desc: 'Special inspection & maintenance packages for the rainy season.',
        code: 'RAIN15',
        colors: ['#7B61FF', '#B0A2FF'],
        icon: '🌧️',
        valid: 'Valid till 15 Sep'
    },
];

export const SeasonalOffers = () => {
    return (
        <View style={styles.container}>
            <SectionTitle title="Exclusive Offers" badgeText="Limited Time" />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + 16}
            >
                {offers.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.cardWrapper}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={item.colors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.card}
                        >
                            <View style={styles.content}>
                                <View style={styles.header}>
                                    <View style={styles.iconCircle}>
                                        <Text style={styles.icon}>{item.icon}</Text>
                                    </View>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                </View>
                                <Text style={styles.cardDesc}>{item.desc}</Text>
                            </View>

                            <View style={styles.footer}>
                                <View style={styles.glassContainer}>
                                    <Text style={styles.codeLabel}>USE CODE: </Text>
                                    <Text style={styles.code}>{item.code}</Text>
                                </View>
                                <TouchableOpacity style={styles.grabButton}>
                                    <Text style={styles.grabText}>Grab It</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.validContainer}>
                                <Text style={styles.validText}>📅 {item.valid}</Text>
                            </View>

                            <View style={styles.decoration} />
                            <View style={styles.decoration2} />
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 4,
    },
    cardWrapper: {
        width: CARD_WIDTH,
        marginRight: 16,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    card: {
        padding: 24,
        borderRadius: 24,
        height: 200,
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    content: {
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    icon: {
        fontSize: 16,
    },
    cardTitle: {
        fontSize: 22,
        fontFamily: 'NotoSans-Bold',
        color: '#FFF',
    },
    cardDesc: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 2,
    },
    glassContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    codeLabel: {
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
        color: 'rgba(255,255,255,0.8)',
    },
    code: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#FFF',
    },
    grabButton: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    grabText: {
        color: lightTheme.colors.primaryBlue,
        fontFamily: 'NotoSans-Bold',
        fontSize: 12,
    },
    validContainer: {
        position: 'absolute',
        top: 24,
        right: 24,
    },
    validText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontFamily: 'NotoSans-Medium',
    },
    decoration: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    decoration2: {
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
});
