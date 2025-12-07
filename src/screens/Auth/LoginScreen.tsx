import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';

export const LoginScreen = observer(() => {
    const navigation = useNavigation<any>();
    const { authStore } = useRootStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await authStore.login(email);
        // Navigation will be handled by the navigator based on auth state, 
        // but for now we might need to manually navigate if strictly stack based without switch
    };

    return (
        <ScreenContainer>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome back!</Text>
                    <Text style={styles.subtitle}>Sign in to continue cleaning</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Log In"
                        onPress={handleLogin}
                        loading={authStore.isLoading}
                        style={styles.loginButton}
                    />

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or continue with</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.google }]}>
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.apple }]}>
                            <Text style={styles.socialButtonText}>Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.footerLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ScreenContainer>
    );
});

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    title: {
        ...typography.header,
        marginBottom: 8,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
    },
    form: {
        width: '100%',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: colors.primary,
        fontWeight: '600',
    },
    loginButton: {
        marginBottom: 24,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        marginHorizontal: 16,
        color: colors.textSecondary,
        fontSize: 14,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    socialButton: {
        flex: 0.48,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    socialButtonText: {
        color: colors.white,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: colors.textSecondary,
    },
    footerLink: {
        color: colors.primary,
        fontWeight: 'bold',
    },
});
