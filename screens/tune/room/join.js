import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './joinStylings';
import CustomAlert from '../../alert/alert';

const Join = ({ route }) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const [alertVisible, setAlertVisible] = useState(false);

    const handleInputChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }

        if (!text && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = () => {
        const roomCode = code.join('');
        if (roomCode.length === 6) {
            console.log(`Joining Room: ${roomCode}`);
        } else {
            setAlertVisible(true)
        }
    };

    return (
        <View style={styles.container}>
            <CustomAlert
                visible={alertVisible}
                title="Invalid Room Code"
                message="Please Enter a Valid Room Code!"
                onConfirm={() => setAlertVisible(false)}
            />
            <StatusBar style="auto" />
            <View style={styles.joinParent}>
                <Text style={styles.joinText}>Enter Valid Room Code to Join the Room</Text>
                <View style={styles.inputRow}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.joinInput}
                            value={digit}
                            onChangeText={(text) => handleInputChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            ref={(el) => (inputs.current[index] = el)}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.joinButton} onPress={handleSubmit}>
                    <Text style={styles.joinButtonText}>Join Room</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Join;