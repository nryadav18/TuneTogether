import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({ length = 6, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus(); 
    }
  };

  const handleClick = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].setNativeProps({ selection: { start: 1, end: 1 } });
    }

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf('')]?.focus(); 
    }
  };

  const handleKeyDown = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          value={value}
          onChangeText={(text) => handleChange(index, text)}
          onFocus={() => handleClick(index)}
          onKeyPress={({ nativeEvent }) => handleKeyDown(index, nativeEvent.key)}
          keyboardType="numeric"
          maxLength={1} 
          style={styles.otpInput}
        />
      ))}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  otpInput: {
    width: 40,
    height: 50,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    color: '#000',
  },
});
