import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Clipboard from 'expo-clipboard';
import CustomAlert from '../../alert/alert';
import styles from './createStylings';
import Songs from './songs/songs';
import Chat from './chat/chat';
import Persons from './persons/persons';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const Create = ({ route }) => {
    const { size } = route.params;
    const [rc, setRC] = useState('123456');
    const [three, setThree] = useState(1);
    const [currentImage, setCurrentImage] = useState('https://184d-2409-40f0-104d-89ed-b44c-185c-8a72-d231.ngrok-free.app/uploads/movies/AppLogo.png');
    const [songsData, setSongsData] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('https://184d-2409-40f0-104d-89ed-b44c-185c-8a72-d231.ngrok-free.app/get-data');
                setSongsData(response.data);
            } catch (error) {
                console.error('Error fetching songs data:', error);
            }
        };
        fetchSongs();
    }, []);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(rc);
        setAlertVisible(true);
    };

    return (
        <SafeAreaView>
            <StatusBar style='auto' />
            <ScrollView contentContainerStyle={styles.RoomContainer}>
                <View style={styles.RoomCode}>
                    <Text style={styles.RoomCodeText}>Room Code</Text>
                    <View style={styles.RoomCodeBoxParent}>
                        {rc.split('').map((item, index) => (
                            <View key={index} style={styles.RoomCodeBoxes}>
                                <Text style={styles.RoomCodeNumber}>{item}</Text>
                                <View style={styles.CodeBar}></View>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.RoomCodeCopy} onPress={copyToClipboard}>
                            <Icon name="content-copy" size={28} color="grey" />
                        </TouchableOpacity>
                    </View>
                </View>

                <CustomAlert
                    visible={alertVisible}
                    title="Room Code Copied"
                    message="The room code has been successfully copied!"
                    onConfirm={() => setAlertVisible(false)}
                />

                <View style={styles.SongImageParent}>
                    <Text style={styles.NowPlaying}>Now Playing</Text>
                    <Image source={{ uri: currentImage }} style={styles.SongImage} />
                </View>

                <View style={styles.ThreeLayout}>
                    <View style={styles.ThreeOptions}>
                        {["Songs", "Chat", "People"].map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={three === index + 1 ? [styles.ThreeBox, { borderBottomColor: '#41C3D6' }] : styles.ThreeBox}
                                onPress={() => setThree(index + 1)}
                            >
                                <Text style={three === index + 1 ? [styles.ThreeText, { color: '#41C3D6' }] : styles.ThreeText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View>
                        {three === 1 && <Songs songsData={songsData} onSongSelect={setCurrentImage} />}
                        {three === 2 && <Chat />}
                        {three === 3 && <Persons />}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;
