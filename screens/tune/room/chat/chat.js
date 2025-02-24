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
import styles from './chatStylings';
import WebSocket from 'react-native-websocket';

const dummyUser1 = require('../../../../assets/astra.jpg'); // Dummy user image
const dummyUser2 = require('../../../../assets/deca.jpg'); // Dummy receiver image

const UserChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const scrollViewRef = useRef(null); // Ref for ScrollView
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Connect to WebSocket server
        const websocket = new WebSocket('ws://localhost:3000', {
            onOpen: () => console.log('WebSocket connected'),
            onMessage: (event) => {
                const receivedMessage = JSON.parse(event.data);
                setMessages((prev) => [...prev, receivedMessage]);
            },
            onClose: () => console.log('WebSocket disconnected'),
        });
        setWs(websocket);

        return () => {
            websocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        const newMessage = {
            text: inputMessage,
            isSender: true,
        };

        // Send message via WebSocket
        ws.send(JSON.stringify(newMessage));

        // Add message to local state
        setMessages((prev) => [...prev, newMessage]);
        setInputMessage('');
    };

    // Scroll to the bottom whenever messages change
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
                    <ScrollView
                        ref={scrollViewRef} // Attach the ref
                        style={styles.chatContainer}
                        contentContainerStyle={styles.chatContent}
                    >
                        {messages.map((message, index) => (
                            <View
                                key={`message-${index}`}
                                style={message.isSender ? styles.senderMessage : styles.receiverMessage}
                            >
                                {!message.isSender && (
                                    <Image source={dummyUser2} style={styles.userImage} />
                                )}
                                {message.isSender && (
                                    <Image source={dummyUser1} style={styles.userImage} />
                                )}
                                <View
                                    style={
                                        message.isSender
                                            ? styles.senderMessageContainer
                                            : styles.receiverMessageContainer
                                    }
                                >
                                    <Text style={styles.messageText}>{message.text}</Text>
                                </View>
                            </View>
                        ))}
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