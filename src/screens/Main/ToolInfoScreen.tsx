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
    const { tool } = route.params as { tool: ToolArticle & { isCalculator?: boolean } };

    const [capacity, setCapacity] = React.useState('');
    const [unit, setUnit] = React.useState<'Watt' | 'kW'>('kW');
    const RATE_PER_WATT = 0.15;

    const calculatePrice = () => {
        const value = parseFloat(capacity) || 0;
        const totalWatts = unit === 'kW' ? value * 1000 : value;
        return (totalWatts * RATE_PER_WATT).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        });
    };

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

                    {tool.isCalculator && (
                        <View style={styles.calculatorSection}>
                            <Text style={styles.calculatorTitle}>Get Instant Quote</Text>
                            <Text style={styles.rateBadge}>Rate: ₹0.15 per Watt</Text>

                            <View style={styles.inputWrapper}>
                                <View style={styles.capacityInputContainer}>
                                    <View style={styles.textInputControl}>
                                        <Text style={styles.inputLabel}>Solar Capacity</Text>
                                        <View style={styles.row}>
                                            <TouchableOpacity
                                                style={styles.unitToggle}
                                                onPress={() => setUnit(unit === 'kW' ? 'Watt' : 'kW')}
                                            >
                                                <Text style={styles.unitText}>{unit}</Text>
                                                <Ionicons name="swap-horizontal" size={14} color={tool.colors[0]} />
                                            </TouchableOpacity>
                                            <View style={styles.inputMain}>
                                                <View style={styles.nativeInputPlaceholder}>
                                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                                        <View style={{ flex: 1 }}>
                                                            {/* We'll use a simple View-based Mock for Input if needed, 
                                                                but let's use a real TextInput for better UX */}
                                                            <View style={styles.inputFlex}>
                                                                <Text style={styles.currencyPrefix}>⚡</Text>
                                                                <View style={{ flex: 1 }}>
                                                                    <View style={{ borderBottomWidth: 2, borderBottomColor: tool.colors[0], marginBottom: 5 }}>
                                                                        <View style={{ height: 40, justifyContent: 'center' }}>
                                                                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1C1C1E' }}>
                                                                                {capacity || '0'}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* Simple Numpad for interaction */}
                                <View style={styles.numpad}>
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'DEL'].map((key) => (
                                        <TouchableOpacity
                                            key={key}
                                            style={styles.numKey}
                                            onPress={() => {
                                                if (key === 'DEL') {
                                                    setCapacity(capacity.slice(0, -1));
                                                } else if (key === '.') {
                                                    if (!capacity.includes('.')) setCapacity(capacity + key);
                                                } else {
                                                    setCapacity(capacity + key);
                                                }
                                            }}
                                        >
                                            <Text style={[styles.numText, key === 'DEL' && { color: '#FF4B4B' }]}>{key}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <View style={styles.resultContainer}>
                                    <LinearGradient
                                        colors={[tool.colors[0], tool.colors[1] || tool.colors[0]]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.resultGradient}
                                    >
                                        <Text style={styles.resultLabel}>Estimated Service Cost</Text>
                                        <Text style={styles.resultValue}>{calculatePrice()}</Text>
                                    </LinearGradient>
                                </View>
                            </View>

                            <View style={styles.divider} />
                        </View>
                    )}

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
    calculatorSection: {
        marginBottom: 32,
    },
    calculatorTitle: {
        fontSize: 22,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    rateBadge: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: '#0D81FC',
        marginBottom: 20,
    },
    inputWrapper: {
        backgroundColor: '#F8F9FA',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    capacityInputContainer: {
        marginBottom: 24,
    },
    textInputControl: {},
    inputLabel: {
        fontSize: 12,
        fontFamily: 'NotoSans-Bold',
        color: '#8E8E93',
        textTransform: 'uppercase',
        marginBottom: 8,
        letterSpacing: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unitToggle: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    unitText: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        marginRight: 4,
        color: '#1C1C1E',
    },
    inputMain: {
        flex: 1,
    },
    nativeInputPlaceholder: {},
    inputFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencyPrefix: {
        fontSize: 24,
        marginRight: 8,
    },
    numpad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    numKey: {
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    numText: {
        fontSize: 20,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
    },
    resultContainer: {
        marginTop: 10,
    },
    resultGradient: {
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    resultLabel: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
    },
    resultValue: {
        fontSize: 32,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
    },
    divider: {
        height: 1,
        backgroundColor: '#E9ECEF',
        marginTop: 32,
    },
});
