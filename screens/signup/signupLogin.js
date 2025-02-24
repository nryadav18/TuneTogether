import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { BounceIn, BounceOut, FadeInDown, FadeInLeft, FadeInUp, LightSpeedInLeft } from 'react-native-reanimated';
import Animated1, { LightSpeedInRight, LightSpeedOutLeft } from 'react-native-reanimated';
import { useState } from 'react';

const LogIn = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <Image style={{ position: "absolute", height: "100%", weight: "100%", resizeMode: "cover" }} source={require('../../assets/back-removebg-preview.png')} />

      <View style={{
        position: "absolute",
        top: -30,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
      }}>
        <Animated.Image entering={BounceIn.delay(200).duration(1000).springify()}
          source={require("../../assets/guitar.png")}
          style={{
            height: 260,
            width: 90,
          }}
        />
        <Animated.Image entering={BounceIn.delay(400).duration(1000).springify()}
          source={require("../../assets/guitar.png")}
          style={{
            height: 190,
            width: 65,
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 40, paddingBottom: 10 }}>
        <View style={{ alignItems: 'center', position: 'relative', bottom: '-130' }}>
          <Animated.Text entering={FadeInUp.duration(2000).springify()} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 2, fontSize: 40 }}>LogIn</Animated.Text>
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 16, spaceY: 16, position: 'relative', bottom: '-20' }}>
          <Animated.View
            entering={FadeInDown.delay(200).duration(2000).springify()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E3E3E3',
              paddingHorizontal: 16,
              borderRadius: 10,
              width: '100%',
              marginTop: 80,
              marginBottom: 15,
              elevation: 2, // Adds shadow on Android
              shadowColor: '#333', // Adds shadow on iOS
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <Ionicons name="mail-outline" size={20} color="#5D5D5D" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              style={{
                flex: 1,
                height: 50,
                fontSize: 16,
                color: '#333',
              }}
            />
          </Animated.View>

          {/* Password Input */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(2000).springify()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E3E3E3',
              paddingHorizontal: 16,
              borderRadius: 10,
              width: '100%',
              marginBottom: 15,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#5D5D5D" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry
              style={{
                flex: 1,
                height: 50,
                fontSize: 16,
                color: '#333',
              }}
            />

          </Animated.View>
          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity style={styles.checkboxContainer}>
              <Ionicons
                name={rememberMe ? "checkbox-outline" : "square-outline"}
                size={20}
                color="#1E90FF"
              />
              <Text style={styles.rememberMeText}>Remember Me v</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('OtpPage1')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('')}
            style={{
              backgroundColor: '#1E90FF',
              paddingVertical: 14,
              paddingHorizontal: 40,
              borderRadius: 25,
              marginVertical: 16,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Animated.Text entering={FadeInDown.delay(1000).duration(1000).springify()} style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Log in</Animated.Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Don't have an account?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ color: '#1E90FF', fontWeight: 'bold' }}>SignUp</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});
