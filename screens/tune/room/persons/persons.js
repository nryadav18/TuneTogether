import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { io } from 'socket.io-client';

const { width } = Dimensions.get('window');
const socket = io('https://ps-backend-18.onrender.com', { transports: ['websocket'] });

const Persons = () => {
    const [usersInRoom, setUsersInRoom] = useState([]);
    const [usersToAdd, setUsersToAdd] = useState([]);

    useEffect(() => {
        socket.emit('getUsers');

        socket.on('roomUsers', (users) => {
            setUsersInRoom(users.filter(user => user.status === 'inRoom'));
            setUsersToAdd(users.filter(user => user.status === 'addUser'));
        });

        return () => {
            socket.off('roomUsers');
        };
    }, []);

    const handleAddUser = (user) => {
        socket.emit('addUserToRoom', user.id);
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {/* Section: People Already in the Room */}
            <Text style={styles.sectionTitle}>People in Room</Text>
            <View style={styles.listContainer}>
                {usersInRoom.length > 0 ? (
                    usersInRoom.map((user) => (
                        <View key={user.id} style={styles.card}>
                            <Image source={{ uri: user.avatar }} style={styles.avatar} />
                            <View style={styles.info}>
                                <Text style={styles.fullName}>{user.name}</Text>
                                <Text style={styles.username}>@{user.username}</Text>
                            </View>
                            <Ionicons name="checkmark-circle-outline" size={20} color="#1D3557" />
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No users in the room yet.</Text>
                )}
            </View>

            {/* Section: Add People to the Room */}
            <Text style={styles.sectionTitle}>Add People</Text>
            <View style={styles.listContainer}>
                {usersToAdd.length > 0 ? (
                    usersToAdd.map((user) => (
                        <View key={user.id} style={styles.card}>
                            <Image source={{ uri: user.avatar }} style={styles.avatar} />
                            <View style={styles.info}>
                                <Text style={styles.fullName}>{user.name}</Text>
                                <Text style={styles.username}>@{user.username}</Text>
                            </View>
                            <TouchableOpacity style={styles.actionButton} onPress={() => handleAddUser(user)}>
                                <Ionicons name="person-add-outline" size={20} color="#2D6A4F" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No users available to add.</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default Persons;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: width > 400 ? 20 : 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1D3557',
        paddingHorizontal: 10,
    },
    listContainer: {
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 2,
        marginHorizontal: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    fullName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    username: {
        fontSize: 14,
        color: '#666',
    },
    actionButton: {
        backgroundColor: '#D8F3DC',
        padding: 8,
        borderRadius: 20,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
});
