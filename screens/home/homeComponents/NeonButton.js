import React, { useRef, useEffect } from 'react';
import { Pressable, Text, StyleSheet, View, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const NeonButton = ({ title, icon, onPress}) => {
  const colorAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [colorAnimation]);

  const borderColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0ff', '#f0f']
  });

  const shadowColor = colorAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#0ff', '#f0f', '#0ff'],
  });

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          styles.animatedButton,
          {
            borderColor: borderColor,
            shadowColor: shadowColor,
          },
        ]}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          {icon && (
            <MaterialIcons
              name={icon}
              size={24}
              color="#fff"
              style={styles.icon}
            />
          )}
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'start',
    width: 100,

  },
  animatedButton: {
    borderWidth: 2,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    // elevation: 5,
    // justifyContent:'space-around'
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NeonButton;