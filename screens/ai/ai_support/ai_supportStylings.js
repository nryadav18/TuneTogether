import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    LogoParent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor : 'silver',
        flexDirection : 'row',
        borderBottomWidth : 1,
        height : 200,
    },
    lottie: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    keyboardAvoidingView: {
        marginTop : 10,
        flex: 1,
    },
    mainTitle : {
        fontSize : 36,
        fontWeight : 900,
        paddingLeft : .1,
        margin : 10,
        color : '#f32b00'
    },
    chatContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 80,
    },
    AIMessage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    AIMsgLogoParent: {
        marginRight: 10,
    },
    RoboTextParent: {
        maxWidth: '80%'
    },
    RoboMessageContainer: {
        backgroundColor: '#e6f7ff',
        padding: 10,
        borderRadius: 8,
    },
    AIText: {
        color: '#333',
    },
    HumanMessage: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    HumanTextParent: {
        maxWidth: '80%'
    },
    HumanMessageContainer: {
        backgroundColor: '#ffebcc',
        padding: 10,
        borderRadius: 8,
    },
    loader : {
        height : 35,
        width : 35,
    },
    HumanMsgLogoParent: {
        marginLeft: 10,
    },
    miniLogo: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
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