import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SectionTitle } from './SectionTitle';
import { lightTheme } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const SHORT_WIDTH = width * 0.45;
const SHORT_HEIGHT = 280;

const shortsData = [
    {
        id: '1',
        image: require('../assets/Images/CommercialImg.jpeg'),
        title: 'Professional\nInstallation',
        description: 'Watch our expert team install premium quality solar modules with precise alignment for maximum energy capture.',
    },
    {
        id: '2',
        image: require('../assets/Images/ManualImg.jpeg'),
        title: 'Panel Deep\nCleaning',
        description: 'Learn the importance of regular deep cleaning and how it can boost your panel efficiency by up to 30%.',
    },
    {
        id: '3',
        image: require('../assets/Images/RobiticImg.jpeg'),
        title: 'Structural\nSetup',
        description: 'A deep dive into the sturdy mounting structures we build to ensure your system survives all weather conditions.',
    },
    {
        id: '4',
        image: require('../assets/Images/ResidentialCleaningService.jpeg'),
        title: 'Automatic\nCleaning',
        description: 'Demonstrating our automated cleaning solutions that keep your solar farm spotless with zero manual effort.',
    },
];

export const SolCareShorts = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
                snapToAlignment="start"
            >
                {shortsData.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Reels', { initialIndex: index, videos: shortsData })}
                    >
                        <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.image} resizeMode="cover" />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.overlay}
                        />
                        <View style={styles.infoBox}>
                            <Text style={styles.shortTitle}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    card: {
        width: SHORT_WIDTH,
        height: SHORT_HEIGHT,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#F0F0F0',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    infoBox: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    shortTitle: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'NotoSans-Bold',
        lineHeight: 22,
    },
});
