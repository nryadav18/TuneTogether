import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import axios from 'axios';
import styles from './songStylings';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Songs = ({ onSongSelect }) => {
    const [songsData, setSongsData] = useState(null); // Displayed songs
    const [originalSongsData, setOriginalSongsData] = useState([]); // Original songs list
    const [playingIndex, setPlayingIndex] = useState(null);
    const [sound, setSound] = useState(null);
    const [loader, setLoader] = useState(false);
    const [isLoadingSong, setIsLoadingSong] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchSongs = async () => {
            setLoader(true);
            try {
                const response = await axios.get('https://ps-backend-18./get-data');
                setSongsData(response.data);
                setOriginalSongsData(response.data); // Save original data
            } catch (error) {
                console.error('Error fetching songs data:', error);
            } finally {
                setLoader(false);
            }
            
        };

        fetchSongs();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);


    const handleSearch = () => {
        if (!searchQuery.trim()) {
            // If the search query is empty, reset to the original data
            setSongsData(originalSongsData);
            return;
        }

        setIsSearching(true);

        const query = searchQuery.trim().toLowerCase();

        const filtered = originalSongsData.filter((song) => {
            return (
                song.name.toLowerCase().includes(query) ||
                song.artist.some((artist) => artist.toLowerCase().includes(query)) ||
                song.movie.toLowerCase().includes(query) ||
                song.lang.toLowerCase().includes(query) ||
                song.hero.toLowerCase().includes(query) ||
                song.heroine.toLowerCase().includes(query) ||
                song.theme.toLowerCase().includes(query)
            );
        });

        setSongsData(filtered);
        setIsSearching(false);
    };


    const handleSongPress = async (index) => {
        if (isLoadingSong) return; // Prevent rapid clicks
        setIsLoadingSong(true);

        const updatedSongsData = songsData.map((song, i) => ({
            ...song,
            isLoading: i === index ? !song.isPlaying : false,
            isPlaying: false,
            position: i === index ? song.position : 0,
        }));

        setSongsData(updatedSongsData);

        // If the clicked song is already playing, pause it
        if (playingIndex === index && songsData[index].isPlaying) {
            if (sound) {
                const status = await sound.getStatusAsync();
                if (status.isLoaded && status.isPlaying) {
                    await sound.pauseAsync();
                    updatedSongsData[index].position = status.positionMillis;
                    updatedSongsData[index].isPlaying = false;
                    setSongsData([...updatedSongsData]);
                    await sound.setOnPlaybackStatusUpdate(null); // Clear the listener
                }
            }
            setIsLoadingSong(false);
            return;
        }

        // Stop the currently playing sound (if any)
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }

        setPlayingIndex(index);

        const selectedSong = songsData[index];
        if (selectedSong) {
            onSongSelect(`https://ps-backend-18./${selectedSong.img}`);
            try {
                const { sound: newSound } = await Audio.Sound.createAsync({ uri: `https://ps-backend-18.onrender.com/${selectedSong.url}` });
                setSound(newSound);

                if (selectedSong.position) {
                    await newSound.setPositionAsync(selectedSong.position);
                }

                // Set the listener for playback status
                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.didJustFinish && songsData) {
                        // Automatically move to the next song
                        const nextIndex = (index + 1) % songsData.length; // Loop back to start
                        handleSongPress(nextIndex);
                    }
                });

                await newSound.playAsync();

                updatedSongsData[index].isLoading = false;
                updatedSongsData[index].isPlaying = true;
                setSongsData([...updatedSongsData]);
            } catch (error) {
                console.error('Error playing song:', error);
            }
        }

        setIsLoadingSong(false);
    };



    const handleRewind10 = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                const newPosition = Math.max(status.positionMillis - 10000, 0);
                await sound.setPositionAsync(newPosition);
            }
        }
    };

    const handleFastForward10 = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                const newPosition = Math.min(status.positionMillis + 10000, status.durationMillis); // Fast-forward by 10 seconds or to the end
                await sound.setPositionAsync(newPosition);
            }
        }
    };


    return (
        <View style={styles.SongListParent}>
            <View style={styles.ttInputParent}>
                <TextInput
                    style={styles.ttInput}
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholder="Search any Song..."
                />
                <TouchableOpacity style={styles.ttSearchBut} onPress={handleSearch}>
                    <FontAwesome name="search" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.SongsList}>
                {loader ? (
                    <LottieView
                        source={require('../../../../assets/Music_Loader.json')}
                        autoPlay
                        loop
                        speed={1.5}
                        style={styles.lottie}
                    />
                ) : !songsData ? (
                    <Text style={styles.noSongText}>No song found</Text>
                ) : (
                    songsData.map((item, index) => {
                        const isSelected = playingIndex === index;
                        const textColor = isSelected ? '#41C3D6' : 'black';

                        return (
                            <TouchableOpacity
                                key={item._id}
                                style={styles.SongData}
                                onPress={() => handleSongPress(index)}
                                disabled={isLoadingSong}
                            >
                                {item.isLoading ? (
                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <LottieView
                                            source={require('../../../../assets/Bird_Loader.json')}
                                            autoPlay
                                            loop
                                            speed={1.5}
                                            style={styles.birdLottie}
                                        />
                                        <Text style={{ fontSize: 20, fontWeight: '800' }}>
                                            Please Wait, Playing your Song...
                                        </Text>
                                    </View>
                                ) : (
                                    <>
                                        <Image style={styles.SongImage} source={{ uri: `https://ps-backend-18.onrender.com/${item.img}`}} />
                                        <View style={styles.SongTexts}>
                                            <Text style={[styles.SongName, { color: textColor }]}>{item.name}</Text>
                                            <Text style={[styles.ArtistName, { color: textColor }]}>
                                                {item.artist.join(', ')}
                                            </Text>
                                        </View>
                                    </>
                                )}
                                {!isSelected && <View style={styles.Dummy} />}
                                {isSelected && !item.isLoading && (
                                    <View
                                        style={{
                                            width: '30%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TouchableOpacity onPress={handleRewind10}>
                                            <Icon name="rewind-10" size={28} color="#41C3D6" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleSongPress(index)}
                                            style={styles.PlayPauseButton}
                                        >
                                            <FontAwesome
                                                name={item.isPlaying ? 'pause' : 'play'}
                                                size={24}
                                                color="#41C3D6"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleFastForward10}>
                                            <Icon name="fast-forward-10" size={28} color="#41C3D6" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })
                )}
            </View>

        </View>
    );
};

export default Songs;