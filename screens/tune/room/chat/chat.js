import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { io } from 'socket.io-client';
import styles from './chatStylings';

// Dummy user images
const dummyUser1 = require('../../../../assets/astra.jpg'); 
const dummyUser2 = require('../../../../assets/deca.jpg'); 

// 🔥 Use your Ngrok public URL here (Run `ngrok http 9000` to get it)
const socket = io('https://184d-2409-40f0-104d-89ed-b44c-185c-8a72-d231.ngrok-free.app', {
    transports: ['websocket'],
});

const UserChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const scrollViewRef = useRef(null);

    // Generate a unique user ID (you can replace this with actual user authentication)
    const [userId] = useState(`user_${Math.random().toString(36).substring(7)}`);

    useEffect(() => {
        socket.emit('joinChat', userId); // Send user ID when joining

        socket.on('receiveMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);


    const sendMessage = () => {
        if (!inputMessage.trim()) return;
    
        const newMessage = {
            text: inputMessage,
            senderId: userId, // Attach sender ID
        };
    
        socket.emit('sendMessage', newMessage); // Send message to server
    
        setInputMessage('');
    };
    

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.chatWrapper}>
                    <ScrollView ref={scrollViewRef} style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
                        {messages.map((message, index) => {
                            const isSender = message.senderId === userId; // Check if current user is the sender

                            return (
                                <View key={`message-${index}`} style={isSender ? styles.senderMessage : styles.receiverMessage}>
                                    <Image source={isSender ? dummyUser1 : dummyUser2} style={styles.userImage} />
                                    <View style={isSender ? styles.senderMessageContainer : styles.receiverMessageContainer}>
                                        <Text style={styles.messageText}>{message.text}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChangeText={setInputMessage}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};


export default UserChat;
