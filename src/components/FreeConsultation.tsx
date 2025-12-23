import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { SectionTitle } from './SectionTitle';
import { colors } from '../theme/colors';
import { lightTheme } from '../theme/theme';
import { Toast } from './Toast';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withTiming,
    FadeInDown,
    FadeInRight
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export const FreeConsultation = () => {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

    // Animation values
    const floatingAnim = useSharedValue(0);

    React.useEffect(() => {
        floatingAnim.value = withRepeat(
            withTiming(1, { duration: 2500 }),
            -1,
            true
        );
    }, []);

    const floatingStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: floatingAnim.value * 10 }]
    }));

    const handleRequestCall = () => {
        if (!phone) {
            setToastMessage('Please enter your phone number');
            setToastType('error');
            setToastVisible(true);
            return;
        }

        setToastMessage('Request sent! We will call you soon.');
        setToastType('success');
        setToastVisible(true);
        setPhone('');
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <SectionTitle title="Free Solar Consultation" badgeText="Expert Support" />

            <Animated.View
                entering={FadeInDown.duration(800).delay(200)}
                style={styles.cardContainer}
            >
                <LinearGradient
                    colors={[lightTheme.colors.primaryBlue, '#0052CC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientCard}
                >
                    {/* Decorative Elements */}
                    <View style={styles.circle1} />
                    <View style={styles.circle2} />

                    <View style={styles.cardHeader}>
                        <Animated.View style={[styles.iconBadge, floatingStyle]}>
                            <Ionicons name="flash" size={24} color={lightTheme.colors.primaryBlue} />
                        </Animated.View>
                        <View style={styles.badgeLabel}>
                            <Text style={styles.badgeText}>QUICK CONNECT</Text>
                        </View>
                    </View>

                    <Text style={styles.cardTitle}>Expert Solar Advice</Text>
                    <Text style={styles.cardSubtitle}>
                        Get a free system analysis and savings estimate from our certified experts.
                    </Text>

                    <View style={styles.formContainer}>
                        <Animated.View entering={FadeInRight.delay(400)} style={styles.inputBox}>
                            <Ionicons name="call-outline" size={18} color="rgba(255,255,255,0.7)" style={styles.fieldIcon} />
                            <TextInput
                                placeholder="Phone Number"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                style={styles.textInput}
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInRight.delay(600)} style={styles.inputBox}>
                            <Ionicons name="chatbubble-outline" size={18} color="rgba(255,255,255,0.7)" style={styles.fieldIcon} />
                            <TextInput
                                placeholder="How can we help?"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                style={styles.textInput}
                                value={message}
                                onChangeText={setMessage}
                            />
                        </Animated.View>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.animatedButton}
                            onPress={handleRequestCall}
                        >
                            <LinearGradient
                                colors={['#FFD700', '#FFA500']}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>Book Free Consultation</Text>
                                <Ionicons name="arrow-forward" size={18} color="#000" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerNote}>
                        <Ionicons name="shield-checkmark" size={14} color="rgba(255,255,255,0.6)" />
                        <Text style={styles.footerNoteText}>Your data is safe with our certified experts</Text>
                    </View>
                </LinearGradient>
            </Animated.View>

            <Toast
                visible={toastVisible}
                message={toastMessage}
                type={toastType}
                onHide={() => setToastVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    cardContainer: {
        borderRadius: 24,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    gradientCard: {
        padding: 24,
        position: 'relative',
    },
    circle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    circle2: {
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    badgeLabel: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'NotoSans-Bold',
        letterSpacing: 1,
    },
    cardTitle: {
        fontSize: 24,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    cardSubtitle: {
        fontSize: 14,
        fontFamily: 'NotoSans-Regular',
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 22,
        marginBottom: 24,
    },
    formContainer: {
        gap: 12,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    fieldIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'NotoSans-Medium',
    },
    animatedButton: {
        marginTop: 8,
        borderRadius: 14,
        overflow: 'hidden',
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
    },
    footerNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        gap: 6,
    },
    footerNoteText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 11,
        fontFamily: 'NotoSans-Regular',
    },
});
