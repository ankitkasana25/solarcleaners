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
                    <Image source={image} style={styles.image} resizeMode="cover" />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
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
        height: 220, // Fixed height to maintain the 2/3 - 1/3 ratio
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F0F5FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
        position: 'relative',
    },
    imageWrapper: {
        flex: 2, // Occupies top 2/3
        width: '100%',
        backgroundColor: '#F3F6FC',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1, // Occupies bottom 1/3
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontFamily: 'NotoSans-Bold',
        color: '#2E3A59',
        marginBottom: 4,
        textAlign: 'center',
        lineHeight: 18,
    },
    description: {
        fontSize: 11,
        fontFamily: 'NotoSans-Medium',
        color: '#838297',
        textAlign: 'center',
        lineHeight: 16,
    },
    actionButtonContainer: {
        position: 'absolute',
        bottom: -18,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
});

