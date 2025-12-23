import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { lightTheme } from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface ToolArticle {
    id: string;
    title: string;
    description: string;
    image: string;
    colors: string[];
    content: {
        title: string;
        body: string;
    }[];
}

export const ToolInfoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const { tool } = route.params as { tool: ToolArticle };

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={styles.headerContainer}>
                    <Image source={{ uri: tool.image }} style={styles.headerImage} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.headerGradient}
                    />

                    <TouchableOpacity
                        style={[styles.backButton, { top: insets.top + 10 }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.toolTitle}>{tool.title}</Text>
                        <Text style={styles.toolDesc}>{tool.description}</Text>
                    </View>
                </View>

                {/* Content Area */}
                <View style={styles.contentContainer}>
                    {tool.content.map((section, index) => (
                        <View key={index} style={styles.section}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <Text style={styles.sectionBody}>{section.body}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        height: 350,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    headerTitleContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },
    toolTitle: {
        fontSize: 28,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    toolDesc: {
        fontSize: 16,
        fontFamily: 'NotoSans-Medium',
        color: 'rgba(255,255,255,0.9)',
    },
    contentContainer: {
        padding: 24,
        marginTop: -20,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 12,
    },
    sectionBody: {
        fontSize: 15,
        fontFamily: 'NotoSans-Regular',
        color: '#4A4A4A',
        lineHeight: 24,
    },
});
