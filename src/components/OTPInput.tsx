import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '@/screens/constants/colors';

type OTPInputProps = {
  length?: number;
  onComplete?: (otp: string) => void;
  error?: string;
};

export default function OTPInput({ 
  length = 6, 
  onComplete,
  error 
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits are filled
    if (newOtp.every(digit => digit !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace - move to previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <React.Fragment key={index}>
            <TextInput
              ref={(ref) => { inputs.current[index] = ref; }}
              style={[
                styles.input,
                otp[index] && styles.inputFilled,
                focusedIndex === index && styles.inputFocused,
                error && styles.inputError,
              ]}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              textAlign="center"
            />
            {/* Add dash separator in the middle (after 3rd box for 6-digit OTP) */}
            {index === Math.floor(length / 2) - 1 && (
              <Text style={styles.separator}>–</Text>
            )}
          </React.Fragment>
          ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 55,
    backgroundColor: Colors.backgroundBorder,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputFilled: {
    // borderColor: '#4CAF50',
    // backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: Colors.borderFocused,
    borderWidth: 2,
    backgroundColor: Colors.background,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.background,
    },
  separator: {
    fontSize: 24,
    fontWeight: '400',
    color: Colors.textDisabled,
    marginHorizontal: 1,
    alignSelf: 'center',
    },
  errorText: {
    fontSize: 13,
    color: Colors.errorText,
    marginTop: 12,
  },
});