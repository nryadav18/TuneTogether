import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllFriends from './AllFriends';
import FriendRequests from './Friendrequests';
import initialUsers from './users';  
import initialRequests from './userdata';

const TopTab = createMaterialTopTabNavigator();

const Friends = () => {
    const [friends, setFriends] = useState(initialUsers);
    const [friendRequests, setFriendRequests] = useState(initialRequests);

    // Accept Friend Request Handler
    const handleAccept = (friend) => {
        setFriends((prevFriends) => [...prevFriends, friend]); // Add to AllFriends list
        setFriendRequests((prevRequests) => prevRequests.filter((req) => req.id !== friend.id)); // Remove from Requests
    };

    // Reject Friend Request Handler
    const handleReject = (id) => {
        setFriendRequests((prevRequests) => prevRequests.filter((req) => req.id !== id)); // Remove from Requests
    };

    return (
        <View style={styles.container}>
            <TopTab.Navigator
                initialRouteName="All"
                screenOptions={{
                    tabBarStyle: { height: 60 },
                    tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold', color: 'black' },
                }}
            >
                <TopTab.Screen 
                    name="All" 
                    children={() => <AllFriends friends={friends} />} 
                />
                <TopTab.Screen 
                    name="Requests" 
                    children={() => <FriendRequests requests={friendRequests} onAccept={handleAccept} onReject={handleReject} />} 
                />
            </TopTab.Navigator>
        </View>
    );
};

export default Friends;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
