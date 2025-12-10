import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text, Dimensions, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SectionTitle } from './SectionTitle';

const { width } = Dimensions.get('window');
const SHORT_WIDTH = width * 0.45;
const SHORT_HEIGHT = 280;

const shortsData = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
        title: 'Cleaning Tips',
        likes: '1.2k',
        comments: '45'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1596464875494-1a52c3c99026?w=600&q=80',
        title: 'Before & After',
        likes: '3.4k',
        comments: '120'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?w=600&q=80',
        title: 'Safety First',
        likes: '890',
        comments: '30'
    },
    {
        id: '4',
        image: 'https://images.unsplash.com/photo-1548613053-220e89574c8a?w=600&q=80',
        title: 'Drone Inspection',
        likes: '5.6k',
        comments: '210'
    },
    {
        id: '5',
        image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80',
        title: 'Efficiency Hack',
        likes: '2.1k',
        comments: '67'
    },
    {
        id: '6',
        image: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=600&q=80',
        title: 'Bird Proofing',
        likes: '1.8k',
        comments: '55'
    },
    {
        id: '7',
        image: 'https://images.unsplash.com/photo-1501630132314-e578fa6aa2f1?w=600&q=80',
        title: 'Weather Watch',
        likes: '900',
        comments: '23'
    },
    {
        id: '8',
        image: 'https://images.unsplash.com/photo-1625301840055-7c1b7198cfc0?w=600&q=80',
        title: 'Team Work',
        likes: '4.2k',
        comments: '150'
    },
    {
        id: '9',
        image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80',
        title: 'Installation Day',
        likes: '1.5k',
        comments: '40'
    },
    {
        id: '10',
        image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&q=80',
        title: 'Maintenance',
        likes: '2.9k',
        comments: '99'
    },
];

export const SolCareShorts = () => {
    // const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SectionTitle
                    title="SolarCleaners Shorts"
                    tagline="Discover amazing solar content"
                    badgeText="Trending"
                />
                <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {shortsData.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() => Linking.openURL('https://www.instagram.com/reels/')}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                        <View style={styles.overlay}>
                            <View style={styles.playButton}>
                                <Text style={styles.playIcon}>▶</Text>
                            </View>
                        </View>
                        <View style={styles.titleOverlay}>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
    viewAll: {
        color: '#007AFF', // IOS Blue
        fontWeight: '600',
        fontSize: 14,
        marginTop: 10,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 16,
    },
    card: {
        width: SHORT_WIDTH,
        height: SHORT_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#000',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        fontSize: 16,
        color: '#000',
        marginLeft: 2,
    },
    titleOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    shortTitle: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    }
});
