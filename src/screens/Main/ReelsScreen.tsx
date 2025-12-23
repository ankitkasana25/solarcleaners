import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

interface ReelItem {
    id: string;
    image: string;
    title: string;
    description?: string;
    videoUrl?: string;
}

export const ReelsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const { initialIndex = 0, videos = [] } = (route.params as any) || {};

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0.45); // Mock progress at 45%

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
            setIsPaused(false); // Play when scrolled to
            setProgress(0); // Reset progress for new video
        }
    }).current;

    const togglePlayPause = () => setIsPaused(!isPaused);

    const handleSkip = (seconds: number) => {
        // Simulate seeking
        const newProgress = Math.min(Math.max(progress + (seconds / 60), 0), 1);
        setProgress(newProgress);
    };

    const renderItem = ({ item, index }: { item: ReelItem, index: number }) => (
        <View style={styles.reelContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={togglePlayPause}
                style={styles.fullScreenTouch}
            >
                <Image
                    source={{ uri: item.image }}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradientOverlay}
            />

            {/* Video Controls Overlay */}
            <View style={styles.videoControls}>
                <TouchableOpacity onPress={() => handleSkip(-10)} style={styles.skipBtn}>
                    <Ionicons name="refresh-outline" size={30} color="#FFF" />
                    <Text style={styles.skipText}>-10s</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePlayPause} style={styles.mainPlayBtn}>
                    <Ionicons name={isPaused ? "play" : "pause"} size={50} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSkip(10)} style={styles.skipBtn}>
                    <Ionicons name="refresh" size={30} color="#FFF" style={{ transform: [{ scaleX: -1 }] }} />
                    <Text style={styles.skipText}>+10s</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.reelTitle}>
                    {item.title}
                </Text>
                <Text style={styles.reelSubtitle} numberOfLines={3}>
                    {item.description || "Learn more about our professional solar services and efficiency optimization techniques."}
                </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>

            {isPaused && (
                <View style={styles.playIndicator}>
                    <Ionicons name="pause" size={60} color="rgba(255,255,255,0.6)" />
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Solar Videos</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                pagingEnabled
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50, // Fallback for insets
    },
    backButton: {
        padding: 8,
    },
    cameraButton: {
        padding: 8,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'NotoSans-Bold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    fullScreenTouch: {
        width: width,
        height: height,
    },
    videoControls: {
        position: 'absolute',
        top: height * 0.4,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        zIndex: 5,
    },
    mainPlayBtn: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipBtn: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        borderRadius: 30,
    },
    skipText: {
        color: '#FFF',
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
        marginTop: 2,
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    progressBar: {
        height: '100%',
        backgroundColor: lightTheme.colors.primaryBlue,
    },
    reelContainer: {
        width: width,
        height: height,
        backgroundColor: '#1E1E1E',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    infoContainer: {
        position: 'absolute',
        left: 24,
        right: 40,
        bottom: 60,
        zIndex: 2,
    },
    reelTitle: {
        color: '#FFF',
        fontSize: 22,
        fontFamily: 'NotoSans-Bold',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    reelSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        lineHeight: 20,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    playIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -30,
        marginTop: -30,
        zIndex: 4,
    },
});
