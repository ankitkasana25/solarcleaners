import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { ImageIcon } from '../../components/ImageIcon'; // Assuming usage for icons

const { width, height } = Dimensions.get('window');

interface ReelItem {
    id: string;
    image: string;
    title: string;
    videoUrl?: string; // For future real implementation
    likes?: string;
    comments?: string;
}

export const ReelsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const { initialIndex = 0, videos = [] } = (route.params as any) || {};

    // Simulate playing state
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const renderItem = ({ item }: { item: ReelItem }) => (
        <View style={styles.reelContainer}>
            {/* Simulated Video Player (Image Background) */}
            <Image
                source={{ uri: item.image }}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            {/* Gradient Overlay for Text Readability */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradientOverlay}
            />

            {/* Right Side Actions */}
            <View style={styles.actionsContainer}>
                <ActionItem icon="❤️" label={item.likes || '1.2k'} />
                <ActionItem icon="💬" label={item.comments || '342'} />
                <ActionItem icon="↗️" label="Share" />
                <ActionItem icon="⋯" label="More" />
            </View>

            {/* Bottom Info */}
            <View style={styles.infoContainer}>
                <View style={styles.userRow}>
                    <View style={styles.avatarPlaceholder} />
                    <Text style={styles.userName}>@solar_cleaners_official</Text>
                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.reelDescription}>{item.title}</Text>
                <Text style={styles.musicTag}>🎵 Original Audio - Solar Sound</Text>
            </View>

            {/* Simulated Play Button Overlay (fades out in real app) */}
            <View style={styles.playOverlay}>
                <Text style={styles.playIcon}>▶</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Header / Back Button */}
            <View style={[styles.header, { top: insets.top > 0 ? insets.top + 10 : 40 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← </Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Shorts</Text>
            </View>

            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                pagingEnabled
                // vertical prop removed (default)
                showsVerticalScrollIndicator={false}
                initialScrollIndex={initialIndex}
                getItemLayout={(data, index) => (
                    { length: height, offset: height * index, index }
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            />
        </View>
    );
};

const ActionItem = ({ icon, label }: { icon: string, label: string }) => (
    <View style={styles.actionItem}>
        <View style={styles.iconCircle}>
            <Text style={styles.actionIconText}>{icon}</Text>
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        position: 'absolute',
        // top: 40, // Handled dynamically
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: -2,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    reelContainer: {
        width: width,
        height: height,
        backgroundColor: '#1E1E1E',
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
    },
    actionsContainer: {
        position: 'absolute',
        right: 16,
        bottom: 100,
        alignItems: 'center',
        zIndex: 5,
    },
    actionItem: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: 'rgba(255,255,255,0.1)',
        // backdropFilter removed
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    actionIconText: {
        fontSize: 22,
    },
    actionLabel: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    infoContainer: {
        position: 'absolute',
        left: 20,
        right: 80, // Space for actions
        bottom: 40,
        justifyContent: 'flex-end',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginRight: 10,
    },
    userName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    },
    followButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    followText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
    },
    reelDescription: {
        color: '#FFF',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    musicTag: {
        color: '#FFF',
        fontSize: 12,
        opacity: 0.9,
    },
    playOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -30,
        marginTop: -30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.0, // Hidden for now, can be used for pause state
    },
    playIcon: {
        fontSize: 40,
        color: 'rgba(255,255,255,0.8)',
    },
});
