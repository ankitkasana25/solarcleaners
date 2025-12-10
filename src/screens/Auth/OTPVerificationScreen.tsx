import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { OTPInput } from '../../components/OTPInput';
import { Toast } from '../../components/Toast';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
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
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Show toast notification when screen loads
    showToast('An OTP has been sent to your email. Please check your inbox and enter the OTP to confirm.', 'info');

    // Start timer
    const interval = setInterval(() => {
      setTimer((prev) => {
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

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
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
      await new Promise<void>((resolve) => setTimeout(resolve, 2000));

      // For demo, accept any 5-digit OTP
      if (otp.length === 5) {
        showToast('OTP verified successfully!', 'success');

        // Navigate based on source
        if (isFromSignup) {
          // Navigate to home screen after successful signup
          await authStore.login(email || '');
          setIsLoading(false);
          // Navigate to main app (you may need to adjust this navigation)
          navigation.navigate('Main');
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
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      showToast('OTP has been resent to your email', 'success');

      // Reset timer
      setTimer(30);
      setCanResend(false);

      const interval = setInterval(() => {
        setTimer((prev) => {
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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
            An OTP has been sent to your registered Email
          </Text>
        </View>

        <View style={styles.form}>
          <OTPInput
            length={5}
            onComplete={handleOTPComplete}
            containerStyle={styles.otpContainer}
          />

          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Resend: </Text>
            <Text style={styles.timerText}>{formatTime(timer)} seconds</Text>
          </View>

          <Button
            title="Verify OTP"
            onPress={handleVerifyOTP}
            loading={isLoading}
            disabled={otp.length !== 5}
            style={styles.verifyButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/icons/google.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/icons/apple.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
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
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  otpContainer: {
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  timerLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  timerText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  verifyButton: {
    marginBottom: 24,
    width: '100%',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.textSecondary,
    fontSize: 13,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
