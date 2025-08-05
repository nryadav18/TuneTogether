import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MusicPlay from '../MusicPlay/MusicPlay';
import LottieView from 'lottie-react-native';
import { debounce } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainDataUrl = 'https://184d-2409-40f0-104d-89ed-b44c-185c-8a72-d231.ngrok-free.app/';

const Search = ({ route }) => {
  const { songsData } = route.params;
  const [search, setSearch] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected index instead of ID
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch songs data
  const fetchTracks = useCallback(async () => {
    if ( songsData.length != 0 ){
      setIsLoading(true);
    try {
      const validData = songsData.map((item) => ({
        id: item._id || '',
        name: item.name || 'Unknown name',
        artist: item.artist || 'Unknown Artist',
        img: item.img || '',
        url: item.url || '',
        duration: item.duration || '',
        movie: item.movie || '',
      }));
      setFilteredData(validData);
      setRecommendations(validData.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
    }
  }, [songsData]);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  // Debounced search handler
  const handleSearch = debounce((searchValue) => {
    if (searchValue.trim().length > 0) {
      const filtered = songsData.filter(
        (item) =>
          String(item.name).toLowerCase().includes(searchValue.toLowerCase()) ||
          String(item.artist).toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
      setRecommendations(filtered.slice(0, 5)); // Update recommendations dynamically
    } else {
      setFilteredData(songsData);
      setRecommendations(songsData.slice(0, 5)); // Reset recommendations
    }
  }, 300);

  // Handle search input change
  const updateSearch = (searchValue) => {
    setSearch(searchValue);
    handleSearch(searchValue);
  };

  // Handle song selection
  const handleSongPress = (index) => {
    setSelectedIndex(index); // Toggle selection
  };

  // Pull-to-refresh functionality
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTracks();
    setRefreshing(false);
  }, [fetchTracks]);

  // Render each song item
  const renderItem = ({ item, index }) => (
    <SongItem
      item={item}
      selectedIndex={selectedIndex}
      onPress={() => handleSongPress(index)} // Use index for selection
    />
  );
  // Render recommendations
  const renderRecommendations = () => (
    <View style={styles.recommendationsContainer}>
      <Text style={styles.recommendationTitle}>Recommendations</Text>
      <FlatList
        data={recommendations}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleSongPress(index)} // Use index for recommendations
            style={styles.recommendationItem}
          >
            <Image
              source={{ uri: MainDataUrl + item.img }}
              style={styles.recommendationImage}
              resizeMode="cover"
            />
            <Text style={styles.recommendationText}>{item.movie}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const SongItem = React.memo(({ item, selectedIndex, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
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
              selectedIndex === filteredData.indexOf(item) && styles.highlightedText,
            ]}
          >
            {item.name}
          </Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
        {selectedIndex === filteredData.indexOf(item) && (
          <LottieView
            source={require('../../../assets/Home/greenMusicAnimation.json')}
            style={{ height: '100%', width: 80 }}
            autoPlay
            loop
          />
        )}
      </View>
    </TouchableOpacity>
  ));



  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search for songs..."
        searchIcon={{ size: 24 }}
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
        inputStyle={styles.searchBarText}
        clearIcon={{ color: '#fff' }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#1DB954" style={styles.loader} />
      ) : (
        <>
          {search.length === 0 && recommendations.length > 0 && renderRecommendations()}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>No results found</Text>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      )}
      {selectedIndex !== null && (
        <MusicPlay
          songDetails={filteredData} // Pass the entire filtered data
          selectedIndex={selectedIndex} // Pass the selected index
          setSelectedIndex={setSelectedIndex} // Pass the setter function
        />
      )}
    </SafeAreaView>
  );
};

// Separate component for SongItem


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInput: {
    backgroundColor: '#333',
    borderRadius: 25,
    height: 40,
  },
  searchBarText: {
    color: '#fff',
    fontSize: 18,
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
    color: '#1DB954',
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
    borderRadius: 5,
  },
  recommendationsContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  recommendationTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  recommendationImage: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  recommendationText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  noResultsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;