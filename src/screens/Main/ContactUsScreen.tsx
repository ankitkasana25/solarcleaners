import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { lightTheme } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';

export const ContactUsScreen = observer(() => {
    const { authStore } = useRootStore();
    const [name, setName] = useState(authStore.user?.name || '');
    const [email, setEmail] = useState(authStore.user?.email || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!subject || !message) {
            Alert.alert('Error', 'Please fill in the subject and message.');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(() => resolve(null), 1500));
        setIsSubmitting(false);

        Alert.alert(
            'Success',
            'Your query has been submitted. Our team will get back to you soon!',
            [{ text: 'OK' }]
        );
        setSubject('');
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <ScreenHeader title="Help & Support" showBack={true} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.headerSection}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="headset-outline" size={40} color={lightTheme.colors.primaryBlue} />
                        </View>
                        <Text style={styles.title}>Contact Us</Text>
                        <Text style={styles.subtitle}>
                            Have a question or need assistance? Fill out the form below and we'll help you out!
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Your Name"
                                placeholderTextColor="#A0AEC0"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="name@example.com"
                                placeholderTextColor="#A0AEC0"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Subject</Text>
                            <TextInput
                                style={styles.input}
                                value={subject}
                                onChangeText={setSubject}
                                placeholder="What is this about?"
                                placeholderTextColor="#A0AEC0"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Describe your query in detail..."
                                placeholderTextColor="#A0AEC0"
                                multiline
                                numberOfLines={5}
                                textAlignVertical="top"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.submitButtonText}>
                                {isSubmitting ? 'Submitting...' : 'Submit Query'}
                            </Text>
                            {!isSubmitting && (
                                <Ionicons name="send" size={16} color="#FFF" style={{ marginLeft: 8 }} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerInfo}>
                        <Text style={styles.footerText}>Or reach us directly at:</Text>
                        <View style={styles.contactMethod}>
                            <Ionicons name="mail" size={16} color={lightTheme.colors.primaryBlue} />
                            <Text style={styles.contactText}>Support@solarcleaningexpert.co.in</Text>
                        </View>
                        <View style={styles.contactMethod}>
                            <Ionicons name="mail" size={16} color={lightTheme.colors.primaryBlue} />
                            <Text style={styles.contactText}>Sales@solarcleaningexpert.co.in</Text>
                        </View>
                        <View style={styles.contactMethod}>
                            <Ionicons name="call" size={16} color={lightTheme.colors.primaryBlue} />
                            <Text style={styles.contactText}>9799-802000</Text>
                        </View>
                        <View style={styles.contactMethod}>
                            <Ionicons name="logo-whatsapp" size={16} color="#25D366" />
                            <Text style={styles.contactText}>WhatsApp Support</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EBF1FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: 'NotoSans-Bold',
        color: '#2D3748',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'NotoSans-Regular',
        color: '#718096',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    form: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#4A5568',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: '#2D3748',
    },
    textArea: {
        height: 120,
        paddingTop: 12,
    },
    submitButton: {
        backgroundColor: lightTheme.colors.primaryBlue,
        flexDirection: 'row',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    submitButtonDisabled: {
        backgroundColor: '#A0AEC0',
        shadowOpacity: 0,
        elevation: 0,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
    },
    footerInfo: {
        marginTop: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: '#4A5568',
        marginBottom: 12,
    },
    contactMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    contactText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: '#718096',
        marginLeft: 8,
    },
});
