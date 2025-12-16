import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { OTPInput } from '../../components/OTPInput';
import { Toast } from '../../components/Toast';
import { Button } from '../../components/Button';
import { lightTheme } from '../../theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';

interface RouteParams {
  email?: string;
  isFromSignup?: boolean;
  isFromForgotPassword?: boolean;
}

export const OTPVerificationScreen = observer(() => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { authStore } = useRootStore();

  const params = (route.params as RouteParams) || {};
  const { email, isFromSignup = false, isFromForgotPassword = false } = params;

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>(
    'info',
  );
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Show toast notification when screen loads
    showToast(
      'An OTP has been sent to your email. Please check your inbox and enter the OTP to confirm.',
      'info',
    );

    // Start timer
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const handleOTPComplete = async (enteredOtp: string) => {
    setOtp(enteredOtp);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 5) {
      showToast('Please enter a valid 5-digit OTP', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate OTP verification
      await new Promise<void>(resolve => setTimeout(resolve, 2000));

      // For demo, accept any 5-digit OTP
      if (otp.length === 5) {
        showToast('OTP verified successfully!', 'success');

        // Navigate based on source
        if (isFromSignup) {
          // Navigate to home screen after successful signup
          await authStore.login(email || '');
          setIsLoading(false);
          // Navigate to main app
          navigation.navigate('MainTabs');
        } else if (isFromForgotPassword) {
          setIsLoading(false);
          navigation.navigate('ResetPassword', { email });
        } else {
          setIsLoading(false);
          navigation.navigate('Login');
        }
      } else {
        showToast('Invalid OTP. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Verification failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      // Simulate OTP resend
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      showToast('OTP has been resent to your email', 'success');

      // Reset timer
      setTimer(30);
      setCanResend(false);

      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      showToast('Failed to resend OTP. Please try again.', 'error');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
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
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to your email
          </Text>
          <Text style={styles.emailText}>{email || 'your email'}</Text>
        </View>

        <View style={styles.form}>
          <OTPInput
            length={5}
            onComplete={handleOTPComplete}
            containerStyle={styles.otpContainer}
          />

          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Dish't receive code? </Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.resendText}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>Resend in {formatTime(timer)}</Text>
            )}
          </View>

          <Button
            title="Verify & Proceed"
            onPress={handleVerifyOTP}
            loading={isLoading}
            disabled={otp.length !== 5}
            style={styles.verifyButton}
          />

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>← Back to Login</Text>
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
});

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
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: '#1C1C1E',
    textAlign: 'left',
  },
  form: {
    width: '100%',
  },
  otpContainer: {
    marginBottom: 32,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  timerLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: '#666666',
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: '#666666',
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: lightTheme.colors.primaryBlue,
  },
  verifyButton: {
    marginBottom: 24,
    backgroundColor: lightTheme.colors.primaryBlue,
    borderRadius: 12,
    height: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerLink: {
    color: lightTheme.colors.primaryBlue,
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
  },
});
