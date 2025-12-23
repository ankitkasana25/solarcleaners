import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const THUMB_WIDTH = (width - 60) / 3.2; // Show ~3.5 items

interface ServiceThumbnailProps {
    title: string;
    image: any;
    onPress?: () => void;
}

export const ServiceThumbnail = ({ title, image, onPress }: ServiceThumbnailProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="cover" />
            </View>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: THUMB_WIDTH,
        marginRight: 12,
    },
    imageContainer: {
        width: THUMB_WIDTH,
        height: THUMB_WIDTH,
        borderRadius: 12,
        backgroundColor: '#F7F7F7',
        overflow: 'hidden',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 12,
        fontFamily: 'NotoSans-Medium',
        color: '#1C1C1E',
        lineHeight: 16,
    },
});
