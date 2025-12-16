import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Input } from '../../components/Input';
import { Toast } from '../../components/Toast';
import { Button } from '../../components/Button';
import { lightTheme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>(
    'info',
  );

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const handleSendOTP = async () => {
    if (!email) {
      showToast('Please enter your email address', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));

      showToast('OTP has been sent to your email', 'success');

      // Navigate to OTP verification screen
      setTimeout(() => {
        navigation.navigate('OTPVerification', {
          email,
          isFromForgotPassword: true,
        });
      }, 1000);
    } catch (error) {
      showToast('Failed to send OTP. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you an OTP to reset your
            password.
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Button
            title="Send OTP"
            onPress={handleSendOTP}
            loading={isLoading}
            style={styles.sendButton}
          />

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backToLoginText}>← Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={hideToast}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    marginBottom: 12,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: '#666666',
    textAlign: 'left',
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  sendButton: {
    marginTop: 24,
    backgroundColor: lightTheme.colors.primaryBlue,
    borderRadius: 12,
    height: 50,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  backToLoginText: {
    color: lightTheme.colors.primaryBlue,
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
  },
});
