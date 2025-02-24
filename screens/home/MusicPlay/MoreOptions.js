import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView for animation
import MusicPlay from './MusicPlay';

const MoreOptions = ({ route }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected index instead of ID
  const { songsData, itemName } = route.params;
  const MainDataUrl = 'https://localsongsdata.onrender.com/'; // Base URL for images

  // Filtering function
  const filterData = () => {
    const filteredSongs = songsData?.filter(
      (item) =>
        String(item?.name)?.toLowerCase().includes(itemName.toLowerCase()) ||
        item?.artist.some((artist) =>
          String(artist).toLowerCase().includes(itemName.toLowerCase())) ||
        
        String(item?.hero).toLowerCase().includes(itemName.toLowerCase()) ||
        String(item?.lang).toLowerCase().includes(itemName.toLowerCase()) ||
        String(item?.theme).toLowerCase().includes(itemName.toLowerCase())
    );
    setFilteredData(filteredSongs);
  };

  useEffect(() => {
    filterData();
  }, [itemName, songsData]);

  // Handle song selection
  const handleSongPress = (index) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle selection
  };

  return (
    <View style={styles.container}>
      {/* Render the list of songs */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleSongPress(index)} // Use index for selection
            style={styles.touchable}
          >
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: MainDataUrl + item.img }}
                style={styles.songImage}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.songTitle,
                    selectedIndex === index && styles.highlightedText,
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={styles.songArtist}>{item.artist.join(', ')}</Text>
              </View>
              {selectedIndex === index && (
                <LottieView
                  source={require('../../../assets/Home/greenMusicAnimation.json')}
                  style={styles.lottie}
                  autoPlay
                  loop
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No results found</Text>
        }
      />

      {/* Render the MusicPlay component if a song is selected */}
      {selectedIndex !== null && (
        <MusicPlay
          songDetails={filteredData} // Pass the entire filtered data
          selectedIndex={selectedIndex} // Pass the selected index
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  touchable: {
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  highlightedText: {
    color: '#1DB954', // Highlight color for the selected song
  },
  songArtist: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 2,
  },
  songImage: {
    height: 55,
    width: 50,
    marginHorizontal: 10,
  },
  lottie: {
    width: 50,
    height: 50,
  },
  noResultsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default MoreOptions;