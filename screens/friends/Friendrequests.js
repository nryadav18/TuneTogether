import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    Image, 
    TouchableOpacity, 
    Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); 

const FriendRequests = ({ requests, onAccept, onReject }) => {
    return (
        <View style={styles.container}>
            {requests.length === 0 ? (
                <Text style={styles.emptyText}>No friend requests</Text>
            ) : (
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.avatar} />
                            <View style={styles.info}>
                                <Text style={styles.fullName}>{item.fullName}</Text>
                                <Text style={styles.username}>{item.username}</Text>
                            </View>
                            <View style={styles.actions}>
                                <TouchableOpacity 
                                    style={styles.acceptButton} 
                                    onPress={() => onAccept(item)}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="checkmark-circle" size={50} color="#27ae60" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.rejectButton} 
                                    onPress={() => onReject(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="close-circle" size={50} color="#e74c3c" />
                                </TouchableOpacity>
                            </View>
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
        paddingHorizontal: width > 400 ? 20 : 10,
        paddingVertical: 15,
        backgroundColor : 'white'
    },
    emptyText: {
        textAlign: 'center',
        fontSize: width > 400 ? 20 : 18,
        color: 'gray',
        marginTop: 30,
        fontWeight: '500',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width > 400 ? 14 : 12,
        borderRadius: 12,
        // backgroundColor: '#ffffff',
        marginBottom: 12,
    },
    avatar: {
        width: width > 400 ? 60 : 50,
        height: width > 400 ? 60 : 50,
        borderRadius: width > 400 ? 30 : 25,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    fullName: {
        fontSize: width > 400 ? 20 : 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    username: {
        fontSize: width > 400 ? 16 : 14,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    acceptButton: {
        marginRight: 10,
        padding: 5,
    },
    rejectButton: {
        padding: 5,
    },
});

export default FriendRequests;
