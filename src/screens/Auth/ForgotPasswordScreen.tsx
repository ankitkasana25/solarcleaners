import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Input } from '../../components/Input';
import { Toast } from '../../components/Toast';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('OTP has been sent to your email', 'success');
      
      // Navigate to OTP verification screen
      setTimeout(() => {
        navigation.navigate('OTPVerification', { 
          email, 
          isFromForgotPassword: true 
        });
      }, 1000);
    } catch (error) {
      showToast('Failed to send OTP. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you an OTP to reset your password
          </Text>
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
    </ScreenContainer>
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
    alignItems: 'center',
  },
  title: {
    ...typography.header,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  sendButton: {
    marginTop: 20,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  backToLoginText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
