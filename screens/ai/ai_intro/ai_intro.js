import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from './ai_introStylings'
import LottieView from 'lottie-react-native';
import CustomAlert from '../../alert/alert';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

const AI_Intro = () => {

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', message: '' });
  const navigation = useNavigation();

  const handleFingerprintAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      setAlertContent({
        title: 'Error',
        message: 'Your device does not support biometric authentication.',
      });
      setAlertVisible(true);
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      setAlertContent({
        title: 'Error',
        message: 'No biometric records found. Please set up biometrics on your device.',
      });
      setAlertVisible(true);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate for AI Service',
      fallbackLabel: 'Enter Passcode',
    });

    if (result.success) {
      navigation.navigate('AI_Support');
    } else {
      setAlertContent({
        title: 'Authentication Failed',
        message: 'Please try again.',
      });
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertContent.title}
        message={alertContent.message}
        onConfirm={() => setAlertVisible(false)}
      />
      <View style={styles.textParent}>
        <Text style={styles.mainTitle}>Tuner AI ✨</Text>
        <Text style={styles.subTitle}>Tuner is an AI Voice Recognition and Support Assistant!</Text>
      </View>
      <LottieView
        source={require('../../../assets/AI_Intro_Loader.json')}
        autoPlay={true}
        loop={true}
        speed={1}
        style={styles.lottie}
      />
      <TouchableOpacity style={styles.Button} onPress={handleFingerprintAuth}>
        <Text style={styles.buttonTitle}>
          Get Started ✨
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AI_Intro
