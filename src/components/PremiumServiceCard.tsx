import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { lightTheme } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.48; // Slightly wider for a premium feel

interface PremiumServiceCardProps {
    title: string;
    description: string;
    image: any; // source
    onPress?: () => void;
}

export const PremiumServiceCard = ({
    title,
    description,
    image,
    onPress,
}: PremiumServiceCardProps) => {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
                <View style={styles.imageWrapper}>
                    <View style={styles.circleBg}>
                        <Image source={image} style={styles.image} resizeMode="cover" />
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={styles.description} numberOfLines={3}>
                        {description}
                    </Text>
                </View>
                <View style={styles.actionButtonContainer}>
                    <View style={styles.arrowIcon}>
                        <Ionicons name="chevron-forward" size={16} color="#fff" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 20, // Space for the overlapping button
        marginRight: 16,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F5FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 8,
        position: 'relative',
        minHeight: 220,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    circleBg: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#F3F6FC',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E7F2FF',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: '#2E3A59',
        marginBottom: 8,
        textAlign: 'center',
        lineHeight: 20,
    },
    description: {
        fontSize: 12,
        fontFamily: 'NotoSans-Medium',
        color: '#838297',
        textAlign: 'center',
        lineHeight: 18,
    },
    actionButtonContainer: {
        position: 'absolute',
        bottom: -20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    arrowIcon: {
        backgroundColor: lightTheme.colors.primaryBlue,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
});

