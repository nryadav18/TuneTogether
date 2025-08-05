import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const AllFriends = ({ friends }) => {
    return (
        <View style={styles.container}>
            {friends.length === 0 ? (
                <Text style={styles.emptyText}>No friends yet</Text>
            ) : (
                <FlatList
                    data={friends}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.avatar} />
                            <View style={styles.info}>
                                <Text style={styles.fullName}>{item.fullName}</Text>
                                <Text style={styles.username}>{item.username}</Text>
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Remove Friend</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: width > 400 ? 15 : 10,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width > 400 ? 12 : 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    avatar: {
        width: width > 400 ? 60 : 50,
        height: width > 400 ? 60 : 50,
        borderRadius: 35,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    fullName: {
        fontSize: width > 400 ? 20 : 16,
        fontWeight: 'bold',
        color: '#333',
    },
    username: {
        fontSize: width > 400 ? 16 : 14,
        color: '#666',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: width > 400 ? 11 : 10,
        paddingHorizontal: width > 400 ? 14 : 13,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: width > 400 ? 15 : 14,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AllFriends;