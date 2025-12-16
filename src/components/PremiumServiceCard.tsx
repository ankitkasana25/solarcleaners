import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6; // Wider card for premium feel
const CARD_HEIGHT = 240; // Taller

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
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="cover" />
                <View style={styles.overlay} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        shadowColor: lightTheme.colors.primaryBlue, // Colored shadow
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    imageContainer: {
        flex: 0.7, // 70% image
        position: 'relative',
        backgroundColor: lightTheme.colors.backgroundGray,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    contentContainer: {
        flex: 0.3, // 30% content
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        fontWeight: '700',
        color: lightTheme.colors.headerTitle,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        fontFamily: 'NotoSans-Regular',
        color: lightTheme.colors.slateGray,
        lineHeight: 18,
    },
});
