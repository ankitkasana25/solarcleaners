import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SectionTitle } from './SectionTitle';
import { colors } from '../theme/colors';

import { Toast } from './Toast'; // Import Toast

export const FreeConsultation = () => {
    const [phone, setPhone] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [toastVisible, setToastVisible] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [toastType, setToastType] = React.useState<'success' | 'error' | 'info'>('info');

    const handleRequestCall = () => {
        if (!phone) {
            setToastMessage('Please enter your phone number');
            setToastType('error');
            setToastVisible(true);
            return;
        }

        // Simulating submission
        setToastMessage('Request sent! We will call you soon.');
        setToastType('success');
        setToastVisible(true);
        setPhone('');
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <SectionTitle title="Free Solar Consultation" badgeText="Expert Support" />

            <View style={styles.card}>
                <View style={styles.headerContent}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>👨‍🔧</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Expert Solar Advice</Text>
                        <Text style={styles.subtitle}>
                            Get a free system analysis and savings estimate from our certified experts.
                        </Text>
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputIcon}>📞</Text>
                        <TextInput
                            placeholder="Your Phone Number"
                            placeholderTextColor="#8E8E93"
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View style={[styles.inputWrapper, { marginTop: 12 }]}>
                        <Text style={styles.inputIcon}>📝</Text>
                        <TextInput
                            placeholder="How can we help?"
                            placeholderTextColor="#8E8E93"
                            style={styles.input}
                            value={message}
                            onChangeText={setMessage}
                        />
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.submitButton}
                        onPress={handleRequestCall}
                    >
                        <Text style={styles.submitButtonText}>Request Free Call</Text>
                    </TouchableOpacity>
                </View>

                {/* Minimal Footer */}
                <View style={styles.footerStrip}>
                    <Text style={styles.footerText}>Need urgent help? <Text style={styles.footerPhone}>1800-SOLAR-HELP</Text></Text>
                </View>
            </View>

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
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#F2F2F7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    headerContent: {
        flexDirection: 'row',
        marginBottom: 24,
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    icon: {
        fontSize: 24,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E', // Dark text
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666', // Grey text
        lineHeight: 20,
    },
    formContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB', // Very light grey bg
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 52,
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    inputIcon: {
        marginRight: 12,
        fontSize: 16,
        opacity: 0.6,
    },
    input: {
        flex: 1,
        color: '#1C1C1E',
        fontSize: 15,
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: colors.primary, // Solid brand color
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footerStrip: {
        borderTopWidth: 1,
        borderTopColor: '#F2F2F7',
        paddingTop: 16,
        alignItems: 'center',
    },
    footerText: {
        color: '#8E8E93',
        fontSize: 13,
    },
    footerPhone: {
        color: colors.primary,
        fontWeight: '600',
    },
});
