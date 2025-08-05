import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import AntDesign from '@expo/vector-icons/AntDesign';

const MusicPlayerModal = ({
  isModalVisible,
  setIsModalVisible,
  isPlaying,
  handlePlayPause,
  duration,
  soundPosition,
  songDetails,
  handleSeek: handleSeek,
  playNext,
  playPrevious,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const MainDataUrl = 'https://184d-2409-40f0-104d-89ed-b44c-185c-8a72-d231.ngrok-free.app/';

  if (!songDetails) {
    return null;
  }

  const { name = 'Unknown Song', movie = '', img = '', artist = [] } = songDetails;

  const formatTime = (timeMillis) => {
    const minutes = Math.floor(timeMillis / 60000);
    const seconds = ((timeMillis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleCloseModal = () => {
    if (showOptions) {
      setShowOptions(false);
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsModalVisible(false));
    }
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showOptions ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showOptions]);

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      onRequestClose={handleCloseModal}
      transparent
    >
      <View style={styles.fullScreenContainer}>
        {showOptions && <View style={styles.modalOverlay} />}
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCloseModal}>
              <AntDesign name="downcircleo" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.movieName} numberOfLines={1}>
              {movie || 'Unknown Movie'}
            </Text>
            <TouchableOpacity>
              <Icon name="share-variant" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${MainDataUrl}${img}` }}
              style={styles.albumArt}
            />
          </View>
          <View style={styles.favoriteOptionsContainer}>
            <Text style={styles.fullSongName} numberOfLines={1}>
              {name}
            </Text>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
              <Icon
                name={isLiked ? 'heart' : 'heart-outline'}
                size={30}
                color={isLiked ? '#FF1493' : 'white'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowOptions(true)}>
              <Icon name="dots-vertical" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.artistName}>
            {artist.join(', ') || 'Unknown Artist'}
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>{formatTime(soundPosition)}</Text>
              <Text style={styles.durationText}>{formatTime(duration)}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={soundPosition}
              minimumTrackTintColor="#FF1493"
              maximumTrackTintColor="#B0B0B0"
              thumbTintColor="#FF1493"
              onSlidingStart={() => setIsDragging(true)}
              onSlidingComplete={(value) => {
                handleSeek(value);
                setIsDragging(false);

              }}
            />
          </View>
          <View style={styles.playbackControls}>
            <TouchableOpacity>
              <Icon name="shuffle" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> playPrevious()}>
              <Icon name="skip-previous" size={36} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handlePlayPause}
            >
              <Icon
                name={isPlaying ? 'pause' : 'play'}
                size={36}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> playNext()}>
              <Icon name="skip-next" size={36} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="repeat" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {showOptions && (
          <>
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setShowOptions(false)}
            />
            <Animated.View
              style={[
                styles.optionsContainer,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              {[
                { id: '1', name: 'Add to Playlist', icon: 'playlist-plus' },
                { id: '2', name: 'Add to Queue', icon: 'playlist-music' },
                { id: '3', name: 'Remove from Playlist', icon: 'playlist-remove' },
                { id: '4', name: 'Modify Tags', icon: 'tag-text-outline' },
                { id: '5', name: 'Download', icon: 'download' },
                { id: '6', name: 'Hide Song', icon: 'eye-off' },
              ].map(
                (item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.optionItem}
                    onPress={() => console.log(item.name)}
                  >
                    <Icon
                      name={item.icon}
                      size={24}
                      color="white"
                      style={styles.optionIcon}
                    />
                    <Text style={styles.optionText}>{item.name}</Text>
                  </TouchableOpacity>
                )
              )}
            </Animated.View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#222',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  imageContainer: {
    width: '100%',
    height: 360,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 65,
  },
  albumArt: {
    width: '130%',
    height: '130%',
    aspectRatio:"1/1",
    alignSelf: 'center',
    // resizeMode: 'cover',


  },
  favoriteOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginTop: 50,
  },
  fullSongName: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#D3D3D3',
    fontSize: 16,
  },
  progressContainer: {
    marginVertical: 20,
    marginTop: 85,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: 'white',
  },
  durationText: {
    color: 'white',
  },
  slider: {
    marginTop: 10,
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  playPauseButton: {
    marginHorizontal: 40,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MusicPlayerModal;
