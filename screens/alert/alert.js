import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const CustomAlert = ({ visible, title, message, onConfirm, onCancel }) => {
    const { width } = Dimensions.get('window');

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={[styles.alertBox, { maxWidth: width * 0.9 }]}>
                    <View style={styles.header}>
                        <Text style={styles.alertTitle}>{title}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.alertMessage}>{message}</Text>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.okButton} onPress={onConfirm}>
                            <Text style={styles.okText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    alertBox: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8,
    },
    header: {
        marginBottom: 15,
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    content: {
        marginBottom: 25,
    },
    alertMessage: {
        fontSize: 16,
        color: '#555555',
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#e74c3c',
        paddingVertical: 14,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        shadowColor: '#e74c3c',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    cancelText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    okButton: {
        flex: 1,
        backgroundColor: '#27ae60',
        paddingVertical: 14,
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
        shadowColor: '#27ae60',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    okText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
});

export default CustomAlert;
