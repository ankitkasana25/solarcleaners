import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;

interface UpcomingServiceCardProps {
    title: string;
    launchDate: string;
    image: any;
    onPress?: () => void;
}

export const UpcomingServiceCard = ({ title, launchDate, image, onPress }: UpcomingServiceCardProps) => {
    return (
        <Animated.View
            entering={FadeInRight.duration(800)}
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.card}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={styles.imageWrapper}>
                    <Image source={image} style={styles.image} resizeMode="cover" />
                    <LinearGradient
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                        style={styles.overlay}
                    />
                    <View style={styles.launchBadge}>
                        <Text style={styles.launchDateText}>{launchDate}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                    <View style={styles.notifyContainer}>
                        <Ionicons name="notifications-outline" size={14} color="#0D81FC" />
                        <Text style={styles.notifyText}>Notify Me</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        marginRight: 16,
        paddingBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F0F5FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
    },
    imageWrapper: {
        width: '100%',
        height: CARD_WIDTH * 0.9,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    launchBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(13, 129, 252, 0.9)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    launchDateText: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
        letterSpacing: 0.5,
    },
    content: {
        padding: 12,
    },
    title: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#2E3A59',
        height: 40,
        lineHeight: 18,
    },
    notifyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: '#F3F8FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    notifyText: {
        fontSize: 11,
        fontFamily: 'NotoSans-Bold',
        color: '#0D81FC',
        marginLeft: 4,
    },
});
