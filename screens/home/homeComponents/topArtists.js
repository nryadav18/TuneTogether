import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import ArtistsData from './artistsData.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
export default function TopArtists({songsData}) {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currSongsData, setSongsData]=  useState();
    // console.log(songsData)

    
    useEffect(() => {
        // Simulate data fetching
            setArtists(ArtistsData);
            setLoading(false);
            setSongsData(currSongsData)
        
    }, []);
    
    const navigation = useNavigation();
    const OnHandlePress = (artist) => { 
        console.log(artist);
        navigation.navigate('MoreOptions',{"songsData":songsData, "itemName": artist.artistName});
        // console.log(songsData)
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container} >
                
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.artistGrid}>
                            {artists.map((artist, index) => (
                                <Pressable key={index} style={styles.artistCard}  onPress={() => OnHandlePress(artist)}>
                                    <Image
                                        source={{ uri: artist.artistImg }}
                                        style={styles.artistImage}
                                    />
                                    <Text style={styles.artistName}>{artist.artistName}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    artistGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    artistCard: {
        alignItems: 'center',
        margin: 5,
        borderRadius: 10,
        width: (Dimensions.get('window').width - 60) / 3, // Adjust width for responsiveness
    },
    artistImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1, // Maintains aspect ratio
        borderRadius: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    artistName: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
