import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const playlist = {
  image: 'https://via.placeholder.com/200',
  title: 'R&B Playlist',
  description: 'Chill your mind',
};

const songs = [
  { id: '1', name: 'You Right', artist: 'Doja Cat, The Weeknd', duration: '3:58' },
  { id: '2', name: '2 AM', artist: 'Arizona Zervas', duration: '3:03' },
  { id: '3', name: 'Baddest', artist: '2 Chainz, Chris Brown', duration: '3:51' },
  { id: '4', name: 'True Love', artist: 'Kanye West', duration: '4:52' },
  { id: '5', name: 'Bye Bye', artist: 'Marshmello, Juice WRLD', duration: '2:09' },
  { id: '6', name: 'Hands on you', artist: 'Austin George', duration: '3:56' },
];
const MainPlayer = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>R&B Playlist</Text>
      </View>
      {/* Playlist Section */}
      <View style={styles.playlist}>
        <Image source={{ uri: playlist.image }} style={styles.playlistImage} />
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistTitle}>{playlist.title}</Text>
          <Text style={styles.playlistDescription}>{playlist.description}</Text>
        </View>
      </View>
      {/* Song List */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.songItem}>
            <Text style={styles.songName}>{item.name}</Text>
            <Text style={styles.songArtist}>{item.artist}</Text>
            <Text style={styles.songDuration}>{item.duration}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 10,
    backgroundColor: '#111',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playlist: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#222',
    marginVertical: 10,
    borderRadius: 10,
  },
  playlistImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  playlistInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  playlistTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playlistDescription: {
    color: '#AAA',
    fontSize: 14,
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    marginVertical: 5,
    borderRadius: 5,
  },
  songName: {
    color: '#FFF',
    flex: 2,
  },
  songArtist: {
    color: '#AAA',
    flex: 1,
    textAlign: 'center',
  },
  songDuration: {
    color: '#FFF',
    flex: 1,
    textAlign: 'right',
  },
});

export default MainPlayer;