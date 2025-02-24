import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    joinParent: {
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    joinText: {
        fontSize: 36,
        textAlign : 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        margin: 20,
    },
    joinInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        fontSize : 24,
        fontWeight : 900,
        borderColor: '#ccc',
        borderRadius: 8,
        textAlign: 'center',
    },
    joinButton: {
        margin: 20,
        backgroundColor: '#007bff',
        fontSize: 18,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default styles;