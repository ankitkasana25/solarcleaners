import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45; // Grid-like feel or narrower slider

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
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.imageWrapper}>
                <View style={styles.circleBg}>
                    <Image source={image} style={styles.image} resizeMode="cover" />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                    {description}
                </Text>
            </View>
            <View style={styles.arrowIcon}>
                <Text style={styles.arrowText}>›</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 16,
        marginRight: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 6,
        position: 'relative',
    },
    imageWrapper: {
        width: 90,
        height: 90,
        marginBottom: 16,
    },
    circleBg: {
        width: '100%',
        height: '100%',
        borderRadius: 45,
        backgroundColor: '#F3F6FC',
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#EBF1FF',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        marginBottom: 6,
        textAlign: 'center',
    },
    description: {
        fontSize: 11,
        fontFamily: 'NotoSans-Regular',
        color: lightTheme.colors.slateGray,
        textAlign: 'center',
        lineHeight: 16,
    },
    arrowIcon: {
        position: 'absolute',
        bottom: -15,
        backgroundColor: lightTheme.colors.primaryBlue,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    arrowText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 2,
    },
});
