import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height : 300,
        backgroundColor: '#f5f5f5',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    chatWrapper: {
        flex: 10,
    },
    senderMessage: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 10,
    },
    receiverMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    senderMessageContainer: {
        backgroundColor: '#d1f5d3',
        padding: 10,
        borderRadius: 8,
        maxWidth: '70%',
    },
    receiverMessageContainer: {
        backgroundColor: '#e6e6e6',
        padding: 10,
        borderRadius: 8,
        maxWidth: '70%',
    },
    messageText: {
        color: '#333',
    },
    inputContainer: {
        // position: 'absolute', // Fix the input field at the bottom
        // bottom: 0,
        // left: 0,
        // right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        // borderColor: '#ddd',
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    sendButton: {
        marginLeft: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default styles;
