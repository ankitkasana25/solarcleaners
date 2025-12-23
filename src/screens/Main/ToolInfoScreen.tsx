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
    icon: string;
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
                {/* Header Section */}
                <View style={[styles.headerContainer, { backgroundColor: tool.colors[0] }]}>
                    <Image
                        source={{ uri: tool.image }}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
                        style={styles.headerGradient}
                    />

                    {/* The Tool's Theme Gradient (Subtle) */}
                    <LinearGradient
                        colors={tool.colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.headerGradient, { opacity: 0.4 }]}
                    />

                    <TouchableOpacity
                        style={[styles.backButton, { top: insets.top + 12 }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.headerTitleContainer}>
                        <View style={styles.iconBadge}>
                            <Text style={styles.iconText}>{tool.icon}</Text>
                        </View>
                        <Text style={styles.toolTitle}>{tool.title}</Text>
                        <Text style={styles.toolDesc}>{tool.description}</Text>
                    </View>
                </View>

                {/* Content Area */}
                <View style={styles.contentContainer}>
                    <View style={styles.dragHandle} />
                    {tool.content.map((section, index) => (
                        <View key={index} style={styles.section}>
                            <View style={styles.sectionTitleRow}>
                                <View style={[styles.dot, { backgroundColor: tool.colors[0] }]} />
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                            </View>
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
        height: 380,
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
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    headerTitleContainer: {
        position: 'absolute',
        bottom: 50,
        left: 24,
        right: 24,
    },
    iconBadge: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    iconText: {
        fontSize: 24,
    },
    toolTitle: {
        fontSize: 32,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    toolDesc: {
        fontSize: 16,
        fontFamily: 'NotoSans-Medium',
        color: 'rgba(255,255,255,0.9)',
    },
    contentContainer: {
        padding: 24,
        marginTop: -30,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'NotoSans-Bold',
        color: '#2E3A59',
    },
    sectionBody: {
        fontSize: 15,
        fontFamily: 'NotoSans-Regular',
        color: '#636D77',
        lineHeight: 26,
    },
});
