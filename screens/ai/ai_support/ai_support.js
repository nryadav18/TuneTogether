import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AI from '../../../assets/robo1.jpg';
import Human from '../../../assets/squad.jpg';
import { SafeAreaView } from 'react-native';
import styles from './ai_supportStylings';
import LottieView from 'lottie-react-native';
import Stars from '../../../assets/stars1.png';

const AI_Support = () => {
    const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hello! I am Tuner.ai, How can I assist you today?', loading : false }]);
    const [inputMessage, setInputMessage] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isWaiting) return;

        const userMessage = { role: 'user', text: inputMessage };
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');
        setIsWaiting(true);

        const loadingMessage = { role: 'assistant', text: '', loading: true };
        setMessages((prev) => [...prev, loadingMessage]);

        try {
            const response = await generateBotResponse([...messages, userMessage]);
            const botResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand that.';

            setMessages((prev) =>
                prev.map((msg, index) =>
                    index === prev.length - 1
                        ? { role: 'assistant', text: botResponse, loading: false }
                        : msg
                )
            );
        } catch (error) {
            console.error('Error generating bot response:', error);

            setMessages((prev) =>
                prev.map((msg, index) =>
                    index === prev.length - 1
                        ? { role: 'assistant', text: 'Oops, something went wrong. Please try again later.', loading: false }
                        : msg
                )
            );
        } finally {
            setIsWaiting(false);
        }
    };

    const generateBotResponse = async (history) => {
        const formattedHistory = history.map(({ role, text }) => ({
            role,
            parts: [{ text }],
        }));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: formattedHistory }),
        };

        try {
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyALQs3LTRymA9eq3gyGp5rqNn1kBVBgDbE',
                requestOptions
            );

            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message || 'Something went wrong');

            return data;
        } catch (error) {
            console.error('Error in generateBotResponse:', error);
            throw error;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.LogoParent}>
                <Text style={styles.mainTitle}>Tuner.AI ✨</Text>
                <LottieView
                    source={require('../../../assets/AI_Loader2.json')}
                    autoPlay={true}
                    loop={true}
                    speed={1}
                    style={styles.lottie}
                />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.chatContainer}>
                    {messages.map((item, index) => (
                        <View
                            key={`message-${index}`}
                            style={item.role === 'user' ? styles.HumanMessage : styles.AIMessage}
                        >
                            <View style={item.role === 'user' ? styles.HumanMsgLogoParent : styles.AIMsgLogoParent}>
                                <Image
                                    source={item.role === 'user' ? Human : AI}
                                    style={styles.miniLogo}
                                />
                            </View>
                            <View
                                style={item.role === 'user' ? styles.HumanTextParent : styles.RoboTextParent}
                            >
                                {item.loading && item.role === 'assistant' ? (
                                    <LottieView
                                        source={require('../../../assets/AI_Loader.json')}
                                        autoPlay={true}
                                        loop={true}
                                        speed={1.5}
                                        style={styles.loader}
                                    />
                                ) : (
                                    <View
                                        style={
                                            item.role === 'user'
                                                ? styles.HumanMessageContainer
                                                : styles.RoboMessageContainer
                                        }
                                    >
                                        <Text style={styles.AIText}>{item.text}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask Tuner..."
                        value={inputMessage}
                        onChangeText={setInputMessage}
                        editable={!isWaiting}
                    />

                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={sendMessage}
                        disabled={isWaiting}
                    >
                        <Image source={Stars} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AI_Support;
