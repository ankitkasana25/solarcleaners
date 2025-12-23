import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Input } from '../../components/Input';
import { Toast } from '../../components/Toast';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

interface RouteParams {
  email?: string;
}

export const ResetPasswordScreen = observer(() => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = (route.params as RouteParams) || {};
  const { email } = params;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const getPasswordStrength = (password: string) => {
    if (password.length < 8) return { strength: 0, text: 'too weak', color: '#EF4444' };
    if (!/(?=.*[A-Z])/.test(password)) return { strength: 1, text: 'weak', color: '#F59E0B' };
    if (!/(?=.*[0-9])/.test(password)) return { strength: 2, text: 'fair', color: '#F59E0B' };
    if (!/(?=.*[!@#$%^&*])/.test(password)) return { strength: 3, text: 'good', color: '#10B981' };
    return { strength: 4, text: 'strong', color: '#10B981' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters and include uppercase, number, and special character.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate password reset
      await new Promise(() => setTimeout(() => { }, 2000));

      showToast('Password reset successfully!', 'success');

      // Navigate to login screen
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    } catch (error) {
      showToast('Failed to reset password. Please try again.', 'error');
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
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter the new password for your account. Make it strong!
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Set new Password"
            placeholder="Min 8 chars, 1 Upper, 1 Special"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            icon={
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Text style={styles.eyeIcon}>{showNewPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            }
          />

          {newPassword.length > 0 && (
            <View style={styles.passwordStrengthContainer}>
              <View style={[styles.passwordStrengthBar, { backgroundColor: passwordStrength.color, width: `${(passwordStrength.strength / 4) * 100}%` }]} />
              <Text style={[styles.passwordStrengthText, { color: passwordStrength.color }]}>
                {passwordStrength.text}
              </Text>
            </View>
          )}

          <Input
            label="Confirm Password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            icon={
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            }
          />

          <Button
            title="Reset Password"
            onPress={handleResetPassword}
            loading={isLoading}
            style={styles.resetButton}
          />
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
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  passwordStrengthContainer: {
    marginBottom: 24,
    marginTop: -8,
  },
  passwordStrengthBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  passwordStrengthText: {
    fontSize: 12,
    fontFamily: 'NotoSans-Medium',
  },
  eyeIcon: {
    fontSize: 20,
  },
  resetButton: {
    marginTop: 24,
    backgroundColor: '#0D81FC', // lightTheme.colors.primaryBlue
    borderRadius: 12,
    height: 50,
  },
});
