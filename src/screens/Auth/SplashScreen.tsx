import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components/ScreenContainer';

// Placeholder for the animation
const { width } = Dimensions.get('window');

export const SplashScreen = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoPlaceholder}>
                    {/* Placeholder for Lottie Animation or GIF */}
                    <Text style={styles.logoText}>SolarCleaner</Text>
                </View>
                <Text style={styles.tagline}>Powering up your solar efficiency</Text>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoPlaceholder: {
        width: width * 0.6,
        height: width * 0.6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: width * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.white,
    },
    tagline: {
        fontSize: 18,
        color: colors.white,
        opacity: 0.9,
    },
});
