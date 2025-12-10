import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { colors } from '../theme/colors';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  autoFocus?: boolean;
  containerStyle?: any;
  inputStyle?: any;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 5,
  onComplete,
  autoFocus = true,
  containerStyle,
  inputStyle,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const otpString = otp.join('');
    if (otpString.length === length) {
      onComplete(otpString);
    }
  }, [otp, length, onComplete]);

  const handleChange = (value: string, index: number) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');

    if (numericValue.length > 1) {
      // Handle paste case
      const newOtp = [...otp];
      for (let i = 0; i < Math.min(numericValue.length, length - index); i++) {
        newOtp[index + i] = numericValue[i];
      }
      setOtp(newOtp);

      // Focus on the next empty input or the last filled input
      const nextIndex = Math.min(index + numericValue.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = numericValue;
      setOtp(newOtp);

      // Move to next input if current input is filled
      if (numericValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleFocus = (index: number) => {
    // Select all text when focusing for easier editing
    if (otp[index]) {
      inputRefs.current[index]?.setNativeProps({
        selection: { start: 0, end: 1 }
      });
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.input,
            otp[index] ? styles.inputFilled : null,
            inputStyle
          ]}
          value={otp[index]}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          keyboardType="number-pad"
          maxLength={1}
          secureTextEntry={false}
          selectTextOnFocus
          autoFocus={autoFocus && index === 0}
          placeholder="0"
          placeholderTextColor="#CCCCCC"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#F8F9FA',
    color: colors.text,
  },
  inputFilled: {
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
  },
});
